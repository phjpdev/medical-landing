"use client";

import {
  useEffect,
  useRef,
  useState,
  FocusEvent,
  KeyboardEvent,
  createElement,
} from "react";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContentStore } from "@/components/providers/ContentProvider";

type Tag = "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div" | "blockquote";

// Inline-editable text. Reads from the shared content store; on admin blur it
// POSTs the new value to /api/admin/text which persists to data/content.json.
//
// • Admins: contentEditable, saves on blur.
// • Visitors: read-only — same value, no edit affordance.
export function EditableText({
  storageKey,
  defaultValue,
  as = "p",
  className,
  multiline = false,
}: {
  storageKey: string;
  defaultValue: string;
  as?: Tag;
  className?: string;
  multiline?: boolean;
}) {
  const { content, isAdmin, saveText } = useContentStore();
  const stored = content.text[storageKey];
  const value = stored !== undefined ? stored : defaultValue;
  const [hydrated, setHydrated] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => setHydrated(true), []);

  const onBlur = async (e: FocusEvent<HTMLElement>) => {
    const text = e.currentTarget.textContent ?? "";
    if (text === value) return;
    try {
      await saveText(storageKey, text);
    } catch (err) {
      console.error("[EditableText] save failed", err);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
      (e.currentTarget as HTMLElement).blur();
    }
    if (e.key === "Escape") {
      (e.currentTarget as HTMLElement).blur();
    }
  };

  // Visitor (read-only): plain element, no interactivity
  if (!isAdmin) {
    return createElement(as, { className }, value);
  }

  // Admin: editable
  return createElement(
    as,
    {
      ref,
      contentEditable: hydrated,
      suppressContentEditableWarning: true,
      spellCheck: false,
      onBlur,
      onKeyDown,
      className: cn(
        "relative -mx-1 cursor-text rounded px-1 outline-none transition focus:bg-gold-light/30 focus:ring-2 focus:ring-gold-primary/40",
        className,
      ),
      "data-editable": "",
      // contentEditable re-renders are tricky — `key={value}` would lose caret
      // position. Instead, only render the children once via dangerouslySet…
      // but stored values are short, so this simpler approach is fine.
    },
    value,
  );
}

// Small floating helper that hints these blocks are editable on hover.
export function EditableHint({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-gold-deep opacity-0 shadow-sm transition-opacity group-hover:opacity-100",
        className,
      )}
    >
      <Pencil className="h-3 w-3" />
      Click to edit
    </span>
  );
}
