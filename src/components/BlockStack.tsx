"use client";

import React, { useEffect, useSyncExternalStore, useState } from "react";

type Props = {
  size?: number | string;
  color?: string;
  radius?: number;
  dropMs?: number;
  staggerMs?: number;
  holdMs?: number;
  pauseMs?: number;
};

type Phase = "stacking" | "holding" | "hidden";

const mqSubscribe = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const mqSnapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const mqServerSnapshot = () => false;

// 쌓이는 순서: 아래 행부터, 왼쪽부터 (row 2→0, col 0→2)
const ORDER: Array<{ r: number; c: number }> = [];
for (let r = 2; r >= 0; r--) {
  for (let c = 0; c < 3; c++) {
    ORDER.push({ r, c });
  }
}

export default function BlockStack({
  size = 96,
  color = "var(--color-brand-black)",
  radius = 4,
  dropMs = 350,
  staggerMs = 100,
  holdMs = 2000,
  pauseMs = 500,
}: Props) {
  const reducedMotion = useSyncExternalStore(
    mqSubscribe,
    mqSnapshot,
    mqServerSnapshot
  );
  const [phase, setPhase] = useState<Phase>("stacking");
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "stacking") {
      if (visibleCount < ORDER.length) {
        timeout = setTimeout(() => setVisibleCount((v) => v + 1), staggerMs);
      } else {
        timeout = setTimeout(() => setPhase("holding"), 0);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("hidden"), holdMs);
    } else {
      timeout = setTimeout(() => {
        setVisibleCount(0);
        setPhase("stacking");
      }, pauseMs);
    }

    return () => clearTimeout(timeout);
  }, [phase, visibleCount, staggerMs, holdMs, pauseMs, reducedMotion]);

  const cssSize = typeof size === "number" ? `${size}px` : size;
  const isUp = phase === "stacking" || phase === "holding";

  return (
    <div style={{ width: cssSize, height: cssSize }} aria-hidden="true">
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {ORDER.map(({ r, c }, i) => {
          const show = reducedMotion || (isUp && i < visibleCount);

          return (
            <rect
              key={i}
              x={10 + c * 26}
              y={10 + r * 26}
              width="22"
              height="22"
              rx={radius}
              fill={color}
              style={{
                transformBox: "fill-box" as const,
                transformOrigin: "center bottom",
                opacity: show ? 1 : 0,
                transform: show ? "translateY(0)" : "translateY(-30px)",
                transition: show
                  ? `transform ${dropMs}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${dropMs * 0.4}ms ease`
                  : "none",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
