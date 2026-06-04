"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { PlaceholderImage, SectionHeading } from "@/components/common/AnimatedPrimitives";
import { manufacturingHighlights } from "@/components/home/homeData";

export function ManufacturingPreviewSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.35, 0.75], [80, -60]);

  return (
    <section className="section relative overflow-hidden bg-cream text-ink">
      <div className="theme-bg" aria-hidden="true">
        <Image src="/bg-theme/bg1.png" alt="" fill loading="lazy" sizes="100vw" />
      </div>
      <motion.div style={{ y }} className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 text-[13vw] font-black uppercase text-crimson/[0.045]">
        Manufacturing
      </motion.div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading eyebrow="Manufacturing" title="Controlled processes for critical elastomer performance." light />
          <div className="mt-8 space-y-5">
            {manufacturingHighlights.map((item) => (
              <p key={item} className="flex items-center gap-4 text-muted">
                <span className="h-3 w-3 rounded-full bg-crimson shadow-lg shadow-crimson" />
                {item}
              </p>
            ))}
          </div>
        </div>
        <PlaceholderImage label="Manufacturing Facility" />
      </div>
    </section>
  );
}
