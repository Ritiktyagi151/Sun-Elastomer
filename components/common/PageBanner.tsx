"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function PageBanner({ title, text }: { title: string; text: string }) {
  return (
    <section className="relative overflow-hidden bg-white px-5 pb-20 pt-36 text-ink">
      <div className="theme-bg" aria-hidden="true">
        <Image src="/bg-theme/bg1.png" alt="" fill priority sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(245,0,87,0.12),transparent_30%),radial-gradient(circle_at_70%_20%,rgba(255,196,0,0.16),transparent_28%)]" />
      <motion.div
        className="relative mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="eyebrow">Sun Elastomers Pvt Ltd</p>
        <h1 className="mt-4 bg-flame-gradient bg-clip-text font-display text-5xl font-black text-transparent md:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{text}</p>
      </motion.div>
    </section>
  );
}

export { PageBanner as PageHero };
