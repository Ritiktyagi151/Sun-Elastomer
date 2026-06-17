"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Building2,
  LayoutGrid,
  Droplet,
  Users,
  ChevronRight,
  Building,
  Package,
  Headphones,
  Telescope,
  Pause,
  Play,
  type LucideIcon,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type TabId = "who" | "quality" | "portfolio" | "support" | "vision";

interface TabContent {
  title: string;
  text: string;
  bgImage: string;
}

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: LucideIcon;
}

interface MenuItem {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

// ─── Count-Up Hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1200, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    let animationFrame = 0;

    const step = (now: number) => {
      const elapsed = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setCount(Math.round(eased * target));
      if (elapsed < 1) animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [start, target, duration]);

  return count;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  stat,
  index,
  animate,
}: {
  stat: StatItem;
  index: number;
  animate: boolean;
}) {
  const count = useCountUp(stat.value, 1200, animate);
  const Icon = stat.icon;

  return (
    <div
      className="flex items-center h-32 justify-between rounded-xl border shadow-xs shadow-sky-200 border-neutral-100 p-5
                 transition-all duration-500 hover:-translate-y-1 hover:border-crimson/20 hover:shadow-sm"
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      <div>
        <p className="mb-1 text-xs font-medium text-neutral-500">{stat.label}</p>
        <p className="text-3xl font-semibold leading-none text-ink">
          {count}
          <span className="text-lg text-neutral-400">{stat.suffix}</span>
        </p>
      </div>
      <div className="rounded-lg bg-crimson/5 p-3 text-crimson">
        <Icon size={28} strokeWidth={1.5} />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const SLIDER_DURATION = 3500; // ms per slide

export default function SunElastomersDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("who");
  const [animateStats, setAnimateStats] = useState(false);
  const [bannerKey, setBannerKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const statsRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressValueRef = useRef(0);

  // ── Data ──────────────────────────────────────────────────────────────────

  const menuItems: MenuItem[] = [
    { id: "who",       label: "Who we are",        icon: Building   },
    { id: "quality",   label: "Quality-led supply", icon: Package    },
    { id: "portfolio", label: "Focused portfolio",  icon: LayoutGrid },
    { id: "support",   label: "Commercial support", icon: Headphones },
    { id: "vision",    label: "Vision & mission",   icon: Telescope  },
  ];

  const tabOrder = menuItems.map((m) => m.id);

  const stats: StatItem[] = [
    { label: "Products",     value: 1500, suffix: "+", icon: Building2 },
    { label: "Categories",   value: 6,    suffix: "",  icon: LayoutGrid },
    { label: "Dosage Forms", value: 60,   suffix: "+", icon: Droplet   },
    { label: "Directors",    value: 3,    suffix: "",  icon: Users      },
  ];

  const tabContents: Record<TabId, TabContent> = {
    who: {
      title: "Who we are",
      text: "Sun Elastomers Private Limited operates from Industrial Area Sahibabad, Ghaziabad, Uttar Pradesh. GST registered as a regular private limited company, serving healthcare trade requirements through a focused pharmaceutical product portfolio built for disciplined B2B buyers.",
      bgImage: "/homepage-img/whoweare.png",
    },
    quality: {
      title: "Quality-led supply",
      text: "Every product program is supported by disciplined documentation, batch awareness and a practical quality mindset — ensuring product confidence for every buyer and every order across injectables, tablets, capsules and more.",
      bgImage: "/homepage-img/quality-led-supply.png",
    },
    portfolio: {
      title: "Focused product portfolio",
      text: "The range covers injectables, tablets, capsules, suspensions, sachets and ointment formats across injectable antibiotics, oral antibiotics, neuropathic care, antidiabetic, dermatology and gastroenterology segments.",
      bgImage: "/homepage-img/focused-product-portfolio.png",
    },
    support: {
      title: "Reliable commercial support",
      text: "Our team supports product inquiries, pack discussions, dispatch coordination and long-term supply planning — building durable relationships with distributors, institutions and business partners across domestic and export markets.",
      bgImage: "/homepage-img/reliable-commercial-support.png",
    },
    vision: {
      title: "Vision & mission",
      text: "To become a trusted pharmaceutical supply partner known for dependable products, transparent communication and quality-focused growth — supporting healthcare businesses with organized product information and responsive B2B service.",
      bgImage: "/homepage-img/vision-mission.png",
    },
  };

  // ── Stat animation on scroll ──────────────────────────────────────────────

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAnimateStats(entry.isIntersecting);
      },
      { threshold: 0.25, rootMargin: "0px 0px -80px 0px" }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Auto-slider logic ─────────────────────────────────────────────────────

  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const startSlider = () => {
    clearTimers();
    progressValueRef.current = 0;
    setProgress(0);

    // Progress bar ticks every 50ms
    progressRef.current = setInterval(() => {
      progressValueRef.current += (50 / SLIDER_DURATION) * 100;
      if (progressValueRef.current > 100) progressValueRef.current = 100;
      setProgress(progressValueRef.current);
    }, 50);

    // Advance slide
    intervalRef.current = setInterval(() => {
      setActiveTab((prev) => {
        const idx = tabOrder.indexOf(prev);
        return tabOrder[(idx + 1) % tabOrder.length] as TabId;
      });
      setBannerKey((k) => k + 1);
      progressValueRef.current = 0;
      setProgress(0);
    }, SLIDER_DURATION);
  };

  // Start on mount
  useEffect(() => {
    const startTimer = window.setTimeout(startSlider, 0);
    return () => {
      window.clearTimeout(startTimer);
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle play / pause
  const togglePlay = () => {
    if (isPlaying) {
      clearTimers();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      startSlider();
    }
  };

  // Manual tab change — reset timer
  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    setBannerKey((k) => k + 1);
    if (isPlaying) startSlider();
  };

  // ── Derived ───────────────────────────────────────────────────────────────

  const activeMenuItem = menuItems.find((m) => m.id === activeTab)!;
  const activeContent  = tabContents[activeTab];

  return (
    <div className="mx-auto w-full max-w-7xl bg-white p-6 font-sans">

      {/* ── Stats Grid ── */}
      <div
        ref={statsRef}
        className="grid grid-cols-1 sm:grid-cols-2 shadow lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat, idx) => (
          <StatCard
            key={stat.label}
            stat={stat}
            index={idx}
            animate={animateStats}
          />
        ))}
      </div>

      {/* ── Banner + Nav ── */}
      <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0">

        {/* Banner */}
        <div
          className="relative flex-1 rounded-3xl overflow-hidden min-h-[420px] bg-cover bg-center bg-fixed shadow-md"
          style={{
            backgroundImage: `url('${activeContent.bgImage}')`,
            transition: "background-image 0.5s ease",
          }}
        >
          <div className="absolute inset-0 bg-black/45" />

          <div
            key={bannerKey}
            className="relative z-10 h-full flex flex-col justify-center items-start max-w-xl p-8 md:p-12 text-white"
            style={{ animation: "bannerFadeUp 0.45s ease both" }}
          >
            <div className="flex items-center gap-3 mb-4">
              {React.createElement(activeMenuItem.icon, {
                size: 28,
                className: "text-white shrink-0",
              })}
              <h2 className="text-2xl md:text-3xl font-semibold tracking-wide">
                {activeContent.title}
              </h2>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-white/82 md:text-base">
              {activeContent.text}
            </p>

            <button className="group flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20">
              Read More
              <ChevronRight
                size={16}
                className="transform group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Nav Panel */}
        <div className="w-full lg:w-[300px] lg:absolute lg:right-6 lg:top-1/2 lg:-translate-y-1/2 z-20">
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl shadow-black/10">
            {menuItems.map((item) => {
              const ItemIcon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`relative w-full flex items-center gap-3 border-b border-neutral-100 px-5 py-4 text-left text-sm font-medium last:border-b-0
                              transition-all duration-200 group overflow-hidden
                              ${isActive
                                ? "bg-crimson/5 text-ink"
                                : "bg-white text-neutral-600 hover:bg-neutral-50 hover:text-ink"
                              }`}
                >
                  <ItemIcon
                    size={20}
                    className={`shrink-0 transition-colors ${
                      isActive ? "text-crimson" : "text-neutral-400 group-hover:text-crimson"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>

                  {isActive && (
                    <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-crimson" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Controls ── */}
      {/* <div className="flex items-center justify-center gap-4 mt-5 max-w-5xl mx-auto">

       
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50"
        >
          {isPlaying
            ? <><Pause size={14} /> Pause</>
            : <><Play  size={14} /> Play</>
          }
        </button>

       
        <div className="flex-1 max-w-xs h-1 rounded-full bg-neutral-200 overflow-hidden">
          <div
            className="h-full bg-crimson rounded-full transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>

      
        <div className="flex items-center gap-1.5">
          {tabOrder.map((id, i) => (
            <button
              key={id}
              onClick={() => handleTabChange(id as TabId)}
              className={`rounded-full transition-all duration-200 ${
                activeTab === id
                  ? "w-4 h-2 bg-crimson"
                  : "w-2 h-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
              aria-label={menuItems[i].label}
            />
          ))}
        </div>
      </div> */}

      {/* ── Keyframe injection ── */}
      <style>{`
        @keyframes bannerFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
