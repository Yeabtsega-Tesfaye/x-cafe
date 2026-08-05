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
          // 1. PARENT handles the outer border, the rounding, and the grid
          className="grid w-full grid-cols-1 overflow-hidden rounded-2xl border border-border/60 bg-background sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustSignals.map((signal, index) => {
            const Icon = signal.icon;

            // 2. dynamically calculate inside borders based on the grid layout
            let borderClasses = "";
            if (index === 0) borderClasses = "border-b border-border/40 sm:border-r lg:border-b-0";
            if (index === 1) borderClasses = "border-b border-border/40 sm:border-r-0 lg:border-r lg:border-b-0";
            if (index === 2) borderClasses = "border-b border-border/40 sm:border-b-0 sm:border-r lg:border-r lg:border-b-0";
            if (index === 3) borderClasses = "border-none";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                // 3. CHILDREN just handle padding and the hover background effect
                className={`group flex w-full items-center gap-3 bg-transparent p-4 transition-colors duration-300 hover:bg-background-secondary/60 ${borderClasses}`}
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