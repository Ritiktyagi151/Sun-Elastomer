"use client";

import { motion, useScroll, type Variants } from "framer-motion";
import { useRef } from "react";
import { stagger } from "@/components/common/AnimatedPrimitives";
import { Pill, Syringe, FlaskConical, TestTube, Microscope, Dna } from "lucide-react";

const features = [
  {
    icon: Pill,
    title: "Verified Suppliers",
    text: "Every supplier is rigorously vetted with multi-step compliance checks and ongoing quality audits.",
  },
  {
    icon: FlaskConical,
    title: "Regulatory Compliant",
    text: "All products meet FDA, WHO-GMP, and local regulatory standards so you can procure with full confidence.",
  },
  {
    icon: Syringe,
    title: "Fast Turnaround",
    text: "From order to dispatch in 24–48 hours. Time-sensitive pharmaceutical supply chains demand nothing less.",
  },
  {
    icon: TestTube,
    title: "Secure Transactions",
    text: "End-to-end encrypted payments and escrow protection keep every transaction safe and transparent.",
  },
  {
    icon: Microscope,
    title: "Real-time Tracking",
    text: "Live order tracking with milestone alerts ensures visibility from warehouse to your doorstep.",
  },
  {
    icon: Dna,
    title: "Dedicated Support",
    text: "A pharmaceutical specialist is available 24/7 to resolve queries, disputes, and compliance questions.",
  },
];

function AnimatedTitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="inline-flex flex-wrap justify-center gap-x-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
};

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-20"
    >
      {/* ── Background image + dark overlay ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://www.theonpharma.com/wp-content/uploads/2025/02/medicine.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* ── Scroll progress bar ── */}
      <motion.div
        className=""
        aria-hidden
      >
        <motion.div
          className="h-full bg-crimson origin-left"
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        />
      </motion.div>

      {/* ── All content above overlay ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 lg:px-8">

        {/* ── Eyebrow pill ── */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "backOut" }}
          viewport={{ once: false }}
        >
          <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            Why Choose Us
          </span>
        </motion.div>

        {/* ── Animated section title ── */}
        <motion.h2
          className="text-center text-3xl font-bold text-white lg:text-4xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
        >
          <AnimatedTitle text="Built for pharmaceutical buyers who value confidence." />
        </motion.h2>

        {/* ── Decorative underline ── */}
        <motion.div
          className="mx-auto mt-4 h-1 w-16 rounded-full bg-crimson"
          initial={{ scaleX: 0, originX: 0.5 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          viewport={{ once: false }}
        />

        {/* ── Cards grid ── */}
        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-100px" }}
        >
          {features.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={title}
              className="group relative rounded-xl border border-white/10 bg-white/10 backdrop-blur-md p-6 overflow-hidden cursor-default"
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px -12px rgba(0,0,0,0.4)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Card number badge */}
              <span className="absolute top-4 right-4 text-[11px] font-bold text-white/20 select-none font-mono">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Icon with float + hover tilt */}
              <motion.div
                className="w-12 h-12 rounded-xl bg-crimson/20 border border-crimson/30 flex items-center justify-center"
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3,
                }}
                whileHover={{ scale: 1.1, rotate: -4 }}
              >
                <Icon className="text-crimson" size={22} />
              </motion.div>

              {/* Title */}
              <motion.h3
                className="mt-5 font-bold text-white"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.08, duration: 0.4 }}
                viewport={{ once: false }}
              >
                {title}
              </motion.h3>

              {/* Body text */}
              <motion.p
                className="mt-2 text-sm text-white/65"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.25 + index * 0.08, duration: 0.5 }}
                viewport={{ once: false }}
              >
                {text}
              </motion.p>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-crimson"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
