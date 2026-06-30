"use client";

import { CountUp } from "@/components/common/AnimatedPrimitives";
import { homeStats } from "@/components/home/homeData";

export function StatsSection() {
  return (
    <section
  className="px-5 py-10 text-ink bg-cover bg-center"
  style={{
    backgroundImage: "url('/bg-theme/bg1.png')",
    willChange: "transform",
    transform: "translateZ(0)",
  }}
>
      <div className="mx-auto grid max-w-7xl gap-5 rounded-lg border border-crimson/10 bg-white p-5 shadow-xl shadow-crimson/5 md:grid-cols-4">
        {homeStats.map(({ number, suffix, label }) => (
          <article key={label} className="relative py-5 text-center md:[&:not(:last-child)]:border-r md:[&:not(:last-child)]:border-golden/25">
            <p className="text-4xl font-black text-crimson">
              <CountUp value={number} suffix={suffix} />
            </p>
            <p className="mt-2 text-sm text-muted">{label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
