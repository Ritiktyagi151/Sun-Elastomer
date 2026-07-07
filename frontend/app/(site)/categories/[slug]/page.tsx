import { notFound } from "next/navigation";
import { ProductCategoryPage } from "@/components/products/ProductCategoryPage";
import { getProductCategoryBySlug, productCategories, productCategorySlug } from "@/data/constants";
import { createPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/api/categories`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        return data.map((category: any) => ({ slug: productCategorySlug(category.category) }));
      }
    }
  } catch (err) {
    console.error("Failed to fetch categories for generateStaticParams:", err);
  }
  return productCategories.map((category: any) => ({ slug: productCategorySlug(category.category) }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = getProductCategoryBySlug(slug);

  if (!category) {
    return createPageMetadata({
      title: "Category Not Found",
      path: "/categories",
      description: "Product category information could not be found.",
      keywords: ["Sun Elastomers categories", "pharmaceutical categories"],
    });
  }

  return createPageMetadata({
    title: `${category.title} Products`,
    path: `/categories/${productCategorySlug(category.category)}`,
    description: category.description,
    keywords: [category.title, category.category, "Sun Elastomers categories", "pharmaceutical products"],
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const category = getProductCategoryBySlug(slug);

  if (!category) notFound();

  return <ProductCategoryPage categorySlug={slug} />;
}
