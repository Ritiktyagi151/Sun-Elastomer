import { ProductsPage } from "@/components/products/ProductsPage";
import { pageDescriptions } from "@/data/constants";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Categories",
    path: "/categories",
    description: pageDescriptions.products,
    keywords: ["Sun Elastomers categories", "pharmaceutical categories", "injectable antibiotics", "oral antibiotics"],
  });
}

export default function Page() {
  return <ProductsPage />;
}
