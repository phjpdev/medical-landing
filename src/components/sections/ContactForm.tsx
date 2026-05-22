"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(1),
  phone: z.string().min(6),
  email: z.string().email(),
  interest: z.string().min(1),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tCommon = useTranslations("common");
  const options = t.raw("options") as string[];

  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    console.log("[ContactForm] submitted →", values);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="gold-glow-card rounded-3xl p-8 sm:p-10"
      noValidate
    >
      <h2 className="font-serif text-2xl font-medium leading-tight sm:text-3xl">
        {t("title")}
      </h2>
      <div className="mt-2 h-px w-12 bg-gold-primary" />

      <div className="mt-8 grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="name">{t("name")}</Label>
          <Input
            id="name"
            {...register("name")}
            aria-invalid={!!errors.name}
            className={cn(errors.name && "border-destructive")}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="phone">{t("phone")}</Label>
            <Input
              id="phone"
              inputMode="tel"
              {...register("phone")}
              aria-invalid={!!errors.phone}
              className={cn(errors.phone && "border-destructive")}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              className={cn(errors.email && "border-destructive")}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="interest">{t("interest")}</Label>
          <select
            id="interest"
            {...register("interest")}
            aria-invalid={!!errors.interest}
            defaultValue=""
            className={cn(
              "h-11 w-full rounded-md border border-gold-primary/30 bg-white/80 px-4 text-sm text-charcoal transition-colors focus:border-gold-primary focus:outline-none focus:ring-2 focus:ring-gold-primary/30",
              errors.interest && "border-destructive",
            )}
          >
            <option value="" disabled>
              {t("interestPlaceholder")}
            </option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="message">{t("message")}</Label>
          <Textarea
            id="message"
            placeholder={t("messagePlaceholder")}
            rows={4}
            {...register("message")}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gold mt-3 w-full justify-center sm:w-auto sm:self-start"
        >
          {isSubmitting ? tCommon("submitting") : t("submit")}
          <Send className="h-4 w-4" />
        </button>

        {submitted && (
          <div className="flex items-start gap-3 rounded-xl border border-gold-primary/40 bg-gold-primary/10 px-4 py-3 text-sm text-charcoal">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
            <span>{tCommon("successMessage")}</span>
          </div>
        )}
      </div>
    </form>
  );
}
