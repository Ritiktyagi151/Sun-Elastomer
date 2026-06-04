import { ContactPage } from "@/components/InnerPages";
import { pageDescriptions } from "@/data/constants";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Contact",
    path: "/contact",
    description: pageDescriptions.contact,
    keywords: ["contact Sun Elastomers", "pharma rubber supplier inquiry", "custom elastomer quote", "B2B pharma manufacturer"],
  });
}

export default function Page() {
  return <ContactPage />;
}
