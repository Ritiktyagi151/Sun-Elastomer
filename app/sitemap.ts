import type { MetadataRoute } from "next";
import { navLinks, productCategories, productCategorySlug, siteUrl } from "@/data/constants";
import { products } from "@/data/products";

export const dynamic = "force-static";

const lastModified = new Date("2026-06-23");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = navLinks.map((link) => ({
    url: `${siteUrl}${link.href === "/" ? "" : link.href}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: link.href === "/" ? 1 : 0.8,
  }));

  const legalPages = [
    {
      url: `${siteUrl}/terms-conditions`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ];

  const categoryPages = productCategories.map((category) => ({
    url: `${siteUrl}/categories/${productCategorySlug(category.category)}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const productPages = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...legalPages, ...categoryPages, ...productPages];
}
