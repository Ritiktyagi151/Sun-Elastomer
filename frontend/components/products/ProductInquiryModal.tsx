"use client";

import { type FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Mail, Phone, Send, X } from "lucide-react";
import { company, type Product } from "@/data/products";

export function ProductInquiryModal({
  product,
  open,
  onClose,
}: {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const data = {
      type: "Product Inquiry",
      product: product?.brand || (formData.get("product") as string),
      quantity: formData.get("quantity") as string,
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "unread"
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        console.error("Failed to submit product inquiry to server");
      }
    } catch (err) {
      console.error("Network error submitting product inquiry:", err);
    } finally {
      setSubmitting(false);
      onClose();
    }
  }

  return (
    <AnimatePresence>
      {open && product ? (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-0 top-0 z-[100] mx-auto flex h-dvh max-w-3xl items-center px-3 py-4 sm:px-5"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-inquiry-title"
          >
            <form onSubmit={handleSubmit} className="relative w-full rounded-xl bg-white p-4 text-ink shadow-2xl shadow-black/25 sm:p-5">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-crimson/10 text-muted transition hover:bg-crimson/5 hover:text-crimson"
                aria-label="Close inquiry form"
              >
                <X size={18} />
              </button>

              <p className="inline-flex rounded-full bg-crimson/10 px-3 py-1 text-[11px] font-black uppercase text-crimson">
                Product Inquiry
              </p>
              <h2 id="product-inquiry-title" className="mt-3 pr-10 font-display text-2xl font-black sm:text-3xl">
                {product.brand}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">{product.generic}</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-bold sm:text-sm">
                  Product
                  <input className="input !mt-1 !py-2.5" name="product" value={product.brand} readOnly />
                </label>
                <label className="text-xs font-bold sm:text-sm">
                  Quantity Requirement
                  <input className="input !mt-1 !py-2.5" name="quantity" placeholder="Example: 500 packs" />
                </label>
                <label className="text-xs font-bold sm:text-sm">
                  Full Name
                  <input className="input !mt-1 !py-2.5" name="name" required />
                </label>
                <label className="text-xs font-bold sm:text-sm">
                  Company Name
                  <input className="input !mt-1 !py-2.5" name="company" />
                </label>
                <label className="text-xs font-bold sm:text-sm">
                  Email Address
                  <input className="input !mt-1 !py-2.5" name="email" type="email" required />
                </label>
                <label className="text-xs font-bold sm:text-sm">
                  Phone Number
                  <input className="input !mt-1 !py-2.5" name="phone" type="tel" required />
                </label>
              </div>

              <label className="mt-3 block text-xs font-bold sm:text-sm">
                Message
                <textarea
                  className="input !mt-1 min-h-24 resize-none !py-2.5"
                  name="message"
                  placeholder="Mention pack size, destination, timeline and documentation requirement."
                  required
                />
              </label>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button className="btn-primary px-5 py-3" disabled={submitting}>
                  {submitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                  {submitting ? "Sending..." : "Submit Inquiry"}
                </button>
                <div className="flex flex-wrap gap-4 text-xs text-muted">
                  <a href={`tel:${company.contactPhone.replace(/\s+/g, "")}`} className="flex items-center gap-2 hover:text-crimson">
                    <Phone size={14} className="text-crimson" /> Call
                  </a>
                  <a href={`mailto:${company.contactEmail}`} className="flex items-center gap-2 hover:text-crimson">
                    <Mail size={14} className="text-crimson" /> Email
                  </a>
                </div>
              </div>
            </form>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
