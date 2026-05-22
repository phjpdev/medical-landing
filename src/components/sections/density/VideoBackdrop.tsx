import { ReactNode } from "react";

// Wraps any number of sections in a continuous video background.
//
// When `dodgeNavbar` is true (default, for top-of-page use), the video starts
// below the navbar height so it doesn't bleed into the fixed nav. When false
// (mid-page use), the video fills the wrapper edge-to-edge.
export function VideoBackdrop({
  children,
  src = "/treeelink.mp4",
  dodgeNavbar = true,
}: {
  children: ReactNode;
  src?: string;
  dodgeNavbar?: boolean;
}) {
  const topClasses = dodgeNavbar ? "top-20 lg:top-24" : "top-0";
  const heightClasses = dodgeNavbar
    ? "h-[calc(100%-5rem)] lg:h-[calc(100%-6rem)]"
    : "h-full";

  return (
    <div className="relative">
      {/* Solid cream strip behind the fixed navbar — only used at the top of the page */}
      {dodgeNavbar && (
        <div className="absolute inset-x-0 top-0 z-0 h-20 bg-cream lg:h-24" />
      )}

      {/* Background video */}
      <video
        className={`absolute inset-x-0 bottom-0 z-0 w-full object-cover ${topClasses} ${heightClasses}`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Cream/gold tint — lighter on mobile, heavier on desktop for legibility */}
      <div
        className={`absolute inset-x-0 bottom-0 z-0 lg:hidden ${topClasses} ${heightClasses}`}
        style={{
          background:
            "linear-gradient(180deg, rgba(251,246,227,0.45) 0%, rgba(245,230,184,0.30) 50%, rgba(250,246,236,0.45) 100%)",
        }}
      />
      <div
        className={`absolute inset-x-0 bottom-0 z-0 hidden lg:block ${topClasses} ${heightClasses}`}
        style={{
          background:
            "linear-gradient(180deg, rgba(251,246,227,0.68) 0%, rgba(245,230,184,0.50) 35%, rgba(250,246,236,0.62) 70%, rgba(245,239,224,0.72) 100%)",
        }}
      />

      {/* Children render above the video + overlay */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
