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
      <ScrollSlide direction="up" once={true}>
        <HealthcareDashboard />
      </ScrollSlide>
      {/* <ScrollSlide direction="right">
        <AboutPreviewSection />
      </ScrollSlide> */}
      <ScrollSlide direction="left" once={true}>
        <ProductRangeSection />
      </ScrollSlide>
      <ScrollSlide direction="up" once={true}>
        <FeaturesSection />
      </ScrollSlide>
      <ScrollSlide direction="right" once={true}>
        <Testimonial />
      </ScrollSlide>
      <ScrollSlide direction="left" once={true}>
        <ManufacturingPreviewSection />
      </ScrollSlide>
      <ScrollSlide direction="up" once={true}>
        <ClientsSection />
      </ScrollSlide>
      <ScrollSlide direction="right" once={true}>
        <FAQSection />
      </ScrollSlide>
      <ScrollSlide direction="up" once={true}>
        <CtaSection />
      </ScrollSlide>
    </main>
  );
}
