"use client";

import { useRef, useState } from "react";
import { Camera, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
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
}: {
  storageKey: string;
  alt: string;
  className?: string;
  rounded?: string;
}) {
  const { content, isAdmin, uploadPhoto } = useContentStore();
  const src = content.photos[storageKey] ?? null;
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      await uploadPhoto(storageKey, file);
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
