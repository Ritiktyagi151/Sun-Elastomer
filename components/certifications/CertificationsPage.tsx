"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { PlaceholderImage } from "@/components/common/AnimatedPrimitives";
import { certifications } from "@/data/constants";
import { PageHero } from "@/components/common/PageBanner";

export function CertificationsPage() {
  return (
    <main>
      <PageHero
        title="Certifications"
        text="Compliance credentials, regulatory readiness and documentation support for pharmaceutical manufacturing partners."
      />
      <section className="section bg-white">
        <div className="mx-auto max-w-7xl px-5">
          <CertificationsGrid />
          <RegulatoryCompliance />
        </div>
      </section>
    </main>
  );
}

function CertificationsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {certifications.map((cert) => (
        <motion.article
          key={cert.name}
          className="relative rounded-lg border border-crimson/10 bg-white p-6 shadow-sm"
          initial={{ opacity: 0, rotateY: 90 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-crimson px-3 py-1 text-xs font-bold text-white">
            Certified
          </span>
          <PlaceholderImage label={`${cert.name} Logo`} />
          <h2 className="mt-5 text-xl font-bold">{cert.name}</h2>
          <p className="mt-2 text-sm text-muted">Issuing Body: {cert.body}</p>
          <p className="text-sm text-muted">Validity: {cert.validity}</p>
        </motion.article>
      ))}
    </div>
  );
}

function RegulatoryCompliance() {
  return (
    <div className="mt-12 rounded-lg border border-crimson/10 bg-peach p-8 text-ink">
      <h2 className="gradient-heading font-display text-3xl">Regulatory Compliance</h2>
      <p className="mt-3 text-muted">Approved regions and country details: [TO BE UPDATED]</p>
      <div className="mt-6 flex flex-wrap gap-4">
        <button className="btn-primary px-5 py-3">
          <Download size={18} /> Download our Company Profile
        </button>
        <button className="btn-outline px-5 py-3">
          <FileText size={18} /> Request Certificate Copies
        </button>
      </div>
    </div>
  );
}
