"use client";

import { useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ImageOff } from "lucide-react";
import { useContentStore } from "@/components/providers/ContentProvider";
import type { CasePost } from "@/lib/contentStore";

function formatPostDate(iso: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale === "zh" ? "zh-HK" : "en-HK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

function CasePostCard({ post, photoUrl }: { post: CasePost; photoUrl: string | null }) {
  const locale = useLocale();

  return (
    <article className="overflow-hidden rounded-3xl gold-border bg-white/90 shadow-soft">
      <div className="relative aspect-[3/4] overflow-hidden bg-cream">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt={post.caption}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-charcoal/25">
            <ImageOff className="h-10 w-10" />
          </div>
        )}
      </div>
      <div className="border-t border-gold-primary/15 px-5 py-4">
        <time className="text-[10px] uppercase tracking-[0.22em] text-gold-deep">
          {formatPostDate(post.createdAt, locale)}
        </time>
        <p className="mt-2 text-sm font-medium leading-relaxed text-charcoal">
          {post.caption}
        </p>
      </div>
    </article>
  );
}

export function CasePostsGrid() {
  const t = useTranslations("cases");
  const { content } = useContentStore();

  const posts = useMemo(
    () =>
      [...(content.casePosts ?? [])].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [content.casePosts],
  );

  if (posts.length === 0) {
    return (
      <p className="rounded-3xl gold-border bg-white/85 px-8 py-16 text-center text-sm text-charcoal/60">
        {t("empty")}
      </p>
    );
  }

  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <CasePostCard
          key={post.id}
          post={post}
          photoUrl={content.photos[post.photoKey] ?? null}
        />
      ))}
    </div>
  );
}
