"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { SectionHeading, stagger } from "@/components/common/AnimatedPrimitives";
import { productCategories } from "@/data/constants";

// Custom animation variant for sliding in
const slideInVariant: Variants = {
  hidden: { opacity: 0, y: 80 }, // Start 80px below and invisible
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6 
    } 
  }
};

export function ProductRangeSection() {
  return (
    <section className="section bg-cream text-ink py-10">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading title="Our Product Range" light centered />
        
        <motion.div 
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3" 
          variants={stagger} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-50px" }} // Triggers slightly before scrolling fully in
        >
          {productCategories.map(({ image, icon: Icon, title, description }, index) => (
            <motion.article 
              key={title} 
              className="group relative flex flex-col overflow-hidden rounded-2xl shadow-xl border border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-golden/20 bg-[url('/bg-theme/bg2.png')] bg-cover bg-center"
              // Applied the slide variant here
              variants={slideInVariant} 
              whileHover={{ y: -6 }}
            >
              
              {/* Product Image Container */}
              {image && (
                <div className="relative w-full h-56 overflow-hidden">
                  <div className="absolute inset-0 transition-colors duration-500 z-10" />
                  <Image
                    src={image}
                    alt={`${title} category`}
                    fill
                    className="object-fill transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {Icon && (
                    <div className="absolute bottom-4 right-4 z-20 bg-black/60 p-3 rounded-full backdrop-blur-md border border-white/10 shadow-lg transform transition-transform group-hover:scale-110">
                      <Icon className="text-golden" size={24} />
                    </div>
                  )}
                </div>
              )}

              {/* Card Content with Glassmorphism */}
              <div className="flex flex-col flex-1 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300 flex-1">
                  {description}
                </p>
                
                <Link 
                  href="/products" 
                  className="mt-8 flex items-center text-sm font-bold text-golden transition-colors hover:text-white"
                >
                  <span className="mr-2 uppercase tracking-wider text-xs">Explore Range</span>
                  <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
