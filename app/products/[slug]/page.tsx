import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import { ProductsPage } from "@/components/products/ProductsPage";
import { getProductCategoryBySlug, productCategories, productCategorySlug } from "@/data/constants";
import { getProductBySlug, products } from "@/data/products";
import { createPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    ...products.map((product) => ({ slug: product.slug })),
    ...productCategories.map((category) => ({ slug: productCategorySlug(category.category) })),
  ];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const category = getProductCategoryBySlug(slug);

  if (!product) {
    if (category) {
      return createPageMetadata({
        title: `${category.title} Products`,
        path: `/products/${productCategorySlug(category.category)}`,
        description: category.description,
        keywords: [category.title, category.category, "Sun Elastomers products", "pharmaceutical products"],
      });
    }

    return createPageMetadata({
      title: "Product Not Found",
      path: "/products",
      description: "Product information could not be found.",
      keywords: ["Sun Elastomers products"],
    });
  }

  return createPageMetadata({
    title: product.brand,
    path: `/products/${product.slug}`,
    description: `${product.brand} - ${product.generic}, ${product.form}${product.strength ? `, ${product.strength}` : ""}.`,
    keywords: [product.brand, product.generic, product.category, product.form],
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const category = getProductCategoryBySlug(slug);

  if (category) return <ProductsPage key={category.category} initialTab={category.category} />;

  if (!product) notFound();

  return <ProductDetailPage product={product} />;
}
