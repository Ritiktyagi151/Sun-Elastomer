"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, Mail, Database } from "lucide-react";
import { company } from "@/data/products";
import { getBannerSrc } from "@/lib/utils";

const policies = [
  {
    title: "Information We Collect",
    text: "We collect information you submit directly to us through website forms, email, phone, or WhatsApp. This includes your name, business email address, phone number, company name, delivery requirements, and specific products of interest.",
  },
  {
    title: "How We Use Your Data",
    text: "Your contact and business details are used exclusively to process your product inquiries, verify B2B buyer eligibility, share composition details, coordinate logistics, and issue commercial invoices or price quotes.",
  },
  {
    title: "Data Security and Protection",
    text: "We maintain appropriate organizational and technical measures to protect your commercial details. We restrict access to authorized manufacturing partners and logistical coordinators strictly on a need-to-know basis.",
  },
  {
    title: "No Third-Party Sharing",
    text: "We do not sell, trade, rent, or lease your business details to third parties for marketing purposes. Your information is only shared with trusted transport or certification agents to complete confirmed orders.",
  },
  {
    title: "Your Rights and Contact",
    text: "You can request access, corrections, or complete deletion of your submitted commercial info from our database at any time. For privacy inquiries, email us at info@sunelastomerspharma.com.",
  },
];

const privacyFacts = [
  { icon: ShieldCheck, label: "Data Purpose", value: "B2B client inquiries & billing" },
  { icon: Database, label: "Storage Location", value: "Secure servers" },
  { icon: ShieldAlert, label: "Encryption", value: "SSL protected connections" },
  { icon: Mail, label: "Support Contact", value: company.contactEmail },
];

export default function Page() {
  const bannerImage = "/banners/banner.jpeg";

  return (
    <main>
      {/* Banner Section */}
      <section className="relative h-[280px] md:h-[450px] w-full overflow-hidden bg-ink pt-16 md:pt-24 text-white">
        {/* Desktop Image */}
        <div className="hidden md:block absolute inset-0">
          <Image src={getBannerSrc(bannerImage, "desktop")} alt="Privacy Policy banner" fill priority sizes="100vw" className="object-cover object-center" />
        </div>
        {/* Mobile Image */}
        <div className="block md:hidden absolute inset-0">
          <Image src={getBannerSrc(bannerImage, "mobile")} alt="Privacy Policy banner" fill priority sizes="100vw" className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="absolute inset-0 flex items-center z-20">
          <div className="mx-auto w-full max-w-7xl px-8 lg:px-1 flex flex-col items-start">
            <motion.div
              key="privacy-policy"
              className="border-l-[6px] border-crimson pl-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-golden">
                  Legal Information
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Privacy Policy
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section bg-cream py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Side Info Panel */}
          <aside className="h-fit rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-2xl font-black text-ink">Privacy Summary</h2>
            <div className="mt-6 grid gap-4">
              {privacyFacts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-lg bg-neutral-50 p-4 border border-neutral-100">
                  <Icon className="text-crimson" size={24} />
                  <p className="mt-3 text-xs font-black uppercase text-muted">{label}</p>
                  <p className="mt-1 text-sm font-bold leading-6 text-ink">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-muted">
              For any questions regarding your data safety, please reach out to us at our main office address.
            </p>
          </aside>

          {/* Detailed Policies List */}
          <div className="grid gap-5">
            {policies.map((item, index) => (
              <article
                key={item.title}
                className="scroll-mt-28 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-black uppercase text-crimson">0{index + 1}</p>
                <h2 className="mt-2 font-display text-xl font-black text-ink">{item.title}</h2>
                <p className="mt-3 leading-7 text-muted text-sm">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
