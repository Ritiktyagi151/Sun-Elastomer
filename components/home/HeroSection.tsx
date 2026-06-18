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
    words: ["Trusted", "Pharmaceutical", "Products", "Supply"],
    desc: "Sun Elastomers Pvt Ltd supports healthcare buyers with reliable tablets, capsules, injectables, suspensions and ointment products across focused therapeutic categories.",
    duration: 15000, // Video ke liye 15 seconds
  },
  {
    id: 1,
    type: "image", 
    src: "/banners/b2.jpeg", 
    words: ["Quality", "Focused", "Healthcare", "Portfolio"],
    desc: "Explore antibiotics, CNS, antidiabetic, dermatology and gastroenterology products with clear composition, strength and pack information.",
    duration: 5000, // Image ke liye 5 seconds
  },
  {
    id: 2,
    type: "image",
    src: "/banners/banner1.png",
    words: ["Clear", "Documentation", "For", "Procurement"],
    desc: "Our team helps distributors, institutions and B2B buyers review product details, commercial requirements and supporting documentation.",
    duration: 5000, // Image ke liye 5 seconds
  },
  {
    id: 3,
    type: "image", 
    src: "/banners/b3.jpeg", 
    words: ["Reliable", "Supply", "Responsive", "Support"],
    desc: "Share your product interest, quantity, destination and timeline so our team can coordinate the right next steps quickly.",
    duration: 5000, 
  },
   {
    id: 4,
    type: "image", 
    src: "/banners/banner.jpeg", 
    words: ["Organized", "Categories", "Easy", "Inquiry"],
    desc: "Browse category-wise product pages and send product-specific inquiries directly from the catalog.",
    duration: 5000, 
  },
];

export function HeroSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Dynamic Auto-play logic
  useEffect(() => {
    const currentDuration = slides[currentSlideIndex].duration;
    
    const timer = setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, currentDuration);
    
    return () => clearTimeout(timer);
  }, [currentSlideIndex]);

  const currentSlide = slides[currentSlideIndex];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-24 text-white bg-black">
     
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
                link.href === "/categories" ? (
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
                            href={`/categories/${productCategorySlug(category.category)}`}
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
                className="mt-2 flex min-h-11 items-center justify-center rounded-xl px-4 py-3 text-sm font-black text-white shadow-lg shadow-crimson/20"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      
      {/* Background Media Slider (Neutral Black & Full Opacity to remove unwanted tints) */}
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
                className="h-full w-full object-cover object-center opacity-100" 
              />
            ) : (
              <Image 
                src={currentSlide.src} 
                alt={`Slide ${currentSlide.id + 1}`} 
                fill 
                priority 
                sizes="100vw" 
                className="object-cover object-center opacity-100"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Clean Dark Overlay for Text Readability (No Colors/Tints) */}
      <div className="absolute inset-0 z-0 bg-black/40" />

      {/* Content Container - Left Aligned */}
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
                  className="inline-block pr-4 text-white drop-shadow-md"
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

        {/* Static Elements (Buttons & Indicators) */}
        <motion.div
          className="mt-10 flex flex-col justify-start gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.82 }}
        >
          <Link href="/categories" className="rounded-full bg-white px-8 py-4 font-semibold text-black transition-transform hover:scale-105">
            Explore Categories
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
