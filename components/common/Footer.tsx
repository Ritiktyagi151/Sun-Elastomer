"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin, MessageCircle, Twitter } from "lucide-react";
import { BrandLogo } from "@/components/common/Navbar";
import { contactDetails, navLinks, productCategories } from "@/data/constants";
import { company } from "@/data/products";

export function Footer() {
  return (
    <footer className="relative bg-peach text-ink">
      <div className="h-px w-full bg-flame-gradient" />
      <motion.div
        className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <BrandLogo />
          <p className="mt-5 text-sm leading-7 text-muted">
            GST registered pharmaceutical company supplying tablets, capsules, injectables and oral antibiotic products.
          </p>
          <div className="mt-6 flex gap-3">
            {[Linkedin, Twitter, MessageCircle].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full border border-crimson/15 text-crimson transition hover:border-crimson hover:bg-white hover:text-flame"
                aria-label="Social profile"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <FooterColumn title="Quick Links" items={navLinks} />
        <FooterColumn title="Products" items={productCategories.map((item) => ({ href: "/products", label: item.title }))} />
        <div>
          <h3 className="footer-title">Contact Details</h3>
          <div className="mt-5 space-y-4">
            {contactDetails.map(({ icon: Icon, label, value }) => (
              <p key={label} className="flex gap-3 text-sm text-muted">
                <Icon className="mt-0.5 shrink-0 text-golden" size={17} />
                <span>
                  <strong className="text-ink">{label}:</strong> {value}
                </span>
              </p>
            ))}
          </div>
        </div>
      </motion.div>
      <div className="border-t border-crimson/10 px-5 py-5 text-center text-xs text-muted">
        Copyright (c) 2026 {company.name}. All rights reserved. Made in India.
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="footer-title">{title}</h3>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <Link key={`${title}-${item.label}`} href={item.href} className="block text-sm text-muted transition hover:text-crimson">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
