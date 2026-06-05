"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CookieConsentBanner } from "@/components/common/CookieConsentBanner";
import { FloatingContactDock } from "@/components/common/FloatingContactDock";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading ? (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-[#f8fbff]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              className="relative grid place-items-center rounded-[1.5rem] border border-[#d3a410]/20 bg-white/85 p-5 shadow-2xl shadow-[#d3a410]/20 backdrop-blur-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
            >
              <PremiumLoader />
              <span className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-ink">Loading</span>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
      <FloatingContactDock />
      <CookieConsentBanner />
    </>
  );
}

function PremiumLoader() {
  return (
    <svg className="premium-loader" xmlns="http://www.w3.org/2000/svg" height={200} width={200} viewBox="0 0 200 200" aria-hidden="true">
      <g>
        <polygon className="loader-bounce" transform="rotate(45 100 100)" strokeWidth={1} stroke="#d3a410" fill="none" points="70,70 148,50 130,130 50,150" />
        <polygon className="loader-bounce-2" transform="rotate(45 100 100)" strokeWidth={1} stroke="#d3a410" fill="none" points="70,70 148,50 130,130 50,150" />
        <polygon transform="rotate(45 100 100)" strokeWidth={2} stroke="none" fill="#414750" points="70,70 150,50 130,130 50,150" />
        <polygon strokeWidth={2} stroke="none" fill="url(#loader-gradiente)" points="100,70 150,100 100,130 50,100" />
        <defs>
          <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="loader-gradiente">
            <stop style={{ stopColor: "#1e2026", stopOpacity: 1 }} offset="20%" />
            <stop style={{ stopColor: "#414750", stopOpacity: 1 }} offset="60%" />
          </linearGradient>
        </defs>
        <polygon transform="translate(20, 31)" strokeWidth={2} stroke="none" fill="#b7870f" points="80,50 80,75 80,99 40,75" />
        <polygon transform="translate(20, 31)" strokeWidth={2} stroke="none" fill="url(#loader-gradiente-2)" points="40,-40 80,-40 80,99 40,75" />
        <defs>
          <linearGradient y2="100%" x2="0%" y1="-17%" x1="10%" id="loader-gradiente-2">
            <stop style={{ stopColor: "#d3a51000", stopOpacity: 1 }} offset="20%" />
            <stop className="loader-animated-stop" style={{ stopColor: "#d3a51054", stopOpacity: 1 }} offset="100%" />
          </linearGradient>
        </defs>
        <polygon transform="rotate(180 100 100) translate(20, 20)" strokeWidth={2} stroke="none" fill="#d3a410" points="80,50 80,75 80,99 40,75" />
        <polygon transform="rotate(0 100 100) translate(60, 20)" strokeWidth={2} stroke="none" fill="url(#loader-gradiente-3)" points="40,-40 80,-40 80,85 40,110.2" />
        <defs>
          <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="loader-gradiente-3">
            <stop style={{ stopColor: "#d3a51000", stopOpacity: 1 }} offset="20%" />
            <stop className="loader-animated-stop" style={{ stopColor: "#d3a51054", stopOpacity: 1 }} offset="100%" />
          </linearGradient>
        </defs>
        <polygon className="loader-particle" transform="rotate(45 100 100) translate(80, 95)" strokeWidth={2} stroke="none" fill="#ffe4a1" points="5,0 5,5 0,5 0,0" />
        <polygon className="loader-particle" transform="rotate(45 100 100) translate(80, 55)" strokeWidth={2} stroke="none" fill="#ccb069" points="6,0 6,6 0,6 0,0" />
        <polygon className="loader-particle" transform="rotate(45 100 100) translate(70, 80)" strokeWidth={2} stroke="none" fill="#fff" points="2,0 2,2 0,2 0,0" />
        <polygon strokeWidth={2} stroke="none" fill="#292d34" points="29.5,99.8 100,142 100,172 29.5,130" />
        <polygon transform="translate(50, 92)" strokeWidth={2} stroke="none" fill="#1f2127" points="50,50 120.5,8 120.5,35 50,80" />
      </g>
    </svg>
  );
}
