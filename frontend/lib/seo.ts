import type { Metadata } from "next";
import { siteUrl } from "@/data/constants";

type MetadataInput = {
  title: string;
  path: string;
  description: string;
  keywords: string[];
};

export function createPageMetadata({
  title,
  path,
  description,
  keywords,
}: MetadataInput): Metadata {
  const url = `${siteUrl}${path}`;
  const fullTitle = `${title} | Sun Elastomers Pvt Ltd - Pharmaceutical Manufacturer`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Sun Elastomers Pvt Ltd",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sun Elastomers Pvt Ltd pharmaceutical manufacturing" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og-image.jpg"],
    },
  };
}
