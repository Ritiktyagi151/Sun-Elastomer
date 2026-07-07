"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { getBannerSrc } from "@/lib/utils";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  category: string;
  featured?: boolean;
};

const defaultAllBlogPosts = [
  {
    slug: "who-gmp-compliance-procurement",
    title: "Navigating WHO-GMP Compliance in Pharmaceutical Procurement",
    date: "June 24, 2026",
    author: "Sun Quality Team",
    readTime: "5 min read",
    image: "/banners/desktop/quality-banner.png",
    category: "Compliance",
  },
  {
    slug: "third-party-manufacturer-tadalafil-india",
    title: "Third Party Manufacturer for Tadalafil in India",
    date: "May 10, 2026",
    author: "Regulatory Affairs",
    readTime: "8 min read",
    image: "/banners/desktop/banner.jpeg",
    category: "Oral Strips",
  },
  {
    slug: "optimizing-packaging-export-markets",
    title: "Optimizing Packaging Formats for Export Market Efficacy",
    date: "May 18, 2026",
    author: "Supply Chain Dept",
    readTime: "4 min read",
    image: "/banners/desktop/manufacturingbanner.png",
    category: "Logistics",
  },
  {
    slug: "role-l-arginine-stabilization",
    title: "The Role of L-Arginine in Fourth-Generation Cephalosporins",
    date: "April 12, 2026",
    author: "Technical R&D",
    readTime: "6 min read",
    image: "/banners/desktop/certification-banner.png",
    category: "Technical",
  },
];

export function BlogDetailPage({ post: initialPost, slug }: { post?: BlogPost; slug?: string }) {
  const [post, setPost] = useState<BlogPost | undefined>(initialPost);
  const [blogsList, setBlogsList] = useState<BlogPost[]>([]);
  const [copied, setCopied] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync with dynamic MongoDB APIs
  useEffect(() => {
    if (slug) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/api/blogs/${slug}`)
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((data) => {
          if (data) setPost(data);
        })
        .catch((err) => console.error("Failed to fetch blog post details:", err));

      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/api/blogs`)
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((data) => {
          if (data) setBlogsList(data);
        })
        .catch((err) => console.error("Failed to fetch blogs list:", err));
    }
  }, [slug]);

  // Find index for Prev/Next
  const currentIndex = post ? blogsList.findIndex((p) => p.slug === post.slug) : -1;
  const prevPost = currentIndex > 0 ? blogsList[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < blogsList.length - 1 ? blogsList[currentIndex + 1] : null;

  // Related posts (excluding current)
  const relatedPosts = post
    ? blogsList.filter((p) => p.slug !== post.slug).slice(0, 3)
    : [];

  // Table of Contents headings generator
  const tocHeadings = useMemo(() => {
    if (!post || !post.content) return [{ id: "intro", label: "1. Introduction" }];

    const headingRegex = /^(##|###)\s+(.+)$/gm;
    const headings: { id: string; label: string; subLinks?: { id: string; label: string }[] }[] = [];
    let match;

    while ((match = headingRegex.exec(post.content)) !== null) {
      const level = match[1];
      const titleText = match[2].trim();
      const id = titleText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

      if (level === "##") {
        headings.push({ id, label: titleText, subLinks: [] });
      } else if (level === "###" && headings.length > 0) {
        headings[headings.length - 1].subLinks?.push({ id, label: titleText });
      }
    }

    if (headings.length === 0) {
      return [{ id: "intro", label: "1. Introduction" }];
    }

    return headings;
  }, [post]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!post) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center pt-28 px-6 text-center bg-cream">
        <h2 className="text-2xl font-black text-ink">Blog Post Not Found</h2>
        <p className="text-muted text-sm mt-2 max-w-md">The blog article details could not be loaded. It might have been deleted or modified.</p>
        <Link href="/blog" className="btn-primary mt-6 px-6 py-2.5 text-xs font-black uppercase rounded-lg">
          Back to Blog Listing
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white pt-28">

      {/* ================= ARTICLE HEADER BLOCK ================= */}
      <section className="mt-8">
        <div className="mx-auto max-w-7xl px-6 text-left flex flex-col gap-4">
          <span className="pill bg-crimson/10 text-crimson border border-crimson/20 px-3.5 py-1 text-[10px] font-black uppercase tracking-widest w-fit">
            {post.category}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-[38px] font-black text-ink leading-[1.25] tracking-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted py-3 border-y border-neutral-100">
            <span className="flex items-center gap-1 font-bold text-ink">
              <User size={12} className="text-crimson" />
              By {post.author}
            </span>
            <span className="h-3 w-[1px] bg-neutral-200 hidden sm:block" />
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {post.date}
            </span>
            <span className="h-3 w-[1px] bg-neutral-200 hidden sm:block" />
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* ================= FEATURED IMAGE ================= */}
      <section className="mx-auto max-w-7xl px-6 my-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
          <Image
            src={getBannerSrc(post.image, "desktop")}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 1024px) 100vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* ================= SHARE BAR ================= */}
      <section className="mx-auto max-w-7xl px-6 mb-8 border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-muted">Share this article:</span>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(mounted ? window.location.href : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-neutral-200 hover:border-crimson hover:bg-crimson hover:text-white flex items-center justify-center text-muted transition"
            title="Share on Facebook"
          >
            <Facebook size={14} />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(mounted ? window.location.href : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-neutral-200 hover:border-crimson hover:bg-crimson hover:text-white flex items-center justify-center text-muted transition"
            title="Share on X"
          >
            <Twitter size={14} />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(mounted ? window.location.href : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-neutral-200 hover:border-crimson hover:bg-crimson hover:text-white flex items-center justify-center text-muted transition"
            title="Share on LinkedIn"
          >
            <Linkedin size={14} />
          </a>
          <button
            onClick={handleCopyLink}
            className="w-8 h-8 rounded-full border border-neutral-200 hover:border-crimson hover:bg-crimson hover:text-white flex items-center justify-center text-muted transition"
            title="Copy Link"
          >
            {copied ? <Check size={14} className="text-green-500 hover:text-white" /> : <Copy size={14} />}
          </button>
        </div>
      </section>

      {/* ================= TWO-COLUMN LAYOUT / MAIN BODY ================= */}
      <section className="mx-auto max-w-7xl px-6 mb-16">
        
        {/* Mobile Accordion Table of Contents */}
        <div className="lg:hidden mb-8 border border-neutral-200 rounded-xl overflow-hidden shadow-sm bg-neutral-50">
          <button
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            className="w-full px-5 py-4 flex items-center justify-between font-bold text-xs uppercase text-ink hover:bg-neutral-100 transition"
          >
            <span className="flex items-center gap-2">
              <BookOpen size={14} className="text-crimson" /> Table of Contents
            </span>
            <ChevronDown size={16} className={`transition duration-300 ${mobileTocOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {mobileTocOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-hidden border-t border-neutral-200"
              >
                <ul className="p-4 space-y-3 text-xs font-semibold text-muted">
                  {tocHeadings.map((heading) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`} onClick={() => setMobileTocOpen(false)} className="hover:text-crimson block">
                        {heading.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
          
          {/* MAIN CONTENT COLUMN */}
          <div className="w-full lg:max-w-[850px] flex-1">
            <article className="prose max-w-none text-muted leading-8 text-[16px] space-y-6">
              
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => {
                    const text = React.Children.toArray(children).join("");
                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                    return <h2 id={id} className="font-display text-2xl md:text-[27px] font-black text-ink mt-9 mb-3">{children}</h2>;
                  },
                  h3: ({ children }) => {
                    const text = React.Children.toArray(children).join("");
                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                    return <h3 id={id} className="font-display text-lg md:text-[21px] font-bold text-ink mt-6 mb-2">{children}</h3>;
                  },
                  p: ({ children }) => <p className="text-neutral-600 leading-8 text-[16px] mb-4">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-5 space-y-2.5 ml-2 mb-4">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-5 space-y-2.5 ml-2 mb-4">{children}</ol>,
                  li: ({ children }) => <li className="text-neutral-600 leading-7">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-crimson pl-4 my-4 italic text-neutral-500 bg-neutral-50 py-2">
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="w-full text-left text-xs border border-neutral-200 border-collapse rounded-lg overflow-hidden">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => <thead className="bg-neutral-100 text-ink border-b border-neutral-200">{children}</thead>,
                  th: ({ children }) => <th className="p-3 font-black">{children}</th>,
                  td: ({ children }) => <td className="p-3">{children}</td>,
                  tr: ({ children }) => <tr className="border-b border-neutral-200">{children}</tr>,
                  strong: ({ children }) => <strong className="text-ink font-bold">{children}</strong>,
                  img: ({ src, alt }) => (
                    <span className="block my-6 overflow-hidden rounded-2xl border border-neutral-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                      <img src={src} alt={alt} className="w-full h-auto object-cover max-h-[500px]" />
                      {alt && <span className="block text-center text-xs font-semibold text-neutral-400 mt-2">{alt}</span>}
                    </span>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>

            </article>
          </div>

          {/* SIDEBAR (Sticky) */}
          <aside className="hidden lg:block lg:sticky lg:top-28 w-[300px] shrink-0 border-l border-neutral-100 pl-6">
            
            {/* Table of Contents */}
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 mb-6">
              <h4 className="text-xs font-black uppercase text-ink tracking-widest mb-3 flex items-center gap-1.5 border-b border-neutral-200 pb-2">
                <BookOpen size={14} className="text-crimson" /> Contents
              </h4>
              <ul className="space-y-2.5 text-xs font-semibold text-muted">
                {tocHeadings.map((heading) => (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`} className="hover:text-crimson transition flex items-center gap-1">
                      ✦ {heading.label}
                    </a>
                    {heading.subLinks && heading.subLinks.length > 0 && (
                      <ul className="pl-3 mt-1.5 space-y-1.5 text-[11px] font-normal text-muted border-l border-neutral-200">
                        {heading.subLinks.map((sub) => (
                          <li key={sub.id}>
                            <a href={`#${sub.id}`} className="hover:text-crimson block">
                              {sub.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Articles */}
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
              <h4 className="text-xs font-black uppercase text-ink tracking-widest mb-3 flex items-center gap-1.5 border-b border-neutral-200 pb-2">
                Recent Articles
              </h4>
              <div className="flex flex-col gap-3 text-xs">
                {blogsList.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className={`font-semibold line-clamp-2 leading-relaxed transition ${
                      item.slug === post.slug ? "text-crimson pointer-events-none" : "text-ink hover:text-crimson"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </section>

      {/* ================= NEXT-ARTICLE NAV ================= */}
      <section className="border-t border-neutral-100 bg-neutral-50 py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-ink">
            <Link href="/blog" className="flex items-center gap-1.5 hover:text-crimson transition">
              <span className="text-sm font-semibold">←</span> Back to Blogs
            </Link>

            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="flex items-center gap-1.5 hover:text-crimson transition max-w-[65%] text-right justify-end">
                Next: {nextPost.title} <span className="text-sm font-semibold">→</span>
              </Link>
            ) : (
              <span className="text-neutral-300">End of Blog →</span>
            )}
          </div>
        </div>
      </section>

      {/* Related posts grid */}
      {relatedPosts.length > 0 && (
        <section className="bg-cream py-16 border-t border-neutral-200">
          <div className="mx-auto max-w-[1200px] px-6">
            <h3 className="font-display text-2xl font-black text-ink mb-8">Related Sourcing News</h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rel) => (
                <article key={rel.slug} className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                    <Image
                      src={getBannerSrc(rel.image, "desktop")}
                      alt={rel.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover"
                    />
                    <span className="absolute top-3 left-3 z-10 rounded-full bg-crimson px-3 py-1 text-[9px] font-black uppercase tracking-wider text-white">
                      {rel.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-[10px] text-neutral-400 mb-2">{rel.date}</span>
                    <h4 className="font-display text-base font-black text-ink leading-snug hover:text-crimson transition line-clamp-2">
                      <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                    <Link href={`/blog/${rel.slug}`} className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-crimson transition hover:text-ink mt-4 justify-end">
                      Read Article <span className="text-sm font-semibold">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
