"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { navLinks, productCategories, productCategorySlug } from "@/data/constants";

// Har slide ke liye "duration" add kiya gaya hai (milliseconds me)
const slides = [
  {
    id: 0,
    type: "video", 
    src: "/video/home.mp4", 
    words: ["Innovative", "Rubber", "Solutions", "For Pharma"],
    desc: "Sun Elastomers Pvt Ltd - Trusted manufacturer of high-quality rubber and elastomer components for the pharmaceutical industry since 1995.",
    duration: 15000, // Video ke liye 15 seconds
  },
  {
    id: 1,
    type: "image", 
    src: "/banners/b2.jpeg", 
    words: ["Advanced", "Elastomer", "Technology", "Worldwide"],
    desc: "Delivering exceptional durability and precision for critical healthcare applications globally.",
    duration: 5000, // Image ke liye 5 seconds
  },
  {
    id: 2,
    type: "image",
    src: "/banners/banner1.png",
    words: ["Quality", "Compliance", "Excellence", "Guaranteed"],
    desc: "Meeting the highest global standards with ISO certified manufacturing processes.",
    duration: 5000, // Image ke liye 5 seconds
  },
  {
    id: 3,
    type: "image", 
    src: "/banners/b3.jpeg", 
    words: ["Custom", "Molding", "Expertise", "Delivered"],
    desc: "Partner with us for tailor-made sealing solutions designed specifically for your needs.",
    duration: 5000, // Dusre video ke liye bhi 15 seconds
  },
   {
    id: 4,
    type: "image", 
    src: "/banners/banner.jpeg", 
    words: ["Custom", "Molding", "Expertise", "Delivered"],
    desc: "Partner with us for tailor-made sealing solutions designed specifically for your needs.",
    duration: 5000, // Dusre video ke liye bhi 15 seconds
  },
];

export function HeroSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Dynamic Auto-play logic: Har slide ke "duration" ke hisaab se time lega
  useEffect(() => {
    const currentDuration = slides[currentSlideIndex].duration;
    
    const timer = setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, currentDuration);
    
    // Cleanup function taaki memory leak na ho
    return () => clearTimeout(timer);
  }, [currentSlideIndex]); // Jab slide change hogi, naya timer start hoga

  const currentSlide = slides[currentSlideIndex];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden  px-5 pt-24 text-white">
      <div className="absolute right-5 top-6 z-30 lg:right-8 lg:top-8">
        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/12 text-white shadow-xl shadow-black/20 backdrop-blur-md transition hover:bg-white/20 lg:h-14 lg:w-14"
          aria-label="Toggle hero navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="absolute left-5 right-5 top-20 z-30 overflow-hidden rounded-2xl border border-white/15 bg-white/95 text-ink shadow-2xl shadow-black/25 backdrop-blur-xl sm:left-auto sm:w-[24rem] lg:right-8 lg:top-24"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <div className="space-y-1 p-3">
              {navLinks.map((link) =>
                link.href === "/products" ? (
                  <div key={link.href}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-black text-ink transition hover:bg-peach hover:text-crimson"
                    >
                      {link.label}
                      <ChevronDown size={16} />
                    </button>
                    <div className="ml-4 space-y-1 border-l border-crimson/10 pl-3">
                      {productCategories.slice(0, 4).map((category) => {
                        const Icon = category.icon;

                        return (
                          <Link
                            key={category.title}
                            href={`/products/${productCategorySlug(category.category)}`}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-peach hover:text-crimson"
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
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-black text-ink transition hover:bg-peach hover:text-crimson"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex min-h-11 items-center justify-center rounded-xl bg-flame-gradient px-4 py-3 text-sm font-black text-white shadow-lg shadow-crimson/20"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      
      {/* 1. Background Media Slider */}
      <div className="absolute inset-0 z-0 bg-black" aria-hidden="true">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {currentSlide.type === "video" ? (
              <video
                src={currentSlide.src}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover object-center opacity-80"
              />
            ) : (
              <Image 
                src={currentSlide.src} 
                alt={`Slide ${currentSlide.id + 1}`} 
                fill 
                priority 
                sizes="100vw" 
                className="object-cover object-center opacity-80"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Theme Overlay - Left Dark Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      {/* <div className="absolute inset-0 z-0 bg-slate-900/20 mix-blend-multiply" /> */}

      {/* 3. Content Container - Left Aligned */}
      <div className="relative z-10 mx-auto w-full max-w-8xl text-left">
        
        {/* Animated Text Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id} 
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.08 } },
              exit: { opacity: 0, transition: { duration: 0.2 } }
            }}
          >
            <h1 className="max-w-5xl font-display text-5xl font-black leading-[1.04] tracking-tight md:text-7xl lg:text-[72px]">
              {currentSlide.words.map((word, index) => (
                <motion.span
                  key={`${currentSlide.id}-${word}-${index}`}
                  className="inline-block bg-gradient-to-r from-white to-gray-300 bg-clip-text pr-4 text-transparent drop-shadow-md"
                  variants={{ 
                    hidden: { opacity: 0, x: -20 }, 
                    show: { opacity: 1, x: 0 } 
                  }}
                >
                  {word}
                  {index === 2 ? <br /> : null}
                </motion.span>
              ))}
            </h1>
            
            <motion.p
              className="mt-7 max-w-2xl text-lg leading-8 text-gray-200 drop-shadow-sm"
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0, transition: { delay: 0.4 } }
              }}
            >
              {currentSlide.desc}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* 4. Static Elements (Buttons & Indicators) */}
        <motion.div
          className="mt-10 flex flex-col justify-start gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.82 }}
        >
          <Link href="/products" className="rounded-full bg-white px-8 py-4 font-semibold text-black transition-transform hover:scale-105">
            Explore Products
          </Link>
          <Link href="/about" className="rounded-full border border-white/30 bg-black/20 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10">
            Learn About Us
          </Link>
        </motion.div>

        {/* Slider Navigation Dots */}
        <div className="absolute -bottom-16 left-0 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlideIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                currentSlideIndex === index ? "w-10 bg-white" : "w-4 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
