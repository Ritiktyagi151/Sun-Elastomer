"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    text: "I visited Dr. Mehta for my mother’s chronic knee pain. Unlike many clinics where you feel rushed, Dr. Mehta took the time to explain the root cause of the issue using an X-ray model.",
    name: "Dr. Amit Mehta",
    role: "Chief Medical Officer, MKW Hospital",
    initials: "DR",
    color: "bg-ink",
  },
  {
    text: "Dr. Rahul at Gargi Hospital, Raj Nagar was very thorough with my father's checkup. The clinic setup is simple but clean, and the staff is genuinely caring. Didn't have to wait long either.",
    name: "Ram Sharma",
    role: "Regional Distributor, Gargi Hospital",
    initials: "PG",
    color: "bg-crimson",
  },
  {
    text: "Had a minor surgery at Shivalik Hospital, Govindpuram. The facility is small but very hygienic, and the nursing staff gave excellent, personalized care throughout my overnight stay. .",
    name: "Vivek Singh",
    role: "Surgeon, Shivalik Hospital",
    initials: "VS",
    color: "bg-neutral-700",
  },
  {
    text: "Rushed my son to Flores Hospital, Pratap Vihar with a deep cut. The doctor on duty attended to him immediately and handled the stitches with great care. Very thankful for their quick service.",
    name: "Vikram Kohli",
    role: "Business Owner, Flores Hospital",
    initials: "VK",
    color: "bg-neutral-900",
  },
  {
    text: "The doctors at Avantika Hospital, Indirapuram give you the time and attention you don't always get at bigger places. The rooms are well-maintained and comfortable.",
    name: "Anjali Gupta",
    role: "Homemaker, Avantika Hospital",
    initials: "AG",
    color: "bg-neutral-900",
  },
  {
    text: "I visited Vardan Multispeciality Hospital, Raj Nagar Extension for a severe migraine. The physician was patient and didn't prescribe unnecessary tests.",
    name: "Priya Sharma",
    role: "Head Marketing, Vardan Multispeciality Hospital",
    initials: "PS",
    color: "bg-neutral-900",
  },

];

const TestimonialSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 bg-white overflow-hidden md:h-[580px]">

      {/* Left - Image */}
      <div className="relative h-[300px] md:h-full w-full">
        <Image
          src="/homepage-img/testi1.png"
          alt="Sun Elastomer facility"
          fill
          className="object-cover"
          priority
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-2/5 bg-gradient-to-r from-transparent via-white/15 to-white md:block" />
      </div>

      {/* Right - Testimonials */}
      <div className="flex flex-col justify-center px-8 py-10 md:py-0 md:px-16 lg:px-20 md:h-full md:overflow-hidden">
        <div className="max-w-xl">

          {/* Overline */}
          <motion.div className="flex items-center mb-5"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }} viewport={{ once: true }}
          >
            <div className="w-6 h-[1px] bg-crimson mr-4" />
            <span className="text-crimson text-xs font-semibold tracking-[0.2em] uppercase font-sans">
              Testimonials
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-ink mb-2 leading-[1.1]"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>

          <p className="text-sm text-muted font-sans mb-10">
            Trusted by doctors, distributors & healthcare partners across India
          </p>

          {/* Quote mark */}
          <div className="text-7xl text-crimson/10 font-serif leading-none mb-4 select-none">&quot;</div>

          {/* Slide — fixed min-height so text changes don't resize the section */}
          <div className="overflow-hidden mb-8 min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                {/* Stars */}
                <div className="text-crimson text-sm tracking-widest mb-4">★★★★★</div>

                {/* Text */}
                <p className="text-base text-muted font-serif italic leading-[1.9] mb-6">
                  {testimonials[current].text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${testimonials[current].color}`}>
                    {testimonials[current].initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink font-sans">
                      {testimonials[current].name}
                    </p>
                    <p className="text-xs text-muted font-sans mt-0.5">
                      {testimonials[current].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav Row */}
          <div className="flex items-center justify-between border-t border-neutral-100 pt-6">
            {/* Dots */}
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-crimson' : 'w-1.5 bg-neutral-200'
                    }`}
                />
              ))}
            </div>

            {/* Counter + Arrows */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted font-sans">
                <span className="text-crimson font-bold">{current + 1}</span> / {testimonials.length}
              </span>
              <div className="flex gap-2">
                <button onClick={prev}
                  className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-muted hover:bg-crimson hover:text-white hover:border-crimson transition-all duration-200">
                  ←
                </button>
                <button onClick={next}
                  className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-muted hover:bg-crimson hover:text-white hover:border-crimson transition-all duration-200">
                  →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
