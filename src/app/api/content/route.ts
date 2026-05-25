import { NextResponse } from "next/server";
import { readContent } from "@/lib/contentStore";

export const runtime = "nodejs";

// Public endpoint — returns the current text + photo overrides for the whole site.
export async function GET() {
  const content = await readContent();
  const res = NextResponse.json(content);
  // Allow brief edge caching but always revalidate
  res.headers.set("Cache-Control", "no-store");
  return res;
}
