"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ClipboardCheck, Filter, PackageCheck, Search, ShieldCheck } from "lucide-react";
import { ScrollSlide, SectionHeading, fadeUp, stagger } from "@/components/common/AnimatedPrimitives";
import { productCategories, products } from "@/data/constants";

const tabs = ["All", ...productCategories.map((category) => category.title)];

const categoryImageByTitle = Object.fromEntries(productCategories.map((category) => [category.title, category.image]));

export function ProductsPage({ initialTab }: { initialTab?: string }) {
  const activeInitialTab = initialTab && tabs.includes(initialTab) ? initialTab : "All";
  const [tab, setTab] = useState(activeInitialTab);
  const visible = tab === "All" ? products : products.filter((product) => product.category === tab);

  return (
    <main>
      <ProductsHero />
      <ScrollSlide direction="up">
        <CategoryOverview />
      </ScrollSlide>
      <ScrollSlide direction="left">
        <section className="section bg-white">
          <div className="mx-auto max-w-7xl px-5">
            <ProductTabs activeTab={tab} onChange={setTab} />
            <ProductGrid products={visible} />
            <CustomRequirementCallout />
          </div>
        </section>
      </ScrollSlide>
    </main>
  );
}

function ProductsHero() {
  return (
    <section className="relative h-[450px] overflow-hidden bg-ink px-5 pb-10 pt-24 text-white">
      <Image
        src="/banners/banner.jpeg"
        alt="Assorted pharmaceutical medicines"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/84 via-black/58 to-black/12" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
      <motion.div
        className="relative mx-auto flex h-full max-w-7xl flex-col justify-center"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="eyebrow bg-white/14 text-golden ring-1 ring-white/20">Product Range</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-black leading-tight md:text-6xl">
          Pharmaceutical products across focused therapeutic categories.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/84 md:text-lg">
          Explore injectables, oral antibiotics, CNS, antidiabetic, dermatology and gastroenterology products with clear
          composition and pack information.
        </p>
      </motion.div>
    </section>
  );
}

function CategoryOverview() {
  return (
    <section className="section bg-cream">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Categories" title="Browse by product segment." centered />
        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {productCategories.map(({ icon: Icon, title, image, description }) => (
            <motion.article
              key={title}
              variants={fadeUp}
              className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm"
              whileHover={{ y: -6 }}
            >
              <div className="relative h-48">
                <Image src={image} alt={title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-5">
                <Icon className="text-crimson" size={28} />
                <h3 className="mt-3 text-xl font-black text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProductTabs({ activeTab, onChange }: { activeTab: string; onChange: (tab: string) => void }) {
  return (
    <div>
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow mx-auto">
          <Filter size={14} /> Filter Products
        </p>
        <h2 className="mt-4 font-display text-4xl font-black text-ink">Find the right product quickly.</h2>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {tabs.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`rounded-full px-5 py-2 text-sm font-bold transition ${
              activeTab === item ? "bg-crimson text-white shadow-lg shadow-crimson/20" : "bg-neutral-100 text-ink hover:bg-neutral-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductGrid({ products: visibleProducts }: { products: typeof products }) {
  return (
    <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {visibleProducts.map((product) => {
          const image = categoryImageByTitle[product.category] || "/homepage-img/medicine.jpg";

          return (
            <motion.article
              layout
              key={product.name}
              className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              whileHover={{ y: -6 }}
            >
              <Link href={`/products/${product.slug}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={image}
                    alt={`${product.category} product image`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-crimson">
                    {product.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black text-ink transition hover:text-crimson">{product.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{product.spec}</p>
                  <p className="mt-2 text-sm font-bold text-muted">{product.form}</p>
                  <span className="btn-primary mt-6 px-5 py-3 text-sm">
                    View Details <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}

function CustomRequirementCallout() {
  const items = [
    { icon: Search, title: "Product Availability", text: "Ask about product range, category and dosage form." },
    { icon: ClipboardCheck, title: "Documentation", text: "Request composition and commercial information." },
    { icon: ShieldCheck, title: "Supply Discussion", text: "Share quantity, destination and timeline requirements." },
  ];

  return (
    <motion.div
      className="mt-14 rounded-lg border border-crimson/10 bg-peach p-8 text-ink"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <PackageCheck className="text-crimson" size={34} />
          <h2 className="mt-4 font-display text-4xl font-black">Need product documentation?</h2>
          <p className="mt-3 leading-7 text-muted">
            Contact us for product availability, commercial requirements, pack details and supporting documentation.
          </p>
          <Link href="/contact" className="btn-primary mt-6 px-6 py-3">
            Contact Team <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-lg bg-white p-5 shadow-sm">
              <Icon className="text-crimson" size={26} />
              <h3 className="mt-3 font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
