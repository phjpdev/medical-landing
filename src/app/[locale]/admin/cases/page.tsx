"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { AlertCircle, ImagePlus, Pencil, Trash2, ShieldCheck } from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";
import { GoldDivider } from "@/components/visual/GoldDivider";
import { useContentStore } from "@/components/providers/ContentProvider";
import { resizeImageToFile } from "@/lib/resizeImage";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import type { CasePost } from "@/lib/contentStore";

function formatDate(iso: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale === "zh" ? "zh-HK" : "en-HK", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function toDatetimeLocal(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function AdminCasesPage() {
  const t = useTranslations("admin.cases");
  const locale = useLocale();
  const router = useRouter();
  const { isAdmin, content, publishCasePost, updateCasePost, deleteCasePost } = useContentStore();
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [editingPost, setEditingPost] = useState<CasePost | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editPreview, setEditPreview] = useState<string | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState<string | null>(null);
  const editFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAdmin) router.replace("/admin");
  }, [isAdmin, router]);

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (!picked) return;
    setFile(picked);
    setPreview(URL.createObjectURL(picked));
    setError(null);
  };

  const onPublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !caption.trim()) {
      setError(t("errors.required"));
      return;
    }
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const compressed = await resizeImageToFile(file, 900, 1200);
      await publishCasePost(compressed, caption.trim());
      setCaption("");
      setFile(null);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
      setSuccess(t("published"));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errors.upload"));
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm(t("confirmDelete"))) return;
    setBusy(true);
    setError(null);
    try {
      await deleteCasePost(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errors.delete"));
    } finally {
      setBusy(false);
    }
  };

  const openEdit = (post: CasePost) => {
    setEditingPost(post);
    setEditCaption(post.caption);
    setEditDate(toDatetimeLocal(post.createdAt));
    setEditPreview(content.photos[post.photoKey] ?? null);
    setEditFile(null);
    setEditError(null);
    setEditSuccess(null);
    if (editFileRef.current) editFileRef.current.value = "";
  };

  const closeEdit = () => {
    if (editFile && editPreview) URL.revokeObjectURL(editPreview);
    setEditingPost(null);
    setEditCaption("");
    setEditDate("");
    setEditPreview(null);
    setEditFile(null);
    setEditError(null);
    setEditSuccess(null);
  };

  const onPickEditFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (!picked) return;
    if (editFile && editPreview) URL.revokeObjectURL(editPreview);
    setEditFile(picked);
    setEditPreview(URL.createObjectURL(picked));
    setEditError(null);
  };

  const onSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !editCaption.trim() || !editDate) {
      setEditError(t("errors.required"));
      return;
    }
    setBusy(true);
    setEditError(null);
    setEditSuccess(null);
    try {
      const compressed = editFile ? await resizeImageToFile(editFile, 900, 1200) : null;
      await updateCasePost(editingPost.id, {
        caption: editCaption.trim(),
        createdAt: new Date(editDate).toISOString(),
        file: compressed,
      });
      setEditSuccess(t("saved"));
      setTimeout(() => closeEdit(), 600);
    } catch (err) {
      setEditError(err instanceof Error ? err.message : t("errors.update"));
    } finally {
      setBusy(false);
    }
  };

  if (!isAdmin) return null;

  const posts = [...(content.casePosts ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <section className="container-narrow py-24">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-gold-deep">
            <ShieldCheck className="h-3.5 w-3.5" />
            Admin
          </span>
          <h1 className="mt-2 font-serif text-3xl font-medium text-charcoal sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-charcoal/70">{t("subtitle")}</p>
        </div>
        <Link
          href="/cases"
          className="inline-flex items-center justify-center rounded-full border border-gold-primary/50 px-5 py-2 text-sm text-gold-deep hover:bg-gold-primary/10"
        >
          {t("viewPublic")}
        </Link>
      </div>

      <div className="gold-glow-card rounded-3xl p-6 sm:p-8">
        <h2 className="font-serif text-xl font-medium text-charcoal">{t("publishTitle")}</h2>
        <GoldDivider className="!justify-start my-4" />
        <form onSubmit={onPublish} className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="case-photo">{t("photoLabel")}</Label>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="relative flex aspect-[3/4] w-full max-w-xs flex-col items-center justify-center overflow-hidden rounded-2xl gold-border bg-cream text-charcoal/50 transition hover:shadow-gold"
            >
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="" className="h-full w-full object-contain" />
              ) : (
                <>
                  <ImagePlus className="mb-2 h-10 w-10" />
                  <span className="text-xs uppercase tracking-[0.18em]">{t("photoHint")}</span>
                </>
              )}
            </button>
            <input
              ref={fileRef}
              id="case-photo"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/*"
              onChange={onPickFile}
              className="sr-only"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="case-caption">{t("captionLabel")}</Label>
            <Textarea
              id="case-caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder={t("captionPlaceholder")}
              rows={3}
              required
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <p className="rounded-xl border border-gold-primary/30 bg-gold-primary/10 px-4 py-3 text-sm text-gold-deep">
              {success}
            </p>
          )}

          <button type="submit" disabled={busy} className="btn-gold w-full justify-center sm:w-auto">
            {busy ? t("publishing") : t("publish")}
          </button>
        </form>
      </div>

      <div className="mt-12">
        <h2 className="font-serif text-2xl font-medium text-charcoal">{t("listTitle")}</h2>
        <p className="mt-1 text-sm text-charcoal/60">{t("listHint")}</p>

        {posts.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-gold-primary/30 px-6 py-10 text-center text-sm text-charcoal/55">
            {t("noPosts")}
          </p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {posts.map((post) => {
              const src = content.photos[post.photoKey];
              return (
                <li
                  key={post.id}
                  className="flex gap-4 rounded-2xl gold-border bg-white/90 p-4 shadow-soft"
                >
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-cream gold-border">
                    {src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt="" className="h-full w-full object-contain" />
                    ) : null}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <time className="text-[10px] uppercase tracking-[0.18em] text-gold-deep">
                      {formatDate(post.createdAt, locale)}
                    </time>
                    <p className="mt-1 line-clamp-3 text-sm text-charcoal">{post.caption}</p>
                    <div className="mt-auto flex items-center gap-4 pt-3">
                      <button
                        type="button"
                        onClick={() => void onDelete(post.id)}
                        disabled={busy}
                        className="inline-flex items-center gap-1 text-xs text-destructive hover:underline disabled:opacity-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {t("delete")}
                      </button>
                      <button
                        type="button"
                        onClick={() => openEdit(post)}
                        disabled={busy}
                        className="inline-flex items-center gap-1 text-xs text-gold-deep hover:underline disabled:opacity-50"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        {t("edit")}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <Sheet open={editingPost !== null} onOpenChange={(open) => !open && closeEdit()}>
        <SheetContent side="right" className="overflow-y-auto sm:max-w-md">
          <SheetTitle>{t("editTitle")}</SheetTitle>
          <form onSubmit={onSaveEdit} className="mt-6 grid gap-5">
            <div className="grid gap-2">
              <Label>{t("photoLabel")}</Label>
              <button
                type="button"
                onClick={() => editFileRef.current?.click()}
                className="relative flex aspect-[3/4] w-full max-w-xs flex-col items-center justify-center overflow-hidden rounded-2xl border border-gold-primary/30 bg-cream/10 text-cream/60 transition hover:border-gold-primary/50"
              >
                {editPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={editPreview} alt="" className="h-full w-full object-contain" />
                ) : (
                  <>
                    <ImagePlus className="mb-2 h-10 w-10" />
                    <span className="text-xs uppercase tracking-[0.18em]">{t("photoHint")}</span>
                  </>
                )}
              </button>
              <p className="text-xs text-cream/50">{t("photoReplaceHint")}</p>
              <input
                ref={editFileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/*"
                onChange={onPickEditFile}
                className="sr-only"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-date">{t("dateLabel")}</Label>
              <Input
                id="edit-date"
                type="datetime-local"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                required
                className="border-gold-primary/30 bg-cream/10 text-cream [color-scheme:dark]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-caption">{t("captionLabel")}</Label>
              <Textarea
                id="edit-caption"
                value={editCaption}
                onChange={(e) => setEditCaption(e.target.value)}
                placeholder={t("captionPlaceholder")}
                rows={3}
                required
                className="border-gold-primary/30 bg-cream/10 text-cream placeholder:text-cream/40"
              />
            </div>

            {editError && (
              <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-red-300">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{editError}</span>
              </div>
            )}
            {editSuccess && (
              <p className="rounded-xl border border-gold-primary/30 bg-gold-primary/10 px-4 py-3 text-sm text-gold-light">
                {editSuccess}
              </p>
            )}

            <button type="submit" disabled={busy} className="btn-gold w-full justify-center">
              {busy ? t("saving") : t("save")}
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </section>
  );
}
