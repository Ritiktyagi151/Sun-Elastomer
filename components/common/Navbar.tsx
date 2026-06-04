"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, productCategories, productCategorySlug } from "@/data/constants";

export function BrandLogo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Sun Elastomers home">
      <Image
        src="/sunelastomer.png"
        alt="Sun Elastomers Pvt Ltd logo"
        width={220}
        height={108}
        priority
        className="h-auto w-40 object-contain sm:w-48 lg:w-52"
      />
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "pointer-events-auto border-b border-crimson/10 bg-white/92 shadow-xl shadow-crimson/5 backdrop-blur-xl"
          : "pointer-events-none border-b border-transparent bg-white/0"
      }`}
      initial={{ y: -110, opacity: 0 }}
      animate={{ y: scrolled ? 0 : -110, opacity: scrolled ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 lg:px-8" aria-label="Primary navigation">
        <BrandLogo />
        <motion.div
          className="hidden items-center gap-7 lg:flex"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {navLinks.map((link) =>
            link.href === "/products" ? (
              <ProductDropdown key={link.href} />
            ) : (
              <motion.div key={link.href} variants={{ hidden: { opacity: 0, y: -8 }, show: { opacity: 1, y: 0 } }}>
                <Link href={link.href} className="text-sm font-medium text-ink transition hover:text-crimson">
                  {link.label}
                </Link>
              </motion.div>
            )
          )}
          <motion.div variants={{ hidden: { opacity: 0, y: -8 }, show: { opacity: 1, y: 0 } }}>
            <Link className="btn-primary px-5 py-3 text-sm" href="/contact">
              Get In Touch
            </Link>
          </motion.div>
        </motion.div>
        <button
          className="grid h-11 w-11 place-items-center rounded-full border border-crimson/15 text-crimson lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      <motion.div
        className="overflow-hidden border-t border-crimson/10 bg-white lg:hidden"
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: 0.28 }}
      >
        <div className="space-y-1 px-5 py-4">
          {navLinks.map((link) =>
            link.href === "/products" ? (
              <div key={link.href}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-3 py-3 text-sm font-medium text-ink hover:bg-peach hover:text-crimson"
                >
                  {link.label}
                  <ChevronDown size={16} />
                </button>
                <div className="ml-3 space-y-1 border-l border-crimson/10 pl-3">
                  {productCategories.map((category) => {
                    const Icon = category.icon;

                    return (
                      <Link
                        key={category.title}
                        href={`/products/${productCategorySlug(category.category)}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted hover:bg-peach hover:text-crimson"
                      >
                        <Icon size={16} className="shrink-0 text-golden" />
                        {category.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-3 text-sm font-medium text-ink hover:bg-peach hover:text-crimson"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </motion.div>
    </motion.header>
  );
}

function ProductDropdown() {
  return (
    <motion.div
      className="group relative"
      variants={{ hidden: { opacity: 0, y: -8 }, show: { opacity: 1, y: 0 } }}
    >
      <button
        type="button"
        className="flex items-center gap-1.5 text-sm font-medium text-ink transition hover:text-crimson group-focus-within:text-crimson group-hover:text-crimson"
      >
        Products
        <ChevronDown size={15} className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 mt-5 w-[23rem] -translate-x-1/2 rounded-2xl border border-crimson/10 bg-white/95 p-3 opacity-0 shadow-2xl shadow-crimson/10 backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:mt-3 group-hover:opacity-100 group-focus-within:visible group-focus-within:mt-3 group-focus-within:opacity-100">
        <div className="absolute -top-3 left-0 h-3 w-full" />
        <Link
          href="/products"
          className="mb-2 flex items-center justify-between rounded-xl bg-peach px-4 py-3 text-sm font-bold text-ink transition hover:text-crimson"
        >
          All Products
          <span className="h-2 w-2 rounded-full bg-flame" />
        </Link>
        <div className="grid gap-1">
          {productCategories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href={`/products/${productCategorySlug(category.category)}`}
                className="group/item flex items-start gap-3 rounded-xl px-4 py-3 transition hover:bg-peach"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-golden/15 text-crimson transition group-hover/item:bg-flame group-hover/item:text-white">
                  <Icon size={17} />
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink transition group-hover/item:text-crimson">
                    {category.title}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-muted">{category.description}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
