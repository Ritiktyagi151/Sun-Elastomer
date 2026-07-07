import { notFound, permanentRedirect } from "next/navigation";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import { getProductCategoryBySlug, productCategorySlug } from "@/data/constants";
import { getProductBySlug, products } from "@/data/products";
import { createPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/api/products`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        return data.map((product: any) => ({ slug: product.slug }));
      }
    }
  } catch (err) {
    console.error("Failed to fetch products for generateStaticParams:", err);
  }
  return products.map((product: any) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const category = getProductCategoryBySlug(slug);

  if (!product) {
    if (category) {
      return createPageMetadata({
        title: `${category.title} Products`,
        path: `/categories/${productCategorySlug(category.category)}`,
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

  if (category) permanentRedirect(`/categories/${productCategorySlug(category.category)}`);

  return <ProductDetailPage product={product} slug={slug} />;
}
