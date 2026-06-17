"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { SectionHeading } from "@/components/common/AnimatedPrimitives";
import { clients } from "@/data/constants";
import { useRef, MouseEvent } from "react";

const ACCENT_COLORS = [
  { border: "hover:border-crimson/40" },
  { border: "hover:border-blue-400/40" },
  { border: "hover:border-emerald-400/40" },
  { border: "hover:border-amber-400/40" },
];

const BADGE_COLORS = [
  "bg-crimson/10 text-crimson",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-purple-100 text-purple-700",
  "bg-sky-100 text-sky-700",
];

// ── 3D tilt card ─────────────────────────────────────────────────────────────
function TiltCard({
  children,
  className = "",
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-1, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-8, 8]), { stiffness: 200, damping: 20 });
  const scale   = useSpring(1, { stiffness: 300, damping: 25 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width  - 0.5) * 2);
    rawY.set(((e.clientY - rect.top)  / rect.height - 0.5) * 2);
    scale.set(1.04);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={`relative rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md
                  shadow-[0_4px_24px_rgba(0,0,0,0.04)] cursor-default
                  transition-[border-color,box-shadow,transform] duration-300
                  hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]
                  ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export function ClientsSection() {
  return (
    <section className="section relative overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center"
        style={{ backgroundImage: "url('/bg-theme/product-offering-bg.webp')" }}
      />
      <div className="absolute inset-0 bg-white/2" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16 items-center py-4">

          {/* ── LEFT: Text block ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
          >
            <p className="text-xs font-medium tracking-widest uppercase text-muted">
              Our Clients
            </p>

            <SectionHeading title={`Trusted by ${clients.length}+ organisations across healthcare trade`} />

            <p className="text-sm text-muted leading-relaxed">
              Partnering with distributors, institutions, and B2B supply chains
              to deliver consistent, reliable healthcare solutions across the country.
            </p>

            <ul className="flex flex-col gap-3 mt-1">
              {[
                "Hospitals & clinics",
                "Distributors & supply chains",
                "B2B institutions",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-crimson flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-xs text-muted/60 tracking-wide mt-2">
              Trusted across distributors, institutions and B2B supply chains
            </p>
          </motion.div>

          {/* ── RIGHT: Premium Bento Grid Layout ── */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 p-5 rounded-3xl bg-slate-50/40 border border-slate-100/50 backdrop-blur-sm shadow-inner"
            style={{ perspective: "1200px" }}
          >
            {clients.map((client, index) => {
              const accent     = ACCENT_COLORS[index % ACCENT_COLORS.length];
              const badgeColor = BADGE_COLORS[index % BADGE_COLORS.length];

              return (
                <TiltCard
                  key={client.name}
                  className={`group flex flex-col items-center justify-center gap-3 p-4 h-[110px] ${accent.border}`}
                  delay={index * 0.04}
                >
                  {/* logo / initials */}
                  {client.logoUrl ? (
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="h-9 w-9 rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className={`h-9 w-9 rounded-lg flex items-center justify-center font-semibold text-xs transition-transform duration-300 group-hover:scale-105 ${badgeColor}`}
                    >
                      {client.initials}
                    </div>
                  )}

                  <p className="text-[10px] font-medium text-ink leading-snug text-center line-clamp-2 px-1">
                    {client.name}
                  </p>

                  {/* inner shine */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-white/80"
                    style={{ transform: "translateZ(2px)" }}
                  />
                </TiltCard>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
