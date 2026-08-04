"use client";

import { motion } from "framer-motion";
import { Sparkles, Clock, QrCode, Heart } from "lucide-react";

const trustSignals = [
  { icon: Sparkles, label: "Clean & Hygienic", desc: "Premium kitchen standards" },
  { icon: Clock, label: "Fast Service", desc: "Fresh & on time" },
  { icon: QrCode, label: "Easy Ordering", desc: "Made to order" },
  { icon: Heart, label: "Loved by Locals", desc: "Community favorite" },
];

export default function TrustStrip() {
  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-white px-4 py-6 sm:py-8">
      {/* Fade from Hero */}
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-gradient-to-b from-transparent to-white" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-stretch justify-center gap-3 sm:gap-4"
        >
          {trustSignals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group flex w-full items-center gap-3 rounded-2xl border border-border/40 bg-background-secondary/60 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 sm:w-auto sm:flex-1 sm:min-w-[180px] sm:max-w-[240px] sm:p-4"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-text-primary">{signal.label}</p>
                  <p className="text-xs text-text-secondary">{signal.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}