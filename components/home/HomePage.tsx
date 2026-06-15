import { AboutPreviewSection } from "@/components/home/AboutPreviewSection";
import { ClientsSection } from "@/components/home/CertificationsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import HealthcareDashboard from "@/components/home/HealthcareDashboard";
import { HeroSection } from "@/components/home/HeroSection";
import { ManufacturingPreviewSection } from "@/components/home/ManufacturingPreviewSection";
import { ProductRangeSection } from "@/components/home/ProductRangeSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ScrollSlide } from "@/components/common/AnimatedPrimitives";

import Testimonial from "./Testimonial";
import { FAQSection } from "./FAQSection";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      {/* <ScrollSlide direction="up">
        <StatsSection />
      </ScrollSlide> */}
      <ScrollSlide direction="up">
        <HealthcareDashboard />
      </ScrollSlide>
      {/* <ScrollSlide direction="right">
        <AboutPreviewSection />
      </ScrollSlide> */}
      <ScrollSlide direction="left">
        <ProductRangeSection />
      </ScrollSlide>
      <ScrollSlide direction="up">
        <FeaturesSection />
      </ScrollSlide>
      <ScrollSlide direction="right">
        <Testimonial />
      </ScrollSlide>
      <ScrollSlide direction="left">
        <ManufacturingPreviewSection />
      </ScrollSlide>
      <ScrollSlide direction="up">
        <ClientsSection />
      </ScrollSlide>
      <ScrollSlide direction="right">
        <FAQSection />
      </ScrollSlide>
      <ScrollSlide direction="up">
        <CtaSection />
      </ScrollSlide>
    </main>
  );
}
