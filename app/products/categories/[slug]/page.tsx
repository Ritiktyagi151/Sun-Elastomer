import { permanentRedirect } from "next/navigation";
import { productCategories, productCategorySlug } from "@/data/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productCategories.map((category) => ({ slug: productCategorySlug(category.category) }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  permanentRedirect(`/categories/${slug}`);
}
