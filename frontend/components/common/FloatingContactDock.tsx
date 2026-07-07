"use client";

import { useState, useEffect } from "react";
import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { company } from "@/data/products";
import { SocialBrandIcon } from "./SocialBrandIcon";

const normalizePhone = (phone: string) => phone.replace(/[^\d+]/g, "");
const hasRealPhone = (phone: string) => !/[xX]/.test(phone) && normalizePhone(phone).replace(/\D/g, "").length >= 10;

export function FloatingContactDock() {
  const [comp, setComp] = useState<any>({
    contactPhone: "",
    contactEmail: "",
    floatingWhatsapp: "",
    floatingPhone: "",
    floatingEmail: "",
  });

  useEffect(() => {
    setComp({
      contactPhone: company.contactPhone,
      contactEmail: company.contactEmail,
      floatingWhatsapp: company.floatingWhatsapp,
      floatingPhone: company.floatingPhone,
      floatingEmail: company.floatingEmail,
    });

    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/api/company`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        if (data) {
          setComp(data);
          localStorage.setItem("sun_company_info", JSON.stringify(data));
        }
      })
      .catch((err) => console.error("FloatingContactDock failed to load company info:", err));
  }, []);

  const realPhone = hasRealPhone(comp.contactPhone || "");
  const dialPhone = normalizePhone(comp.contactPhone || "");
  const whatsappPhone = dialPhone.replace(/\D/g, "");

  const actions = [
    {
      label: "WhatsApp",
      href: comp.floatingWhatsapp || (realPhone ? `https://wa.me/${whatsappPhone}` : "/contact"),
      icon: <SocialBrandIcon brand="whatsapp" size={21} aria-hidden="true" />,
      className: "contact-dock__link--whatsapp",
      external: (comp.floatingWhatsapp || "").startsWith("http") || realPhone,
    },
    {
      label: "Call",
      href: comp.floatingPhone || (realPhone ? `tel:${dialPhone}` : "/contact"),
      icon: <Phone size={20} strokeWidth={2.4} />,
      className: "contact-dock__link--phone",
      external: (comp.floatingPhone || "").startsWith("http"),
    },
    {
      label: "Email",
      href: comp.floatingEmail || `mailto:${comp.contactEmail || ""}`,
      icon: <Mail size={20} strokeWidth={2.4} />,
      className: "contact-dock__link--mail",
      external: (comp.floatingEmail || "").startsWith("http"),
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
      {actions.map(({ label, href, icon, className, external }) => (
        <a
          key={label}
          href={href}
          className={`contact-dock__link ${className}`}
          aria-label={label}
          title={label}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {icon}
          <span>{label}</span>
        </a>
      ))}
    </motion.aside>
  );
}
