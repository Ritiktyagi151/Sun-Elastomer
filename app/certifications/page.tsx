import { CertificationsPage } from "@/components/InnerPages";
import { pageDescriptions } from "@/data/constants";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Certifications",
    path: "/certifications",
    description: pageDescriptions.certifications,
    keywords: ["WHO GMP", "ISO 9001", "pharma certifications", "regulatory compliance", "rubber manufacturer certificates"],
  });
}

export default function Page() {
  return <CertificationsPage />;
}
