import { notFound, permanentRedirect } from "next/navigation";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import { getProductCategoryBySlug, productCategorySlug } from "@/data/constants";
import { getProductBySlug, products } from "@/data/products";
import { createPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
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

  if (!product) notFound();

  return <ProductDetailPage product={product} />;
}
