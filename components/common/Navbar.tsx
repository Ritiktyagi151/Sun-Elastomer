"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Search, Sparkles, Phone, Mail, Send, Loader2 } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { navLinks, productCategories, productCategorySlug } from "@/data/constants";


export function BrandLogo({ scrolled = false }: { scrolled?: boolean }) {
  return (
    <Link
      href="/"
      className={`group relative z-10 inline-flex items-center justify-center transition-all duration-300 ${
        scrolled ? "top-0 h-16 w-64" : "-top-5 h-24 w-80"
      }`}
      aria-label="Sun Elastomers home"
    >
      <Image
        src="/sunelastomer.png"
        alt="Sun Elastomers Pvt Ltd logo"
        width={220}
        height={108}
        priority
        className="h-full w-full object-contain drop-shadow-[0_8px_18px_rgba(26,26,26,0.16)]"
      />
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const contactNameRef = useRef<HTMLInputElement>(null);
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
    if (!contactOpen) return;
    const timer = window.setTimeout(() => contactNameRef.current?.focus(), 120);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, [contactOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
        setContactOpen(false);
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

  const openContactForm = () => {
    setContactOpen(true);
    setSearchOpen(false);
    setSearchQuery("");
    setOpen(false);
  };

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSubmitting(true);
    window.setTimeout(() => {
      setContactSubmitting(false);
      setContactOpen(false);
    }, 1000);
  };

  return (
    <>
      {/* Top Bar - Contact Info */}
      <motion.div
        className={`fixed inset-x-0 top-0 z-50 hidden lg:block transition-all duration-300 ${
          scrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className=" px-6 py-2">
          <div className="mx-auto flex max-w-8xl items-center justify-end gap-6 text-xs text-white/90">
            <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-white transition">
              <Phone size={14} className="text-golden" />
              <span>+91 12345 67890</span>
            </a>
            <a href="mailto:info@sunelastomers.com" className="flex items-center gap-2 hover:text-white transition">
              <Mail size={14} className="text-golden" />
              <span>info@sunelastomers.com</span>
            </a>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span>Mon - Sat 9:00 AM - 6:00 PM</span>
            </span>
          </div>
        </div>
      </motion.div>

      <motion.header
        className={`fixed inset-x-0 right-0 left-auto top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "top-0 shadow-2xl shadow-crimson/10" : "top-0 lg:top-8"
        }`}
        initial={{ y: -110, opacity: 0 }}
        animate={isDesktop ? { y: scrolled ? 0 : 0, opacity: 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glass Background */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-xl shadow-lg"
              : " backdrop-blur-md  lg:backdrop-blur-[2px]"
          }`}
        />

        {/* Subtle Border */}
        {/* <div
          className={`absolute bottom-0 left-0 right-0 h-px transition-all duration-300 ${
            scrolled ? "bg-crimson/10" : "bg-crimson/5 lg:bg-white/20"
          }`}
        /> */}

        <nav
          className="relative mx-auto grid h-16 grid-cols-[auto_1fr_auto] items-center px-4 lg:h-18 lg:max-w-8xl lg:grid-cols-[1fr_auto_1fr] lg:px-8"
          aria-label="Primary navigation"
        >
          {/* LEFT — Logo */}
          <div className="hidden  lg:block">
            <BrandLogo scrolled={scrolled} />
          </div>
          <Link
            href="/"
            className="inline-flex h-14 w-48 items-center justify-center lg:hidden"
            aria-label="Sun Elastomers home"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/sunelastomer.png"
              alt="Sun Elastomers Pvt Ltd logo"
              width={150}
              height={74}
              priority
              className="h-full w-full object-contain drop-shadow-[0_6px_14px_rgba(26,26,26,0.14)]"
            />
          </Link>

          {/* CENTER — Nav Links (desktop only) */}
          <motion.div
            className="hidden items-center gap-8 lg:flex"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            {navLinks.map((link) =>
              link.href === "/categories" ? (
                <ProductDropdown key={link.href} scrolled={scrolled} />
              ) : (
                <motion.div
                  key={link.href}
                  variants={{ hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0 } }}
                >
                  <Link
                    href={link.href}
                    className={`relative text-sm font-semibold transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-crimson after:transition-all after:duration-300 hover:after:w-full ${
                      scrolled ? "text-ink/80 hover:text-crimson" : "text-white hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            )}
          </motion.div>

          {/* RIGHT — Search + Get In Touch + Mobile hamburger */}
          <div className="flex items-center justify-end gap-3">
            {/* Search Icon Button */}
            <motion.button
              className={`hidden lg:grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 hover:shadow-md ${
                scrolled
                  ? "border-crimson/10 text-ink/60 hover:border-crimson/30 hover:text-crimson"
                  : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
              }`}
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Open search"
              initial="hidden"
              animate="show"
              variants={{ hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0 } }}
            >
              <Search size={17} />
            </motion.button>

            {/* Get In Touch Button */}
            <motion.div
              className="hidden lg:block"
              initial="hidden"
              animate="show"
              variants={{ hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0 } }}
            >
              <button
                type="button"
                className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-md ${
                  scrolled
                    ? "bg-crimson shadow-crimson/20 hover:shadow-crimson/40"
                    : "bg-ink shadow-black/20 hover:shadow-black/30"
                }`}
                onClick={openContactForm}
              >
                <Sparkles size={15} className="text-white/80" />
                Get In Touch
              </button>
            </motion.div>

            {/* Mobile hamburger */}
            <button
              className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-300 lg:hidden ${
                scrolled
                  ? "border-crimson/10 text-crimson hover:bg-crimson/5"
                  : "border-white/20 text-white hover:bg-white/10"
              }`}
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <motion.div
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-crimson/5 bg-white/95 backdrop-blur-sm shadow-2xl shadow-black/10 lg:hidden"
          initial={false}
          animate={{ height: open ? "auto" : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-1 px-5 py-4">
            {/* Mobile Search Bar */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex items-center gap-2 rounded-full border border-crimson/10 bg-peach/30 px-4 py-2.5 transition focus-within:border-crimson/30 focus-within:shadow-md">
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
                <div key={link.href} className="space-y-1">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-ink/80 transition hover:bg-crimson/5 hover:text-crimson"
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
                          href={`/categories/${productCategorySlug(category.category)}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-crimson/5 hover:text-crimson"
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
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-ink/80 transition hover:bg-crimson/5 hover:text-crimson"
                >
                  {link.label}
                </Link>
              )
            )}

            <div className="pt-3 space-y-3">
              <button
                type="button"
                onClick={openContactForm}
                className="relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-crimson px-5 py-3 text-sm font-semibold text-white shadow-md shadow-crimson/20 transition-all duration-300 hover:shadow-crimson/40"
              >
                <Sparkles size={15} className="text-white/80" />
                Get In Touch
              </button>
              
              <div className="flex items-center justify-center gap-4 text-xs text-muted">
                <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-crimson transition">
                  <Phone size={14} className="text-crimson" />
                  <span>Call Us</span>
                </a>
                <span className="h-4 w-px bg-crimson/10" />
                <a href="mailto:info@sunelastomers.com" className="flex items-center gap-2 hover:text-crimson transition">
                  <Mail size={14} className="text-crimson" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Desktop Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
            />

            <motion.div
              className="fixed inset-x-0 top-0 z-50 mx-auto max-w-3xl px-5 pt-28"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/95 p-2 pl-4 shadow-2xl shadow-crimson/20 backdrop-blur-xl"
              >
                <Search size={20} className="shrink-0 text-crimson" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent py-3 text-base text-ink placeholder:text-muted focus:outline-none"
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
                  className="rounded-full bg-crimson px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-crimson/20 transition hover:shadow-crimson/40 hover:scale-105 active:scale-95"
                >
                  Search
                </button>
              </form>
              <p className="mt-3 text-center text-xs text-white/70">
                Press <kbd className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-xs text-white">Esc</kbd> to close
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Get In Touch Popup */}
      <AnimatePresence>
        {contactOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setContactOpen(false)}
            />

            <motion.div
              className="fixed inset-x-0 top-0 z-[70] mx-auto flex h-dvh max-w-2xl items-center px-3 py-4 sm:px-5"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-popup-title"
            >
              <form
                onSubmit={handleContactSubmit}
                className="relative w-full rounded-xl border border-white/20 bg-white p-4 text-ink shadow-2xl shadow-black/25 sm:p-5"
              >
                <button
                  type="button"
                  onClick={() => setContactOpen(false)}
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-crimson/10 text-muted transition hover:border-crimson/30 hover:bg-crimson/5 hover:text-crimson"
                  aria-label="Close contact form"
                >
                  <X size={18} />
                </button>

                <p className="inline-flex items-center gap-2 rounded-full bg-crimson/10 px-3 py-1 text-[11px] font-black uppercase text-crimson">
                  <Sparkles size={14} /> Quick Inquiry
                </p>
                <h2 id="contact-popup-title" className="mt-3 pr-10 font-display text-2xl font-black text-ink sm:text-3xl">
                  Send your requirement
                </h2>
                <p className="mt-2 max-w-xl text-xs leading-5 text-muted sm:text-sm">
                  Share your product interest, quantity and location so our team can respond with the right details.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="text-xs font-bold sm:text-sm">
                    Full Name
                    <input ref={contactNameRef} className="input !mt-1 !py-2.5" name="name" type="text" required />
                  </label>
                  <label className="text-xs font-bold sm:text-sm">
                    Company Name
                    <input className="input !mt-1 !py-2.5" name="company" type="text" />
                  </label>
                  <label className="text-xs font-bold sm:text-sm">
                    Email Address
                    <input className="input !mt-1 !py-2.5" name="email" type="email" required />
                  </label>
                  <label className="text-xs font-bold sm:text-sm">
                    Phone Number
                    <input className="input !mt-1 !py-2.5" name="phone" type="tel" required />
                  </label>
                  <label className="text-xs font-bold sm:col-span-2 sm:text-sm">
                    Product Interest
                    <select className="input !mt-1 !py-2.5" name="product" defaultValue={productCategories[0]?.title} required>
                      {productCategories.map((category) => (
                        <option key={category.title} value={category.title}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="mt-3 block text-xs font-bold sm:text-sm">
                  Message
                  <textarea
                    className="input !mt-1 min-h-20 resize-none !py-2.5"
                    name="message"
                    placeholder="Mention product, pack size, quantity and delivery location."
                    required
                  />
                </label>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button className="btn-primary justify-center px-5 py-3" disabled={contactSubmitting}>
                    {contactSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                    {contactSubmitting ? "Sending..." : "Submit Inquiry"}
                  </button>
                  <div className="flex flex-wrap gap-4 text-xs text-muted">
                    <a href="tel:+911234567890" className="flex items-center gap-2 transition hover:text-crimson">
                      <Phone size={14} className="text-crimson" />
                      Call Us
                    </a>
                    <a href="mailto:info@sunelastomers.com" className="flex items-center gap-2 transition hover:text-crimson">
                      <Mail size={14} className="text-crimson" />
                      Email
                    </a>
                  </div>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ProductDropdown({ scrolled }: { scrolled: boolean }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [dropdownOpen]);

  return (
    <motion.div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
      variants={{ hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0 } }}
    >
      <button
        type="button"
        onClick={() => setDropdownOpen((value) => !value)}
        aria-expanded={dropdownOpen}
        className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-300 ${
          scrolled ? "text-ink/80 hover:text-crimson" : "text-white/90 hover:text-white"
        }`}
      >
        Products
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`absolute left-1/2 top-full z-50 w-[26rem] -translate-x-1/2 rounded-2xl border border-crimson/5 bg-white/95 p-4 shadow-2xl shadow-crimson/20 backdrop-blur-xl transition-all duration-200 ${
          dropdownOpen ? "visible mt-3 opacity-100" : "invisible mt-5 opacity-0"
        }`}
      >
        <div className="absolute -top-3 left-0 h-3 w-full" />
        <Link
          href="/categories"
          onClick={() => setDropdownOpen(false)}
          className="group mb-3 flex items-center justify-between rounded-xl bg-crimson/5 px-4 py-3 text-sm font-bold text-ink transition hover:bg-crimson/10 hover:text-crimson"
        >
          All Products
          <span className="h-2 w-2 rounded-full bg-crimson transition group-hover:scale-125" />
        </Link>
        <div className="grid grid-cols-1 gap-1">
          {productCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.title}
                href={`/categories/${productCategorySlug(category.category)}`}
                onClick={() => setDropdownOpen(false)}
                className="group/item flex items-start gap-3 rounded-xl px-4 py-3 transition hover:bg-crimson/5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-crimson/10 text-crimson transition group-hover/item:bg-crimson group-hover/item:text-white">
                  <Icon size={17} />
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink transition group-hover/item:text-crimson">
                    {category.title}
                  </span>
                  <span className="mt-0.5 block text-xs leading-5 text-muted/80">
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
