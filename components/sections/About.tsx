"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Coffee, Leaf, Clock, Home, Award, ArrowRight } from "lucide-react";
import { FadeUp } from "../ui/FadeUp";

const features = [
  { icon: Leaf, label: "Fresh Ingredients", desc: "Sourced daily from local farms" },
  { icon: Clock, label: "Fast Service", desc: "Order & receive in minutes" },
  { icon: Home, label: "Cozy Atmosphere", desc: "Designed for comfort" },
  { icon: Award, label: "Expert Baristas", desc: "Passionate about every cup" },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Decorative rings */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -right-32 -top-32 h-64 w-64 rounded-full border-2 border-accent/5"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full border-2 border-accent/5"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <FadeUp>
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="shrink-0 text-xs font-black uppercase tracking-[0.25em] text-accent sm:text-sm">
                About Us
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/60 via-accent/20 to-transparent" />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Where Great Coffee
              <br />
              <span className="text-gradient">Meets Community</span>
            </h2>
          </FadeUp>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -left-3 -top-3 h-full w-full rounded-2xl border-2 border-accent/20 lg:-left-4 lg:-top-4" />
            <div className="absolute -bottom-3 -right-3 h-16 w-16 rounded-full border-2 border-accent/20 lg:-bottom-4 lg:-right-4" />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl"
            >
              <Image
                src="/images/cafe-about.jpg"
                alt="X Cafe experience"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm">
                <Coffee className="h-4 w-4 text-accent" />
                <span className="text-xs font-bold text-text-primary">Est. 2024</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div>
            <FadeUp delay={0.2}>
              <p className="text-base leading-relaxed text-text-secondary">
                At X Cafe, we believe great coffee brings people together. We
                combine quality ingredients, modern service, and a welcoming
                atmosphere to create memorable moments every day.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                Whether you visit us for a quick coffee, a meeting, or a relaxing
                meal, we make every experience special.
              </p>
            </FadeUp>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="group rounded-xl border border-border/50 bg-background-secondary/60 p-4 shadow-sm transition-all duration-300 hover:border-accent/30 hover:shadow-md"
                >
                  <feature.icon className="h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110" />
                  <p className="mt-2 text-sm font-bold text-text-primary">{feature.label}</p>
                  <p className="mt-0.5 text-xs text-text-secondary">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            <FadeUp delay={0.5}>
              <button className="group mt-8 inline-flex h-12 items-center gap-2 rounded-button bg-accent px-6 text-sm font-bold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]">
                Our Story
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}