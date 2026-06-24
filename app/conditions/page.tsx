import Link from "next/link";
import { ArrowRight, CheckCircle2, FileCheck2, PackageCheck, Truck } from "lucide-react";
import { pageDescriptions } from "@/data/constants";
import { company } from "@/data/products";
import { createPageMetadata } from "@/lib/seo";

const conditions = [
  {
    title: "Buyer verification",
    text: "Buyers are responsible for sharing accurate business details, delivery information, product requirements and any regulatory or documentation expectations before order confirmation.",
  },
  {
    title: "Pricing and payment",
    text: "Pricing, taxes, freight, payment schedule and commercial terms are confirmed separately for each inquiry or purchase order. Dispatch may depend on agreed payment status.",
  },
  {
    title: "Availability and substitution",
    text: "Product availability, pack format, batch details and dispatch timing may vary. Any substitute, revised pack or changed specification must be confirmed in writing before supply.",
  },
  {
    title: "Quality documentation",
    text: "Applicable product documents, batch details, packing information and quality-related records are shared according to confirmed buyer requirements and product scope.",
  },
  {
    title: "Dispatch responsibility",
    text: "Dispatch schedules depend on confirmed order terms, stock status, production coordination, logistics availability and destination requirements.",
  },
];

const highlights = [
  { icon: CheckCircle2, label: "Written confirmation required" },
  { icon: FileCheck2, label: "Documentation as applicable" },
  { icon: PackageCheck, label: "Pack details verified per order" },
  { icon: Truck, label: "Dispatch after commercial coordination" },
];

export function generateMetadata() {
  return createPageMetadata({
    title: "Conditions",
    path: "/conditions",
    description: pageDescriptions.conditions,
    keywords: ["Sun Elastomers conditions", "pharmaceutical supply conditions", "B2B pharma dispatch conditions"],
  });
}

export default function Page() {
  return (
    <main>
      <section className="bg-ink px-5 pb-16 pt-32 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow bg-white/10 text-white ring-1 ring-white/20">Legal Information</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-black leading-tight md:text-6xl">Conditions</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/74 md:text-lg">
            These conditions outline buyer responsibilities, commercial confirmation, documentation and dispatch
            coordination for {company.name}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/terms" className="btn-primary px-6 py-3">
              View Terms <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="btn-outline px-6 py-3">
              Contact Team
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="h-fit rounded-lg border border-neutral-200 bg-cream p-6">
            <h2 className="font-display text-3xl font-black text-ink">Key conditions</h2>
            <div className="mt-6 grid gap-4">
              {highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                  <Icon className="shrink-0 text-crimson" size={24} />
                  <p className="text-sm font-bold leading-6 text-ink">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-muted">
              For order-specific conditions, contact {company.contactEmail} or call {company.contactPhone}.
            </p>
          </aside>

          <div className="grid gap-5">
            {conditions.map((item, index) => (
              <article key={item.title} className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-black uppercase text-crimson">0{index + 1}</p>
                <h2 className="mt-2 font-display text-2xl font-black text-ink">{item.title}</h2>
                <p className="mt-3 leading-7 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
