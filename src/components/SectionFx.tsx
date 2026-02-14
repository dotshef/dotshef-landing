"use client";

import { useEffect, useRef, useState } from "react";

interface SectionFxProps {
  variant: "yellow" | "black";
}

export default function SectionFx({ variant }: SectionFxProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dotColor = variant === "yellow" ? "#000000" : "#FFD600";
  const dotOpacity = 0.07;
  const shadowOpacity = 0.04;
  const filterId = `wave-${variant}`;
  const patternId = `dots-${variant}`;
  const shadowPatternId = `dots-shadow-${variant}`;

  const isSection1 = variant === "yellow";
  const baseFreq = isSection1 ? "0.012 0.015" : "0.018 0.01";
  const scale = isSection1 ? "8" : "12";
  const seed = isSection1 ? "1" : "5";
  const animDur = isSection1 ? "12s" : "8s";
  const scaleFrom = isSection1 ? "6" : "10";
  const scaleTo = isSection1 ? "10" : "15";

  return (
    <svg
      ref={ref}
      className="section-fx pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
      style={{ perspective: isSection1 ? "800px" : "600px" }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="turbulence"
            baseFrequency={baseFreq}
            numOctaves="2"
            seed={seed}
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          >
            {!prefersReducedMotion && isVisible && (
              <animate
                attributeName="scale"
                values={`${scaleFrom};${scaleTo};${scaleFrom}`}
                dur={animDur}
                repeatCount="indefinite"
              />
            )}
          </feDisplacementMap>
        </filter>

        <pattern
          id={patternId}
          x="0"
          y="0"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="12" cy="12" r="1.5" fill={dotColor} opacity={dotOpacity} />
        </pattern>

        <pattern
          id={shadowPatternId}
          x="1.5"
          y="1.5"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="12"
            cy="12"
            r="1.5"
            fill={dotColor}
            opacity={shadowOpacity}
          />
        </pattern>
      </defs>

      <g
        filter={`url(#${filterId})`}
        style={{
          transform: isSection1
            ? "rotateX(2deg)"
            : "rotateX(-1deg) rotateY(1deg)",
        }}
      >
        <rect width="100%" height="100%" fill={`url(#${shadowPatternId})`} />
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </g>
    </svg>
  );
}
