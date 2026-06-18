"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { ScrollSlide } from "@/components/common/AnimatedPrimitives";
import { MobilePageBanner } from "@/components/common/MobilePageBanner";
import { ProductInquiryModal } from "@/components/products/ProductInquiryModal";
import { formBadgeClass, type Product } from "@/data/products";

const productBanners = [
  "/banners/banner.jpeg",
  "/banners/b2.jpeg",
  "/banners/b3.jpeg",
  "/banners/banner1.png",
  "/banners/contact-us2.png",
];

const bannerForSlug = (slug: string) => {
  const index = slug.split("").reduce((total, char) => total + char.charCodeAt(0), 0) % productBanners.length;
  return productBanners[index];
};

export function ProductDetailPage({ product }: { product: Product }) {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const categoryImage = bannerForSlug(product.slug);

  return (
    <main>
      <MobilePageBanner src={categoryImage} alt={product.brand} eyebrow="Product Details" title={product.brand} />
      <ProductHero image={categoryImage} product={product} />
      <ScrollSlide direction="up">
        <section className="section bg-white">
          <div className="mx-auto max-w-5xl px-5">
            <Link href="/categories" className="btn-outline mb-8 inline-flex px-5 py-3">
              <ArrowLeft size={18} /> Back to Categories
            </Link>
            <article className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
              <span className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ring-1 ${formBadgeClass(product.form)}`}>
                {product.form}
              </span>
              <h2 className="mt-5 font-display text-4xl font-bold text-ink">{product.generic}</h2>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <ProductMeta label="Category" value={product.category} />
                <ProductMeta label="Strength" value={product.strength ?? "[TO BE UPDATED]"} />
                <ProductMeta label="Pack" value={product.pack ?? "[TO BE UPDATED]"} />
                <ProductMeta label="Brand" value={product.brand} />
              </dl>
              <h3 className="mt-8 text-xl font-bold text-ink">Composition</h3>
              <div className="mt-4 overflow-hidden rounded-lg border border-neutral-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral-50 text-ink">
                    <tr>
                      <th className="p-4">Ingredient</th>
                      <th className="p-4">Quantity</th>
                      <th className="p-4">Standard</th>
                    </tr>
                  </thead>
                  <tbody className="[&_td]:border-t [&_td]:border-neutral-200 [&_td]:p-4">
                    {product.composition.map((item) => (
                      <tr key={`${item.ingredient}-${item.quantity}`}>
                        <td>{item.ingredient}</td>
                        <td>{item.quantity}</td>
                        <td>{item.standard}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {product.compositionNote ? <p className="mt-3 text-sm text-muted">Note: {product.compositionNote}</p> : null}
              <button type="button" onClick={() => setInquiryOpen(true)} className="btn-primary mt-8 px-6 py-4">
                Product Inquiry <Send size={18} />
              </button>
            </article>
          </div>
        </section>
      </ScrollSlide>
      <ProductInquiryModal product={product} open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </main>
  );
}

function ProductHero({ image, product }: { image: string; product: Product }) {
  return (
    <section className="relative hidden h-[550px] overflow-hidden bg-ink px-5 pb-10 pt-24 text-white md:block">
      <Image
        src={image}
        alt={product.brand}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </section>
  );
}

function ProductMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-peach p-4">
      <dt className="text-sm font-bold text-crimson">{label}</dt>
      <dd className="mt-1 text-ink">{value}</dd>
    </div>
  );
}
