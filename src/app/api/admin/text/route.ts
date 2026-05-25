import { NextResponse } from "next/server";
import { isRequestAdmin } from "@/lib/adminAuth";
import { setText } from "@/lib/contentStore";

export const runtime = "nodejs";

const MAX_TEXT_LENGTH = 4000;

export async function POST(req: Request) {
  if (!(await isRequestAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { key?: string; value?: string };
  try {
    body = (await req.json()) as { key?: string; value?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const key = (body.key ?? "").trim();
  const value = body.value ?? "";

  if (!key || key.length > 200) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }
  if (value.length > MAX_TEXT_LENGTH) {
    return NextResponse.json({ error: "Value too long" }, { status: 400 });
  }

  const next = await setText(key, value);
  return NextResponse.json(next);
}
