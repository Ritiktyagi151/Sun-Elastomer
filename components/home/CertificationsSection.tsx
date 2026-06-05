// components/ClientsSection.tsx
"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/AnimatedPrimitives";
import { clients } from "@/data/constants";

const COLORS = [
  { bg: "bg-blue-50",   text: "text-blue-800"   },
  { bg: "bg-teal-50",   text: "text-teal-800"   },
  { bg: "bg-purple-50", text: "text-purple-800" },
  { bg: "bg-amber-50",  text: "text-amber-800"  },
  { bg: "bg-pink-50",   text: "text-pink-800"   },
  { bg: "bg-green-50",  text: "text-green-800"  },
];

export function ClientsSection() {
  return (
    <section className="section overflow-hidden bg-white">
      <motion.div
        className="mx-auto max-w-7xl px-5 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionHeading title="Our Trusted Clients" centered />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {clients.map((client, index) => {
            const color = COLORS[index % COLORS.length];
            return (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-white p-5 hover:border-gray-200 transition-colors"
              >
                {client.logoUrl ? (
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    className="h-12 w-12 rounded-lg object-contain"
                  />
                ) : (
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center text-sm font-medium ${color.bg} ${color.text}`}>
                    {client.initials}
                  </div>
                )}
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">{client.name}</p>
                  <p className="text-xs text-gray-500">{client.type}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          {clients.length}+ clients worldwide
        </p>
      </motion.div>
    </section>
  );
}