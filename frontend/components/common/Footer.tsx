"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { contactDetails, navLinks, productCategories, productCategorySlug } from "@/data/constants";
import { company } from "@/data/products";
import { SocialBrandIcon } from "./SocialBrandIcon";

const footerHighlights = [
  "WHO-GMP Certified Manufacturing Partners",
  "B2B pharmaceutical product inquiries",
  "Tablet, capsule, injectable and ointment range",
  "Dispatch coordination from Ghaziabad, Uttar Pradesh",
];

export function Footer() {
  const whatsappPhone = company.contactPhone.replace(/\D/g, "");
  const socialMedia = [
    { brand: "linkedin" as const, href: "https://www.linkedin.com/", label: "LinkedIn" },
    { brand: "twitter" as const, href: "https://twitter.com/", label: "Twitter" },
    { brand: "whatsapp" as const, href: `https://wa.me/${whatsappPhone}`, label: "WhatsApp" },
  ];

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/api/categories`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setCategories(data);
        } else {
          setCategories(productCategories);
        }
      })
      .catch((err) => {
        console.error("Footer failed to load categories:", err);
        setCategories(productCategories);
      });
  }, []);

  return (
    <footer
      className="relative text-white"
      style={{
        backgroundImage: "url('/bg-theme/leather-texture.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >


      <motion.div
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-9 px-5 py-8 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.62fr_0.9fr_1.28fr] lg:gap-10 lg:px-8 xl:gap-12"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-start sm:col-span-2 lg:col-span-1">
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
          <p className="mt-5 max-w-xs text-sm leading-7 text-white/70">
            Trusted pharmaceutical product company offering quality tablets,
            capsules, injectables and antibiotic formulations for B2B healthcare supply.
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

        {/* On mobile: Quick Links + Products sit side-by-side in 2 cols */}
        <div className="grid grid-cols-2 gap-6 lg:contents">
          <FooterColumn
            title="Quick Links"
            items={[...navLinks, { href: "/blog", label: "Blog" }]}
          />

          <FooterColumn
            title="Products"
            items={categories.map((item) => ({
              href: `/categories/${productCategorySlug(item.category)}`,
              label: item.title,
            }))}
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
            Contact Details
          </h3>
          <div className="mt-5 space-y-3.5">
            {contactDetails.map(({ icon: Icon, label, value }) => (
              <p key={label} className="flex max-w-md gap-3 text-sm leading-6 text-white/70">
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
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {footerHighlights.map((item) => (
            <p
              key={item}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white/72"
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 px-5 py-5">
        <div className="mx-auto grid max-w-7xl items-center gap-4 text-center text-xs text-white/50 sm:grid-cols-3 lg:px-8">
          <p className="sm:text-left">
            Copyright &copy; 2026 {company?.name || "Company"}. All rights reserved.
          </p>
          <div className="mx-auto flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/terms-conditions"
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/20 px-5 py-2 text-xs font-bold uppercase text-white shadow-sm transition hover:border-crimson hover:text-crimson"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy-policy"
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/20 px-5 py-2 text-xs font-bold uppercase text-white shadow-sm transition hover:border-crimson hover:text-crimson"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="sm:text-right">
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
