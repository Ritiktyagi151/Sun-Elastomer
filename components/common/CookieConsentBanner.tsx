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
          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-sky-100 bg-white/96 shadow-[0_24px_80px_rgba(15,74,108,0.18)] backdrop-blur-xl">
            <div className="relative grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(20,184,166,0.12),transparent_32%),linear-gradient(135deg,rgba(240,253,250,0.9),rgba(255,255,255,0)_42%)]" />
              <button
                type="button"
                onClick={() => saveConsent("dismissed")}
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-200 hover:text-sky-700"
                aria-label="Close cookie consent banner"
              >
                <X size={17} />
              </button>

              <div className="relative flex gap-4 pr-9">
                <div className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-sky-600 via-teal-500 to-emerald-400 text-white shadow-lg shadow-teal-500/25 sm:grid">
                  <ShieldCheck size={27} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-bold uppercase text-teal-700">
                      <FlaskConical size={13} />
                      Laboratory Grade Privacy
                    </span>
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_5px_rgba(52,211,153,0.16)]" />
                  </div>
                  <h2 className="mt-3 text-xl font-black text-slate-950 sm:text-2xl">Your Privacy Matters</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-[0.95rem]">
                    We use cookies to improve your browsing experience, analyze website performance, and provide the best user
                    experience. You can manage your preferences at any time.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-slate-500">
                    <PolicyLink href="/privacy-policy" label="Privacy Policy" />
                    <PolicyLink href="/cookie-policy" label="Cookie Policy" />
                  </div>
                </div>
              </div>

              <div className="relative grid gap-2 sm:grid-cols-3 lg:w-[31rem]">
                <button
                  type="button"
                  onClick={() => saveConsent("accepted")}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-sky-700 px-4 py-3 text-sm font-black text-white shadow-lg shadow-sky-700/20 transition hover:-translate-y-0.5 hover:bg-sky-800"
                >
                  <Check size={17} />
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={() => saveConsent("rejected")}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                >
                  <Ban size={17} />
                  Reject All
                </button>
                <button
                  type="button"
                  onClick={() => setPreferencesOpen((value) => !value)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-black text-teal-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-100"
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
                  className="border-t border-sky-100 bg-slate-50/80 px-5 pb-5 pt-4 sm:px-6"
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
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-teal-500/20 transition hover:-translate-y-0.5"
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
    <Link href={href} className="text-sky-700 underline-offset-4 transition hover:text-teal-700 hover:underline">
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
    <div className="flex min-h-28 items-center justify-between gap-4 rounded-xl border border-sky-100 bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm font-black text-slate-950">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        disabled={locked}
        onClick={onToggle}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          enabled ? "bg-teal-500" : "bg-slate-300"
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
