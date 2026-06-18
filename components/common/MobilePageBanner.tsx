"use client";

import Image from "next/image";

type MobilePageBannerProps = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
};

export function MobilePageBanner({ src, alt, eyebrow, title }: MobilePageBannerProps) {
  return (
    <section className="relative block overflow-hidden bg-ink pt-16 text-white md:hidden">
      <div className="relative aspect-[4/5] min-h-[430px] w-full">
        <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/18 to-black/8" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-8">
          <p className="inline-flex rounded-full bg-white/14 px-3 py-1 text-xs font-black uppercase text-white ring-1 ring-white/20">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-sm font-display text-3xl font-black leading-tight">{title}</h1>
        </div>
      </div>
    </section>
  );
}
