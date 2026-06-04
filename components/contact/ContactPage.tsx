"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { ArrowRight, Loader2, Send } from "lucide-react";
import { PlaceholderImage } from "@/components/common/AnimatedPrimitives";
import { contactDetails, productCategories } from "@/data/constants";
import { PageHero } from "@/components/common/PageBanner";

type ContactForm = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  message: string;
};

const contactFields: (keyof ContactForm)[] = ["name", "company", "email", "phone", "country"];
const inquiryTypes = ["Sales Enquiry", "Export Department", "General Inquiry"];

export function ContactPage() {
  return (
    <main>
      <PageHero
        title="Contact"
        text="Connect with Sun Elastomers Pvt Ltd for product inquiries, export collaboration and custom requirements."
      />
      <section className="section bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2">
          <ContactInquiryForm />
          <ContactInfo />
        </div>
        <InquiryCards />
      </section>
    </main>
  );
}

function ContactInquiryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>();
  const [loading, setLoading] = useState(false);

  function onSubmit() {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1200);
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-neutral-200 p-6 shadow-sm"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {contactFields.map((field) => (
          <label key={field} className="text-sm font-bold capitalize">
            {field}
            <input className="input" {...register(field, { required: true })} />
            {errors[field] ? <span className="text-xs text-crimson">Required</span> : null}
          </label>
        ))}
        <label className="text-sm font-bold">
          Product Interest
          <select className="input" {...register("product", { required: true })}>
            {productCategories.map((item) => (
              <option key={item.title}>{item.title}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-4 block text-sm font-bold">
        Message
        <textarea className="input min-h-36" {...register("message", { required: true })} />
      </label>
      <button className="btn-primary mt-6 px-6 py-4" disabled={loading}>
        {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} Submit
      </button>
    </motion.form>
  );
}

function ContactInfo() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="rounded-lg border border-crimson/10 bg-peach p-6 text-ink">
        {contactDetails.map(({ icon: Icon, label, value }) => (
          <p key={label} className="mb-5 flex gap-3 text-muted">
            <Icon className="text-crimson" />
            <span>
              <strong className="text-ink">{label}</strong>
              <br />
              {value}
            </span>
          </p>
        ))}
        <button className="btn-primary px-5 py-3">WhatsApp</button>
      </div>
      <PlaceholderImage label="Google Maps Placeholder" className="mt-6" />
    </motion.aside>
  );
}

function InquiryCards() {
  return (
    <div className="mx-auto mt-12 grid max-w-7xl gap-6 px-5 md:grid-cols-3">
      {inquiryTypes.map((item) => (
        <article key={item} className="rounded-lg border border-neutral-200 p-6">
          <h3 className="font-bold">{item}</h3>
          <p className="mt-2 text-sm text-neutral-600">[TO BE UPDATED]</p>
          <ArrowRight className="mt-4 text-crimson" />
        </article>
      ))}
    </div>
  );
}
