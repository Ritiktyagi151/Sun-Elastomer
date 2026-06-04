"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PlaceholderImage } from "@/components/common/AnimatedPrimitives";
import { productCategories, products } from "@/data/constants";
import { PageHero } from "@/components/common/PageBanner";

const tabs = ["All", ...productCategories.map((category) => category.title)];

export function ProductsPage({ initialTab }: { initialTab?: string }) {
  const activeInitialTab = initialTab && tabs.includes(initialTab) ? initialTab : "All";
  const [tab, setTab] = useState(activeInitialTab);
  const visible = tab === "All" ? products : products.filter((product) => product.category === tab);

  return (
    <main>
      <PageHero
        title="Products"
        text="Explore 15 pharmaceutical products across injectable antibiotics, oral antibiotics, CNS, antidiabetic, dermatology and gastroenterology categories."
      />
      <section className="section bg-white">
        <div className="mx-auto max-w-7xl px-5">
          <ProductTabs activeTab={tab} onChange={setTab} />
          <ProductGrid products={visible} />
          <CustomRequirementCallout />
        </div>
      </section>
    </main>
  );
}

function ProductTabs({ activeTab, onChange }: { activeTab: string; onChange: (tab: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {tabs.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`rounded-full px-5 py-2 text-sm font-bold ${
            activeTab === item ? "bg-crimson text-white" : "bg-neutral-100 text-ink"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function ProductGrid({ products: visibleProducts }: { products: typeof products }) {
  return (
    <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {visibleProducts.map((product) => (
          <motion.article
            layout
            key={product.name}
            className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            whileHover={{ y: -6 }}
          >
            <Link href={`/products/${product.slug}`} className="block">
              <PlaceholderImage label={product.name} />
              <h3 className="mt-5 text-xl font-bold text-ink transition hover:text-crimson">{product.name}</h3>
              <p className="mt-2 text-sm text-neutral-600">{product.spec}</p>
              <span className="btn-primary mt-6 px-5 py-3 text-sm">View Details</span>
            </Link>
          </motion.article>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

function CustomRequirementCallout() {
  return (
    <div className="mt-14 rounded-lg border border-crimson/10 bg-peach p-8 text-center text-ink">
      <h2 className="font-display text-3xl">Need product documentation?</h2>
      <p className="mt-3 text-muted">
        Contact us for product availability, commercial requirements and supporting documentation.
      </p>
    </div>
  );
}
