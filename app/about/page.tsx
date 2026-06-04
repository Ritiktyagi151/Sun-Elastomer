import { AboutPage } from "@/components/about/AboutPage";
import { pageDescriptions } from "@/data/constants";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "About Us",
    path: "/about",
    description: pageDescriptions.about,
    keywords: ["Sun Elastomers about", "pharmaceutical company Ghaziabad", "GST registered pharma company"],
  });
}

export default function Page() {
  return <AboutPage />;
}
