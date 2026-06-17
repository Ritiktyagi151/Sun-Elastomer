"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, BadgeCheck, ClipboardCheck, Download, FileCheck2, FileText, Mail, ShieldCheck } from "lucide-react";
import { ScrollSlide, SectionHeading, fadeUp, stagger } from "@/components/common/AnimatedPrimitives";
import { certifications } from "@/data/constants";

const compliancePoints = [
  "Company and GST details organized for procurement teams.",
  "Certificate copy requests routed through the business team.",
  "Product documentation discussions aligned with inquiry category.",
  "Commercial records and dispatch details handled with traceability.",
];

const documentTypes = [
  { icon: FileCheck2, title: "Company Profile", text: "Business overview, address and product range summary." },
  { icon: ClipboardCheck, title: "Product Records", text: "Composition, category, dosage form and pack information." },
  { icon: ShieldCheck, title: "Compliance Support", text: "GST, registration and buyer documentation coordination." },
];

export function CertificationsPage() {
  return (
    <main>
      <CertificationsHero />
      <ScrollSlide direction="right">
        <CertificationsIntro />
      </ScrollSlide>
      <ScrollSlide direction="up">
        <section className="section bg-white">
          <div className="mx-auto max-w-7xl px-5">
            <CertificationsGrid />
          </div>
        </section>
      </ScrollSlide>
      <ScrollSlide direction="left">
        <RegulatoryCompliance />
      </ScrollSlide>
      <ScrollSlide direction="up">
        <DocumentationSupport />
      </ScrollSlide>
    </main>
  );
}

function CertificationsHero() {
  return (
    <section className="relative h-[550px] overflow-hidden bg-ink px-5 pb-10 pt-24 text-white">
      <Image
        src="/banners/certification-banner.png"
        alt="Compliance documents and business paperwork"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* {/* <div className="absolute inset-0 bg-black/62" /> */}
      {/* <div className="absolute inset-x-0 bottom-0 h-28 bg-white/80" /> */}
      {/* <motion.div
        className="relative mx-auto flex h-full max-w-7xl flex-col justify-center"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="eyebrow bg-white/14 text-golden ring-1 ring-white/20">Certifications</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-black leading-tight md:text-6xl">
          Compliance information for confident business decisions.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/84 md:text-lg">
          Access company credentials, certificate request support and product documentation guidance for procurement and
          business review.
        </p>
      </motion.div> */}
    </section>
  );
}

function CertificationsIntro() {
  return (
    <section className="section bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeading eyebrow="Documentation" title="Organized details for faster procurement review." />
          <p className="mt-7 leading-8 text-muted">
            Certifications and compliance records help buyers evaluate business readiness. Sun Elastomers keeps company,
            product and commercial information structured so certificate requests and documentation discussions can move
            clearly.
          </p>
        </motion.div>
        <motion.div
          className="relative overflow-hidden rounded-lg"
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Image
            src="/banners/b3.jpeg"
            alt="Laboratory documentation and quality review"
            width={980}
            height={520}
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="aspect-[16/9] w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/52" />
          <h2 className="absolute bottom-0 left-0 max-w-xl p-6 font-display text-3xl font-black text-white">
            Quality documentation supports trust before every transaction.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

function CertificationsGrid() {
  return (
    <>
      <SectionHeading eyebrow="Credentials" title="Certificate and compliance categories." centered />
      <motion.div
        className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {certifications.map((cert) => (
          <motion.article
            key={cert.name}
            variants={fadeUp}
            className="relative overflow-hidden rounded-lg border border-crimson/10 bg-white p-6 shadow-sm"
            whileHover={{ y: -6 }}
          >
            <span className="absolute right-0 top-0 rounded-bl-lg bg-crimson px-3 py-1 text-xs font-bold text-white">
              Review
            </span>
            <div className="grid h-20 w-20 place-items-center rounded-lg bg-cream">
              <Award className="text-crimson" size={34} />
            </div>
            <h2 className="mt-5 text-xl font-black text-ink">{cert.name}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Certificate and compliance information can be shared after inquiry review and business verification.
            </p>
            <p className="mt-3 text-sm text-muted">Issuing Body: {cert.body}</p>
            <p className="text-sm text-muted">Validity: {cert.validity}</p>
          </motion.article>
        ))}
      </motion.div>
    </>
  );
}

function RegulatoryCompliance() {
  return (
    <section className="section bg-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_0.9fr]">
        <motion.div
          className="rounded-lg border border-crimson/10 bg-white p-8 text-ink shadow-sm"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <BadgeCheck className="text-crimson" size={36} />
          <h2 className="mt-4 font-display text-4xl font-black">Regulatory Compliance</h2>
          <p className="mt-4 leading-8 text-muted">
            Compliance discussions are handled with practical documentation support for product inquiries, procurement
            review and commercial onboarding.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary px-5 py-3">
              <Download size={18} /> Request Company Profile
            </Link>
            <Link href="/contact" className="btn-outline px-5 py-3">
              <FileText size={18} /> Request Certificate Copies
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {compliancePoints.map((point) => (
            <article key={point} className="flex gap-3 rounded-lg bg-white p-5 shadow-sm">
              <ShieldCheck className="mt-1 shrink-0 text-crimson" size={22} />
              <p className="text-sm leading-6 text-muted">{point}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function DocumentationSupport() {
  return (
    <section className="section bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Support" title="Documents buyers commonly request." centered />
        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {documentTypes.map(({ icon: Icon, title, text }) => (
            <motion.article key={title} variants={fadeUp} className="rounded-lg border border-white/12 bg-white/8 p-6">
              <Icon className="text-golden" size={32} />
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/72">{text}</p>
            </motion.article>
          ))}
        </motion.div>
        <div className="mt-10 text-center">
          <Link href="/contact" className="btn-primary px-6 py-3">
            <Mail size={18} /> Contact Documentation Team
          </Link>
        </div>
      </div>
    </section>
  );
}
