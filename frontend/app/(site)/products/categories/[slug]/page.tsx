import { permanentRedirect } from "next/navigation";
import { productCategories, productCategorySlug } from "@/data/constants";

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

export default async function Page({ params }: Props) {
  const { slug } = await params;
  permanentRedirect(`/categories/${slug}`);
}
