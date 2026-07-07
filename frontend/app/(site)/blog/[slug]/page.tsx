import { notFound } from "next/navigation";
import { BlogDetailPage } from "@/components/blog/BlogDetailPage";
import { createPageMetadata } from "@/lib/seo";

const blogPosts = [
  {
    slug: "who-gmp-compliance-procurement",
    title: "Navigating WHO-GMP Compliance in Pharmaceutical Procurement",
    content: `WHO-GMP (World Health Organization Good Manufacturing Practices) compliance is the gold standard for global pharmaceutical sourcing. For B2B buyers, importing agents, and distributors, verifying that partner manufacturing lines follow GMP discipline is critical to ensuring patient safety and avoiding regulatory delays.

At Sun Elastomers, we work closely with WHO-GMP certified manufacturing facilities to coordinate B2B pharmaceutical product sourcing. This compliance means that every stage of product movement, from raw material procurement to formulation and dispatch packaging, is subjected to strict control protocols.

### Key Aspects of GMP Sourcing:
1. **Material Quality Verification:** Verification of pharmaceutical grades and stabilizers (like L-Arginine) used in formulation batches.
2. **Process Discipline:** Sanitization, pressure control, sterile environment monitoring, and validation cycles.
3. **Traceability:** Complete batch record tracking, documentation support (including COA, stability reports, and certificates), and dispatch control.

Ensuring consistent compliance supports dependable supply chains and fosters trust between manufacturers, exporters, and local distribution channels.`,
    date: "June 24, 2026",
    author: "Sun Quality Team",
    readTime: "5 min read",
    image: "/banners/desktop/quality-banner.png",
    category: "Compliance",
  },
  {
    slug: "optimizing-packaging-export-markets",
    title: "Optimizing Packaging Formats for Export Market Efficacy",
    content: `Sourcing pharmaceutical formulations is only half the battle. In export markets, packaging integrity, moisture resistance, and clear clinical instructions are vital to maintaining product efficacy under variable shipping conditions.

Export-ready formulations require carefully chosen packaging configurations:
- **Vials in Monocartons:** Protection from physical impact during long-distance transit.
- **Sterile Water for Injection (SWFI):** Convenient packaging of dry powder antibiotics bundled with exact diluent quantities.
- **Patient Information Leaflets (PIL):** Detailed, standard-compliant dosage guides for patient usage.

By keeping layouts organized and prioritizing clean B2B dispatch workflows, distributors can significantly lower the risks of product damage or transit-induced spoilage.`,
    date: "May 18, 2026",
    author: "Supply Chain Dept",
    readTime: "4 min read",
    image: "/banners/desktop/manufacturingbanner.png",
    category: "Logistics",
  },
  {
    slug: "role-l-arginine-stabilization",
    title: "The Role of L-Arginine in Fourth-Generation Cephalosporins",
    content: `Fourth-generation cephalosporins, such as Cefepime Hydrochloride, are crucial in treating severe moderate-to-high resistance bacterial infections. However, Cefepime is highly sensitive to temperature and chemical degradation in dry powder forms.

To combat this, manufacturers add L-Arginine as a stabilizer. During preparation, Cefepime HCl undergoes chemical reactions where L-Arginine acts as an alkaline buffer, keeping the reconstituted solution's pH range safe for injection and maximizing chemical stability.

Understanding these biochemical stabilizers and technical specs assists B2B procurement managers in selecting formulations that maintain maximum shelf-life and clinical efficacy.`,
    date: "April 12, 2026",
    author: "Technical R&D",
    readTime: "6 min read",
    image: "/banners/desktop/certification-banner.png",
    category: "Technical",
  },
  {
    slug: "third-party-manufacturer-tadalafil-india",
    title: "Third Party Manufacturer for Tadalafil in India",
    excerpt: "A comprehensive guide on outsourcing Tadalafil oral strip formulations in India, including manufacturing standards, equipment validation, and FAQ.",
    content: "Tadalafil oral strip formulation sourcing guide.",
    date: "May 10, 2026",
    author: "Regulatory Affairs",
    readTime: "8 min read",
    image: "/banners/desktop/banner.jpeg",
    category: "Oral Strips",
  },
  {
    slug: "managing-cold-chain-injectables",
    title: "Managing Cold Chain Integrity for Injectable Antibiotics",
    excerpt: "Essential steps to preserve vaccine and antibiotic chemical structures from packaging site to local clinic dispatch.",
    content: `Maintaining cold chain integrity is critical to preserving the efficacy of temperature-sensitive injectables and vaccines. 

## The Challenges of Cold Chain Logistics
Antibiotic injection formulations can undergo hydrolysis or degradation if exposed to elevated temperatures. 

## Key Best Practices:
1. **Continuous Temperature Logging:** Using digital data loggers to record transport conditions.
2. **Specialized Cold Packs:** High-insulation packaging materials.
3. **Airport Ground Handling Audits:** Reducing tarmac wait times.`,
    date: "March 29, 2026",
    author: "Logistics Team",
    readTime: "5 min read",
    image: "/banners/desktop/b2.jpeg",
    category: "Logistics",
  },
  {
    slug: "exploring-regulatory-documentation-sourcing",
    title: "Exploring Regulatory Documentation for B2B Sourcing",
    excerpt: "A complete guide on obtaining Certificates of Analysis, stability testing results, and files for global compliance dossiers.",
    content: `Navigating global compliance dossiers requires a thorough understanding of regulatory documentation requirements.

## Core Sourcing Dossier Components:
1. **Certificate of Analysis (COA):** Validating batch chemical composition.
2. **COPP (Certificate of Pharmaceutical Product):** Validating wholesale licensing status.
3. **Stability Testing Results:** Confirming degradation resistance under Zone IV conditions.`,
    date: "Feb 10, 2026",
    author: "Compliance Lead",
    readTime: "7 min read",
    image: "/banners/desktop/b3.jpeg",
    category: "Compliance",
  },
  {
    slug: "formulation-stability-tropical-climates",
    title: "Formulation Stability under Humid & Tropical Climates",
    excerpt: "Reviewing specialized blister packaging configurations that protect critical dry formulations from humidity damage.",
    content: `High humidity levels pose a major risk to dry powder injection formulations during export and distribution.

## Moisture Barrier Technologies:
1. **Alu-Alu Foil Blisters:** Maximum moisture protection.
2. **Desiccant Integration:** Moisture absorption inside cartons.
3. **Reconstitution Checks:** Ensuring correct physical properties on use.`,
    date: "Jan 15, 2026",
    author: "Technical R&D",
    readTime: "5 min read",
    image: "/banners/desktop/banner.jpeg",
    category: "Technical",
  },
];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/api/blogs`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        return data.map((post: any) => ({ slug: post.slug }));
      }
    }
  } catch (err) {
    console.error("Failed to fetch blogs for generateStaticParams:", err);
  }
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return createPageMetadata({
      title: "Blog Post Not Found",
      path: "/blog",
      description: "Blog post could not be found.",
      keywords: ["blog", "not found"],
    });
  }

  return createPageMetadata({
    title: post.title,
    path: `/blog/${post.slug}`,
    description: post.excerpt || "",
    keywords: [post.category || "", "Sun Elastomers blog", "pharmaceutical insights"],
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  return <BlogDetailPage post={post} slug={slug} />;
}
