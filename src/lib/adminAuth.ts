import crypto from "node:crypto";
import { cookies } from "next/headers";

// Server-side admin auth. Signed HTTP-only cookie that visitors can't fake by
// editing JS. The cookie value is `<timestamp>.<hmac>` where the hmac is
// HMAC-SHA256 of the timestamp using ADMIN_SECRET.

export const ADMIN_USERNAME = "iminfinity";
export const ADMIN_PASSWORD = "@@iminfinity";

export const COOKIE_NAME = "im_admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const s = process.env.ADMIN_SECRET;
  if (s && s.length >= 16) return s;
  // Dev fallback — works locally; for production set ADMIN_SECRET in .env.
  if (process.env.NODE_ENV === "production") {
    console.warn(
      "[adminAuth] ADMIN_SECRET is not set or too short — using insecure fallback. Set ADMIN_SECRET in your environment.",
    );
  }
  return "im-infinity-dev-secret-please-override-in-production";
}

function sign(value: string): string {
  const secret = getSecret();
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export function issueSessionCookie() {
  const ts = Date.now().toString();
  const sig = sign(ts);
  return {
    name: COOKIE_NAME,
    value: `${ts}.${sig}`,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: MAX_AGE_SECONDS,
    },
  };
}

export function clearSessionCookie() {
  return {
    name: COOKIE_NAME,
    value: "",
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: 0,
    },
  };
}

export function verifySessionCookieValue(value: string | undefined): boolean {
  if (!value) return false;
  const dot = value.indexOf(".");
  if (dot < 0) return false;
  const ts = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  if (!/^\d+$/.test(ts) || !/^[0-9a-f]+$/i.test(sig)) return false;
  // expiry
  const ageMs = Date.now() - parseInt(ts, 10);
  if (ageMs < 0 || ageMs > MAX_AGE_SECONDS * 1000) return false;
  // hmac
  const expected = sign(ts);
  const a = Buffer.from(sig, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function isRequestAdmin(): Promise<boolean> {
  const c = await cookies();
  const value = c.get(COOKIE_NAME)?.value;
  return verifySessionCookieValue(value);
}

export function validateCredentials(username: string, password: string): boolean {
  return username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}
