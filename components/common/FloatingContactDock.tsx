"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { company } from "@/data/products";

const normalizePhone = (phone: string) => phone.replace(/[^\d+]/g, "");
const hasRealPhone = (phone: string) => !/[xX]/.test(phone) && normalizePhone(phone).replace(/\D/g, "").length >= 10;

export function FloatingContactDock() {
  const realPhone = hasRealPhone(company.contactPhone);
  const dialPhone = normalizePhone(company.contactPhone);
  const whatsappPhone = dialPhone.replace(/\D/g, "");

  const actions = [
    {
      label: "WhatsApp",
      href: realPhone ? `https://wa.me/${whatsappPhone}` : "/contact",
      Icon: MessageCircle,
      className: "contact-dock__link--whatsapp",
      external: realPhone,
    },
    {
      label: "Call",
      href: realPhone ? `tel:${dialPhone}` : "/contact",
      Icon: Phone,
      className: "contact-dock__link--phone",
      external: false,
    },
    {
      label: "Email",
      href: `mailto:${company.contactEmail}`,
      Icon: Mail,
      className: "contact-dock__link--mail",
      external: false,
    },
  ];

  return (
    <motion.aside
      className="contact-dock"
      aria-label="Quick contact options"
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 4.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="contact-dock__rail" aria-hidden="true" />
      {actions.map(({ label, href, Icon, className, external }) => (
        <a
          key={label}
          href={href}
          className={`contact-dock__link ${className}`}
          aria-label={label}
          title={label}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          <Icon size={20} strokeWidth={2.4} />
          <span>{label}</span>
        </a>
      ))}
    </motion.aside>
  );
}
