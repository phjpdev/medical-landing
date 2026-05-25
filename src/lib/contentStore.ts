import { promises as fs } from "node:fs";
import path from "node:path";

// Filesystem-backed content store. Uses two locations on disk:
//   - data/content.json — text edits + photo URL mapping (NOT under /public)
//   - public/uploads/photos/{key}.jpg — uploaded images, served by Next.js
//
// Both are created on first access. On Hostinger VPS the Node process is
// long-lived so these survive between requests / restarts.

export type ContentShape = {
  version: 1;
  text: Record<string, string>;
  photos: Record<string, string>; // storageKey → public URL (with cache-busting query)
};

const ROOT = process.cwd();
export const DATA_DIR = path.join(ROOT, "data");
export const CONTENT_FILE = path.join(DATA_DIR, "content.json");
export const UPLOADS_DIR = path.join(ROOT, "public", "uploads", "photos");
export const UPLOADS_PUBLIC_PATH = "/uploads/photos";

const EMPTY: ContentShape = { version: 1, text: {}, photos: {} };

async function ensureDirs() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

let cache: ContentShape | null = null;

export async function readContent(): Promise<ContentShape> {
  if (cache) return cache;
  await ensureDirs();
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    const parsed = JSON.parse(raw) as ContentShape;
    cache = {
      version: 1,
      text: parsed.text ?? {},
      photos: parsed.photos ?? {},
    };
  } catch {
    cache = { ...EMPTY };
  }
  return cache;
}

async function writeContent(next: ContentShape): Promise<ContentShape> {
  await ensureDirs();
  const tmp = CONTENT_FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(next, null, 2), "utf8");
  await fs.rename(tmp, CONTENT_FILE);
  cache = next;
  return next;
}

export async function setText(key: string, value: string): Promise<ContentShape> {
  const current = await readContent();
  const next: ContentShape = {
    ...current,
    text: { ...current.text, [key]: value },
  };
  return writeContent(next);
}

export async function setPhoto(key: string, publicUrl: string): Promise<ContentShape> {
  const current = await readContent();
  const next: ContentShape = {
    ...current,
    photos: { ...current.photos, [key]: publicUrl },
  };
  return writeContent(next);
}

// Sanitises a storage key to a safe filesystem name.
export function sanitizeKey(key: string): string {
  return key.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
}
