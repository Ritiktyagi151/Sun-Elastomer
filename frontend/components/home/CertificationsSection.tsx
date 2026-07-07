"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { SectionHeading } from "@/components/common/AnimatedPrimitives";
import { clients } from "@/data/constants";
import { useRef, MouseEvent } from "react";

const ACCENT_COLORS = [
  { border: "hover:border-crimson/40" },
  { border: "hover:border-neutral-400/40" },
  { border: "hover:border-emerald-400/40" },
  { border: "hover:border-amber-400/40" },
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

              return (
                <TiltCard
                  key={client.name}
                  className={`group flex h-[120px] items-center justify-center overflow-hidden p-3 ${accent.border}`}
                  delay={index * 0.04}
                >
                  {client.logoUrl ? (
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="h-full w-full rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <PharmaLogo index={index} />
                  )}

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

function PharmaLogo({ index }: { index: number }) {
  const palettes = [
    { bg: "bg-rose-50", ring: "border-rose-100", primary: "bg-crimson", soft: "bg-crimson/14" },
    { bg: "bg-emerald-50", ring: "border-emerald-100", primary: "bg-emerald-600", soft: "bg-emerald-600/14" },
    { bg: "bg-amber-50", ring: "border-amber-100", primary: "bg-amber-600", soft: "bg-amber-600/14" },
    { bg: "bg-neutral-50", ring: "border-neutral-200", primary: "bg-neutral-800", soft: "bg-neutral-800/10" },
    { bg: "bg-purple-50", ring: "border-purple-100", primary: "bg-purple-600", soft: "bg-purple-600/14" },
    { bg: "bg-teal-50", ring: "border-teal-100", primary: "bg-teal-600", soft: "bg-teal-600/14" },
  ];
  const palette = palettes[index % palettes.length];
  const variant = index % 4;

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border ${palette.bg} ${palette.ring} transition-transform duration-300 group-hover:scale-105`}
      aria-hidden="true"
    >
      <span className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${palette.soft}`} />
      <span className={`absolute -bottom-10 -left-8 h-28 w-28 rounded-full ${palette.soft}`} />

      {variant === 0 ? (
        <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-sm">
          <span className={`absolute h-11 w-4 rounded-full ${palette.primary}`} />
          <span className={`absolute h-4 w-11 rounded-full ${palette.primary}`} />
        </span>
      ) : null}

      {variant === 1 ? (
        <span className="relative flex h-16 w-16 rotate-[-24deg] overflow-hidden rounded-full bg-white shadow-sm">
          <span className={`h-full w-1/2 ${palette.primary}`} />
          <span className="h-full w-1/2 bg-white" />
          <span className="absolute inset-0 rounded-full border border-black/5" />
        </span>
      ) : null}

      {variant === 2 ? (
        <span className="relative grid h-16 w-16 place-items-center rounded-full bg-white shadow-sm">
          <span className={`h-10 w-10 rounded-full border-[10px] ${palette.ring} border-t-transparent`} />
          <span className={`absolute h-4 w-4 rounded-full ${palette.primary}`} />
        </span>
      ) : null}

      {variant === 3 ? (
        <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-sm">
          <span className={`h-12 w-7 rounded-full ${palette.primary}`} />
          <span className="absolute h-7 w-12 rounded-full bg-white/78" />
        </span>
      ) : null}
    </div>
  );
}
