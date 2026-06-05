import { promises as fs } from "node:fs";
import path from "node:path";

export type CasePost = {
  id: string;
  caption: string;
  photoKey: string;
  createdAt: string;
};

export type ContentShape = {
  version: 1;
  text: Record<string, string>;
  photos: Record<string, string>;
  casePosts?: CasePost[];
};

const ROOT = process.cwd();
export const DATA_DIR = path.join(ROOT, "data");
export const CONTENT_FILE = path.join(DATA_DIR, "content.json");
export const UPLOADS_DIR = path.join(DATA_DIR, "uploads", "photos");
export const UPLOADS_PUBLIC_PATH = "/api/uploads";

const EMPTY: ContentShape = { version: 1, text: {}, photos: {}, casePosts: [] };

async function ensureDirs() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

let cache: ContentShape | null = null;

function normalizeContent(parsed: ContentShape): ContentShape {
  return {
    version: 1,
    text: parsed.text ?? {},
    photos: parsed.photos ?? {},
    casePosts: parsed.casePosts ?? [],
  };
}

export async function readContent(): Promise<ContentShape> {
  if (cache) return cache;
  await ensureDirs();
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    cache = normalizeContent(JSON.parse(raw) as ContentShape);
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
  return writeContent({
    ...current,
    text: { ...current.text, [key]: value },
  });
}

export async function setPhoto(key: string, publicUrl: string): Promise<ContentShape> {
  const current = await readContent();
  return writeContent({
    ...current,
    photos: { ...current.photos, [key]: publicUrl },
  });
}

export async function addCasePost(
  caption: string,
  photoKey: string,
): Promise<ContentShape> {
  const current = await readContent();
  const post: CasePost = {
    id: String(Date.now()),
    caption: caption.trim(),
    photoKey,
    createdAt: new Date().toISOString(),
  };
  return writeContent({
    ...current,
    casePosts: [post, ...(current.casePosts ?? [])],
  });
}

export async function updateCasePost(
  id: string,
  updates: { caption?: string; createdAt?: string },
): Promise<ContentShape> {
  const current = await readContent();
  const posts = current.casePosts ?? [];
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) {
    throw new Error("Case post not found");
  }
  const post = posts[idx];
  const updated: CasePost = {
    ...post,
    ...(updates.caption !== undefined && { caption: updates.caption.trim() }),
    ...(updates.createdAt !== undefined && { createdAt: updates.createdAt }),
  };
  const nextPosts = [...posts];
  nextPosts[idx] = updated;
  return writeContent({ ...current, casePosts: nextPosts });
}

export async function removeCasePost(id: string): Promise<ContentShape> {
  const current = await readContent();
  const post = (current.casePosts ?? []).find((p) => p.id === id);
  const nextPosts = (current.casePosts ?? []).filter((p) => p.id !== id);
  const nextPhotos = { ...current.photos };
  if (post) {
    delete nextPhotos[post.photoKey];
    try {
      await fs.unlink(path.join(UPLOADS_DIR, `${sanitizeKey(post.photoKey)}.jpg`));
    } catch {
      // file may already be missing
    }
  }
  return writeContent({ ...current, casePosts: nextPosts, photos: nextPhotos });
}

export function sanitizeKey(key: string): string {
  return key.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
}
