"use client";

import { useEffect, useRef, useState } from "react";

export function FixedVideoBackground({
  mobileSrc = "/0525.mp4",
  desktopSrc = "/treeelink.mp4",
}: {
  mobileSrc?: string;
  desktopSrc?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    const pick = () => setSrc(mq.matches ? desktopSrc : mobileSrc);
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, [mobileSrc, desktopSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let playing = true;

    const sync = () => {
      if (playing && !document.hidden) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const onVisibility = () => sync();
    document.addEventListener("visibilitychange", onVisibility);
    sync();

    return () => {
      playing = false;
      document.removeEventListener("visibilitychange", onVisibility);
      video.pause();
    };
  }, [src]);

  if (!mounted || !src) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 top-24 z-0 lg:top-28"
      aria-hidden
    >
      <video
        ref={videoRef}
        key={src}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
      </video>

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
