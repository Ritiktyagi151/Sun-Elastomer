"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/AnimatedPrimitives";
import { PageHero } from "@/components/common/PageBanner";

const tests = [
  "Dimensional Inspection",
  "Hardness Test",
  "Extractables Review",
  "Visual Defect Check",
  "Compression Set",
  "Compatibility Review",
  "Batch Traceability",
  "Packaging Inspection",
];

const labItems = ["Microscope", "Durometer", "Gauge", "Batch Records"];

export function QualityPage() {
  const [open, setOpen] = useState(0);

  return (
    <main>
      <PageHero
        title="Quality Assurance"
        text="Quality systems, testing procedures and documentation practices for regulated pharmaceutical buyers."
      />
      <section className="section bg-white">
        <div className="mx-auto max-w-4xl px-5">
          <blockquote className="border-l-4 border-crimson pl-6 font-display text-3xl leading-snug text-ink">
            Quality is embedded from material selection to final dispatch, with every stage designed for consistency and
            accountability.
          </blockquote>
          <div className="mt-12 space-y-3">
            {tests.map((test, index) => (
              <QualityAccordionItem
                key={test}
                title={test}
                isOpen={open === index}
                onToggle={() => setOpen(open === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </section>
      <LabEquipment />
    </main>
  );
}

function QualityAccordionItem({ title, isOpen, onToggle }: { title: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <article className="rounded-lg border border-neutral-200">
      <button onClick={onToggle} className="flex w-full justify-between p-5 text-left font-bold">
        {title}
        <span>+</span>
      </button>
      <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0 }} className="overflow-hidden">
        <p className="px-5 pb-5 text-sm text-neutral-600">Detailed procedure description [TO BE UPDATED].</p>
      </motion.div>
    </article>
  );
}

function LabEquipment() {
  return (
    <section className="section bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading title="Lab Equipment & QC Flow" centered />
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {labItems.map((item) => (
            <article className="card-dark" key={item}>
              {item}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
