"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { SectionHeading, stagger } from "@/components/common/AnimatedPrimitives";
import { productCategories, productCategorySlug } from "@/data/constants";

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
    <section className="section bg-cream text-ink ">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading title="Our Product Range" light centered />
        
        <motion.div 
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3" 
          variants={stagger} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: false, margin: "-50px" }}
        >
          {productCategories.map(({ image, icon: Icon, title, description, category }) => (
            <motion.article 
              key={title} 
              className="group relative flex flex-col overflow-hidden rounded-2xl shadow-xl border border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-golden/20 bg-[url('/bg-theme/bg2.png')] bg-cover bg-center"
              // Applied the slide variant here
              variants={slideInVariant} 
              whileHover={{ y: -6 }}
            >
              <Link href={`/categories/${productCategorySlug(category)}`} className="flex h-full flex-col">
                {/* Product Image Container */}
                {image && (
                  <div className="relative h-56 w-full overflow-hidden">
                    <div className="absolute inset-0 z-10 transition-colors duration-500" />
                    <Image
                      src={image}
                      alt={`${title} category`}
                      fill
                      className="object-fill transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {Icon && (
                      <div className="absolute bottom-4 right-4 z-20 rounded-full border border-white/10 bg-black/60 p-3 shadow-lg backdrop-blur-md transition-transform group-hover:scale-110">
                        <Icon className="text-golden" size={24} />
                      </div>
                    )}
                  </div>
                )}

                {/* Card Content with Glassmorphism */}
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="text-xl font-bold tracking-wide text-white">{title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-300">
                    {description}
                  </p>
                  <span className="mt-8 flex items-center text-sm font-bold text-golden transition-colors group-hover:text-white">
                  <span className="mr-2 uppercase tracking-wider text-xs">Explore Range</span>
                  <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
