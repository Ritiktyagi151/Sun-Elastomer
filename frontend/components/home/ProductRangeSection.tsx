"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import {
  MapPin,
  Syringe,
  BriefcaseMedical,
  Tablets,
  FlaskConical,
  PackageCheck,
  Beaker,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading, stagger, useStaticMobileMotion } from "@/components/common/AnimatedPrimitives";
import { productCategories, productCategorySlug } from "@/data/constants";

const iconMap: Record<string, LucideIcon> = {
  Syringe,
  BriefcaseMedical,
  Tablets,
  FlaskConical,
  PackageCheck,
  Beaker,
};

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
  const staticMotion = useStaticMobileMotion();
  const Grid = staticMotion ? "div" : motion.div;
  const Card = staticMotion ? "article" : motion.article;

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/api/categories`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setCategories(data);
        } else {
          setCategories(productCategories);
        }
      })
      .catch((err) => {
        console.error("Failed to load categories for homepage range:", err);
        setCategories(productCategories);
      });
  }, []);

  return (
    <section className="section bg-cream text-ink ">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading title="Our Product Range" light centered />

        <Grid
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          {...(!staticMotion
            ? {
              variants: stagger,
              initial: "hidden",
              whileInView: "show",
              viewport: { once: true, margin: "0px 0px -80px 0px" },
            }
            : {})}
        >
          {categories.map(({ image, icon, title, description, category, region }) => {
            const IconComponent = typeof icon === "string" ? iconMap[icon] || Syringe : icon;
            return (
              <Card
                key={title}
                className="group relative flex flex-col overflow-hidden rounded-2xl shadow-xl border border-white/10 transition-shadow duration-300 hover:shadow-2xl hover:shadow-golden/20 bg-[url('/bg-theme/bg2.png')] bg-cover bg-center"
                // Applied the slide variant here
                {...(!staticMotion
                  ? {
                    variants: slideInVariant,
                    whileHover: { y: -6 },
                  }
                  : {})}
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
                      {IconComponent && (
                        <div className="absolute bottom-4 right-4 z-20 rounded-full border border-white/10 bg-black/60 p-3 shadow-lg backdrop-blur-md transition-transform group-hover:scale-110">
                          <IconComponent className="text-golden" size={24} />
                        </div>
                      )}
                      {/* Myanmar region badge */}
                      {region && (
                        <span className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-white/40 border border-crimson/60 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-crimson backdrop-blur-md shadow-sm">
                          <MapPin size={10} className="shrink-0" />
                          {region}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Card Content with Glassmorphism */}
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    {/* Myanmar-specific label above title */}
                    {region && (
                      <p
                        className="mb-1 text-[10px] font-extrabold uppercase tracking-widest text-crimson"
                        style={{ textShadow: "0 0 8px rgba(185, 28, 28, 0.6)" }}
                      >
                        Available Only In {region} Market
                      </p>
                    )}
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
              </Card>
            );
          })}
        </Grid>
      </div>
    </section>
  );
}
