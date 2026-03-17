"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Constants ───────────────────────────────────────
const BAR_HEIGHTS = [0.2, 0.35, 0.5, 0.7, 0.9];
const BAR_COUNT = BAR_HEIGHTS.length;
const BAR_WIDTH = 0.6;
const BAR_DEPTH = 0.6;
const BAR_GAP = 0.35;
const MAX_BAR_HEIGHT = 3.5;
const ACCENT_COLOR = "#4A90D9";

// Timing
const GROW_MS = 600;
const STAGGER_MS = 140;
const HOLD_MS = 1800;
const PAUSE_MS = 600;

// easeOutBack — matches CSS cubic-bezier(0.34, 1.56, 0.64, 1)
function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

type Phase = "growing" | "holding" | "hidden";

// ─── Main Scene ──────────────────────────────────────
export default function GrowthBars3DScene({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  const { camera } = useThree();
  camera.lookAt(0, 1.1, 0);

  const barsRef = useRef<(THREE.Mesh | null)[]>([]);

  const anim = useRef({
    phase: "growing" as Phase,
    phaseTimer: 0,
    visibleCount: 0,
    staggerTimer: 0,
    // Per-bar animation progress (0 = hidden, 1 = fully grown)
    barProgress: BAR_HEIGHTS.map(() => 0),
  });

  const setBarRef = (index: number) => (el: THREE.Mesh | null) => {
    barsRef.current[index] = el;
  };

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const a = anim.current;

    if (reducedMotion) {
      // Show all bars at full height
      for (let i = 0; i < BAR_COUNT; i++) {
        a.barProgress[i] = 1;
      }
    } else if (a.phase === "growing") {
      a.staggerTimer += dt * 1000;
      if (a.staggerTimer >= STAGGER_MS && a.visibleCount < BAR_COUNT) {
        a.visibleCount++;
        a.staggerTimer = 0;
      }
      if (a.visibleCount >= BAR_COUNT) {
        // Check if all bars finished growing
        const allDone = a.barProgress.every((p) => p >= 1);
        if (allDone) {
          a.phase = "holding";
          a.phaseTimer = 0;
        }
      }
    } else if (a.phase === "holding") {
      a.phaseTimer += dt * 1000;
      if (a.phaseTimer >= HOLD_MS) {
        a.phase = "hidden";
        a.phaseTimer = 0;
      }
    } else if (a.phase === "hidden") {
      a.phaseTimer += dt * 1000;
      if (a.phaseTimer >= PAUSE_MS) {
        a.phase = "growing";
        a.phaseTimer = 0;
        a.staggerTimer = 0;
        a.visibleCount = 0;
        a.barProgress = BAR_HEIGHTS.map(() => 0);
      }
    }

    // Animate each bar
    for (let i = 0; i < BAR_COUNT; i++) {
      const mesh = barsRef.current[i];
      if (!mesh) continue;

      const targetH = BAR_HEIGHTS[i] * MAX_BAR_HEIGHT;
      const isVisible = reducedMotion || (a.phase !== "hidden" && i < a.visibleCount);

      if (isVisible && a.barProgress[i] < 1) {
        // Grow: cubic-bezier style spring
        a.barProgress[i] = Math.min(a.barProgress[i] + dt / (GROW_MS / 1000), 1);
      } else if (!isVisible && a.barProgress[i] > 0) {
        // Instant hide
        a.barProgress[i] = 0;
      }

      const p = a.barProgress[i];
      const eased = easeOutBack(p);

      const h = Math.max(targetH * eased, 0.001);

      // Scale Y and reposition so bar grows from bottom
      mesh.scale.y = h;
      mesh.position.y = h / 2;
    }
  });

  // Total width of all bars
  const totalWidth = BAR_COUNT * BAR_WIDTH + (BAR_COUNT - 1) * BAR_GAP;
  const startX = -totalWidth / 2 + BAR_WIDTH / 2;

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.3} color="#ffffff" />
      <directionalLight
        position={[4, 8, 6]}
        intensity={1.0}
        castShadow
      />

      {/* Bars */}
      {BAR_HEIGHTS.map((_, i) => (
        <mesh
          key={`bar-${i}`}
          ref={setBarRef(i)}
          position={[startX + i * (BAR_WIDTH + BAR_GAP), 0, 0]}
        >
          <boxGeometry args={[BAR_WIDTH, 1, BAR_DEPTH]} />
          <meshStandardMaterial
            color={ACCENT_COLOR}
            roughness={0.7}
            metalness={0}
          />
        </mesh>
      ))}

    </>
  );
}
