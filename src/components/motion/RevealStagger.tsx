"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealStaggerProps = {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
};

export default function RevealStagger({
  children,
  stagger = 0.12,
  delay = 0,
  y = 24,
  duration = 0.7,
  className = "",
}: RevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = Array.from(el.children);
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay, y, duration, stagger]);

  return (
    <div
      ref={ref}
      className={`[&>*]:opacity-0 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
