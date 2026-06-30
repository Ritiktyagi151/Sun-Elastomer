"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/data/constants";

function FAQItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-neutral-200/60">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-3 text-left gap-3"
        aria-expanded={isOpen}
      >
        <span
          className={`text-base font-semibold transition-colors duration-200 ${
            isOpen ? "text-slate-900" : "text-slate-700"
          }`}
        >
          {q}
        </span>
        {isOpen ? (
          <Minus size={18} className="flex-shrink-0 text-neutral-500" />
        ) : (
          <Plus size={18} className="flex-shrink-0 text-neutral-400" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-3 text-sm leading-relaxed text-neutral-500">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (index: number) => {
    // If clicking the already-open item → close it; otherwise open the new one
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="w-full bg-cover h-[600px] bg-center bg-no-repeat py-12 px-6 md:px-12 lg:px-24 flex items-center"
      style={{ backgroundImage: "url('/bg-theme/faq-bg.png')" }}
    >
      <div className="max-w-7xl w-full mx-auto flex justify-start">
        <div className="flex flex-col max-w-xl w-full bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight mb-4">
            Frequently Asked
            <br />
            Questions
          </h2>

          {/* FAQ List */}
          <div className="space-y-1">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item, i) => (
                <FAQItem
                  key={i}
                  q={item.q}
                  a={item.a}
                  isOpen={activeIndex === i}
                  onToggle={() => handleToggle(i)}
                />
              ))
            ) : (
              <p className="text-sm text-neutral-400 pl-2">No questions found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}