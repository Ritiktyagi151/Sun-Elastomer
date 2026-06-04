"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { PlaceholderImage, SectionHeading, fadeUp, stagger } from "@/components/common/AnimatedPrimitives";
import { values } from "@/data/constants";
import { PageHero } from "@/components/common/PageBanner";

const milestones = [
  "Founding vision established in [YEAR]",
  "First pharma elastomer product range launched",
  "Quality systems expanded for regulated buyers",
  "Export collaboration and custom component programs",
];

export function AboutPage() {
  return (
    <main>
      <PageHero
        title="About Sun Elastomers"
        text="A pharmaceutical manufacturing partner focused on quality, consistency and precise elastomer solutions."
      />
      <CompanyStory />
      <VisionMission />
      <LeadershipTeam />
      <CoreValues />
    </main>
  );
}

function CompanyStory() {
  return (
    <section className="section bg-white">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Company Story" title="A timeline shaped by quality and trust." centered />
        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-crimson/25 md:left-1/2" />
          {milestones.map((item, index) => (
            <motion.article
              key={item}
              className={`relative mb-10 md:w-1/2 ${index % 2 ? "md:ml-auto md:pl-12" : "md:pr-12"}`}
              initial={{ opacity: 0, x: index % 2 ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
                <span className="text-sm font-black text-crimson">0{index + 1}</span>
                <h3 className="mt-2 text-xl font-bold text-ink">{item}</h3>
                <p className="mt-3 text-neutral-600">
                  Placeholder milestone detail to be replaced with verified company history.
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionMission() {
  return (
    <section className="section bg-cream text-ink">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2">
        {["Vision", "Mission"].map((title) => (
          <motion.article
            key={title}
            className="card-dark"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 28 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <CheckCircle2 className="text-golden" size={34} />
            <h2 className="mt-5 font-display text-4xl">{title}</h2>
            <p className="mt-4 text-muted">
              To deliver reliable pharmaceutical elastomer solutions through quality-led manufacturing and long-term B2B
              partnerships.
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function LeadershipTeam() {
  return (
    <section className="section bg-cream">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading title="Leadership Team" centered />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <motion.article
              key={item}
              className="rounded-lg bg-white p-4 shadow-sm"
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <PlaceholderImage label="Team Photo" />
              <h3 className="mt-5 font-bold">[TO BE UPDATED]</h3>
              <p className="text-sm text-crimson">[TO BE UPDATED]</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoreValues() {
  return (
    <section className="section bg-white">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading title="Core Values" centered />
        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {values.map(({ icon: Icon, title, text }) => (
            <motion.article key={title} variants={fadeUp} className="rounded-lg border border-neutral-200 p-6">
              <Icon className="text-crimson" size={30} />
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
