"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CookieConsentBanner } from "@/components/common/CookieConsentBanner";
import { FloatingContactDock } from "@/components/common/FloatingContactDock";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2000);
    
    // Sync MongoDB company info into localStorage for client-side getters
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/api/company`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("sun_company_info", JSON.stringify(data));
        }
      })
      .catch((err) => console.error("Failed to sync company info:", err));

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading ? (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              className="relative grid place-items-center rounded-[1.5rem] border border-crimson/10 bg-white/85 p-5 shadow-2xl shadow-crimson/10 backdrop-blur-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
            >
              <Image
                src="/sunelastomer.png"
                alt="Sun Elastomers"
                width={170}
                height={64}
                priority
                className="mb-2 h-14 w-auto object-contain"
              />
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
        <polygon className="loader-bounce" transform="rotate(45 100 100)" strokeWidth={1} stroke="#b91c1c" fill="none" points="70,70 148,50 130,130 50,150" />
        <polygon className="loader-bounce-2" transform="rotate(45 100 100)" strokeWidth={1} stroke="#6b6b6b" fill="none" points="70,70 148,50 130,130 50,150" />
        <polygon transform="rotate(45 100 100)" strokeWidth={2} stroke="none" fill="#414750" points="70,70 150,50 130,130 50,150" />
        <polygon strokeWidth={2} stroke="none" fill="#1e2026" points="100,70 150,100 100,130 50,100" />
        <polygon transform="translate(20, 31)" strokeWidth={2} stroke="none" fill="#b91c1c" points="80,50 80,75 80,99 40,75" />
        <polygon transform="translate(20, 31)" strokeWidth={2} stroke="none" fill="#b91c1c" opacity={0.28} points="40,-40 80,-40 80,99 40,75" />
        <polygon transform="rotate(180 100 100) translate(20, 20)" strokeWidth={2} stroke="none" fill="#d4d4d4" points="80,50 80,75 80,99 40,75" />
        <polygon transform="rotate(0 100 100) translate(60, 20)" strokeWidth={2} stroke="none" fill="#b91c1c" opacity={0.28} points="40,-40 80,-40 80,85 40,110.2" />
        <polygon className="loader-particle" transform="rotate(45 100 100) translate(80, 95)" strokeWidth={2} stroke="none" fill="#b91c1c" points="5,0 5,5 0,5 0,0" />
        <polygon className="loader-particle" transform="rotate(45 100 100) translate(80, 55)" strokeWidth={2} stroke="none" fill="#d4d4d4" points="6,0 6,6 0,6 0,0" />
        <polygon className="loader-particle" transform="rotate(45 100 100) translate(70, 80)" strokeWidth={2} stroke="none" fill="#fff" points="2,0 2,2 0,2 0,0" />
        <polygon strokeWidth={2} stroke="none" fill="#292d34" points="29.5,99.8 100,142 100,172 29.5,130" />
        <polygon transform="translate(50, 92)" strokeWidth={2} stroke="none" fill="#1f2127" points="50,50 120.5,8 120.5,35 50,80" />
      </g>
    </svg>
  );
}
