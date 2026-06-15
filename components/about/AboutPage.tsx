"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  FlaskConical,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Target,
} from "lucide-react";
import { CountUp, ScrollSlide, SectionHeading, fadeUp, stagger } from "@/components/common/AnimatedPrimitives";
import { values } from "@/data/constants";
import { company, companyFacts, leaders, offerCategories, products } from "@/data/products";

const storyStats = [
  { value: 15, suffix: "+", label: "Pharmaceutical products" },
  { value: 6, suffix: "", label: "Therapeutic categories" },
  { value: 2018, suffix: "", label: "GST registration year" },
];

const strengths = [
  {
    icon: ShieldCheck,
    title: "Quality-led supply",
    text: "Every product program is supported by disciplined documentation, batch awareness and a practical quality mindset.",
  },
  {
    icon: FlaskConical,
    title: "Focused product portfolio",
    text: "The range covers injectables, tablets, capsules, suspensions, sachets and ointment formats for B2B buyers.",
  },
  {
    icon: PackageCheck,
    title: "Reliable commercial support",
    text: "Our team supports product inquiries, pack discussions, dispatch coordination and long-term supply planning.",
  },
];

const workingPrinciples = [
  "Understand buyer requirements before recommending a product or pack format.",
  "Keep specifications, composition details and documentation clear for every discussion.",
  "Coordinate manufacturing, quality review, packing and dispatch with accountability.",
  "Build durable relationships with distributors, institutions and business partners.",
];

export function AboutPage() {
  return (
    <main>
      <AboutHero />
      <ScrollSlide direction="right">
        <CompanyStory />
      </ScrollSlide>
      <ScrollSlide direction="up">
        <StrengthSection />
      </ScrollSlide>
      <ScrollSlide direction="left">
        <ProductFocus />
      </ScrollSlide>
      <ScrollSlide direction="up">
        <VisionMission />
      </ScrollSlide>
      <ScrollSlide direction="right">
        <LeadershipSection />
      </ScrollSlide>
      <ScrollSlide direction="left">
        <WorkingCulture />
      </ScrollSlide>
      <ScrollSlide direction="up">
        <CoreValues />
      </ScrollSlide>
    </main>
  );
}

function AboutHero() {
  return (
    <section className="relative h-[450px] overflow-hidden bg-ink px-5 pb-10 pt-24 text-white">
      <Image
        src="/banners/b3.jpeg"
        alt="Quality laboratory professional reviewing pharmaceutical samples"
        fill
        priority
        sizes="100vw"
        className="object-cover h-full object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/58 to-black/12" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white to-transparent" />

      <motion.div
        className="relative mx-auto grid h-full max-w-7xl items-center gap-8 lg:grid-cols-[1fr_0.85fr]"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <p className="eyebrow bg-white/14 text-golden ring-1 ring-white/20">About Sun Elastomers</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-tight md:text-6xl">
            About Sun Elastomers
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/84 md:text-lg">
            {company.name} is a Ghaziabad based private limited pharmaceutical company serving buyers with a focused
            portfolio across antibiotics, CNS, antidiabetic, dermatology and gastroenterology segments.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/products" className="btn-primary px-6 py-3">
              View Products <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="btn-outline border-white/45 bg-white/10 px-6 py-3 text-white">
              Contact Team
            </Link>
          </div>
        </div>

        <div className="hidden gap-3 md:grid md:grid-cols-3 lg:grid-cols-1">
          {storyStats.map((item) => (
            <article key={item.label} className="rounded-lg border border-white/18 bg-white/12 p-4 backdrop-blur">
              <p className="text-3xl font-black text-golden">
                <CountUp value={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-2 text-sm font-bold uppercase text-white/76">{item.label}</p>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function CompanyStory() {
  return (
    <section className="section bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="overflow-hidden rounded-lg shadow-2xl shadow-crimson/10">
            <Image
              src="/homepage-img/manufacturing.png"
              alt="Pharmaceutical manufacturing line with packed medicines"
              width={900}
              height={900}
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-5 right-5 rounded-lg border border-crimson/10 bg-white p-5 shadow-xl md:left-auto md:w-72">
            <p className="text-sm font-black uppercase text-crimson">Registered Office</p>
            <p className="mt-2 text-sm leading-6 text-muted">{company.address}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading eyebrow="Who We Are" title="Committed to dependable pharmaceutical supply." />
          <div className="mt-7 space-y-5 text-muted">
            <p>
              Sun Elastomers Private Limited operates from Industrial Area Sahibabad, Ghaziabad, Uttar Pradesh. The
              company is GST registered as a regular private limited company and serves healthcare trade requirements
              through a focused pharmaceutical product portfolio.
            </p>
            <p>
              Our work is centered on consistency: clear product information, careful coordination, practical quality
              checks and responsive support for buyers who need reliable supply across multiple dosage forms.
            </p>
            <p>
              From dry powder injections and film coated tablets to oral suspensions, capsules, sachets and ointment, we
              keep the portfolio organized so partners can evaluate, discuss and source products with confidence.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {companyFacts.map(({ icon: Icon, label, value }) => (
              <article key={label} className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
                <Icon className="text-crimson" size={28} />
                <h3 className="mt-4 font-bold text-ink">{label}</h3>
                <p className="mt-1 text-sm text-muted">{value}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StrengthSection() {
  return (
    <section className="section bg-cream">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Our Strength" title="Built for buyers who value discipline." centered />
        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {strengths.map(({ icon: Icon, title, text }) => (
            <motion.article key={title} variants={fadeUp} className="card-dark">
              <Icon className="text-crimson" size={34} />
              <h3 className="mt-5 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProductFocus() {
  return (
    <section className="section bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="Product Focus" title="A clear range across essential segments." />
          <p className="mt-7 leading-8 text-muted">
            The portfolio includes {products.length} products across injectable antibiotics, oral antibiotics,
            neuropathic and CNS care, antidiabetic products, dermatology and gastroenterology.
          </p>
          <div className="mt-8 overflow-hidden rounded-lg">
            <Image
              src="/homepage-img/medicine.jpg"
              alt="Medicine tablets moving through a pharmaceutical production line"
              width={900}
              height={540}
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="aspect-[5/3] w-full object-cover"
            />
          </div>
        </div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {offerCategories.map(({ icon: Icon, title, text }) => (
            <motion.article key={title} variants={fadeUp} className="rounded-lg border border-neutral-200 p-5">
              <Icon className="text-flame" size={28} />
              <h3 className="mt-4 font-black text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function VisionMission() {
  const cards = [
    {
      icon: Target,
      title: "Vision",
      text: "To become a trusted pharmaceutical supply partner known for dependable products, transparent communication and quality-focused growth.",
    },
    {
      icon: BadgeCheck,
      title: "Mission",
      text: "To support healthcare businesses with organized product information, careful coordination, reliable packaging and responsive B2B service.",
    },
  ];

  return (
    <section className="section bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2">
        {cards.map(({ icon: Icon, title, text }) => (
          <motion.article
            key={title}
            className="rounded-lg border border-white/12 bg-white/8 p-8"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 28 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Icon className="text-golden" size={38} />
            <h2 className="mt-5 font-display text-4xl font-black">{title}</h2>
            <p className="mt-4 leading-8 text-white/72">{text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function LeadershipSection() {
  return (
    <section className="section bg-white">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Leadership" title="Experienced directors guiding the company." centered />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {leaders.map(({ name, role, state }) => (
            <motion.article
              key={name}
              className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="grid h-16 w-16 place-items-center rounded-full bg-flame-gradient text-xl font-black text-white">
                {name
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")}
              </div>
              <h3 className="mt-5 text-xl font-black text-ink">{name}</h3>
              <p className="mt-1 text-sm font-bold text-crimson">{role}</p>
              <p className="mt-3 flex items-center gap-2 text-sm text-muted">
                <MapPin size={16} /> {state}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkingCulture() {
  return (
    <section className="section bg-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="How We Work" title="Clear steps, careful coordination." />
          <div className="mt-8 space-y-4">
            {workingPrinciples.map((item) => (
              <motion.div
                key={item}
                className="flex gap-3 rounded-lg bg-white p-5 shadow-sm"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <CheckCircle2 className="mt-1 shrink-0 text-crimson" size={22} />
                <p className="text-sm leading-6 text-muted">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg">
          <Image
            src="/banners/b2.jpeg"
            alt="Quality control professional inspecting a pharmaceutical sample"
            width={900}
            height={510}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[16/10] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/62 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <p className="flex items-center gap-2 text-sm font-black uppercase text-golden">
              <ClipboardCheck size={18} /> Quality and documentation
            </p>
            <h3 className="mt-3 max-w-xl font-display text-3xl font-black">
              Practical systems for product confidence and buyer trust.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoreValues() {
  return (
    <section className="section bg-white">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Core Values" title="The standards behind our everyday decisions." centered />
        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {values.map(({ icon: Icon, title, text }) => (
            <motion.article key={title} variants={fadeUp} className="rounded-lg border border-neutral-200 p-6">
              <Icon className="text-crimson" size={30} />
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
