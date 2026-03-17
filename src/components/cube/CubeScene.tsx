"use client";

import { useRef, useCallback, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import {
  COLORS,
  CUBIE_SIZE,
  CUBIE_BEVEL,
  CUBE_SLOTS,
  ASSEMBLY_ORDER,
  TIMING,
  createFlightCurve,
} from "./constants";

// ─── Types ───────────────────────────────────────────
type AnimPhase = "waiting" | "assembling" | "completion" | "idle";

interface FlyingBlock {
  meshIndex: number;
  curve: THREE.CubicBezierCurve3;
  progress: number;
  slotIdx: number;
}

// ─── Shared geometry args ────────────────────────────
type BoxArgs = [number, number, number];
const cubieArgs: BoxArgs = [CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE];

const MAX_FLYING = 6;

// Spawn from below with random spread
function randomSpawnPos(): THREE.Vector3 {
  return new THREE.Vector3(
    (Math.random() - 0.5) * 5,
    -5,
    (Math.random() - 0.5) * 5,
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
        color={COLORS.accent}
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
  const rootRef = useRef<THREE.Group>(null);
  const cubeGroupRef = useRef<THREE.Group>(null);

  const cubieRefs = useRef<(THREE.Mesh | null)[]>([]);
  const flyingRefs = useRef<(THREE.Mesh | null)[]>([]);

  const anim = useRef({
    phase: "waiting" as AnimPhase,
    blockTimer: 0,
    completionTimer: 0,
    assemblyIndex: 0,
    landedCount: 0,
    hovered: false,
    flyingBlocks: [] as FlyingBlock[],
  });

  const mousePos = useRef({ x: 0, y: 0 });
  const smoothRot = useRef({ x: 0, y: 0 });

  // Reduced motion: show completed cube immediately
  useEffect(() => {
    if (reducedMotion) {
      anim.current.phase = "idle";
      cubieRefs.current.forEach((mesh) => {
        if (mesh) mesh.visible = true;
      });
      flyingRefs.current.forEach((mesh) => {
        if (mesh) mesh.visible = false;
      });
      return;
    }
    const timer = setTimeout(() => {
      anim.current.phase = "assembling";
      anim.current.blockTimer = 0;
    }, 400);
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

  // Ref callbacks
  const setCubieRef = useCallback(
    (index: number) => (el: THREE.Mesh | null) => {
      cubieRefs.current[index] = el;
    },
    [],
  );
  const setFlyingRef = useCallback(
    (index: number) => (el: THREE.Mesh | null) => {
      flyingRefs.current[index] = el;
    },
    [],
  );

  // Find a free flying mesh from the pool
  const getFreeMeshIndex = (): number => {
    const usedIndices = new Set(
      anim.current.flyingBlocks.map((b) => b.meshIndex),
    );
    for (let i = 0; i < MAX_FLYING; i++) {
      if (!usedIndices.has(i)) return i;
    }
    return -1;
  };

  // ─── Launch a block from below ─────────────────────
  const launchBlock = useCallback(() => {
    const a = anim.current;
    if (a.assemblyIndex >= ASSEMBLY_ORDER.length) return;

    const meshIndex = getFreeMeshIndex();
    if (meshIndex === -1) return;

    const slotIdx = ASSEMBLY_ORDER[a.assemblyIndex];
    a.assemblyIndex++;
    a.blockTimer = 0;

    const start = randomSpawnPos();
    const endPos = CUBE_SLOTS[slotIdx];
    const end = new THREE.Vector3(endPos[0], endPos[1], endPos[2]);
    const randomOffset = (Math.random() - 0.5) * 1.0;

    const flyMesh = flyingRefs.current[meshIndex];
    if (flyMesh) {
      flyMesh.visible = true;
      flyMesh.position.copy(start);
      flyMesh.rotation.set(0, 0, 0);
    }

    a.flyingBlocks.push({
      meshIndex,
      curve: createFlightCurve(start, end, randomOffset),
      progress: 0,
      slotIdx,
    });
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
      smoothRot.current.y += (tx - smoothRot.current.y) * 2 * dt;
      smoothRot.current.x += (ty - smoothRot.current.x) * 2 * dt;
      rootRef.current.rotation.y = smoothRot.current.y;
      rootRef.current.rotation.x = smoothRot.current.x;
    }

    // ── Phase: assembling ──
    if (a.phase === "assembling") {
      a.blockTimer += dt;
      if (
        a.blockTimer >= TIMING.blockInterval &&
        a.assemblyIndex < ASSEMBLY_ORDER.length
      ) {
        launchBlock();
      }
    }

    // ── Animate ALL flying blocks simultaneously ──
    const landed: number[] = [];
    for (let i = 0; i < a.flyingBlocks.length; i++) {
      const fb = a.flyingBlocks[i];
      const mesh = flyingRefs.current[fb.meshIndex];
      if (!mesh) continue;

      const speed = dt / TIMING.flightDuration;
      fb.progress = Math.min(fb.progress + speed, 1);
      const p = fb.progress;
      // Smooth ease-in-out cubic
      const eased =
        p < 0.5
          ? 4 * p * p * p
          : 1 - Math.pow(-2 * p + 2, 3) / 2;

      const point = fb.curve.getPoint(eased);
      mesh.position.copy(point);

      if (fb.progress >= 1) {
        mesh.visible = false;
        const cubieMesh = cubieRefs.current[fb.slotIdx];
        if (cubieMesh) cubieMesh.visible = true;
        a.landedCount++;
        landed.push(i);
      }
    }

    // Remove landed blocks
    if (landed.length > 0) {
      for (let i = landed.length - 1; i >= 0; i--) {
        a.flyingBlocks.splice(landed[i], 1);
      }

      // All 27 launched AND all landed → completion
      if (
        a.assemblyIndex >= ASSEMBLY_ORDER.length &&
        a.flyingBlocks.length === 0
      ) {
        a.phase = "completion";
        a.completionTimer = 0;
      }
    }

    // ── Phase: completion (bounce only, no color change) ──
    if (a.phase === "completion") {
      a.completionTimer += dt;
      if (a.completionTimer < TIMING.completionGlow) {
        const t = a.completionTimer / TIMING.completionGlow;
        const bounce = 1 + 0.03 * Math.sin(t * Math.PI);
        if (cubeGroupRef.current) {
          cubeGroupRef.current.scale.set(bounce, bounce, bounce);
        }
      } else {
        if (cubeGroupRef.current) {
          cubeGroupRef.current.scale.set(1, 1, 1);
        }
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
        onPointerEnter={() => { anim.current.hovered = true; }}
        onPointerLeave={() => { anim.current.hovered = false; }}
      >
        {CUBE_SLOTS.map((pos, i) => (
          <CubieSlot key={`c-${i}`} position={pos} meshRef={setCubieRef(i)} />
        ))}
      </group>

      {/* Flying block pool */}
      {Array.from({ length: MAX_FLYING }, (_, i) => (
        <RoundedBox
          key={`fly-${i}`}
          ref={setFlyingRef(i)}
          args={cubieArgs}
          radius={CUBIE_BEVEL}
          smoothness={4}
          visible={false}
          castShadow
        >
          <meshStandardMaterial
            color={COLORS.accent}
            roughness={0.7}
            metalness={0}
          />
        </RoundedBox>
      ))}
    </group>
  );
}
