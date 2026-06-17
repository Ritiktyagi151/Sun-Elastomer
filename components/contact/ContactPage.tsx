"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  Headphones,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { CountUp, ScrollSlide, SectionHeading, fadeUp, stagger } from "@/components/common/AnimatedPrimitives";
import { contactDetails, productCategories } from "@/data/constants";
import { company } from "@/data/products";

type ContactForm = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  message: string;
};

const contactFields: { name: keyof ContactForm; label: string; type?: string }[] = [
  { name: "name", label: "Full Name" },
  { name: "company", label: "Company Name" },
  { name: "email", label: "Email Address", type: "email" },
  { name: "phone", label: "Phone Number", type: "tel" },
  { name: "country", label: "City / Country" },
];

const inquiryTypes = [
  {
    icon: PackageCheck,
    title: "Product Inquiry",
    text: "Share the product category, dosage form, pack requirement and expected quantity for a faster response.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Documents",
    text: "Request product details, composition references, GST information and commercial documentation support.",
  },
  {
    icon: Headphones,
    title: "Business Support",
    text: "Connect for distribution, institutional supply, recurring procurement and long-term business discussions.",
  },
];

const supportSteps = [
  "Submit your product or business requirement.",
  "Our team reviews the category, dosage form and pack details.",
  "You receive a coordinated response for product availability and next steps.",
  "Dispatch and documentation support is planned as per the discussion.",
];

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(company.address)}&output=embed`;

export function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ScrollSlide direction="right">
        <ContactOverview />
      </ScrollSlide>
      <ScrollSlide direction="left">
        <section className="section bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.05fr_0.95fr]">
            <ContactInquiryForm />
            <ContactInfo />
          </div>
        </section>
      </ScrollSlide>
      <ScrollSlide direction="up">
        <MapSection />
      </ScrollSlide>
      <ScrollSlide direction="right">
        <InquiryCards />
      </ScrollSlide>
      <ScrollSlide direction="up">
        <SupportProcess />
      </ScrollSlide>
    </main>
  );
}

function ContactHero() {
  return (
    <section className="relative h-[550px] overflow-hidden bg-ink px-5 pb-10 pt-24 text-white">
      <Image
        src="/banners/contact-us1.png"
        alt="Pharmaceutical products on a clean medical desk"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* <div className="absolute inset-0 bg-black/62" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-white/80" /> */}

      {/* <motion.div
        className="relative mx-auto grid h-full max-w-7xl items-center gap-8 lg:grid-cols-[1fr_0.75fr]"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <p className="eyebrow bg-white/14 text-golden ring-1 ring-white/20">Contact Sun Elastomers</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-tight md:text-6xl">
            Let us discuss your pharmaceutical product requirement.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/84 md:text-lg">
            Reach our Ghaziabad team for product inquiries, B2B supply coordination, quality documentation and business
            collaboration.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`mailto:${company.contactEmail}`} className="btn-primary px-6 py-3">
              Send Email <Mail size={18} />
            </Link>
            <a href="#contact-form" className="btn-outline border-white/45 bg-white/10 px-6 py-3 text-white">
              Enquiry Form
            </a>
          </div>
        </div>

        <div className="hidden gap-3 md:grid">
          <article className="rounded-lg border border-white/18 bg-white/12 p-4 backdrop-blur">
            <p className="text-3xl font-black text-golden">
              <CountUp value={15} suffix="+" />
            </p>
            <p className="mt-2 text-sm font-bold uppercase text-white/76">Products to inquire about</p>
          </article>
          <article className="rounded-lg border border-white/18 bg-white/12 p-4 backdrop-blur">
            <p className="text-3xl font-black text-golden">
              <CountUp value={6} />
            </p>
            <p className="mt-2 text-sm font-bold uppercase text-white/76">Focused categories</p>
          </article>
        </div>
      </motion.div> */}
    </section>
  );
}

function ContactOverview() {
  const highlights = [
    { icon: MapPin, title: "Registered Location", text: "Industrial Area Sahibabad, Ghaziabad, Uttar Pradesh." },
    { icon: Clock3, title: "Quick Coordination", text: "Share complete details so our team can respond clearly." },
    { icon: Building2, title: "B2B Focus", text: "Support for distributors, institutions and procurement teams." },
  ];

  return (
    <section className="section bg-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading eyebrow="Get In Touch" title="Clear communication for serious business inquiries." />
          <p className="mt-7 leading-8 text-muted">
            Send us your product interest, pack requirement, destination, quantity estimate and preferred timeline. The
            more specific your inquiry, the faster our team can route it to the right contact.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {highlights.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-lg border border-crimson/10 bg-white p-5 shadow-sm">
                <Icon className="text-crimson" size={28} />
                <h3 className="mt-4 font-black text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-lg"
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/homepage-img/manufacturing.png"
            alt="Pharmaceutical manufacturing and medicine products"
            width={980}
            height={980}
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="aspect-[5/4] w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/52" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <p className="flex items-center gap-2 text-sm font-black uppercase text-golden">
              <MessageCircle size={18} /> Product and supply discussions
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-black">
              Connect with the team that coordinates product details and next steps.
            </h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactInquiryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>();
  const [loading, setLoading] = useState(false);

  function onSubmit() {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1200);
  }

  return (
    <motion.form
      id="contact-form"
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55 }}
    >
      <p className="eyebrow">Inquiry Form</p>
      <h2 className="mt-4 font-display text-4xl font-black text-ink">Send your requirement</h2>
      <p className="mt-3 text-sm leading-6 text-muted">
        Add your product interest, quantity, destination and timeline so our team can respond with useful information.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {contactFields.map((field) => (
          <label key={field.name} className="text-sm font-bold">
            {field.label}
            <input className="input" type={field.type || "text"} {...register(field.name, { required: true })} />
            {errors[field.name] ? <span className="text-xs text-crimson">Required</span> : null}
          </label>
        ))}
        <label className="text-sm font-bold">
          Product Interest
          <select className="input" {...register("product", { required: true })}>
            {productCategories.map((item) => (
              <option key={item.title}>{item.title}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-4 block text-sm font-bold">
        Message
        <textarea
          className="input min-h-36"
          placeholder="Mention product, dosage form, pack size, quantity and delivery location."
          {...register("message", { required: true })}
        />
        {errors.message ? <span className="text-xs text-crimson">Required</span> : null}
      </label>
      <button className="btn-primary mt-6 px-6 py-4" disabled={loading}>
        {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} Submit Inquiry
      </button>
    </motion.form>
  );
}

function ContactInfo() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55 }}
    >
      <div className="rounded-lg border border-crimson/10 bg-peach p-6 text-ink shadow-sm">
        <p className="eyebrow">Office Details</p>
        <h2 className="mt-4 font-display text-4xl font-black">Reach our team</h2>
        <div className="mt-7 space-y-5">
          {contactDetails.map(({ icon: Icon, label, value }) => (
            <p key={label} className="flex gap-3 text-muted">
              <Icon className="mt-1 shrink-0 text-crimson" />
              <span>
                <strong className="text-ink">{label}</strong>
                <br />
                {value}
              </span>
            </p>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href={`mailto:${company.contactEmail}`} className="btn-primary px-5 py-3">
            <Mail size={18} /> Email
          </Link>
          <Link href={`tel:${company.contactPhone.replace(/\s+/g, "")}`} className="btn-outline px-5 py-3">
            <Phone size={18} /> Call
          </Link>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg">
        <Image
          src="/banners/b2.jpeg"
          alt="Laboratory professional reviewing a pharmaceutical sample"
          width={900}
          height={430}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="aspect-[16/8] w-full object-cover"
        />
      </div>
    </motion.aside>
  );
}

function MapSection() {
  return (
    <section className="section bg-cream">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Location" title="Visit or route your inquiry to our Ghaziabad office." centered />
        <motion.div
          className="mt-12 grid overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm lg:grid-cols-[0.72fr_1.28fr]"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-6 md:p-8">
            <MapPin className="text-crimson" size={34} />
            <h3 className="mt-5 font-display text-3xl font-black text-ink">{company.shortName}</h3>
            <p className="mt-4 leading-7 text-muted">{company.address}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-7 px-6 py-3"
            >
              Open Map <ArrowRight size={18} />
            </a>
          </div>
          <iframe
            title="Sun Elastomers location map"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[360px] w-full border-0 lg:h-full"
          />
        </motion.div>
      </div>
    </section>
  );
}

function InquiryCards() {
  return (
    <section className="section bg-white">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Inquiry Types" title="Choose the right starting point for your message." centered />
        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {inquiryTypes.map(({ icon: Icon, title, text }) => (
            <motion.article key={title} variants={fadeUp} className="rounded-lg border border-neutral-200 p-6">
              <Icon className="text-crimson" size={30} />
              <h3 className="mt-4 text-xl font-black text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{text}</p>
              <ArrowRight className="mt-5 text-crimson" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SupportProcess() {
  return (
    <section className="section bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="eyebrow bg-white/12 text-golden ring-1 ring-white/20">Response Flow</p>
          <h2 className="mt-4 font-display text-4xl font-black md:text-5xl">What happens after you contact us</h2>
          <p className="mt-5 leading-8 text-white/72">
            A clear inquiry helps us respond with product availability, documentation direction and commercial next
            steps without unnecessary back and forth.
          </p>
        </div>
        <div className="grid gap-4">
          {supportSteps.map((item, index) => (
            <motion.article
              key={item}
              className="flex gap-4 rounded-lg border border-white/12 bg-white/8 p-5"
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.08 }}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-crimson font-black text-white">
                {index + 1}
              </span>
              <p className="leading-7 text-white/78">{item}</p>
            </motion.article>
          ))}
          <motion.div
            className="flex gap-3 rounded-lg border border-golden/30 bg-golden/10 p-5 text-golden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <CheckCircle2 className="mt-1 shrink-0" size={22} />
            <p className="font-bold">For urgent requirements, include product name, pack, quantity and delivery city.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
