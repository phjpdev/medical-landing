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

import type { CasePost } from "@/lib/contentStore";

export type Content = {
  text: Record<string, string>;
  photos: Record<string, string>;
  casePosts: CasePost[];
};

type ContentContextValue = {
  content: Content;
  isAdmin: boolean;
  refresh: () => Promise<void>;
  saveText: (key: string, value: string) => Promise<void>;
  uploadPhoto: (key: string, file: File) => Promise<void>;
  publishCasePost: (file: File, caption: string) => Promise<void>;
  deleteCasePost: (id: string) => Promise<void>;
  login: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const EMPTY: Content = { text: {}, photos: {}, casePosts: [] };

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
        setContent({
          text: data.text ?? {},
          photos: data.photos ?? {},
          casePosts: data.casePosts ?? [],
        });
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
    setContent({
      text: next.text ?? {},
      photos: next.photos ?? {},
      casePosts: next.casePosts ?? [],
    });
  }, []);

  const uploadPhoto = useCallback(async (key: string, file: File) => {
    const form = new FormData();
    form.set("key", key);
    form.set("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: form,
    });
    if (!res.ok) {
      let message = `Upload failed (${res.status})`;
      try {
        const j = (await res.json()) as { error?: string };
        if (j.error) message = j.error;
      } catch {
        if (res.status === 413) {
          message = "Image is too large. Try a smaller file or another format.";
        }
      }
      throw new Error(message);
    }
    const next = (await res.json()) as Content;
    setContent({
      text: next.text ?? {},
      photos: next.photos ?? {},
      casePosts: next.casePosts ?? [],
    });
  }, []);

  const publishCasePost = useCallback(async (file: File, caption: string) => {
    const form = new FormData();
    form.set("file", file);
    form.set("caption", caption);
    const res = await fetch("/api/admin/case-post", { method: "POST", body: form });
    if (!res.ok) {
      let message = `Publish failed (${res.status})`;
      try {
        const j = (await res.json()) as { error?: string };
        if (j.error) message = j.error;
      } catch {
        if (res.status === 413) message = "Image is too large. Try a smaller file.";
      }
      throw new Error(message);
    }
    const next = (await res.json()) as Content;
    setContent({
      text: next.text ?? {},
      photos: next.photos ?? {},
      casePosts: next.casePosts ?? [],
    });
  }, []);

  const deleteCasePost = useCallback(async (id: string) => {
    const res = await fetch("/api/admin/case-post", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error(`Delete failed (${res.status})`);
    const next = (await res.json()) as Content;
    setContent({
      text: next.text ?? {},
      photos: next.photos ?? {},
      casePosts: next.casePosts ?? [],
    });
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
    () => ({
      content,
      isAdmin,
      refresh,
      saveText,
      uploadPhoto,
      publishCasePost,
      deleteCasePost,
      login,
      logout,
    }),
    [content, isAdmin, refresh, saveText, uploadPhoto, publishCasePost, deleteCasePost, login, logout],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}
