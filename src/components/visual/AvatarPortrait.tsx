// Stylised SVG portrait — gold-themed placeholder until real client photos arrive.
// Vary the `seed` 0-2 for three different looks.

export function AvatarPortrait({
  seed = 0,
  size = 96,
  className,
}: {
  seed?: number;
  size?: number;
  className?: string;
}) {
  const id = `av-${seed}`;
  const palettes = [
    { skin: "#e6c79b", hair: "#2c1d10", garment: "#bfa07a" },
    { skin: "#edd0a6", hair: "#3d2614", garment: "#a08766" },
    { skin: "#e9c089", hair: "#1d1208", garment: "#c2a07f" },
  ];
  const p = palettes[seed % palettes.length];

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5E6B8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-border`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5E6B8" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8941F" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <circle cx="60" cy="60" r="56" />
        </clipPath>
      </defs>

      <circle cx="60" cy="60" r="60" fill={`url(#${id}-glow)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <rect width="120" height="120" fill="#FBF6E3" />
        {/* hair back */}
        <ellipse cx="60" cy="46" rx="38" ry="42" fill={p.hair} />
        {/* face */}
        <ellipse cx="60" cy="58" rx="26" ry="32" fill={p.skin} />
        {/* neck */}
        <rect x="50" y="80" width="20" height="20" fill={p.skin} />
        {/* hair front */}
        <path
          d={
            seed === 0
              ? "M 25 50 Q 60 18 95 50 Q 90 38 60 32 Q 30 38 25 50 Z"
              : seed === 1
                ? "M 26 52 Q 50 22 60 24 Q 70 26 96 52 Q 86 36 60 30 Q 35 36 26 52 Z"
                : "M 24 48 Q 48 16 60 22 Q 84 26 96 50 Q 80 30 60 28 Q 38 32 24 48 Z"
          }
          fill={p.hair}
        />
        {/* garment */}
        <path d="M 14 120 Q 60 90 106 120 Z" fill={p.garment} />
        {/* subtle features */}
        <ellipse cx="50" cy="60" rx="2" ry="1.4" fill="#0e0e0e" opacity="0.55" />
        <ellipse cx="70" cy="60" rx="2" ry="1.4" fill="#0e0e0e" opacity="0.55" />
        <path d="M 53 70 Q 60 73 67 70" stroke="#7a4233" strokeWidth="1.4" fill="none" opacity="0.55" strokeLinecap="round" />
      </g>
      <circle
        cx="60"
        cy="60"
        r="58"
        fill="none"
        stroke={`url(#${id}-border)`}
        strokeWidth="2"
      />
    </svg>
  );
}
