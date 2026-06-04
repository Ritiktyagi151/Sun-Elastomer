import { permanentRedirect } from "next/navigation";
import { ProductsPage } from "@/components/products/ProductsPage";
import { getProductCategoryBySlug, pageDescriptions, productCategorySlug } from "@/data/constants";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Products",
    path: "/products",
    description: pageDescriptions.products,
    keywords: ["Sunpreg", "Sunmox CV", "Elsefpime", "pharmaceutical products", "oral antibiotics"],
  });
}

type ProductsRouteProps = {
  searchParams?: Promise<{ category?: string | string[] }>;
};

export default async function Page({ searchParams }: ProductsRouteProps) {
  const params = await searchParams;
  const category = Array.isArray(params?.category) ? params.category[0] : params?.category;

  if (category) {
    const categorySlug = productCategorySlug(category);
    if (getProductCategoryBySlug(categorySlug)) permanentRedirect(`/products/${categorySlug}`);
  }

  return <ProductsPage />;
}
