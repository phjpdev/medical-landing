import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { UPLOADS_DIR } from "@/lib/contentStore";

export const runtime = "nodejs";

// Streams an uploaded image from data/uploads/photos/{filename}.
// Why a route handler instead of Next.js's static `public/` serving?
// → On `next start` / standalone deployments (e.g. Hostinger VPS), Next.js
//   only serves files that existed in `public/` at build time. Files written
//   to disk at runtime aren't picked up. This handler reads the file on each
//   request, so admin uploads are visible to all visitors immediately.

// Path-traversal & filename validation — only allow plain safe filenames.
const FILENAME_RE = /^[a-zA-Z0-9._-]{1,120}$/;

const EXT_TO_MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ filename: string }> },
) {
  const { filename } = await ctx.params;

  if (!filename || !FILENAME_RE.test(filename)) {
    return new NextResponse("Invalid filename", { status: 400 });
  }

  const full = path.join(UPLOADS_DIR, filename);

  // Resolve and double-check the path is still inside UPLOADS_DIR (defence in depth)
  const resolved = path.resolve(full);
  if (!resolved.startsWith(path.resolve(UPLOADS_DIR) + path.sep)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  let data: Buffer;
  try {
    data = await fs.readFile(resolved);
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }

  const ext = path.extname(filename).toLowerCase();
  const contentType = EXT_TO_MIME[ext] ?? "application/octet-stream";

  return new NextResponse(new Uint8Array(data), {
    headers: {
      "Content-Type": contentType,
      // URLs include ?v=<timestamp>, so different versions are different URLs.
      // Cache aggressively because the URL is effectively a content-addressed key.
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(data.byteLength),
    },
  });
}
