"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { manufacturingHighlights } from "@/components/home/homeData";

// ── Staggered highlight item ──
function HighlightItem({ text, index }: { text: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-4 py-4 border-b border-ink/[0.07] last:border-none group"
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <span className="font-serif text-[11px] text-crimson/50 font-bold mt-1 w-5 text-right flex-shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative mt-[7px] flex-shrink-0">
        <span className="absolute -inset-1.5 rounded-full bg-crimson/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
        <span className="relative block h-2.5 w-2.5 rounded-full bg-crimson shadow-lg shadow-crimson/40" />
      </div>
      <p className="text-sm text-muted leading-relaxed">{text}</p>
    </motion.div>
  );
}

export function ManufacturingPreviewSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  // Parallax watermark
  const watermarkY = useTransform(scrollYProgress, [0, 1], [40, -60]);

  // Image parallax
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  return (
    <section ref={sectionRef} className="section relative overflow-hidden bg-cream text-ink">

      {/* BG Theme */}
      <div className="theme-bg" aria-hidden="true">
        <Image src="/bg-theme/bg1.png" alt="" fill loading="lazy" sizes="100vw" />
      </div>

      {/* Floating watermark with parallax */}
      <motion.div
        style={{ y: watermarkY }}
        className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 text-[13vw] font-black uppercase text-crimson/[0.045] select-none whitespace-nowrap font-serif"
        aria-hidden="true"
      >
        Manufacturing
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2 lg:gap-24 lg:px-8">

        {/* ── LEFT: Text content ── */}
        <div>
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-4 mb-5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <span className="w-8 h-[2px] bg-crimson" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-crimson">
              Manufacturing
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink leading-[1.15] mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Controlled Processes for Critical Elastomer Performance.
          </motion.h2>

          {/* Highlight items */}
          <div>
            {manufacturingHighlights.map((item, i) => (
              <HighlightItem key={item} text={item} index={i} />
            ))}
          </div>
        </div>

        {/* ── RIGHT: Image with parallax ── */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          {/* Corner accents */}
          {[
            "top-[-8px] left-[-8px] border-t-2 border-l-2",
            "top-[-8px] right-[-8px] border-t-2 border-r-2",
            "bottom-[-8px] left-[-8px] border-b-2 border-l-2",
            "bottom-[-8px] right-[-8px] border-b-2 border-r-2",
          ].map((cls, i) => (
            <span key={i} className={`absolute w-7 h-7 border-crimson z-10 ${cls}`} />
          ))}

          {/* Image with inner parallax */}
          <div className="overflow-hidden rounded-sm aspect-[4/5] relative">
            <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
              <Image
                src="/homepage-img/manufacturing.png"
                alt="Manufacturing Facility"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>

          {/* Floating badge */}
          <motion.div
            className="absolute bottom-6 -left-5 bg-crimson text-white px-5 py-3 z-10"
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span className="block font-serif text-2xl font-bold leading-none">15+</span>
            <span className="block text-[10px] tracking-widest uppercase opacity-80 mt-0.5">
              Years of Excellence
            </span>
          </motion.div>

          {/* Vertical side label */}
          <span className="absolute -right-8 top-1/2 -translate-y-1/2 rotate-90 text-[9px] tracking-[4px] uppercase text-crimson/50 font-semibold whitespace-nowrap hidden lg:block">
            WHO-GMP Certified
          </span>
        </motion.div>
      </div>
    </section>
  );
}
