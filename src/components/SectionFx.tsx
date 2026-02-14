interface SectionFxProps {
  variant: "yellow" | "black";
}

export default function SectionFx({ variant }: SectionFxProps) {
  const dotColor = variant === "yellow" ? "#000000" : "#FFD600";
  const dotOpacity = 0.07;
  const shadowOpacity = 0.04;
  const patternId = `dots-${variant}`;
  const shadowPatternId = `dots-shadow-${variant}`;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
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

      <rect width="100%" height="100%" fill={`url(#${shadowPatternId})`} />
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
