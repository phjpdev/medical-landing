"use client";

import { useEffect, useState } from "react";
import { Lock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/i18n/routing";
import { GoldDivider } from "@/components/visual/GoldDivider";
import { useContentStore } from "@/components/providers/ContentProvider";

export default function AdminPage() {
  const { isAdmin, login } = useContentStore();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAdmin) router.replace("/admin/cases");
  }, [isAdmin, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const result = await login(username, password);
    if (result.ok) {
      // Send the admin straight to the home page where editing happens
      router.replace("/admin/cases");
    } else {
      setBusy(false);
      setError(result.error ?? "Login failed.");
    }
  };

  // While we redirect a freshly-logged-in admin, render nothing
  if (isAdmin) return null;

  return (
    <section className="container-narrow flex min-h-[70vh] items-center justify-center py-24">
      <div className="w-full max-w-md">
        <div className="gold-glow-card rounded-3xl p-8 sm:p-10">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-gradient text-ink shadow-sm">
              <Lock className="h-6 w-6" />
            </span>
            <h1 className="font-serif text-3xl font-medium leading-tight">Admin Login</h1>
            <GoldDivider />
            <p className="text-sm leading-relaxed text-charcoal/70">
              Sign in to publish daily case studies and edit site content.
            </p>
          </div>

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
        </div>
      </div>
    </section>
  );
}
