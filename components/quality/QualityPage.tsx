"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, ClipboardCheck, Eye, Microscope, PackageCheck, Ruler, ShieldCheck } from "lucide-react";
import { ScrollSlide, SectionHeading, fadeUp, stagger } from "@/components/common/AnimatedPrimitives";

const tests = [
  {
    title: "Dimensional Inspection",
    text: "Product dimensions and pack details are checked against agreed product expectations before movement.",
  },
  {
    title: "Visual Defect Check",
    text: "Finished goods are reviewed for visible defects, clarity of labeling and overall presentation quality.",
  },
  {
    title: "Batch Traceability",
    text: "Batch identity, product details and commercial references are kept organized for buyer confidence.",
  },
  {
    title: "Packaging Inspection",
    text: "Packing condition, product identity and handling requirements are reviewed before dispatch coordination.",
  },
  {
    title: "Compatibility Review",
    text: "Product form, pack and buyer requirement are reviewed together to reduce mismatch during supply discussions.",
  },
  {
    title: "Documentation Check",
    text: "Inquiry, product, GST and commercial details are aligned so procurement teams can move quickly.",
  },
];

const labItems = [
  { icon: Microscope, title: "Sample Review", text: "Structured observation for product and packaging presentation." },
  { icon: Ruler, title: "Specification Check", text: "Review of product details, strength, pack and dosage form." },
  { icon: ClipboardCheck, title: "Record Control", text: "Organized batch and commercial information handling." },
  { icon: PackageCheck, title: "Final Release", text: "Dispatch readiness checks before product movement." },
];

const qualityFlow = ["Requirement", "Specification", "Inspection", "Documentation", "Dispatch"];

export function QualityPage() {
  const [open, setOpen] = useState(0);

  return (
    <main>
      <QualityHero />
      <ScrollSlide direction="up">
        <QualityStatement />
      </ScrollSlide>
      <ScrollSlide direction="right">
        <section className="section bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, x: -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <SectionHeading eyebrow="Testing Focus" title="Quality checks that support consistent supply." />
              <div className="mt-10 space-y-3">
                {tests.map((test, index) => (
                  <QualityAccordionItem
                    key={test.title}
                    title={test.title}
                    text={test.text}
                    isOpen={open === index}
                    onToggle={() => setOpen(open === index ? -1 : index)}
                  />
                ))}
              </div>
            </motion.div>
            <QualityImagePanel />
          </div>
        </section>
      </ScrollSlide>
      <ScrollSlide direction="left">
        <LabEquipment />
      </ScrollSlide>
      <ScrollSlide direction="up">
        <QualityFlow />
      </ScrollSlide>
    </main>
  );
}

function QualityHero() {
  return (
    <section className="relative h-[550px] overflow-hidden bg-ink px-5 pb-10 pt-24 text-white">
      <Image
        src="/banners/quality-banner.png"
        alt="Quality professional checking a sample in laboratory"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* <div className="absolute inset-0 bg-black/62" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-white/80" /> */}
      {/* <motion.div
        className="relative mx-auto flex h-full max-w-7xl flex-col justify-center"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="eyebrow bg-white/14 text-golden ring-1 ring-white/20">Quality Assurance</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-black leading-tight md:text-6xl">
          Quality systems designed for dependable pharmaceutical supply.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/84 md:text-lg">
          We focus on clear specifications, inspection discipline, documentation support and accountable dispatch
          coordination.
        </p>
      </motion.div> */}
    </section>
  );
}

function QualityStatement() {
  return (
    <section className="section bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[1fr_0.9fr]">
        <motion.blockquote
          className="border-l-4 border-crimson pl-6 font-display text-3xl leading-snug text-ink md:text-4xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Quality is embedded from requirement review to dispatch, with each stage designed for clarity, consistency and
          accountability.
        </motion.blockquote>
        <motion.div
          className="rounded-lg border border-crimson/10 bg-cream p-6"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <ShieldCheck className="text-crimson" size={34} />
          <h2 className="mt-4 font-display text-3xl font-black">Buyer confidence comes from process clarity.</h2>
          <p className="mt-3 leading-7 text-muted">
            Our quality approach supports product discussions, procurement decisions and dispatch planning with organized
            information and practical review points.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function QualityAccordionItem({
  title,
  text,
  isOpen,
  onToggle,
}: {
  title: string;
  text: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="rounded-lg border border-neutral-200 bg-white">
      <button onClick={onToggle} className="flex w-full items-center justify-between p-5 text-left font-bold">
        {title}
        <ChevronDown className={`text-crimson transition ${isOpen ? "rotate-180" : ""}`} size={20} />
      </button>
      <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0 }} className="overflow-hidden">
        <p className="px-5 pb-5 text-sm leading-6 text-neutral-600">{text}</p>
      </motion.div>
    </article>
  );
}

function QualityImagePanel() {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg"
      initial={{ opacity: 0, x: 36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Image
        src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80"
        alt="Laboratory quality control review"
        width={900}
        height={900}
        sizes="(min-width: 1024px) 48vw, 100vw"
        className="aspect-[5/4] w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/56" />
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <Eye className="text-golden" size={30} />
        <h3 className="mt-4 max-w-lg font-display text-3xl font-black">Inspection-led confidence for every inquiry.</h3>
      </div>
    </motion.div>
  );
}

function LabEquipment() {
  return (
    <section className="section bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="QC Flow" title="Review points across the product journey." centered />
        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {labItems.map(({ icon: Icon, title, text }) => (
            <motion.article variants={fadeUp} className="card-dark" key={title}>
              <Icon className="text-crimson" size={30} />
              <h3 className="mt-4 font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function QualityFlow() {
  return (
    <section className="section bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Quality Path" title="Simple, visible, repeatable." centered />
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {qualityFlow.map((item, index) => (
            <motion.article
              key={item}
              className="rounded-lg border border-white/12 bg-white/8 p-5 text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.07 }}
            >
              <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-crimson font-black">
                {index + 1}
              </span>
              <h3 className="mt-4 font-black">{item}</h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
