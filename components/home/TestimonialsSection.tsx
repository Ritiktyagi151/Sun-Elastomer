"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/common/AnimatedPrimitives";
import { testimonials } from "@/components/home/homeData";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((item) => (item + 1) % testimonials.length), 4000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="section bg-cream text-ink">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <SectionHeading title="Trusted by pharmaceutical partners" light centered />
        <div className="relative mt-12 min-h-72">
          <AnimatePresence mode="wait">
            <motion.article
              key={active}
              className="rounded-lg border border-crimson/10 border-l-crimson bg-white p-8 text-left shadow-xl shadow-crimson/5"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-6xl leading-none text-golden">&ldquo;</p>
              <p className="text-lg leading-8 text-muted">{testimonials[active].quote}</p>
              <p className="mt-6 font-bold">{testimonials[active].name}</p>
              <p className="text-sm text-muted">
                {testimonials[active].company}, {testimonials[active].country}
              </p>
            </motion.article>
          </AnimatePresence>
          <div className="mt-6 flex justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2.5 rounded-full transition-all ${active === index ? "w-9 bg-golden" : "w-2.5 bg-crimson/20"}`}
                onClick={() => setActive(index)}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
