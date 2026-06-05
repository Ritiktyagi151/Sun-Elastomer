// components/FAQSection.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/common/AnimatedPrimitives";
import { faqs } from "@/data/constants";

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left gap-3"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-gray-900">{q}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-gray-500 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    // TODO: connect your API/email handler here
    setSubmitted(true);
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <h3 className="text-base font-medium text-gray-900">Still have a question?</h3>
      <p className="mt-1 mb-5 text-sm text-gray-500">We'll get back to you within 24 hours.</p>

      {submitted ? (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-100 px-4 py-3 text-sm text-green-700">
          <span>✓</span> Message sent! We'll be in touch soon.
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs text-gray-500">Full name</label>
            <input
              type="text"
              placeholder="Jane Smith"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-gray-500">Email address</label>
            <input
              type="email"
              placeholder="jane@company.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-gray-500">Subject</label>
            <select
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
            >
              <option value="">Select a topic</option>
              <option>General inquiry</option>
              <option>Pricing & plans</option>
              <option>Technical support</option>
              <option>Partnership</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-gray-500">Your message</label>
            <textarea
              rows={4}
              placeholder="Tell us what's on your mind..."
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
          >
            Send message
          </button>
        </div>
      )}
    </div>
  );
}

export function FAQSection() {
  return (
    <section className="section overflow-hidden bg-white">
      <motion.div
        className="mx-auto max-w-7xl px-5 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionHeading title="Frequently Asked Questions" centered />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            {faqs.map((item, i) => (
              <FAQItem key={i} index={i} q={item.q} a={item.a} />
            ))}
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </motion.div>
    </section>
  );
}