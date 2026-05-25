"use client";

import { useState } from "react";
import { Lock, LogOut, ShieldCheck, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/routing";
import { GoldDivider } from "@/components/visual/GoldDivider";
import { useContentStore } from "@/components/providers/ContentProvider";

export default function AdminPage() {
  const { isAdmin, login, logout } = useContentStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const result = await login(username, password);
    setBusy(false);
    if (result.ok) {
      setUsername("");
      setPassword("");
    } else {
      setError(result.error ?? "Login failed.");
    }
  };

  return (
    <section className="container-narrow flex min-h-[70vh] items-center justify-center py-24">
      <div className="w-full max-w-md">
        <div className="gold-glow-card rounded-3xl p-8 sm:p-10">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-gradient text-ink shadow-sm">
              {isAdmin ? <ShieldCheck className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
            </span>
            <h1 className="font-serif text-3xl font-medium leading-tight">
              {isAdmin ? "Admin Mode" : "Admin Login"}
            </h1>
            <GoldDivider />
            <p className="text-sm leading-relaxed text-charcoal/70">
              {isAdmin
                ? "You are signed in. Photos and text on the site are now editable in place — and your changes are saved on the server so every visitor sees them."
                : "Sign in to edit testimonials and case photos."}
            </p>
          </div>

          {isAdmin ? (
            <div className="mt-8 flex flex-col gap-4">
              <div className="rounded-2xl border border-gold-primary/40 bg-gold-primary/10 p-5 text-sm text-charcoal/85">
                <p className="font-medium text-charcoal">How to edit:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-charcoal/75">
                  <li>
                    Visit any page with editable content (e.g.{" "}
                    <Link href="/cases" className="text-gold-deep underline-offset-4 hover:underline">
                      Before &amp; After
                    </Link>{" "}
                    or the testimonials section on the{" "}
                    <Link href="/" className="text-gold-deep underline-offset-4 hover:underline">
                      home page
                    </Link>
                    ).
                  </li>
                  <li>Hover a photo and click to upload a new image.</li>
                  <li>Click on any text block to edit. Tab or click away to save.</li>
                  <li>Changes are saved to the server and visible to all visitors.</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => void logout()}
                className="btn-gold mt-2 inline-flex w-full justify-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 grid gap-5" noValidate>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={busy}
                className="btn-gold mt-2 w-full justify-center"
              >
                {busy ? "Signing in…" : "Sign in"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
