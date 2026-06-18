"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Beaker, FileText, PackageCheck, ShieldCheck, Tag, type LucideIcon } from "lucide-react";
import { MobilePageBanner } from "@/components/common/MobilePageBanner";
import { ProductInquiryModal } from "@/components/products/ProductInquiryModal";
import { productCategories } from "@/data/constants";
import { products, type Product } from "@/data/products";

const categoryBanners = [
  "/banners/banner.jpeg",
  "/banners/b2.jpeg",
  "/banners/b3.jpeg",
  "/banners/banner1.png",
  "/banners/contact-us2.png",
];

const bannerForSlug = (slug: string) => {
  const index = slug.split("").reduce((total, char) => total + char.charCodeAt(0), 0) % categoryBanners.length;
  return categoryBanners[index];
};

type ProductCategoryPageProps = {
  categorySlug: string;
};

export function ProductCategoryPage({ categorySlug }: ProductCategoryPageProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const category = productCategories.find((item) => item.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") === categorySlug);

  if (!category) return null;

  const Icon = category.icon;
  const categoryProducts = products.filter((product) => product.category === category.category);
  const forms = Array.from(new Set(categoryProducts.map((product) => product.form)));
  const bannerImage = bannerForSlug(categorySlug);

  return (
    <main>
      <MobilePageBanner src={bannerImage} alt={category.title} eyebrow="Product Category" title={category.title} />

      <section className="relative hidden h-[480px] overflow-hidden bg-ink px-5 pb-10 pt-24 text-white md:block">
        <Image src={bannerImage} alt={category.title} fill priority sizes="100vw" className="object-cover object-center" />
      </section>

      <section className="bg-cream px-5 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <article className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-black text-crimson">
              <ArrowLeft size={16} /> Back to all products
            </Link>
            <Icon className="mt-8 text-crimson" size={36} />
            <h2 className="mt-4 font-display text-4xl font-black text-ink">{category.title}</h2>
            <p className="mt-4 leading-7 text-muted">{category.description}</p>
          </article>

          <div className="grid gap-4 sm:grid-cols-3">
            <CategoryStat icon={PackageCheck} label="Products" value={`${categoryProducts.length}`} />
            <CategoryStat icon={Tag} label="Dosage Forms" value={`${forms.length}`} />
            <CategoryStat icon={ShieldCheck} label="Route" value="B2B Inquiry" />
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Category Products</p>
              <h2 className="mt-4 font-display text-4xl font-black text-ink">Products under {category.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                Review brand, generic, strength, form, pack information and composition summary for this category.
              </p>
            </div>
            <Link href="/contact" className="btn-primary px-6 py-3">
              Request Category Details <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {categoryProducts.map((product) => (
              <CategoryProductCard key={product.slug} product={product} image={category.image} onInquiry={setSelectedProduct} />
            ))}
          </div>
        </div>
      </section>
      <ProductInquiryModal product={selectedProduct} open={Boolean(selectedProduct)} onClose={() => setSelectedProduct(null)} />
    </main>
  );
}

function CategoryStat({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <Icon className="text-crimson" size={28} />
      <p className="mt-5 font-display text-3xl font-black text-ink">{value}</p>
      <p className="mt-1 text-sm font-black uppercase text-muted">{label}</p>
    </article>
  );
}

function CategoryProductCard({ product, image, onInquiry }: { product: Product; image: string; onInquiry: (product: Product) => void }) {
  return (
    <article className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="grid md:grid-cols-[0.38fr_0.62fr]">
        <Link href={`/products/${product.slug}`} className="relative block min-h-56 overflow-hidden bg-neutral-100">
          <Image src={image} alt={product.brand} fill sizes="(min-width: 1024px) 24vw, 100vw" className="object-cover transition duration-500 hover:scale-105" />
        </Link>
        <div className="p-5">
          <p className="text-xs font-black uppercase text-crimson">{product.form}</p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="mt-2 text-2xl font-black text-ink transition hover:text-crimson">{product.brand}</h3>
          </Link>
          <p className="mt-2 text-sm font-bold leading-6 text-muted">{product.generic}</p>
          <div className="mt-4 grid gap-2 text-sm text-muted">
            <p>
              <strong className="text-ink">Strength:</strong> {product.strength || "[TO BE UPDATED]"}
            </p>
            <p>
              <strong className="text-ink">Pack:</strong> {product.pack || "Pack details available on request"}
            </p>
          </div>
          <div className="mt-4 rounded-lg bg-neutral-50 p-4">
            <p className="flex items-center gap-2 text-xs font-black uppercase text-ink">
              <Beaker size={15} className="text-crimson" /> Composition Summary
            </p>
            <div className="mt-3 space-y-2">
              {product.composition.slice(0, 2).map((item) => (
                <p key={`${product.slug}-${item.ingredient}`} className="text-xs leading-5 text-muted">
                  <strong className="text-ink">{item.ingredient}</strong> - {item.quantity} ({item.standard})
                </p>
              ))}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={`/products/${product.slug}`} className="btn-primary px-5 py-3 text-sm">
              Product Page <ArrowRight size={16} />
            </Link>
            <button type="button" onClick={() => onInquiry(product)} className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-5 py-3 text-sm font-black text-ink transition hover:border-crimson hover:text-crimson">
              Inquiry <FileText size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
