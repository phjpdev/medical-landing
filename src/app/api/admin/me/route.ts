import { NextResponse } from "next/server";
import { isRequestAdmin } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function GET() {
  const isAdmin = await isRequestAdmin();
  return NextResponse.json({ isAdmin });
}
