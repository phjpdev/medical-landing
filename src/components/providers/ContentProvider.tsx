"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

export type Content = {
  text: Record<string, string>;
  photos: Record<string, string>;
};

type ContentContextValue = {
  content: Content;
  isAdmin: boolean;
  refresh: () => Promise<void>;
  saveText: (key: string, value: string) => Promise<void>;
  uploadPhoto: (key: string, file: File) => Promise<void>;
  login: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const EMPTY: Content = { text: {}, photos: {} };

const ContentContext = createContext<ContentContextValue | null>(null);

export function useContentStore(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContentStore must be used inside <ContentProvider>");
  }
  return ctx;
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content>(EMPTY);
  const [isAdmin, setIsAdmin] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const [contentRes, meRes] = await Promise.all([
        fetch("/api/content", { cache: "no-store" }),
        fetch("/api/admin/me", { cache: "no-store" }),
      ]);
      if (contentRes.ok) {
        const data = (await contentRes.json()) as Content;
        setContent({ text: data.text ?? {}, photos: data.photos ?? {} });
      }
      if (meRes.ok) {
        const me = (await meRes.json()) as { isAdmin: boolean };
        setIsAdmin(!!me.isAdmin);
      }
    } catch (err) {
      console.error("[ContentProvider] refresh failed", err);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const saveText = useCallback(async (key: string, value: string) => {
    const res = await fetch("/api/admin/text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    if (!res.ok) throw new Error(`saveText failed (${res.status})`);
    const next = (await res.json()) as Content;
    setContent({ text: next.text ?? {}, photos: next.photos ?? {} });
  }, []);

  const uploadPhoto = useCallback(async (key: string, file: File) => {
    const form = new FormData();
    form.set("key", key);
    form.set("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: form,
    });
    if (!res.ok) throw new Error(`uploadPhoto failed (${res.status})`);
    const next = (await res.json()) as Content;
    setContent({ text: next.text ?? {}, photos: next.photos ?? {} });
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        let error = "Login failed";
        try {
          const j = (await res.json()) as { error?: string };
          if (j.error) error = j.error;
        } catch {}
        return { ok: false, error };
      }
      setIsAdmin(true);
      await refresh();
      return { ok: true };
    },
    [refresh],
  );

  const logout = useCallback(async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAdmin(false);
  }, []);

  const value = useMemo<ContentContextValue>(
    () => ({ content, isAdmin, refresh, saveText, uploadPhoto, login, logout }),
    [content, isAdmin, refresh, saveText, uploadPhoto, login, logout],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}
