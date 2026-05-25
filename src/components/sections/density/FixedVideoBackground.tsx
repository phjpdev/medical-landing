"use client";

import { useEffect, useState } from "react";

// Full-viewport fixed video. Sits behind every section of the DENSITY page —
// the video stays pinned to the screen while content scrolls over it. Mobile
// and desktop play different clips at native aspect ratios.
//
// The element is `position: fixed` with `top` offset below the navbar so the
// nav strip stays clean, and `bottom: 0` so it fills the rest of the screen.
export function FixedVideoBackground({
  mobileSrc = "/0525.mp4",
  desktopSrc = "/treeelink.mp4",
}: {
  mobileSrc?: string;
  desktopSrc?: string;
}) {
  // Avoid SSR mismatch — only mount on the client
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 top-24 z-0 lg:top-28"
      aria-hidden
    >
      {/* Mobile video */}
      <video
        className="absolute inset-0 h-full w-full object-cover lg:hidden"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={mobileSrc} type="video/mp4" />
      </video>

      {/* Desktop video */}
      <video
        className="absolute inset-0 hidden h-full w-full object-cover lg:block"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={desktopSrc} type="video/mp4" />
      </video>

      {/* Cream/gold tint — lighter on mobile, heavier on desktop for legibility */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(251,246,227,0.42) 0%, rgba(245,230,184,0.28) 50%, rgba(250,246,236,0.42) 100%)",
        }}
      />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(180deg, rgba(251,246,227,0.62) 0%, rgba(245,230,184,0.45) 35%, rgba(250,246,236,0.55) 70%, rgba(245,239,224,0.65) 100%)",
        }}
      />
    </div>
  );
}
