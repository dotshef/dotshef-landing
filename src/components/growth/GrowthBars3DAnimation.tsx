"use client";

import {
  Suspense,
  useSyncExternalStore,
  useState,
  useEffect,
  useRef,
} from "react";
import { Canvas } from "@react-three/fiber";
import GrowthBars3DScene from "./GrowthBars3DScene";

// ─── Reduced motion detection ────────────────────────
const mqSubscribe = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const mqSnapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const mqServerSnapshot = () => false;

// ─── WebGL support detection ─────────────────────────
function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

// ─── Props ───────────────────────────────────────────
interface GrowthBars3DAnimationProps {
  width?: string | number;
  height?: string | number;
}

export default function GrowthBars3DAnimation({
  width = 300,
  height = 220,
}: GrowthBars3DAnimationProps) {
  const reducedMotion = useSyncExternalStore(
    mqSubscribe,
    mqSnapshot,
    mqServerSnapshot,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    setWebglSupported(detectWebGL());
  }, []);

  // Intersection Observer — pause rendering when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  // Fallback: nothing (2D GrowthBars can be used separately)
  if (!webglSupported) {
    return <div style={style} />;
  }

  return (
    <div ref={containerRef} style={style} aria-hidden="true">
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        frameloop={inView ? "always" : "never"}
        camera={{
          fov: 40,
          position: [5, 4.5, 9],
          near: 0.1,
          far: 50,
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <GrowthBars3DScene reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
