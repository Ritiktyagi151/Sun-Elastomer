import { ManufacturingPage } from "@/components/InnerPages";
import { pageDescriptions } from "@/data/constants";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Manufacturing",
    path: "/manufacturing",
    description: pageDescriptions.manufacturing,
    keywords: ["pharma manufacturing", "rubber moulding", "clean room", "QC lab", "pharmaceutical elastomer production"],
  });
}

export default function Page() {
  return <ManufacturingPage />;
}
