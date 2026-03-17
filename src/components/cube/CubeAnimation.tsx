"use client";

import {
  Suspense,
  useSyncExternalStore,
  useState,
  useEffect,
  useRef,
} from "react";
import { Canvas } from "@react-three/fiber";
import CubeScene from "./CubeScene";
import BlockStack from "../BlockStack";

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
interface CubeAnimationProps {
  width?: string | number;
  height?: string | number;
  enableParallax?: boolean;
}

export default function CubeAnimation({
  width = "100%",
  height = "100%",
  enableParallax = true,
}: CubeAnimationProps) {
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

  // Fallback: 2D BlockStack
  if (!webglSupported) {
    return (
      <div style={style} className="flex items-center justify-center">
        <BlockStack size={240} />
      </div>
    );
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
          fov: 48,
          position: [0, 3, 12],
          near: 0.1,
          far: 100,
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <CubeScene
            enableParallax={enableParallax}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
