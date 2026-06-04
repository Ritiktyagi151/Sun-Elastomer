"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/AnimatedPrimitives";
import { certifications } from "@/data/constants";

export function CertificationsSection() {
  return (
    <section className="section overflow-hidden bg-white">
      <motion.div className="mx-auto max-w-7xl px-5 lg:px-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }}>
        <SectionHeading title="Our Certifications & Compliance" centered />
        <div className="marquee mt-12">
          <div className="marquee-track">
            {[...certifications, ...certifications].map((cert, index) => (
              <span key={`${cert.name}-${index}`} className="cert-badge">
                {cert.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
