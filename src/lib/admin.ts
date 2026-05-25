"use client";

// Thin client-side wrapper around the ContentProvider so the old
// `useIsAdmin()` / `setAdminSession()` import paths keep working.
//
// Auth state now lives server-side (HTTP-only signed cookie); this hook just
// reflects what the server reports.

import { useContentStore } from "@/components/providers/ContentProvider";

export function useIsAdmin(): boolean {
  return useContentStore().isAdmin;
}

export function useLogin() {
  return useContentStore().login;
}

export function useLogout() {
  return useContentStore().logout;
}
