"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import {
  COLORS,
  CUBIE_SIZE,
  CUBIE_BEVEL,
  CUBE_SLOTS,
  ASSEMBLY_ORDER,
  PLANE_COLS,
  PLANE_ROWS,
  TIMING,
  createFlightCurve,
  planeBlockPosition,
} from "./constants";

// ─── Types ───────────────────────────────────────────
type AnimPhase =
  | "waiting"
  | "scene-enter"
  | "assembling"
  | "completion"
  | "plane-exit"
  | "idle";

// ─── Shared geometry + materials ─────────────────────
type BoxArgs = [number, number, number];
const cubieArgs: BoxArgs = [CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE];
const flatArgs: BoxArgs = [CUBIE_SIZE, CUBIE_SIZE * 0.3, CUBIE_SIZE];

// ─── Plane block sub-component ───────────────────────
function PlaneBlock({
  col,
  row,
  meshRef,
}: {
  col: number;
  row: number;
  meshRef: React.Ref<THREE.Mesh>;
}) {
  const pos = planeBlockPosition(col, row);
  return (
    <RoundedBox
      ref={meshRef}
      args={flatArgs}
      radius={CUBIE_BEVEL}
      smoothness={4}
      position={pos}
      receiveShadow
    >
      <meshStandardMaterial
        color={COLORS.secondary}
        roughness={0.8}
        metalness={0}
        transparent
      />
    </RoundedBox>
  );
}

// ─── Cubie sub-component ─────────────────────────────
function CubieSlot({
  position,
  meshRef,
}: {
  position: [number, number, number];
  meshRef: React.Ref<THREE.Mesh>;
}) {
  return (
    <RoundedBox
      ref={meshRef}
      args={cubieArgs}
      radius={CUBIE_BEVEL}
      smoothness={4}
      position={position}
      visible={false}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={COLORS.primary}
        roughness={0.7}
        metalness={0}
      />
    </RoundedBox>
  );
}

// ─── Main Scene ──────────────────────────────────────
export default function CubeScene({
  enableParallax = true,
  reducedMotion = false,
}: {
  enableParallax?: boolean;
  reducedMotion?: boolean;
}) {
  // Group refs
  const rootRef = useRef<THREE.Group>(null);
  const cubeGroupRef = useRef<THREE.Group>(null);
  const planeGroupRef = useRef<THREE.Group>(null);
  const flyingMeshRef = useRef<THREE.Mesh>(null);

  // Mesh refs for individual cubies and plane blocks
  const cubieRefs = useRef<(THREE.Mesh | null)[]>([]);
  const planeRefs = useRef<(THREE.Mesh | null)[]>([]);

  // All animation state in a single ref to avoid re-renders in useFrame
  const anim = useRef({
    phase: "waiting" as AnimPhase,
    phaseTimer: 0,
    blockTimer: 0,
    completionTimer: 0,
    assemblyIndex: 0,
    flyingProgress: 0,
    flyingCurve: null as THREE.CubicBezierCurve3 | null,
    flyingSlotIdx: -1,
    flyingTargetRotation: 0,
    hovered: false,
    planeAssignment: [] as number[],
  });

  // Mouse position for parallax
  const mousePos = useRef({ x: 0, y: 0 });
  const smoothRot = useRef({ x: 0, y: 0 });

  // Initialize plane assignment
  useEffect(() => {
    const indices = Array.from(
      { length: PLANE_COLS * PLANE_ROWS },
      (_, i) => i,
    );
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    anim.current.planeAssignment = indices;
  }, []);

  // Reduced motion: show completed cube
  useEffect(() => {
    if (reducedMotion) {
      anim.current.phase = "idle";
      // Show all cubies
      cubieRefs.current.forEach((mesh) => {
        if (mesh) mesh.visible = true;
      });
      // Hide plane
      if (planeGroupRef.current) planeGroupRef.current.visible = false;
      if (flyingMeshRef.current) flyingMeshRef.current.visible = false;
      return;
    }
    // Start after short delay
    const timer = setTimeout(() => {
      anim.current.phase = "scene-enter";
      if (planeGroupRef.current) planeGroupRef.current.visible = true;
    }, 200);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  // Mouse tracking
  useEffect(() => {
    if (!enableParallax) return;
    const handler = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [enableParallax]);

  // Set cubie ref callback
  const setCubieRef = useCallback(
    (index: number) => (el: THREE.Mesh | null) => {
      cubieRefs.current[index] = el;
    },
    [],
  );
  const setPlaneRef = useCallback(
    (index: number) => (el: THREE.Mesh | null) => {
      planeRefs.current[index] = el;
    },
    [],
  );

  // Helper: set material color on a mesh
  const setMeshColor = (mesh: THREE.Mesh | null, color: string) => {
    if (!mesh) return;
    const mat = mesh.material as THREE.MeshStandardMaterial;
    if (mat && mat.color) mat.color.set(color);
  };

  const setMeshOpacity = (mesh: THREE.Mesh | null, opacity: number) => {
    if (!mesh) return;
    const mat = mesh.material as THREE.MeshStandardMaterial;
    if (mat) mat.opacity = opacity;
  };

  // ─── Launch a block from plane to cube ─────────────
  const launchBlock = useCallback(() => {
    const a = anim.current;
    if (a.assemblyIndex >= ASSEMBLY_ORDER.length) return;

    const slotIdx = ASSEMBLY_ORDER[a.assemblyIndex];
    const planeIdx =
      a.planeAssignment[a.assemblyIndex % a.planeAssignment.length];

    // Highlight the plane block
    setMeshColor(planeRefs.current[planeIdx], COLORS.accent);

    setTimeout(() => {
      // Remove highlight, hide plane block
      const planeMesh = planeRefs.current[planeIdx];
      if (planeMesh) planeMesh.visible = false;

      // Calculate flight curve
      const col = planeIdx % PLANE_COLS;
      const row = Math.floor(planeIdx / PLANE_COLS);
      const startPos = planeBlockPosition(col, row);
      const start = new THREE.Vector3(
        startPos[0],
        startPos[1] + 0.5,
        startPos[2],
      );
      const endPos = CUBE_SLOTS[slotIdx];
      const end = new THREE.Vector3(endPos[0], endPos[1], endPos[2]);
      const randomOffset = (Math.random() - 0.5) * 1.0;

      a.flyingCurve = createFlightCurve(start, end, randomOffset);
      a.flyingProgress = 0;
      a.flyingSlotIdx = slotIdx;
      a.flyingTargetRotation = Math.PI * (1 + Math.random());

      if (flyingMeshRef.current) {
        flyingMeshRef.current.visible = true;
        flyingMeshRef.current.position.copy(start);
      }

      // Refill after delay
      setTimeout(() => {
        if (planeMesh) {
          setMeshColor(planeMesh, COLORS.secondary);
          planeMesh.visible = true;
          // Animate from below (set position offset, then restore)
          const origY = planeMesh.position.y;
          planeMesh.position.y = origY - 0.5;
          // Simple spring-up via raf
          const startTime = performance.now();
          const animateRefill = (now: number) => {
            const elapsed = (now - startTime) / 1000;
            const t = Math.min(elapsed / TIMING.refillDuration, 1);
            // back.out easing approximation
            const c1 = 1.70158;
            const c3 = c1 + 1;
            const eased =
              1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
            planeMesh.position.y = origY - 0.5 + 0.5 * eased;
            if (t < 1) requestAnimationFrame(animateRefill);
          };
          requestAnimationFrame(animateRefill);
        }
      }, TIMING.refillDelay * 1000);
    }, TIMING.extractHighlight * 1000);

    a.assemblyIndex++;
    a.blockTimer = 0;
  }, []);

  // ─── useFrame ──────────────────────────────────────
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const a = anim.current;

    // ── Parallax ──
    if (enableParallax && rootRef.current) {
      const maxAngle = (12 * Math.PI) / 180;
      const tx = mousePos.current.x * maxAngle;
      const ty = -mousePos.current.y * maxAngle;
      smoothRot.current.y += (tx - smoothRot.current.y) * 3 * dt;
      smoothRot.current.x += (ty - smoothRot.current.x) * 3 * dt;
      rootRef.current.rotation.y = smoothRot.current.y;
      rootRef.current.rotation.x = smoothRot.current.x;
    }

    // ── Phase: scene-enter ──
    if (a.phase === "scene-enter") {
      a.phaseTimer += dt;
      const t = Math.min(a.phaseTimer / TIMING.phase1Duration, 1);
      // Fade in plane blocks
      planeRefs.current.forEach((mesh) => setMeshOpacity(mesh, t));
      if (planeGroupRef.current) {
        const s = 0.8 + 0.2 * t; // scale 0.8 → 1.0
        planeGroupRef.current.scale.set(s, s, s);
      }
      if (t >= 1) {
        a.phase = "assembling";
        a.phaseTimer = 0;
        a.blockTimer = 0;
      }
    }

    // ── Phase: assembling ──
    if (a.phase === "assembling" && !a.flyingCurve) {
      a.blockTimer += dt;
      if (
        a.blockTimer >= TIMING.blockInterval &&
        a.assemblyIndex < ASSEMBLY_ORDER.length
      ) {
        launchBlock();
      }
    }

    // ── Animate flying block ──
    if (a.flyingCurve && flyingMeshRef.current) {
      const speed = dt / TIMING.flightDuration;
      a.flyingProgress = Math.min(a.flyingProgress + speed, 1);
      const p = a.flyingProgress;
      // power2.inOut easing
      const eased =
        p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

      const point = a.flyingCurve.getPoint(eased);
      flyingMeshRef.current.position.copy(point);
      flyingMeshRef.current.rotation.y = eased * a.flyingTargetRotation;

      if (a.flyingProgress >= 1) {
        // Land
        flyingMeshRef.current.visible = false;
        const cubieMesh = cubieRefs.current[a.flyingSlotIdx];
        if (cubieMesh) cubieMesh.visible = true;
        a.flyingCurve = null;

        // Check if all assembled
        if (a.assemblyIndex >= ASSEMBLY_ORDER.length) {
          // Wait a moment for last block to visually settle
          setTimeout(() => {
            anim.current.phase = "completion";
            anim.current.completionTimer = 0;
          }, 50);
        }
      }
    }

    // ── Phase: completion ──
    if (a.phase === "completion") {
      a.completionTimer += dt;
      if (a.completionTimer < TIMING.completionGlow) {
        const t = a.completionTimer / TIMING.completionGlow;
        const bounce = 1 + 0.03 * Math.sin(t * Math.PI);
        if (cubeGroupRef.current) {
          cubeGroupRef.current.scale.set(bounce, bounce, bounce);
        }
        // Glow: set all cubies to accent
        cubieRefs.current.forEach((mesh) =>
          setMeshColor(mesh, COLORS.accent),
        );
      } else {
        // Reset
        if (cubeGroupRef.current) {
          cubeGroupRef.current.scale.set(1, 1, 1);
        }
        cubieRefs.current.forEach((mesh) =>
          setMeshColor(mesh, COLORS.primary),
        );
        a.phase = "plane-exit";
        a.phaseTimer = 0;
      }
    }

    // ── Phase: plane-exit ──
    if (a.phase === "plane-exit") {
      a.phaseTimer += dt;
      const t = Math.min(a.phaseTimer / TIMING.planeExit, 1);
      planeRefs.current.forEach((mesh) => setMeshOpacity(mesh, 1 - t));
      if (planeGroupRef.current) {
        planeGroupRef.current.position.y = -t * 2; // drift down
      }
      if (t >= 1) {
        if (planeGroupRef.current) planeGroupRef.current.visible = false;
        a.phase = "idle";
      }
    }

    // ── Phase: idle ──
    if (a.phase === "idle" && cubeGroupRef.current) {
      const speed = (2 * Math.PI) / TIMING.idleRotationPeriod;
      const factor = a.hovered ? 0.5 : 1;
      cubeGroupRef.current.rotation.y += speed * factor * dt;
    }
  });

  // ─── Generate plane grid indices ───────────────────
  const planeIndices = Array.from(
    { length: PLANE_COLS * PLANE_ROWS },
    (_, i) => ({
      col: i % PLANE_COLS,
      row: Math.floor(i / PLANE_COLS),
      index: i,
    }),
  );

  return (
    <group ref={rootRef}>
      {/* Lights */}
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Cube assembly */}
      <group
        ref={cubeGroupRef}
        onPointerEnter={() => {
          anim.current.hovered = true;
        }}
        onPointerLeave={() => {
          anim.current.hovered = false;
        }}
      >
        {CUBE_SLOTS.map((pos, i) => (
          <CubieSlot key={`c-${i}`} position={pos} meshRef={setCubieRef(i)} />
        ))}
      </group>

      {/* Flying block (always mounted, toggled via visible) */}
      <RoundedBox
        ref={flyingMeshRef}
        args={cubieArgs}
        radius={CUBIE_BEVEL}
        smoothness={4}
        visible={false}
        castShadow
      >
        <meshStandardMaterial
          color={COLORS.primary}
          roughness={0.7}
          metalness={0}
        />
      </RoundedBox>

      {/* Block plane */}
      <group ref={planeGroupRef} visible={false}>
        {planeIndices.map(({ col, row, index }) => (
          <PlaneBlock
            key={`p-${index}`}
            col={col}
            row={row}
            meshRef={setPlaneRef(index)}
          />
        ))}
      </group>
    </group>
  );
}
