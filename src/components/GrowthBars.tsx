"use client";

import React, { useEffect, useSyncExternalStore, useState } from "react";

type Props = {
  width?: number | string;
  height?: number | string;
  color?: string;
  heights?: number[];
  growMs?: number;
  staggerMs?: number;
  holdMs?: number;
  pauseMs?: number;
};

type Phase = "growing" | "holding" | "hidden";

const mqSubscribe = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const mqSnapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const mqServerSnapshot = () => false;

export default function GrowthBars({
  width = 280,
  height = 200,
  color = "var(--color-brand-yellow)",
  heights = [0.25, 0.35, 0.55, 0.72, 0.92],
  growMs = 600,
  staggerMs = 140,
  holdMs = 1100,
  pauseMs = 600,
}: Props) {
  const reducedMotion = useSyncExternalStore(
    mqSubscribe,
    mqSnapshot,
    mqServerSnapshot
  );
  const [phase, setPhase] = useState<Phase>("growing");
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "growing") {
      if (visibleCount < heights.length) {
        timeout = setTimeout(() => setVisibleCount((v) => v + 1), staggerMs);
      } else {
        timeout = setTimeout(() => setPhase("holding"), 0);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("hidden"), holdMs);
    } else {
      timeout = setTimeout(() => {
        setVisibleCount(0);
        setPhase("growing");
      }, pauseMs);
    }

    return () => clearTimeout(timeout);
  }, [phase, visibleCount, heights.length, staggerMs, holdMs, pauseMs, reducedMotion]);

  const cssWidth = typeof width === "number" ? `${width}px` : width;
  const cssHeight = typeof height === "number" ? `${height}px` : height;

  const isUp = phase === "growing" || phase === "holding";

  return (
    <div
      className="flex items-end justify-center gap-3"
      style={{ width: cssWidth, height: cssHeight }}
      aria-hidden="true"
    >
      {heights.map((h, i) => {
        const show = reducedMotion || (isUp && i < visibleCount);

        return (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              backgroundColor: color,
              height: `${h * 100}%`,
              transformOrigin: "bottom",
              transform: show ? "scaleY(1)" : "scaleY(0.02)",
              transition: show
                ? `transform ${growMs}ms cubic-bezier(0.34, 1.56, 0.64, 1)`
                : "none",
            }}
          />
        );
      })}
    </div>
  );
}
