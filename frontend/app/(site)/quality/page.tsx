import { QualityPage } from "@/components/InnerPages";
import { pageDescriptions } from "@/data/constants";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Quality Assurance",
    path: "/quality",
    description: pageDescriptions.quality,
    keywords: ["quality assurance", "pharma QC", "rubber component testing", "GMP quality", "pharmaceutical QA"],
  });
}

export default function Page() {
  return <QualityPage />;
}
