import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileText, PackageCheck, ShieldCheck } from "lucide-react";
import { pageDescriptions } from "@/data/constants";
import { company } from "@/data/products";
import { createPageMetadata } from "@/lib/seo";

const terms = [
  {
    title: "Website use",
    text: "This website is provided for company, product and inquiry information. Content may not be copied, misrepresented or used for unlawful, misleading or unauthorized commercial purposes.",
  },
  {
    title: "Inquiry communication",
    text: "Details submitted through forms, phone, email or WhatsApp are treated as business inquiries. Our team may contact you to confirm product interest, quantity, destination and documentation requirements.",
  },
  {
    title: "Product reference",
    text: "Product names, strengths, compositions, dosage forms and pack details are shown for B2B reference. Final product suitability and regulatory use must be reviewed by the buyer.",
  },
  {
    title: "Order acceptance",
    text: "No inquiry becomes a confirmed order until Sun Elastomers Private Limited issues written acceptance, a proforma invoice, purchase confirmation or another agreed commercial confirmation.",
  },
];

const facts = [
  { icon: ShieldCheck, label: "GSTIN", value: company.gstin },
  { icon: FileText, label: "Company Type", value: company.constitution },
  { icon: ClipboardCheck, label: "Registration Type", value: company.registrationType },
  { icon: PackageCheck, label: "Product Scope", value: "Pharmaceutical B2B supply inquiries" },
];

export function generateMetadata() {
  return createPageMetadata({
    title: "Terms",
    path: "/terms",
    description: pageDescriptions.terms,
    keywords: ["Sun Elastomers terms", "pharmaceutical inquiry terms", "Sun Elastomers website terms"],
  });
}

export default function Page() {
  return (
    <main>
      <section className="bg-ink px-5 pb-16 pt-32 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow bg-white/10 text-white ring-1 ring-white/20">Legal Information</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-black leading-tight md:text-6xl">Terms</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/74 md:text-lg">
            These terms explain how {company.name} handles website use, product inquiries and order communication.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/conditions" className="btn-primary px-6 py-3">
              View Conditions <ArrowRight size={18} />
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
            <h2 className="font-display text-3xl font-black text-ink">Company details</h2>
            <div className="mt-6 grid gap-4">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-lg bg-white p-4 shadow-sm">
                  <Icon className="text-crimson" size={24} />
                  <p className="mt-3 text-xs font-black uppercase text-muted">{label}</p>
                  <p className="mt-1 text-sm font-bold leading-6 text-ink">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-muted">Registered office: {company.address}</p>
          </aside>

          <div className="grid gap-5">
            {terms.map((item, index) => (
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
