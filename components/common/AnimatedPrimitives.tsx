"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export function PlaceholderImage({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`grid aspect-[4/3] place-items-center overflow-hidden rounded-lg border border-black/10 bg-[linear-gradient(135deg,#e8e8e8,#bfbfbf)] text-center text-sm font-bold uppercase tracking-[0.2em] text-neutral-600 ${className}`}
    >
      {label}
    </div>
  );
}

export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1800, bounce: 0 });
  const display = useTransform(spring, (latest) => `${Math.round(latest)}${suffix}`);
  const [text, setText] = useState(`0${suffix}`);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => display.on("change", setText), [display]);

  return <span ref={ref}>{text}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  light?: boolean;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className=" mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
        {title}
      </h2>
      <motion.span
        className={`mt-5 block h-1 w-24 rounded-full bg-flame-gradient ${centered ? "mx-auto" : ""}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      />
    </div>
  );
}
