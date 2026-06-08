"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Search } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
        className="h-auto inset-0 absolute top-2 ml-8 w-40 object-contain sm:w-40 lg:w-48"
      />
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      const timer = window.setTimeout(() => searchInputRef.current?.focus(), 100);
      return () => window.clearTimeout(timer);
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 right-0 left-auto top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "pointer-events-auto  shadow-crimson/5"
            : "pointer-events-auto lg:pointer-events-none"
        }`}
        initial={{ y: -110, opacity: 0 }}
        animate={isDesktop ? { y: scrolled ? 0 : -110, opacity: scrolled ? 1 : 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* SVG Shape Background */}
       <svg
  className="absolute inset-0 -z-10 hidden h-full w-full lg:block"
  viewBox="0 0 1440 72"
  preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg"
>
  {/* Filled shape - starts after logo area with curve */}
  <path
    d="M200,0 Q230,0 250,36 Q260,72 280,72 L1430,72 Q1440,72 1440,62 L1440,0 Z"
    className={`transition-all duration-300 ${
      scrolled ? "fill-white" : "fill-transparent"
    }`}
  />
  {/* Border outline of the shape */}
  <path
    d="M200,0 Q230,0 250,36 Q260,72 280,72 L1430,72 Q1440,72 1440,62"
    fill="none"
    className={`transition-all duration-300 ${
      scrolled ? "stroke-gray-400" : "stroke-transparent"
    }`}
    strokeWidth="2"
  />
  {/* Top thin line from left edge to shape start */}
  <path
    d="M0,0 L200,0"
    fill="none"
    className={`transition-all duration-300 ${
      scrolled ? "stroke-gray-400" : "stroke-transparent"
    }`}
    strokeWidth="3"
  />
</svg>
        <div className="absolute inset-0 -z-10 bg-white shadow-sm lg:hidden" />

        <nav
          className="mx-auto grid h-16 grid-cols-[auto_1fr_auto] items-center px-4 lg:h-18 lg:max-w-8xl lg:grid-cols-[1fr_auto_1fr] lg:px-8"
          aria-label="Primary navigation"
        >
          {/* LEFT — Logo */}
          <div className="hidden lg:block">
            <BrandLogo />
          </div>
          <Link href="/" className="flex items-center lg:hidden" aria-label="Sun Elastomers home" onClick={() => setOpen(false)}>
            <Image
              src="/sunelastomer.png"
              alt="Sun Elastomers Pvt Ltd logo"
              width={150}
              height={74}
              priority
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* CENTER — Nav Links (desktop only) */}
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
                <motion.div
                  key={link.href}
                  variants={{ hidden: { opacity: 0, y: -8 }, show: { opacity: 1, y: 0 } }}
                >
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-ink transition hover:text-crimson"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            )}
          </motion.div>

          {/* RIGHT — Search + Get In Touch + Mobile hamburger */}
          <div className="flex items-center justify-end gap-2">
            {/* Search Icon Button */}
            <motion.button
              className="hidden lg:grid h-10 w-10 place-items-center rounded-full border border-crimson/15 text-ink transition hover:border-crimson hover:text-crimson"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Open search"
              initial="hidden"
              animate="show"
              variants={{ hidden: { opacity: 0, y: -8 }, show: { opacity: 1, y: 0 } }}
            >
              <Search size={17} />
            </motion.button>

            {/* Get In Touch Button */}
            <motion.div
              className="hidden lg:block"
              initial="hidden"
              animate="show"
              variants={{ hidden: { opacity: 0, y: -8 }, show: { opacity: 1, y: 0 } }}
            >
              <Link className="btn-primary px-5 py-3 text-sm" href="/contact">
                Get In Touch
              </Link>
            </motion.div>

            {/* Mobile hamburger */}
            <button
              className="grid h-11 w-11 place-items-center rounded-full border border-crimson/15 text-crimson lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <motion.div
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-crimson/10 bg-white shadow-2xl shadow-black/10 lg:hidden"
          initial={false}
          animate={{ height: open ? "auto" : 0 }}
          transition={{ duration: 0.28 }}
        >
          <div className="space-y-1 px-5 py-4">
            {/* Mobile Search Bar */}
            <form onSubmit={handleSearch} className="mb-3">
              <div className="flex items-center gap-2 rounded-xl border border-crimson/15 bg-peach px-4 py-2.5">
                <Search size={16} className="shrink-0 text-muted" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
                />
              </div>
            </form>

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

            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary block w-full px-5 py-3 text-center text-sm"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Desktop Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
            />

            {/* Search Modal */}
            <motion.div
              className="fixed inset-x-0 top-0 z-50 mx-auto max-w-2xl px-5 pt-24"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-3 rounded-2xl border border-crimson/15 bg-white px-5 py-4 shadow-2xl shadow-crimson/10"
              >
                <Search size={20} className="shrink-0 text-crimson" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-base text-ink placeholder:text-muted focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="shrink-0 text-muted transition hover:text-crimson"
                  >
                    <X size={18} />
                  </button>
                )}
                <button
                  type="submit"
                  className="btn-primary shrink-0 px-4 py-2 text-sm"
                >
                  Search
                </button>
              </form>
              <p className="mt-2 text-center text-xs text-muted">
                Press <kbd className="rounded border border-crimson/15 bg-white px-1.5 py-0.5 font-mono text-xs">Esc</kbd> to close
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
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
        <ChevronDown
          size={15}
          className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
        />
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
                  <span className="mt-1 block text-xs leading-5 text-muted">
                    {category.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
