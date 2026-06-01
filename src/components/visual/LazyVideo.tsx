"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type LazyVideoProps = {
  src: string;
  className?: string;
  ariaLabel: string;
};

// Plays only while visible and the tab is active — cuts idle CPU from decoding.
export function LazyVideo({ src, className, ariaLabel }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let inViewport = false;

    const syncPlayback = () => {
      if (inViewport && !document.hidden) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.12, rootMargin: "80px" },
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      className={cn("block h-auto w-full", className)}
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={ariaLabel}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
