"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck, FileText, PackageCheck, ShieldCheck } from "lucide-react";
import { company } from "@/data/products";
import { getBannerSrc } from "@/lib/utils";

const terms = [
  {
    title: "Business Inquiry Basis",
    text: "Information submitted through this website is treated as a product inquiry. Final availability, commercial terms, pricing, quantities, delivery timelines and documentation requirements are confirmed only after direct communication with our team.",
  },
  {
    title: "Product Information",
    text: "Product names, compositions, strengths, dosage forms, pack details and category information are provided for B2B reference. Buyers should verify suitability, regulatory requirements and intended use before placing any order.",
  },
  {
    title: "Order Confirmation",
    text: "No order is considered accepted until Sun Elastomers Private Limited issues a written confirmation, proforma invoice, purchase acceptance or other agreed commercial confirmation.",
  },
  {
    title: "Quality & Documentation",
    text: "Applicable product documents, batch details, packing information and quality-related records are shared as per confirmed buyer requirements, product scope and regulatory availability.",
  },
  {
    title: "Dispatch & Delivery",
    text: "Dispatch schedules depend on confirmed order terms, stock status, production coordination, payment status, logistics availability and destination requirements.",
  },
  {
    title: "Website Use",
    text: "Website content may not be copied, misrepresented or used for unlawful, misleading or unauthorized commercial purposes. Sun Elastomers Private Limited may update website content at any time.",
  },
];

const quickFacts = [
  { icon: ShieldCheck, label: "GSTIN", value: company.gstin },
  { icon: FileText, label: "Company Type", value: company.constitution },
  { icon: ClipboardCheck, label: "Registration Type", value: company.registrationType },
  { icon: PackageCheck, label: "Product Scope", value: "Pharmaceutical B2B supply inquiries" },
];

export default function Page() {
  const bannerImage = "/banners/banner.jpeg";

  return (
    <main>
      {/* Banner Section */}
      <section className="relative h-[280px] md:h-[450px] w-full overflow-hidden bg-ink pt-16 md:pt-24 text-white">
        {/* Desktop Image */}
        <div className="hidden md:block absolute inset-0">
          <Image src={getBannerSrc(bannerImage, "desktop")} alt="Terms and Conditions banner" fill priority sizes="100vw" className="object-cover object-center" />
        </div>
        {/* Mobile Image */}
        <div className="block md:hidden absolute inset-0">
          <Image src={getBannerSrc(bannerImage, "mobile")} alt="Terms and Conditions banner" fill priority sizes="100vw" className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="absolute inset-0 flex items-center z-20">
          <div className="mx-auto w-full max-w-7xl px-8 lg:px-1 flex flex-col items-start">
            <motion.div
              key="terms-conditions"
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
                Terms & Conditions
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
            <h2 className="font-display text-2xl font-black text-ink">Company details</h2>
            <div className="mt-6 grid gap-4">
              {quickFacts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-lg bg-neutral-50 p-4 border border-neutral-100">
                  <Icon className="text-crimson" size={24} />
                  <p className="mt-3 text-xs font-black uppercase text-muted">{label}</p>
                  <p className="mt-1 text-sm font-bold leading-6 text-ink">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-muted">
              Registered office: {company.address}
            </p>
          </aside>

          {/* Detailed Terms List */}
          <div className="grid gap-5">
            {terms.map((item, index) => (
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
