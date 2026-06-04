import type { MetadataRoute } from "next";
import { navLinks, productCategories, productCategorySlug, siteUrl } from "@/data/constants";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = navLinks.map((link) => ({
    url: `${siteUrl}${link.href === "/" ? "" : link.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: link.href === "/" ? 1 : 0.8,
  }));

  const categoryPages = productCategories.map((category) => ({
    url: `${siteUrl}/products/${productCategorySlug(category.category)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const productPages = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...categoryPages, ...productPages];
}
