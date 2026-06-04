import Script from "next/script";

import { company } from "@/data/products";
import { createPageMetadata } from "@/lib/seo";
import { HomePage } from "@/components/home/HomePage";

export function generateMetadata() {
  return createPageMetadata({
    title: "Home",
    path: "/",
    description:
      "Sun Elastomers Private Limited is a GST registered pharmaceutical company supplying tablets, capsules, injectables and oral antibiotic products.",
    keywords: [
      "pharmaceutical company Ghaziabad",
      "pharma product supplier",
      "injectable products",
      "oral antibiotics",
      "Sun Elastomers",
    ],
  });
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: "https://www.sunelastomers.com",
  logo: "https://www.sunelastomers.com/og-image.jpg",
  description:
    "GST registered pharmaceutical company supplying tablets, capsules, injectables and oral antibiotic products.",
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address,
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: company.contactPhone,
    email: company.contactEmail,
    contactType: "sales",
  },
  taxID: company.gstin,
};

export default function Page() {
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HomePage />
    </>
  );
}
