"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { MapPin } from "lucide-react";
import { SectionHeading, stagger } from "@/components/common/AnimatedPrimitives";
import { MobilePageBanner } from "@/components/common/MobilePageBanner";
import { productCategories, productCategorySlug } from "@/data/constants";
import { products } from "@/data/products";

const slideInVariant: Variants = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

const categoryLandingBanner =
  "/banners/desktop/banner.jpeg";

export function ProductsPage() {
  return (
    <main>
      <MobilePageBanner
        src={categoryLandingBanner}
        alt="Assorted pharmaceutical medicines"
        eyebrow="Product Categories"
        title="Browse products by category."
      />
      <ProductsHero />
      <CategoryLanding />
    </main>
  );
}

function ProductsHero() {
  return (
    <section className="relative hidden h-[500px] overflow-hidden bg-ink px-5 pb-10 pt-24 text-white md:block">
      <Image
        src={categoryLandingBanner}
        alt="Assorted pharmaceutical medicines"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </section>
  );
}

function CategoryLanding() {
  return (
    <section className="section bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow="Categories" title="Choose a product category." centered />
        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-50px" }}
        >
          {productCategories.map(({ icon: Icon, title, image, description, category, region }) => {
            const count = products.filter((product) => product.category === category).length;

            return (
              <motion.article
                key={title}
                variants={slideInVariant}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[url('/bg-theme/bg2.png')] bg-cover bg-center shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-golden/20"
                whileHover={{ y: -6 }}
              >
                <Link href={`/categories/${productCategorySlug(category)}`} className="flex h-full flex-col">
                  <div className="relative h-56 w-full overflow-hidden">
                    <div className="absolute inset-0 z-10 transition-colors duration-500" />
                    <Image
                      src={image}
                      alt={`${title} category`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-fill transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 right-4 z-20 rounded-full border border-white/10 bg-black/60 p-3 shadow-lg backdrop-blur-md transition-transform group-hover:scale-110">
                      <Icon className="text-golden" size={24} />
                    </div>
                    <span className="absolute bottom-4 left-4 z-20 rounded-full bg-black/60 px-3 py-1 text-xs font-black text-golden backdrop-blur-md">
                      {count} Products
                    </span>
                    {/* Myanmar region badge — only on Antibiotics - Oral */}
                    {region && (
                      <span className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-white/20 border border-crimson/60 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-crimson backdrop-blur-sm shadow-sm">
                        <MapPin size={10} className="shrink-0" />
                        {region}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h2 className="text-xl font-bold tracking-wide text-white">{title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-300">{description}</p>
                    <span className="mt-8 flex items-center text-sm font-bold text-golden transition-colors group-hover:text-white">
                      <span className="mr-2 text-xs uppercase tracking-wider">Explore Range</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
