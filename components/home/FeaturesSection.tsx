"use client";

import { motion, type Variants } from "framer-motion";
import { stagger } from "@/components/common/AnimatedPrimitives";
import { features } from "@/data/constants";

// Word-by-word animated heading wrapper
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
          viewport={{ once: true }}
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
  return (
    <section className="section bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Eyebrow pill */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "backOut" }}
          viewport={{ once: true }}
        >
          <span className="inline-block rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-crimson">
            Why Choose Us
          </span>
        </motion.div>

        {/* Animated section title */}
        <motion.h2
          className="text-center text-3xl font-bold text-ink lg:text-4xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <AnimatedTitle text="Built for pharmaceutical buyers who value confidence." />
        </motion.h2>

        {/* Decorative animated underline */}
        <motion.div
          className="mx-auto mt-4 h-1 w-16 rounded-full bg-crimson"
          initial={{ scaleX: 0, originX: 0.5 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        {/* Cards grid */}
        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={title}
              className="group relative rounded-lg border border-neutral-200 bg-white p-6 shadow-sm overflow-hidden cursor-default"
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.12)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Shimmer overlay on hover */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              />

              {/* Animated icon */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3,
                }}
              >
                <Icon className="text-crimson" size={30} />
              </motion.div>

              {/* Title fade-up */}
              <motion.h3
                className="mt-5 font-bold text-ink"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
              >
                {title}
              </motion.h3>

              {/* Text fade-in */}
              <motion.p
                className="mt-2 text-sm text-neutral-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.25 + index * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {text}
              </motion.p>

              {/* Bottom accent line on hover */}
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
