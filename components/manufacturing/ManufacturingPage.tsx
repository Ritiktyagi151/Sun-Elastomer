"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CountUp, SectionHeading } from "@/components/common/AnimatedPrimitives";

const processSteps = ["Material", "Moulding", "Trimming", "Testing", "Packing"];
const facilityItems = ["Clean Room", "Compression Moulding", "QC Lab", "Packaging"];
const capacityStats = [
  ["100", "K+", "Daily Output"],
  ["12", "M+", "Annual Capacity"],
  ["50", "+", "Export Volume"],
];

export function ManufacturingPage() {
  return (
    <main>
      <ManufacturingHero />
      <ProcessFlow />
      <section className="section bg-cream text-ink">
        <FacilityGrid />
      </section>
    </main>
  );
}

function ManufacturingHero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-white px-5 pt-24 text-ink">
      <div className="theme-bg" aria-hidden="true">
        <Image src="/bg-theme/bg1.png" alt="" fill priority sizes="100vw" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <h1 className="gradient-heading font-display text-6xl font-black">Manufacturing</h1>
        <p className="mt-5 max-w-2xl text-muted">
          Controlled infrastructure for pharmaceutical elastomer component production.
        </p>
      </div>
    </section>
  );
}

function ProcessFlow() {
  return (
    <section className="section bg-white">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading title="Process Flow" centered />
        <div className="relative mt-14 grid gap-6 md:grid-cols-5">
          <motion.div
            className="absolute left-0 top-10 hidden h-1 bg-crimson md:block"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1 }}
          />
          {processSteps.map((step, index) => (
            <motion.article
              key={step}
              className="relative rounded-lg border border-neutral-200 bg-white p-5 text-center shadow-sm"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-flame-gradient font-black text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 font-bold">{step}</h3>
              <p className="mt-2 text-sm text-neutral-600">[TO BE UPDATED]</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FacilityGrid() {
  return (
    <div className="mx-auto max-w-7xl px-5">
      <SectionHeading title="Infrastructure & Capacity" light centered />
      <div className="mt-12 grid gap-6 md:grid-cols-4">
        {facilityItems.map((item) => (
          <article key={item} className="card-dark">
            <h3 className="font-bold">{item}</h3>
            <p className="mt-2 text-sm text-muted">[TO BE UPDATED]</p>
          </article>
        ))}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {capacityStats.map(([n, s, label]) => (
          <article key={label} className="rounded-lg border border-crimson/10 bg-white p-6 text-center shadow-sm">
            <p className="bg-flame-gradient bg-clip-text text-4xl font-black text-transparent">
              <CountUp value={Number(n)} suffix={s} />
            </p>
            <p className="mt-2 text-muted">{label}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
