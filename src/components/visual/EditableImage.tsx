"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { resizeImageToDataUrl } from "@/lib/resizeImage";
import { useIsAdmin } from "@/lib/admin";

// Click-to-upload image with localStorage persistence.
//
// • Admins: full upload flow (click → file picker → resize → save).
// • Visitors: read-only. Sees the photo if one has been saved, else a quiet
//   empty placeholder (no upload prompt).
//
// Resizes the upload before storage to keep localStorage usage reasonable
// (~5–10 MB cap). Multiple <EditableImage> with the same `storageKey` stay in
// sync because they all read from / write to the same key.
export function EditableImage({
  storageKey,
  alt,
  className,
  rounded = "rounded-2xl",
  maxWidth = 900,
  maxHeight = 1200,
}: {
  storageKey: string;
  alt: string;
  className?: string;
  rounded?: string;
  maxWidth?: number;
  maxHeight?: number;
}) {
  const isAdmin = useIsAdmin();
  const [src, setSrc] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setSrc(saved);
    } catch {}
  }, [storageKey]);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const dataUrl = await resizeImageToDataUrl(file, maxWidth, maxHeight);
      localStorage.setItem(storageKey, dataUrl);
      setSrc(dataUrl);
    } catch (err) {
      console.error("[EditableImage] upload failed", err);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  // Visitor (read-only): plain div, no interactivity
  if (!isAdmin) {
    return (
      <div
        className={cn(
          "relative block w-full overflow-hidden bg-white/60 gold-border",
          rounded,
          className,
        )}
        aria-label={alt}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center text-charcoal/25">
            <ImageOff className="h-8 w-8" />
          </div>
        )}
      </div>
    );
  }

  // Admin: full upload UI
  return (
    <button
      type="button"
      onClick={() => fileRef.current?.click()}
      className={cn(
        "group relative block w-full overflow-hidden bg-white/60 gold-border transition-all hover:shadow-gold",
        rounded,
        className,
      )}
      aria-label={`Upload photo for ${alt}`}
      disabled={busy}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="grid h-full w-full place-items-center text-charcoal/40">
          <div className="flex flex-col items-center gap-2 px-3 text-center">
            <ImageOff className="h-8 w-8" />
            <span className="text-[10px] uppercase tracking-[0.18em]">
              Click to upload
            </span>
          </div>
        </div>
      )}

      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink/55 via-ink/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-medium tracking-wide text-charcoal shadow-sm">
          <Camera className="h-3.5 w-3.5" />
          {src ? "Replace photo" : "Upload photo"}
        </span>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={onChange}
        className="sr-only"
      />
    </button>
  );
}
