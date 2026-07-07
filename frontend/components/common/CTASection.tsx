import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection({
  title,
  text,
  href = "/contact",
  label = "Contact Us",
}: {
  title: string;
  text: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="section bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-5">
        <div className="rounded-lg border border-crimson/10 bg-white p-8 shadow-sm">
          <h2 className="gradient-heading font-display text-4xl font-bold">{title}</h2>
          <p className="mt-3 max-w-3xl text-muted">{text}</p>
          <Link href={href} className="btn-primary mt-6 inline-flex px-6 py-4">
            {label} <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
