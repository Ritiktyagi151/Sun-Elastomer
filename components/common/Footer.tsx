"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { contactDetails, navLinks, productCategories } from "@/data/constants";
import { company } from "@/data/products";
import { SocialBrandIcon } from "./SocialBrandIcon";

export function Footer() {
  const socialMedia = [
    { brand: "linkedin" as const, href: "https://www.linkedin.com/", label: "LinkedIn" },
    { brand: "twitter" as const, href: "https://twitter.com/", label: "Twitter" },
    { brand: "whatsapp" as const, href: "https://wa.me/", label: "WhatsApp" },
  ];

  return (
    <footer
      className="relative text-white"
      style={{
        backgroundImage: "url('/banners/footer-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/65 z-0" />
      <div className="relative z-10 h-px w-full bg-flame-gradient" />

      <motion.div
        className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-8"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-start">
          <Link href="/" className="inline-block">
            <Image
              src="/sunelastomer.png"
              alt={`${company?.name || "Company"} Logo`}
              width={160}
              height={60}
              className="h-20 w-auto object-contain"
              priority
            />
          </Link>
          <p className="mt-5 text-sm leading-7 text-white/70">
            GST registered pharmaceutical company supplying tablets, capsules,
            injectables and oral antibiotic products.
          </p>
          <div className="mt-6 flex gap-3">
            {socialMedia.map(({ brand, href, label }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 transition hover:border-crimson hover:bg-white/20"
              >
                <SocialBrandIcon brand={brand} size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Quick Links" items={navLinks} />

        <FooterColumn
          title="Products"
          items={productCategories.map((item) => ({
            href: "/products",
            label: item.title,
          }))}
        />

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
            Contact Details
          </h3>
          <div className="mt-5 space-y-4">
            {contactDetails.map(({ icon: Icon, label, value }) => (
              <p key={label} className="flex gap-3 text-sm text-white/70">
                <Icon className="mt-0.5 shrink-0 text-golden" size={17} />
                <span>
                  <strong className="text-white">{label}:</strong> {value}
                </span>
              </p>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 border-t border-white/10 px-5 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-xs text-white/50 sm:flex-row sm:text-left lg:px-8">
          <p>
            Copyright &copy; 2026 {company?.name || "Company"}. All rights reserved. Made in India.
          </p>
          <p>
            Designed and developed by{" "}
            <a
              href="https://jaikvik.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-crimson transition hover:underline"
            >
              Jaikvik Technology India Pvt Ltd
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
        {title}
      </h3>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <Link
            key={`${title}-${item.label}`}
            href={item.href}
            className="block text-sm text-white/70 transition hover:text-crimson"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
