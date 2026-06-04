import { AboutPreviewSection } from "@/components/home/AboutPreviewSection";
import { CertificationsSection } from "@/components/home/CertificationsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ManufacturingPreviewSection } from "@/components/home/ManufacturingPreviewSection";
import { ProductRangeSection } from "@/components/home/ProductRangeSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <AboutPreviewSection />
      <ProductRangeSection />
      <FeaturesSection />
      <ManufacturingPreviewSection />
      <CertificationsSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
