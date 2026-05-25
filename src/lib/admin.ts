"use client";

import { useEffect, useState } from "react";

// NOTE: This is client-side gating only — anyone inspecting the JS bundle can
// see the credentials. It exists to hide the in-place edit UI from regular
// visitors. For true authentication you'd wire this through a backend.

export const ADMIN_USERNAME = "iminfinity";
export const ADMIN_PASSWORD = "@@iminfinity";

const SESSION_KEY = "im-admin-session";
const SESSION_EVENT = "im-admin-session-change";

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function setAdminSession(loggedIn: boolean) {
  if (typeof window === "undefined") return;
  try {
    if (loggedIn) localStorage.setItem(SESSION_KEY, "1");
    else localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event(SESSION_EVENT));
  } catch {}
}

export function validateCredentials(username: string, password: string): boolean {
  return username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

// React hook — components re-render when the admin session changes.
export function useIsAdmin(): boolean {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const sync = () => setIsAdmin(isAdminLoggedIn());
    sync();
    window.addEventListener(SESSION_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SESSION_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return isAdmin;
}
