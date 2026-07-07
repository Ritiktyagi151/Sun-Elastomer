"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { getBannerSrc } from "@/lib/utils";

const blogPosts = [
  {
    slug: "who-gmp-compliance-procurement",
    title: "Navigating WHO-GMP Compliance in Pharmaceutical Procurement",
    excerpt: "Understanding quality assurance protocols, manufacturing standards, and inspection discipline for consistent, reliable B2B drug supply chain management.",
    date: "June 24, 2026",
    author: "Sun Quality Team",
    readTime: "5 min read",
    image: "/banners/desktop/quality-banner.png",
    category: "Compliance",
    featured: true,
  },
  {
    slug: "optimizing-packaging-export-markets",
    title: "Optimizing Packaging Formats for Export Market Efficacy",
    excerpt: "How specialized vials, sterile water for injection (SWFI), and patient information leaflets (PIL) enhance B2B export efficiency.",
    date: "May 18, 2026",
    author: "Supply Chain Dept",
    readTime: "4 min read",
    image: "/banners/desktop/manufacturingbanner.png",
    category: "Logistics",
    featured: false,
  },
  {
    slug: "role-l-arginine-stabilization",
    title: "The Role of L-Arginine in Fourth-Generation Cephalosporins",
    excerpt: "A technical review of chemical stabilizers in sterile Cefepime Hydrochloride dry powder injections for shelf-life stability.",
    date: "April 12, 2026",
    author: "Technical R&D",
    readTime: "6 min read",
    image: "/banners/desktop/certification-banner.png",
    category: "Technical",
    featured: false,
  },
  {
    slug: "managing-cold-chain-injectables",
    title: "Managing Cold Chain Integrity for Injectable Antibiotics",
    excerpt: "Essential steps to preserve vaccine and antibiotic chemical structures from packaging site to local clinic dispatch.",
    date: "March 29, 2026",
    author: "Logistics Team",
    readTime: "5 min read",
    image: "/banners/desktop/b2.jpeg",
    category: "Logistics",
    featured: false,
  },
  {
    slug: "exploring-regulatory-documentation-sourcing",
    title: "Exploring Regulatory Documentation for B2B Sourcing",
    excerpt: "A complete guide on obtaining Certificates of Analysis, stability testing results, and files for global compliance dossiers.",
    date: "Feb 10, 2026",
    author: "Compliance Lead",
    readTime: "7 min read",
    image: "/banners/desktop/b3.jpeg",
    category: "Compliance",
    featured: false,
  },
  {
    slug: "formulation-stability-tropical-climates",
    title: "Formulation Stability under Humid & Tropical Climates",
    excerpt: "Reviewing specialized blister packaging configurations that protect critical dry formulations from humidity damage.",
    date: "Jan 15, 2026",
    author: "Technical R&D",
    readTime: "5 min read",
    image: "/banners/desktop/banner.jpeg",
    category: "Technical",
    featured: false,
  },
  {
    slug: "third-party-manufacturer-tadalafil-india",
    title: "Third Party Manufacturer for Tadalafil in India",
    excerpt: "A comprehensive guide on outsourcing Tadalafil oral strip formulations in India, including manufacturing standards, equipment validation, and FAQ.",
    date: "May 10, 2026",
    author: "Regulatory Affairs",
    readTime: "8 min read",
    image: "/banners/desktop/banner.jpeg",
    category: "Oral Strips",
    featured: false,
  },
];

export default function BlogListingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const [localPosts, setLocalPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/api/blogs`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        if (data) setLocalPosts(data);
      })
      .catch((err) => {
        console.error("Failed to fetch blog list:", err);
        setLocalPosts([]);
      });
  }, []);

  const filteredPosts = useMemo(() => {
    return localPosts;
  }, [localPosts]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="w-full bg-white">

      {/* ================= 3. HERO / BANNER SECTION ================= */}
      <section className="relative h-[280px] md:h-[450px] w-full overflow-hidden bg-ink pt-16 md:pt-24 text-white">
        {/* Desktop Image */}
        <div className="hidden md:block absolute inset-0">
          <Image src="/banners/desktop/banner.jpeg" alt="Sun Elastomer Blog Banner" fill priority className="object-cover object-center opacity-30" />
        </div>
        {/* Mobile Image */}
        <div className="block md:hidden absolute inset-0">
          <Image src="/banners/mobile/banner.jpeg" alt="Sun Elastomer Blog Banner" fill priority className="object-cover object-center opacity-30" />
        </div>
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="absolute inset-0 flex items-center z-20">
          <div className="mx-auto w-full max-w-7xl px-8 lg:px-1 flex flex-col items-start">
            <motion.div
              key="blog-listing-hero"
              className="border-l-[6px] border-crimson pl-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-golden">
                  Insights & News
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Sun Elastomer Blog
              </h1>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ================= 6. CARD GRID ================= */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          {paginatedPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post) => (
                <article
                  key={post.slug}
                  className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                >
                  {/* Card Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                    <Image
                      src={getBannerSrc(post.image, "desktop")}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition duration-300 hover:scale-102"
                    />
                    <span className="absolute top-3 left-3 z-10 rounded-full bg-crimson px-3 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-sm">
                      {post.category}
                    </span>
                    <span className="absolute top-3 right-3 z-10 rounded-full bg-black/60 px-2.5 py-1 text-[9px] font-black text-golden backdrop-blur-sm">
                      {post.date}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3 text-[11px] text-neutral-500 mb-3">
                      <span className="flex items-center gap-1 font-bold text-ink">
                        <User size={10} className="text-crimson" />
                        {post.author}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-black text-ink leading-snug hover:text-crimson transition line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="mt-2.5 text-xs leading-6 text-muted flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-5 pt-4 border-t border-neutral-100 flex justify-end">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-black uppercase text-crimson transition hover:text-ink"
                      >
                        Read Article <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-lg font-bold text-ink">No Sourcing Reports Found</h3>
              <p className="text-xs text-muted mt-2">Try adjusting your keywords or category filters.</p>
            </div>
          )}

          {/* ================= 7. PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition ${currentPage === pageNum
                        ? "bg-crimson text-white shadow-md shadow-crimson/15"
                        : "bg-white border border-neutral-200 hover:border-crimson text-ink hover:text-crimson"
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
