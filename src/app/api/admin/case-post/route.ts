import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { isRequestAdmin } from "@/lib/adminAuth";
import {
  addCasePost,
  readContent,
  removeCasePost,
  sanitizeKey,
  setPhoto,
  updateCasePost,
  UPLOADS_DIR,
  UPLOADS_PUBLIC_PATH,
} from "@/lib/contentStore";

export const runtime = "nodejs";

const MAX_BYTES = 12 * 1024 * 1024;
const MAX_SIZE = 1200;
const JPEG_QUALITY = 86;

async function saveCasePhoto(key: string, file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const processed = await sharp(buffer)
    .rotate()
    .resize(MAX_SIZE, MAX_SIZE, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();

  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  const filename = `${sanitizeKey(key)}.jpg`;
  await fs.writeFile(path.join(UPLOADS_DIR, filename), processed);
  const publicUrl = `${UPLOADS_PUBLIC_PATH}/${filename}?v=${Date.now()}`;
  await setPhoto(key, publicUrl);
  return publicUrl;
}

export async function POST(req: Request) {
  if (!(await isRequestAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  const caption = form.get("caption");
  const file = form.get("file");
  if (typeof caption !== "string" || !caption.trim()) {
    return NextResponse.json({ error: "Caption is required" }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Image is required" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large. Please use an image under 12 MB." },
      { status: 413 },
    );
  }

  const id = String(Date.now());
  const photoKey = `case-post-${id}`;

  try {
    await saveCasePhoto(photoKey, file);
    const next = await addCasePost(caption, photoKey);
    return NextResponse.json(next);
  } catch (err) {
    console.error("[case-post] upload failed", err);
    return NextResponse.json({ error: "Could not process image" }, { status: 422 });
  }
}

export async function PATCH(req: Request) {
  if (!(await isRequestAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  const id = form.get("id");
  const caption = form.get("caption");
  const createdAt = form.get("createdAt");
  const file = form.get("file");

  if (typeof id !== "string" || !id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  if (typeof caption !== "string" || !caption.trim()) {
    return NextResponse.json({ error: "Caption is required" }, { status: 400 });
  }
  if (typeof createdAt !== "string" || !createdAt) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
  }

  const content = await readContent();
  const post = (content.casePosts ?? []).find((p) => p.id === id);
  if (!post) {
    return NextResponse.json({ error: "Case post not found" }, { status: 404 });
  }

  const parsedDate = new Date(createdAt);
  if (Number.isNaN(parsedDate.getTime())) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "File too large. Please use an image under 12 MB." },
        { status: 413 },
      );
    }
    try {
      await saveCasePhoto(post.photoKey, file);
    } catch (err) {
      console.error("[case-post] photo update failed", err);
      return NextResponse.json({ error: "Could not process image" }, { status: 422 });
    }
  }

  try {
    const next = await updateCasePost(id, {
      caption,
      createdAt: parsedDate.toISOString(),
    });
    return NextResponse.json(next);
  } catch (err) {
    console.error("[case-post] update failed", err);
    return NextResponse.json({ error: "Could not update case post" }, { status: 422 });
  }
}

export async function DELETE(req: Request) {
  if (!(await isRequestAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as { id?: string } | null;
  if (!body?.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const next = await removeCasePost(body.id);
  return NextResponse.json(next);
}
