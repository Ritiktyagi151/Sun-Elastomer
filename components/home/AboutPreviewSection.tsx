"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function AboutPreviewSection() {
  return (
    <section className="section bg-white py-16 overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        
        {/* Text Column - Sliding in from the Left */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600 mb-4">
            Who We Are
          </span>
          <h2 className="font-display text-4xl font-bold text-gray-900 md:text-5xl">
            Pharmaceutical elastomer manufacturing with discipline and warmth.
          </h2>
          <div className="mt-6 space-y-4 text-gray-600">
            <p>
              Sun Elastomers Pvt Ltd serves pharmaceutical buyers with high-quality rubber and elastomer components built for demanding packaging and production environments.
            </p>
            <p>
              Our approach focuses on rigorous quality systems, controlled manufacturing, and highly responsive B2B collaboration.
            </p>
            <p>
              From routine supply to custom requirements, our team supports regulated buyers with technical clarity and dependable documentation.
            </p>
          </div>
          <Link href="/about" className="mt-7 inline-flex font-bold text-red-600 hover:text-red-700 transition-colors">
            Read More &rarr;
          </Link>
        </motion.div>

        {/* Image Column - Sliding in from the Right */}
        <motion.div 
          className="relative" 
          initial={{ opacity: 0, x: 100 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Main Image */}
          <div className="overflow-hidden rounded-xl border-4 border-red-600/70 shadow-xl">
             <img 
               src="https://images.unsplash.com/photo-1579165466741-7f35e4755660?q=80&w=2070&auto=format&fit=crop" 
               alt="Pharmaceutical Manufacturing Environment" 
               className="h-full w-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
             />
          </div>
          
          {/* Floating ISO Badge - Sliding up from the bottom */}
          <motion.div 
             className="absolute -bottom-6 left-6 rounded-lg bg-red-50 px-5 py-4 text-sm font-bold text-red-700 shadow-2xl shadow-red-600/20 border border-red-100"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.8 }}
          >
            ISO 9001:2015 Certified
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}