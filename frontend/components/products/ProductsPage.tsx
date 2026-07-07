"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { 
  MapPin, 
  Syringe, 
  BriefcaseMedical, 
  Tablets, 
  FlaskConical, 
  PackageCheck, 
  Beaker, 
  type LucideIcon 
} from "lucide-react";
import { SectionHeading, stagger } from "@/components/common/AnimatedPrimitives";
import { getBannerSrc } from "@/lib/utils";
import { productCategories, productCategorySlug } from "@/data/constants";
import { products, type Product } from "@/data/products";
import ReactMarkdown from "react-markdown";

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
      {/* Dynamic Responsive Banner Header */}
      <section className="relative h-[280px] md:h-[450px] w-full overflow-hidden bg-ink pt-16 md:pt-24 text-white">
        {/* Desktop Image */}
        <div className="hidden md:block absolute inset-0">
          <Image src={getBannerSrc(categoryLandingBanner, "desktop")} alt="Assorted pharmaceutical medicines" fill priority sizes="100vw" className="object-cover object-center" />
        </div>
        {/* Mobile Image */}
        <div className="block md:hidden absolute inset-0">
          <Image src={getBannerSrc(categoryLandingBanner, "mobile")} alt="Assorted pharmaceutical medicines" fill priority sizes="100vw" className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="absolute inset-0 flex items-center z-20">
          <div className="mx-auto w-full max-w-7xl px-8 lg:px-1 flex flex-col items-start">
            <motion.div
              key="products-landing-hero"
              className="border-l-[6px] border-crimson pl-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-golden">
                  Categories
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Choose a product category.
              </h1>
            </motion.div>
          </div>
        </div>
      </section>
      <CategoryLanding />
    </main>
  );
}

function CategoryLanding() {
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [localCategories, setLocalCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [prodsRes, catsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/api/products`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/api/categories`),
        ]);
        if (prodsRes.ok) setLocalProducts(await prodsRes.json());
        if (catsRes.ok) {
          const cats = await catsRes.json();
          if (cats && cats.length > 0) {
            setLocalCategories(cats);
          } else {
            setLocalCategories(productCategories);
          }
        } else {
          setLocalCategories(productCategories);
        }
      } catch (err) {
        console.error("Failed to load products/categories data:", err);
        setLocalCategories(productCategories);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <section className="section bg-cream text-ink">
        <div className="mx-auto flex min-h-[40vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-crimson/20 border-t-crimson" />
            <p className="text-sm font-semibold text-muted">Loading categories…</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-50px" }}
        >
          {localCategories.map((cat) => {
            const { title, image, description, category, region } = cat;
            const count = localProducts.filter((product) => {
              if (!product || !product.category || !category) return false;
              const slug1 = product.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
              const slug2 = category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
              return slug1 === slug2;
            }).length;

            const iconMap: Record<string, LucideIcon> = {
              Syringe,
              BriefcaseMedical,
              Tablets,
              FlaskConical,
              PackageCheck,
              Beaker,
            };

            const activeIcon = cat.iconName || cat.icon;
            const IconComponent = typeof activeIcon === "string"
              ? iconMap[activeIcon] || Beaker
              : activeIcon || Beaker;

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
                      src={image || "/category-img/antibiotics-oral.png"}
                      alt={`${title} category`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-fill transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 right-4 z-20 rounded-full border border-white/10 bg-black/60 p-3 shadow-lg backdrop-blur-md transition-transform group-hover:scale-110">
                      <IconComponent className="text-golden" size={24} />
                    </div>
                    <span className="absolute bottom-4 left-4 z-20 rounded-full bg-black/60 px-3 py-1 text-xs font-black text-golden backdrop-blur-md">
                      {count} Products
                    </span>
                    {/* Myanmar region badge */}
                    {region && (
                      <span className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-white/20 border border-crimson/60 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-crimson backdrop-blur-sm shadow-sm">
                        <MapPin size={10} className="shrink-0" />
                        {region}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h2 className="text-xl font-bold tracking-wide text-white">{title}</h2>
                    <div className="mt-3 flex-1 text-sm leading-relaxed text-zinc-300 prose prose-invert prose-neutral max-w-none">
                      <ReactMarkdown>{description || ""}</ReactMarkdown>
                    </div>
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
