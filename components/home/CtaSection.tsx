"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function CtaSection() {
  return (
    <section className="bg-flame-gradient px-5 py-16 text-white">
      <motion.div
        className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
      >
        <div>
          <h2 className="font-display text-4xl font-bold">Ready to Partner With Us?</h2>
          <p className="mt-3 max-w-2xl text-white/82">Reach out to our team for product inquiries, custom requirements, and export collaborations.</p>
        </div>
        <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 2.2 }}>
          <Link href="/contact" className="inline-flex rounded-full bg-white px-7 py-4 font-bold text-crimson shadow-xl">
            Contact Us Today
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
