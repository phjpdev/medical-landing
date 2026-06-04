"use client";

import { useRef, useState } from "react";
import { Camera, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { resizeImageToFile } from "@/lib/resizeImage";
import { useContentStore } from "@/components/providers/ContentProvider";

// Click-to-upload image. Reads the current photo URL from the shared content
// store (which mirrors data/content.json on the server).
//
// • Admins: click to upload. The file is POSTed to /api/admin/upload, where
//   the server resizes + saves it under public/uploads/photos/{key}.jpg and
//   updates content.json. All visitors instantly see the new image after their
//   next page load.
// • Visitors: read-only — sees the photo from the server, or a quiet empty
//   placeholder if none has been uploaded yet.
export function EditableImage({
  storageKey,
  alt,
  className,
  rounded = "rounded-2xl",
  defaultSrc,
  objectPosition = "center",
  fit = "cover",
  uploadMaxSize = 1200,
  autoHeight = false,
}: {
  storageKey: string;
  alt: string;
  className?: string;
  rounded?: string;
  /** Shown when no admin upload exists yet */
  defaultSrc?: string;
  objectPosition?: string;
  fit?: "cover" | "contain";
  /** Max width/height when compressing before upload */
  uploadMaxSize?: number;
  /** Size container to the image's natural aspect ratio */
  autoHeight?: boolean;
}) {
  const { content, isAdmin, uploadPhoto } = useContentStore();
  const src = content.photos[storageKey] ?? defaultSrc ?? null;
  const imgStyle = { objectPosition };
  const objectClass = fit === "contain" ? "object-contain" : "object-cover";
  const imgClass = autoHeight
    ? "block h-auto w-full"
    : cn("h-full w-full", objectClass);
  const emptyClass = autoHeight ? "min-h-32" : "h-full w-full";
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const compressed = await resizeImageToFile(file, uploadMaxSize, uploadMaxSize);
      await uploadPhoto(storageKey, compressed);
    } catch (err) {
      console.error("[EditableImage] upload failed", err);
      setError(err instanceof Error ? err.message : "Upload failed");
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
          <img src={src} alt={alt} className={imgClass} style={autoHeight ? undefined : imgStyle} />
        ) : (
          <div className={cn("grid place-items-center text-charcoal/25", emptyClass)}>
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
        <img src={src} alt={alt} className={imgClass} style={autoHeight ? undefined : imgStyle} />
      ) : (
        <div className={cn("grid place-items-center text-charcoal/40", emptyClass)}>
          <div className="flex flex-col items-center gap-2 px-3 text-center">
            <ImageOff className="h-8 w-8" />
            <span className="text-[10px] uppercase tracking-[0.18em]">
              {busy ? "Uploading…" : "Click to upload"}
            </span>
          </div>
        </div>
      )}

      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink/55 via-ink/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-medium tracking-wide text-charcoal shadow-sm">
          <Camera className="h-3.5 w-3.5" />
          {busy ? "Uploading…" : src ? "Replace photo" : "Upload photo"}
        </span>
      </div>

      {error && (
        <p className="pointer-events-none absolute inset-x-2 bottom-2 rounded-lg bg-destructive/90 px-2 py-1 text-[10px] text-white">
          {error}
        </p>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/*"
        onChange={onChange}
        className="sr-only"
      />
    </button>
  );
}
