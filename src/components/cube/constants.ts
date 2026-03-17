import * as THREE from "three";

// --- Colors ---
export const COLORS = {
  primary: "#1A1A1A",
  secondary: "#F5F5F5",
  accent: "#4A90D9",
} as const;

// --- Cubie geometry ---
export const CUBIE_SIZE = 1;
export const CUBIE_GAP = 0.08;
export const CUBIE_BEVEL = 0.05;
export const CUBIE_STEP = CUBIE_SIZE + CUBIE_GAP; // 1.08

// --- Cube assembly (3×3×3) ---
export const CUBE_DIM = 3;
export const TOTAL_CUBIES = 27;
// offset so the cube is centered at origin
const HALF = ((CUBE_DIM - 1) * CUBIE_STEP) / 2; // 1.08

/** Returns the world-space center for cubie at (x, y, z) each in 0..2 */
export function cubiePosition(
  x: number,
  y: number,
  z: number,
): [number, number, number] {
  return [x * CUBIE_STEP - HALF, y * CUBIE_STEP - HALF, z * CUBIE_STEP - HALF];
}

// All 27 slot positions – indexed 0..26
// Layer layout (from spec §5.3):
//   Layer 1 (top, y=2):  slots 0-8  (labeled 1-9)
//   Layer 2 (mid, y=1):  slots 9-17 (labeled 10-18)
//   Layer 3 (bot, y=0):  slots 18-26(labeled 19-27)
// Within each layer: row-major (z desc, x asc)
export const CUBE_SLOTS: [number, number, number][] = [];
for (let layer = 0; layer < 3; layer++) {
  const y = 2 - layer; // top=2, mid=1, bot=0
  for (let row = 0; row < 3; row++) {
    const z = 2 - row;
    for (let col = 0; col < 3; col++) {
      const x = col;
      CUBE_SLOTS.push(cubiePosition(x, y, z));
    }
  }
}

// Assembly order from spec §5.3 (1-indexed labels → 0-indexed)
export const ASSEMBLY_ORDER = [
  5, 4, 6, 7, 9, 10, 1, 2, 3, 15, 12, 8, 14, 11, 13, 16, 18, 17, 27, 19, 25,
  20, 21, 22, 24, 26, 23,
].map((n) => n - 1);

// --- Block plane (5×6 grid) ---
export const PLANE_COLS = 5;
export const PLANE_ROWS = 6;
export const PLANE_TOTAL = PLANE_COLS * PLANE_ROWS; // 30
export const PLANE_Y_OFFSET = -5.5; // below cube center

export function planeBlockPosition(
  col: number,
  row: number,
): [number, number, number] {
  const halfW = ((PLANE_COLS - 1) * CUBIE_STEP) / 2;
  const halfH = ((PLANE_ROWS - 1) * CUBIE_STEP) / 2;
  return [
    col * CUBIE_STEP - halfW,
    PLANE_Y_OFFSET,
    row * CUBIE_STEP - halfH,
  ];
}

// --- Timing (seconds) ---
export const TIMING = {
  phase1Duration: 1.0,
  blockInterval: 0.25,
  extractHighlight: 0.15,
  extractRise: 0.2,
  colorFade: 0.15,
  flightDuration: 0.45,
  landBounce: 0.1,
  refillDelay: 0.3,
  refillDuration: 0.4,
  completionGlow: 0.8,
  planeExit: 0.7,
  idleRotationPeriod: 8,
} as const;

// --- Bezier arc helpers ---
export function createFlightCurve(
  start: THREE.Vector3,
  end: THREE.Vector3,
  randomOffset: number,
): THREE.CubicBezierCurve3 {
  const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
  const arcHeight = 2.5 + randomOffset; // ±0.5 random
  mid.y += arcHeight;

  const cp1 = new THREE.Vector3().lerpVectors(start, mid, 0.66);
  cp1.y = mid.y * 0.8;
  const cp2 = new THREE.Vector3().lerpVectors(mid, end, 0.33);
  cp2.y = mid.y * 0.6;

  return new THREE.CubicBezierCurve3(start, cp1, cp2, end);
}
