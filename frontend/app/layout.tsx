import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "../styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sunelastomers.com"),
  title: {
    default: "Sun Elastomers Private Limited | Pharmaceutical Products",
    template: "%s | Sun Elastomers Private Limited",
  },
  description:
    "Sun Elastomers Private Limited supplies tablets, capsules, injectables and oral antibiotic products as a GST registered pharmaceutical company.",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
