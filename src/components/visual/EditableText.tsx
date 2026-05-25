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
import { useIsAdmin } from "@/lib/admin";

type Tag = "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div" | "blockquote";

// Inline-editable text.
//
// • Admins: contentEditable, click to type, saves on blur to localStorage.
// • Visitors: read-only — same default/persisted text, no edit affordance.
//
// `multiline` controls whether Enter creates a newline (true) or blurs (false).
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
  const isAdmin = useIsAdmin();
  const [value, setValue] = useState(defaultValue);
  const [hydrated, setHydrated] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) setValue(saved);
    } catch {}
    setHydrated(true);
  }, [storageKey]);

  const persist = (next: string) => {
    setValue(next);
    try {
      localStorage.setItem(storageKey, next);
    } catch {}
  };

  const onBlur = (e: FocusEvent<HTMLElement>) => {
    const text = e.currentTarget.textContent ?? "";
    persist(text);
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
