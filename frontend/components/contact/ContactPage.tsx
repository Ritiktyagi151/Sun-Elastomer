"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { ArrowRight, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { MobilePageBanner } from "@/components/common/MobilePageBanner";
import { SectionHeading } from "@/components/common/AnimatedPrimitives";
import { contactDetails, productCategories } from "@/data/constants";
import { company } from "@/data/products";

type ContactForm = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  message: string;
};

const contactFields: { name: keyof ContactForm; label: string; type?: string }[] = [
  { name: "name", label: "Full Name" },
  { name: "company", label: "Company Name" },
  { name: "email", label: "Email Address", type: "email" },
  { name: "phone", label: "Phone Number", type: "tel" },
  { name: "country", label: "City / Country" },
];

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(company.address)}&output=embed`;

export function ContactPage() {
  return (
    <main>
      <MobilePageBanner
        src="/banners/contact-us1.png"
        alt="Pharmaceutical products on a clean medical desk"
        eyebrow="Contact Sun Elastomers"
        title="Send your product requirement."
      />
      <ContactHero />
      <ContactContent />
      <MapSection />
    </main>
  );
}

function ContactHero() {
  return (
    <section className="relative hidden h-[550px] overflow-hidden bg-ink px-5 pb-10 pt-24 text-white md:block">
      <Image
        src="/banners/desktop/contact-us1.png"
        alt="Pharmaceutical products on a clean medical desk"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </section>
  );
}

function ContactContent() {
  return (
    <section className="section bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <ContactInquiryForm />
        <ContactInfo />
      </div>
    </section>
  );
}

function ContactInquiryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(data: ContactForm) {
    setLoading(true);
    const newInquiry = {
      type: "Contact Form",
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      country: data.country,
      product: data.product,
      message: data.message,
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
        body: JSON.stringify(newInquiry),
      });
      if (res.ok) {
        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 5000);
      } else {
        console.error("Failed to submit inquiry to server");
      }
    } catch (err) {
      console.error("Network error submitting inquiry:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      id="contact-form"
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <p className="eyebrow">Inquiry Form</p>
      <h1 className="mt-4 font-display text-4xl font-black text-ink">Send your requirement</h1>
      {success && (
        <div className="mt-4 bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-xs font-bold">
          Thank you! Your requirement has been saved and our team will get in touch shortly.
        </div>
      )}
      <p className="mt-3 text-sm leading-6 text-muted">
        Add your product interest, quantity, destination and timeline so our team can respond clearly.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {contactFields.map((field) => (
          <label key={field.name} className="text-sm font-bold">
            {field.label}
            <input className="input" type={field.type || "text"} {...register(field.name, { required: true })} />
            {errors[field.name] ? <span className="text-xs text-crimson">Required</span> : null}
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
        <textarea
          className="input min-h-36"
          placeholder="Mention product, dosage form, pack size, quantity and delivery location."
          {...register("message", { required: true })}
        />
        {errors.message ? <span className="text-xs text-crimson">Required</span> : null}
      </label>

      <button className="btn-primary mt-6 px-6 py-4" disabled={loading}>
        {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} Submit Inquiry
      </button>
    </motion.form>
  );
}

function ContactInfo() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-lg border border-crimson/10 bg-peach p-6 text-ink shadow-sm"
    >
      <p className="eyebrow">Contact Details</p>
      <h2 className="mt-4 font-display text-4xl font-black">Reach our team</h2>
      <div className="mt-7 space-y-5">
        {contactDetails.map(({ icon: Icon, label, value }) => (
          <p key={label} className="flex gap-3 text-muted">
            <Icon className="mt-1 shrink-0 text-crimson" />
            <span>
              <strong className="text-ink">{label}:</strong>
              <br />
              {value}
            </span>
          </p>
        ))}
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link href={`mailto:${company.contactEmail}`} className="btn-primary px-5 py-3">
          <Mail size={18} /> Email
        </Link>
        <Link href={`tel:${company.contactPhone.replace(/\s+/g, "")}`} className="btn-outline px-5 py-3">
          <Phone size={18} /> Call
        </Link>
      </div>
    </motion.aside>
  );
}

function MapSection() {
  return (
    <section className="section bg-cream">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Location" title="Visit or route your inquiry to our Ghaziabad office." centered />
        <motion.div
          className="mt-12 grid overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm lg:grid-cols-[0.72fr_1.28fr]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
        >
          <div className="p-6 md:p-8">
            <MapPin className="text-crimson" size={34} />
            <h3 className="mt-5 font-display text-3xl font-black text-ink">{company.shortName}</h3>
            <p className="mt-4 leading-7 text-muted">{company.address}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-7 px-6 py-3"
            >
              Open Map <ArrowRight size={18} />
            </a>
          </div>
          <iframe
            title="Sun Elastomers location map"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[360px] w-full border-0 lg:h-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
