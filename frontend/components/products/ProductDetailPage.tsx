"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getBannerSrc } from "@/lib/utils";
import { ArrowLeft, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ScrollSlide } from "@/components/common/AnimatedPrimitives";
import { ProductInquiryModal } from "@/components/products/ProductInquiryModal";
import { formBadgeClass, type Product } from "@/data/products";
import { productCategories } from "@/data/constants";

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

export function ProductDetailPage({ product: initialProduct, slug }: { product?: Product; slug?: string }) {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/api/products/${slug}`)
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((data) => {
          if (data) setProduct(data);
        })
        .catch((err) => console.error("Failed to fetch product:", err))
        .finally(() => setLoading(false));

      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/api/categories`)
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((data) => {
          if (data) setCategories(data);
        })
        .catch((err) => console.error("Failed to fetch categories:", err));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center pt-28 px-6 text-center bg-cream">
        <div className="w-8 h-8 border-4 border-crimson border-t-transparent rounded-full animate-spin"></div>
        <p className="text-neutral-500 text-xs font-semibold mt-4">Loading product specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center pt-28 px-6 text-center bg-cream">
        <h2 className="text-2xl font-black text-ink">Product Not Found</h2>
        <p className="text-muted text-sm mt-2 max-w-md">The product details could not be loaded. It might have been deleted or modified.</p>
        <Link href="/categories" className="btn-primary mt-6 px-6 py-2.5 text-xs font-black uppercase rounded-lg">
          Browse Categories
        </Link>
      </div>
    );
  }

  const categoryImage = bannerForSlug(product.slug);
  const categoryObj = categories.find((c) => c.category === product.category);
  const region = categoryObj?.region;
  const productImage = product.image || categoryObj?.image || "/category-img/antibiotics-oral.png";

  return (
    <main>
      {/* Dynamic Responsive Banner Header */}
      <section className="relative h-[280px] md:h-[450px] w-full overflow-hidden bg-ink pt-16 md:pt-24 text-white">
        {/* Desktop Image */}
        <div className="hidden md:block absolute inset-0">
          <Image src={getBannerSrc(categoryImage, "desktop")} alt={product.brand} fill priority sizes="100vw" className="object-cover object-center" />
        </div>
        {/* Mobile Image */}
        <div className="block md:hidden absolute inset-0">
          <Image src={getBannerSrc(categoryImage, "mobile")} alt={product.brand} fill priority sizes="100vw" className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="absolute inset-0 flex items-center z-20">
          <div className="mx-auto w-full max-w-7xl px-8 lg:px-1 flex flex-col items-start">
            <motion.div
              key={product.slug}
              className="border-l-[6px] border-crimson pl-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-golden">
                  Product Details
                </span>
                {region && (
                  <span className="inline-flex rounded-full bg-crimson/15 border border-crimson/30 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-crimson">
                    Available Only In {region} Market
                  </span>
                )}
              </div>
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                {product.brand}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>
      <ScrollSlide direction="up">
        <section className="section bg-white py-12">
          <div className="mx-auto max-w-7xl px-5">
            <article className="rounded-lg border border-neutral-200 bg-white p-6 md:p-8 shadow-sm">

              {/* Columns: Left (Image), Right (Details & Table) */}
              <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr] gap-8 items-start">

                {/* Left Column: Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-neutral-100 bg-neutral-50 shadow-sm">
                  <Image
                    src={productImage}
                    alt={product.brand}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition duration-300 hover:scale-102"
                  />
                </div>

                {/* Right Column: Details & Composition Table */}
                <div className="flex flex-col justify-start">
                  <span className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ring-1 w-fit ${formBadgeClass(product.form)}`}>
                    {product.form}
                  </span>

                  <h2 className="mt-4 font-display text-3xl font-black text-ink">{product.brand}</h2>
                  <p className="text-sm font-bold text-muted mt-1">{product.generic}</p>

                  <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                    <ProductMeta label="Category" value={product.category} />
                    <ProductMeta label="Strength" value={product.strength ?? "[TO BE UPDATED]"} />
                    <ProductMeta label="Pack" value={product.pack ?? "[TO BE UPDATED]"} />
                  </dl>

                  <h3 className="mt-6 text-lg font-bold text-ink">Composition</h3>
                  <div className="mt-3 overflow-hidden rounded-lg border border-neutral-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-50 text-ink">
                        <tr>
                          <th className="p-3">Ingredient</th>
                          <th className="p-3">Quantity</th>
                          <th className="p-3">Standard</th>
                        </tr>
                      </thead>
                      <tbody className="[&_td]:border-t [&_td]:border-neutral-200 [&_td]:p-3">
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
                </div>

              </div>

              {/* Bottom Row: Description & Inquire Button */}
              <div className="mt-8 pt-8 border-t border-neutral-100 flex flex-col gap-4">
                {(product.description || product.slug === "elsefpime-1000mg" || product.compositionNote) && (
                  <div>
                    <h4 className="text-sm font-bold text-ink mb-1">Product Description / Note</h4>
                    <div className="text-sm leading-6 text-muted prose prose-neutral max-w-none">
                      <ReactMarkdown>
                        {product.description || (product.slug === "elsefpime-1000mg"
                          ? "ELSEFPIME-1000mg (Cefepime for Injection USP) is a broad-spectrum, fourth-generation cephalosporin antibiotic designed for intravenous or intramuscular administration. It is indicated for the treatment of moderate to severe infections caused by susceptible strains of microorganisms, including urinary tract infections, skin infections, pneumonia, and empiric therapy for febrile neutropenic patients. This formulation is produced in compliance with global WHO-GMP quality standards for maximum stability, safety, and efficacy."
                          : product.compositionNote || "")}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
                <div className="flex justify-end mt-4">
                  <button type="button" onClick={() => setInquiryOpen(true)} className="btn-primary px-8 py-4 w-full md:w-auto">
                    Product Inquiry <Send size={18} />
                  </button>
                </div>
              </div>

            </article>

            {/* Back to Categories Button below the card */}
            <div className="mt-8 flex justify-center md:justify-start">
              <Link href="/categories" className="btn-outline inline-flex px-5 py-3">
                <ArrowLeft size={18} /> Back to Categories
              </Link>
            </div>

          </div>
        </section>
      </ScrollSlide>
      <ProductInquiryModal product={product} open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </main>
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
