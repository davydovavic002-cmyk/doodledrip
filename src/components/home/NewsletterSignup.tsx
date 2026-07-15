"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { useI18n } from "@/hooks/use-i18n";

export function NewsletterSignup(): React.JSX.Element {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success" | "loading">(
    "idle",
  );

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean };
      if (!res.ok || !data.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <BrutalCard className="overflow-hidden">
      <div className="grid md:grid-cols-2">
        <div className="border-b-4 border-coffee-blue bg-coffee-blue p-5 text-white sm:p-8 md:border-b-0 md:border-r-4">
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] opacity-70">
            {t("newsletter.label")}
          </p>
          <h2 className="mt-2 font-display text-2xl font-black tracking-tight sm:text-3xl">
            {t("newsletter.title")}
          </h2>
          <p className="mt-3 text-sm text-white/80">{t("newsletter.subtitle")}</p>
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-8">
          {status === "success" ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-sm font-bold text-coffee-blue"
            >
              {t("newsletter.success")}
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="newsletter-email">
                Email
              </label>
              <div className="relative flex-1">
                <Mail
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-coffee-blue"
                  strokeWidth={2.5}
                />
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setStatus("idle");
                  }}
                  placeholder={t("newsletter.placeholder")}
                  className="w-full border-2 border-coffee-blue py-3 pl-10 pr-3 text-sm focus:outline-none focus:ring-4 focus:ring-coffee-blue/20"
                  disabled={status === "loading"}
                />
              </div>
              <Button type="submit" disabled={status === "loading"}>
                {t("newsletter.cta")}
              </Button>
            </form>
          )}
          {status === "error" ? (
            <p className="mt-2 text-xs font-medium text-red-600" role="alert">
              {t("newsletter.invalid")}
            </p>
          ) : null}
        </div>
      </div>
    </BrutalCard>
  );
}
