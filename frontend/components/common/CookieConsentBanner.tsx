"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Ban,
  Check,
  Cookie,
  FlaskConical,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

type CookieConsent = "accepted" | "rejected" | "custom" | "dismissed";

const storageKey = "sun-elastomers-cookie-consent";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [experienceEnabled, setExperienceEnabled] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedConsent = window.localStorage.getItem(storageKey);
      setVisible(!savedConsent);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const saveConsent = (consent: CookieConsent) => {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        consent,
        preferences: {
          necessary: true,
          analytics: consent === "accepted" || (consent === "custom" && analyticsEnabled),
          experience: consent === "accepted" || (consent === "custom" && experienceEnabled),
        },
        savedAt: new Date().toISOString(),
      })
    );
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          className="fixed inset-x-0 bottom-0 z-[90] px-4 pb-4 sm:px-6 sm:pb-6"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Cookie consent"
        >
          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-neutral-200 bg-white/96 shadow-[0_24px_80px_rgba(26,26,26,0.14)] backdrop-blur-xl">
            <div className="relative grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="pointer-events-none absolute inset-0 bg-crimson/5" />
              <button
                type="button"
                onClick={() => saveConsent("dismissed")}
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm transition hover:border-crimson/20 hover:text-crimson"
                aria-label="Close cookie consent banner"
              >
                <X size={17} />
              </button>

              <div className="relative flex gap-4 pr-9">
                <div className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-crimson text-white shadow-lg shadow-crimson/15 sm:grid">
                  <ShieldCheck size={27} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-crimson/10 bg-crimson/5 px-3 py-1 text-xs font-bold uppercase text-crimson">
                      <FlaskConical size={13} />
                      Laboratory Grade Privacy
                    </span>
                    <span className="inline-flex h-2 w-2 rounded-full bg-crimson shadow-[0_0_0_5px_rgba(56,189,248,0.12)]" />
                  </div>
                  <h2 className="mt-3 text-xl font-black text-ink sm:text-2xl">Your Privacy Matters</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted sm:text-[0.95rem]">
                    We use cookies to improve your browsing experience, analyze website performance, and provide the best user
                    experience. You can manage your preferences at any time.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-muted">
                    <PolicyLink href="/privacy-policy" label="Privacy Policy" />
                    <PolicyLink href="/cookie-policy" label="Cookie Policy" />
                  </div>
                </div>
              </div>

              <div className="relative grid gap-2 sm:grid-cols-3 lg:w-[31rem]">
                <button
                  type="button"
                  onClick={() => saveConsent("accepted")}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-black text-white shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:bg-crimson"
                >
                  <Check size={17} />
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={() => saveConsent("rejected")}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-black text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-neutral-50"
                >
                  <Ban size={17} />
                  Reject All
                </button>
                <button
                  type="button"
                  onClick={() => setPreferencesOpen((value) => !value)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-crimson/10 bg-crimson/5 px-4 py-3 text-sm font-black text-crimson shadow-sm transition hover:-translate-y-0.5 hover:bg-crimson/10"
                  aria-expanded={preferencesOpen}
                >
                  <SlidersHorizontal size={17} />
                  Manage Preferences
                </button>
              </div>
            </div>

            <AnimatePresence>
              {preferencesOpen ? (
                <motion.div
                  className="border-t border-neutral-100 bg-neutral-50/80 px-5 pb-5 pt-4 sm:px-6"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24 }}
                >
                  <div className="grid gap-3 md:grid-cols-3">
                    <PreferenceItem
                      title="Essential"
                      description="Required for secure site operation."
                      locked
                      enabled
                    />
                    <PreferenceItem
                      title="Performance"
                      description="Helps us improve website quality."
                      enabled={analyticsEnabled}
                      onToggle={() => setAnalyticsEnabled((value) => !value)}
                    />
                    <PreferenceItem
                      title="Experience"
                      description="Keeps browsing smoother across visits."
                      enabled={experienceEnabled}
                      onToggle={() => setExperienceEnabled((value) => !value)}
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => saveConsent("custom")}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-crimson px-5 py-3 text-sm font-black text-white shadow-lg shadow-crimson/15 transition hover:-translate-y-0.5"
                    >
                      <Cookie size={17} />
                      Save Preferences
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

function PolicyLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-crimson underline-offset-4 transition hover:text-ink hover:underline">
      {label}
    </Link>
  );
}

function PreferenceItem({
  title,
  description,
  enabled,
  locked = false,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  locked?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div className="flex min-h-28 items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm font-black text-ink">{title}</p>
        <p className="mt-1 text-xs leading-5 text-muted">{description}</p>
      </div>
      <button
        type="button"
        disabled={locked}
        onClick={onToggle}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          enabled ? "bg-crimson" : "bg-neutral-300"
        } ${locked ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
        aria-label={`${title} cookies ${enabled ? "enabled" : "disabled"}`}
        aria-pressed={enabled}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
