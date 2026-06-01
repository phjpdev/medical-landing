import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { isRequestAdmin } from "@/lib/adminAuth";
import {
  sanitizeKey,
  setPhoto,
  UPLOADS_DIR,
  UPLOADS_PUBLIC_PATH,
} from "@/lib/contentStore";

export const runtime = "nodejs";

const MAX_BYTES = 12 * 1024 * 1024; // safety cap after client-side compression
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 1600;
const JPEG_QUALITY = 86;

export async function POST(req: Request) {
  if (!(await isRequestAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  const rawKey = form.get("key");
  const file = form.get("file");
  if (typeof rawKey !== "string" || !rawKey.trim()) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large. Please use an image under 12 MB." },
      { status: 413 },
    );
  }

  const key = sanitizeKey(rawKey.trim());
  if (!key) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Resize + convert to JPEG (consistent size + quality across all uploads)
  let processed: Buffer;
  try {
    processed = await sharp(buffer)
      .rotate() // honour EXIF orientation
      .resize(MAX_WIDTH, MAX_HEIGHT, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();
  } catch (err) {
    console.error("[upload] sharp processing failed", err);
    return NextResponse.json({ error: "Could not process image" }, { status: 422 });
  }

  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  const filename = `${key}.jpg`;
  const fullPath = path.join(UPLOADS_DIR, filename);
  await fs.writeFile(fullPath, processed);

  // Cache-busting query so browsers fetch the new image after re-upload
  const publicUrl = `${UPLOADS_PUBLIC_PATH}/${filename}?v=${Date.now()}`;
  const next = await setPhoto(key, publicUrl);
  return NextResponse.json(next);
}
