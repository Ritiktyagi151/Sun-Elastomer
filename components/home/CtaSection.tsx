"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { company } from "@/data/products";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-crimson px-5 py-20 text-white">
      {/* soft ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />

      <motion.div
        className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 lg:flex-row lg:items-center"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
      >
        <div>
          <h2 className="font-display text-4xl font-bold tracking-tight">
            Ready to Partner With Us?
          </h2>
          <p className="mt-3 max-w-2xl text-white/80">
            Reach out to our team for product inquiries, custom requirements, and export collaborations.
          </p>
        </div>

        {/* Mirror-effect CTA */}
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            className="group relative"
          >
            <a
              href={`mailto:${company.contactEmail}?subject=Partnership%20Inquiry`}
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/40 bg-white/90 px-7 py-4 font-bold text-crimson shadow-xl backdrop-blur-sm transition-colors hover:bg-white"
            >
              {/* glossy sweep on hover */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Mail className="relative z-10 h-5 w-5" />
              <span className="relative z-10">Contact Us Today</span>
            </a>

            {/* mirror reflection below the button */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 top-full w-full origin-top scale-y-[-1] rounded-full bg-white/90 px-7 py-4 opacity-20 blur-[1px]"
              style={{
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
