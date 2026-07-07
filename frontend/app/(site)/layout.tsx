import { ClientShell } from "@/components/common/ClientShell";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { ScrollSlide } from "@/components/common/AnimatedPrimitives";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientShell>
      <Navbar />
      {children}
      <ScrollSlide direction="up">
        <Footer />
      </ScrollSlide>
    </ClientShell>
  );
}
