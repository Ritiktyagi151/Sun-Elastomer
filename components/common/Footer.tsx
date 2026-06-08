"use client";

import Link from "next/link";
import Image from "next/image"; // Image component import kiya
import { motion } from "framer-motion";
import { Linkedin, MessageCircle, Twitter } from "lucide-react";
import { contactDetails, navLinks, productCategories } from "@/data/constants";
import { company } from "@/data/products";

export function Footer() {
  // Social media links
  const socialMedia = [
    { Icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
    { Icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
    { Icon: MessageCircle, href: "https://wa.me/", label: "WhatsApp" },
  ];

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
          {/* Manual Logo Yahan Add Kiya Hai */}
          <Link href="/" className="inline-block">
            <Image
              src="/sun-elastomer-logo.png" // Apne logo image ka path yahan rakhein (public folder ke andar)
              alt={`${company?.name || 'Company'} Logo`}
              width={160}
              height={60}
              className="h-20 w-auto object-contain"
              priority
            />
          </Link>
          
          <p className="mt-5 text-sm leading-7 text-muted">
            GST registered pharmaceutical company supplying tablets, capsules, injectables and oral antibiotic products.
          </p>
          <div className="mt-6 flex gap-3">
            {socialMedia.map(({ Icon, href, label }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-crimson/15 text-crimson transition hover:border-crimson hover:bg-white hover:text-flame"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        
        <FooterColumn title="Quick Links" items={navLinks} />
        
        <FooterColumn 
          title="Products" 
          items={productCategories.map((item) => ({ href: "/products", label: item.title }))} 
        />
        
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

      {/* Credits Section */}
      <div className="border-t border-crimson/10 px-5 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-xs text-muted sm:flex-row sm:text-left lg:px-8">
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

function FooterColumn({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="footer-title">{title}</h3>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <Link 
            key={`${title}-${item.label}`} 
            href={item.href} 
            className="block text-sm text-muted transition hover:text-crimson"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}