import { AboutPreviewSection } from "@/components/home/AboutPreviewSection";
import { ClientsSection } from "@/components/home/CertificationsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ManufacturingPreviewSection } from "@/components/home/ManufacturingPreviewSection";
import { ProductRangeSection } from "@/components/home/ProductRangeSection";
import { StatsSection } from "@/components/home/StatsSection";

import Testimonial from "./Testimonial";
import { FAQSection } from "./FAQSection";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <AboutPreviewSection />
      <ProductRangeSection />
      <FeaturesSection />
      <Testimonial/>
      <ManufacturingPreviewSection />
      <ClientsSection />
      <FAQSection />
      <CtaSection />
    </main>
  );
}
