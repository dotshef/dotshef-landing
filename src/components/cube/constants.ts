import * as THREE from "three";

// --- Colors ---
export const COLORS = {
  primary: "#A0A0A0",
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

// Assembly order: bottom layer → middle → top (block stacking)
// Layer 3 (bot, y=0): slots 18-26, Layer 2 (mid, y=1): slots 9-17, Layer 1 (top, y=2): slots 0-8
// Within each layer: slightly shuffled for natural feel
export const ASSEMBLY_ORDER = [
  // Bottom layer (y=0)
  22, 19, 25, 20, 24, 26, 21, 23, 18,
  // Middle layer (y=1)
  13, 10, 16, 11, 17, 15, 12, 14, 9,
  // Top layer (y=2)
  4, 1, 7, 2, 8, 6, 3, 5, 0,
];

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
  phase1Duration: 1.2,
  blockInterval: 0.18,
  extractHighlight: 0.12,
  extractRise: 0.25,
  colorFade: 0.2,
  flightDuration: 1.0,
  landBounce: 0.15,
  refillDelay: 0.4,
  refillDuration: 0.5,
  completionGlow: 1.0,
  planeExit: 0.9,
  idleRotationPeriod: 10,
} as const;

// --- Bezier arc helpers ---
export function createFlightCurve(
  start: THREE.Vector3,
  end: THREE.Vector3,
  randomOffset: number,
): THREE.CubicBezierCurve3 {
  // Arc upward from below for a natural bounce-up feel
  const cp1 = new THREE.Vector3().lerpVectors(start, end, 0.33);
  cp1.y += 0.5 + randomOffset * 0.3;

  const cp2 = new THREE.Vector3().lerpVectors(start, end, 0.66);
  cp2.y += 0.3 + randomOffset * 0.2;

  return new THREE.CubicBezierCurve3(start, cp1, cp2, end);
}
