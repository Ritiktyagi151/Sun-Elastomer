import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileText, PackageCheck, ShieldCheck } from "lucide-react";
import { pageDescriptions } from "@/data/constants";
import { company } from "@/data/products";
import { createPageMetadata } from "@/lib/seo";

const terms = [
  {
    title: "Business inquiry basis",
    text: "Information submitted through this website is treated as a product inquiry. Final availability, commercial terms, pricing, quantities, delivery timelines and documentation requirements are confirmed only after direct communication with our team.",
  },
  {
    title: "Product information",
    text: "Product names, compositions, strengths, dosage forms, pack details and category information are provided for B2B reference. Buyers should verify suitability, regulatory requirements and intended use before placing any order.",
  },
  {
    title: "Order confirmation",
    text: "No order is considered accepted until Sun Elastomers Private Limited issues a written confirmation, proforma invoice, purchase acceptance or other agreed commercial confirmation.",
  },
  {
    title: "Quality and documentation",
    text: "Applicable product documents, batch details, packing information and quality-related records are shared as per confirmed buyer requirements, product scope and regulatory availability.",
  },
  {
    title: "Dispatch and delivery",
    text: "Dispatch schedules depend on confirmed order terms, stock status, production coordination, payment status, logistics availability and destination requirements.",
  },
  {
    title: "Website use",
    text: "Website content may not be copied, misrepresented or used for unlawful, misleading or unauthorized commercial purposes. Sun Elastomers Private Limited may update website content at any time.",
  },
];

const quickFacts = [
  { icon: ShieldCheck, label: "GSTIN", value: company.gstin },
  { icon: FileText, label: "Company Type", value: company.constitution },
  { icon: ClipboardCheck, label: "Registration Type", value: company.registrationType },
  { icon: PackageCheck, label: "Product Scope", value: "Pharmaceutical B2B supply inquiries" },
];

export function generateMetadata() {
  return createPageMetadata({
    title: "Terms & Conditions",
    path: "/terms-and-conditions",
    description: pageDescriptions.terms,
    keywords: [
      "Sun Elastomers terms and conditions",
      "pharmaceutical product inquiry terms",
      "Sun Elastomers business terms",
    ],
  });
}

export default function Page() {
  return (
    <main>
      <section className="bg-ink px-5 pb-16 pt-32 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow bg-white/10 text-white ring-1 ring-white/20">Legal Information</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-black leading-tight md:text-6xl">
            Terms & Conditions
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/74 md:text-lg">
            Please review these terms before using this website or sending a product requirement to{" "}
            {company.name}. These terms support clear B2B communication and order coordination.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary px-6 py-3">
              Contact Team <ArrowRight size={18} />
            </Link>
            <Link href="/products" className="btn-outline px-6 py-3">
              View Products
            </Link>
          </div>
        </div>
      </section>

      <section id="terms" className="section scroll-mt-28 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="h-fit rounded-lg border border-neutral-200 bg-cream p-6">
            <h2 className="font-display text-3xl font-black text-ink">Company details</h2>
            <div className="mt-6 grid gap-4">
              {quickFacts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-lg bg-white p-4 shadow-sm">
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

          <div className="grid gap-5">
            {terms.map((item, index) => (
              <article
                id={index === 2 ? "conditions" : undefined}
                key={item.title}
                className="scroll-mt-28 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
              >
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
