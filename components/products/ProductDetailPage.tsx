import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageBanner } from "@/components/common/PageBanner";
import { formBadgeClass, type Product } from "@/data/products";

export function ProductDetailPage({ product }: { product: Product }) {
  return (
    <main>
      <PageBanner title={product.brand} text={`${product.generic} ${product.strength ? `- ${product.strength}` : ""}`} />
      <section className="section bg-white">
        <div className="mx-auto max-w-5xl px-5">
          <Link href="/products" className="btn-outline mb-8 inline-flex px-5 py-3">
            <ArrowLeft size={18} /> Back to Products
          </Link>
          <article className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <span className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ring-1 ${formBadgeClass(product.form)}`}>
              {product.form}
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold text-ink">{product.generic}</h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <ProductMeta label="Category" value={product.category} />
              <ProductMeta label="Strength" value={product.strength ?? "[TO BE UPDATED]"} />
              <ProductMeta label="Pack" value={product.pack ?? "[TO BE UPDATED]"} />
              <ProductMeta label="Brand" value={product.brand} />
            </dl>
            <h3 className="mt-8 text-xl font-bold text-ink">Composition</h3>
            <div className="mt-4 overflow-hidden rounded-lg border border-neutral-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-50 text-ink">
                  <tr>
                    <th className="p-4">Ingredient</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Standard</th>
                  </tr>
                </thead>
                <tbody className="[&_td]:border-t [&_td]:border-neutral-200 [&_td]:p-4">
                  {product.composition.map((item) => (
                    <tr key={`${item.ingredient}-${item.quantity}`}>
                      <td>{item.ingredient}</td>
                      <td>{item.quantity}</td>
                      <td>{item.standard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {product.compositionNote ? <p className="mt-3 text-sm text-muted">Note: {product.compositionNote}</p> : null}
          </article>
        </div>
      </section>
    </main>
  );
}

function ProductMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-peach p-4">
      <dt className="text-sm font-bold text-crimson">{label}</dt>
      <dd className="mt-1 text-ink">{value}</dd>
    </div>
  );
}
