"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck, Factory, FlaskConical, PackageCheck, ShieldCheck } from "lucide-react";
import { CountUp, ScrollSlide, SectionHeading, fadeUp, stagger } from "@/components/common/AnimatedPrimitives";

const processSteps = [
  {
    title: "Material Planning",
    text: "Approved materials and product requirements are reviewed before production coordination begins.",
  },
  {
    title: "Controlled Production",
    text: "Manufacturing activity is coordinated with dosage form, batch, packaging and product specification needs.",
  },
  {
    title: "In-process Checks",
    text: "Visual, dimensional and documentation checkpoints help maintain consistency through the production flow.",
  },
  {
    title: "Quality Review",
    text: "Finished goods move through quality review, label verification and product documentation checks.",
  },
  {
    title: "Packing & Dispatch",
    text: "Products are packed and routed for dispatch with attention to buyer instructions and commercial records.",
  },
];

const facilityItems = [
  {
    icon: Factory,
    title: "Production Coordination",
    text: "Organized manufacturing support for tablets, capsules, dry powder injections, suspensions, sachets and ointment.",
  },
  {
    icon: FlaskConical,
    title: "QC Support",
    text: "Quality checks are aligned with product specifications, batch records and buyer documentation expectations.",
  },
  {
    icon: PackageCheck,
    title: "Packing Discipline",
    text: "Packing and labeling coordination keeps product identity, pack format and handling instructions clear.",
  },
  {
    icon: ClipboardCheck,
    title: "Traceable Records",
    text: "Commercial and product details are organized for smoother discussions with procurement and distribution teams.",
  },
];

const capacityStats = [
  ["15", "+", "Listed Products"],
  ["6", "", "Product Categories"],
  ["2018", "", "GST Registration"],
];

const externalImages = [
  {
    src: "https://images.unsplash.com/photo-1581093458791-9d42cc030d59?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern industrial production equipment",
    title: "Production discipline",
  },
  {
    src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80",
    alt: "Laboratory team working with pharmaceutical samples",
    title: "Quality review",
  },
];

export function ManufacturingPage() {
  return (
    <main>
      <ManufacturingHero />
      <ScrollSlide direction="right">
        <ManufacturingIntro />
      </ScrollSlide>
      <ScrollSlide direction="up">
        <ProcessFlow />
      </ScrollSlide>
      <ScrollSlide direction="left">
        <FacilityGrid />
      </ScrollSlide>
      <ScrollSlide direction="up">
        <ImageStory />
      </ScrollSlide>
    </main>
  );
}

function ManufacturingHero() {
  return (
    <section className="relative h-[550px] overflow-hidden bg-ink px-5 pb-10 pt-24 text-white">
      <Image
        src="/banners/manufacturingbanner.png"
        alt="Pharmaceutical manufacturing line"
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
        <p className="eyebrow bg-white/14 text-golden ring-1 ring-white/20">Manufacturing</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-black leading-tight md:text-6xl">
          Controlled coordination for dependable pharmaceutical supply.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/84 md:text-lg">
          From product planning to quality review and dispatch, our manufacturing approach is structured for consistent
          B2B supply.
        </p>
      </motion.div> */}
    </section>
  );
}

function ManufacturingIntro() {
  return (
    <section className="section bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeading eyebrow="Infrastructure" title="Practical systems for product movement." />
          <p className="mt-7 leading-8 text-muted">
            Sun Elastomers supports pharmaceutical product supply through organized production coordination, product
            specification review, quality checkpoints and dispatch planning. The emphasis is on repeatable execution and
            clear buyer communication.
          </p>
          <Link href="/contact" className="btn-primary mt-7 px-6 py-3">
            Discuss Requirement <ArrowRight size={18} />
          </Link>
        </motion.div>
        <motion.div
          className="grid grid-cols-3 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {capacityStats.map(([n, s, label]) => (
            <motion.article key={label} variants={fadeUp} className="rounded-lg border border-crimson/10 p-5 text-center shadow-sm">
              <p className="text-3xl font-black text-crimson md:text-4xl">
                <CountUp value={Number(n)} suffix={s} />
              </p>
              <p className="mt-2 text-sm font-bold text-muted">{label}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProcessFlow() {
  return (
    <section className="section bg-cream">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Process Flow" title="A clear path from requirement to dispatch." centered />
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
              key={step.title}
              className="relative rounded-lg border border-neutral-200 bg-white p-5 text-center shadow-sm"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.06 }}
            >
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-crimson font-black text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 font-black">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FacilityGrid() {
  return (
    <section className="section bg-white">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Facility Focus" title="Manufacturing support built around accountability." centered />
        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {facilityItems.map(({ icon: Icon, title, text }) => (
            <motion.article key={title} variants={fadeUp} className="card-dark">
              <Icon className="text-crimson" size={32} />
              <h3 className="mt-4 font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ImageStory() {
  return (
    <section className="section bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-2">
        {externalImages.map((image) => (
          <motion.article
            key={image.title}
            className="relative min-h-[360px] overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/56" />
            <div className="absolute bottom-0 left-0 p-6">
              <ShieldCheck className="text-golden" size={30} />
              <h3 className="mt-4 font-display text-3xl font-black">{image.title}</h3>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
