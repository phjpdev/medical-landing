"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { AlertCircle, ImagePlus, Trash2, ShieldCheck } from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";
import { GoldDivider } from "@/components/visual/GoldDivider";
import { useContentStore } from "@/components/providers/ContentProvider";
import { resizeImageToFile } from "@/lib/resizeImage";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

export default function AdminCasesPage() {
  const t = useTranslations("admin.cases");
  const locale = useLocale();
  const router = useRouter();
  const { isAdmin, content, publishCasePost, deleteCasePost } = useContentStore();
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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
                    <button
                      type="button"
                      onClick={() => void onDelete(post.id)}
                      disabled={busy}
                      className="mt-auto inline-flex items-center gap-1 pt-3 text-xs text-destructive hover:underline"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {t("delete")}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
