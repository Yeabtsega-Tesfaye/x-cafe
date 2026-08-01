"use client";

import { motion } from "framer-motion";
import { Sparkles, Clock, QrCode, Heart } from "lucide-react";

const trustSignals = [
  {
    icon: Sparkles,
    label: "Clean & Hygienic",
    desc: "Premium kitchen standards",
  },
  {
    icon: Clock,
    label: "Fast Service",
    desc: "Fresh & on time",
  },
  {
    icon: QrCode,
    label: "Easy Ordering",
    desc: "Made to order",
  },
  {
    icon: Heart,
    label: "Loved by Locals",
    desc: "Community favorite",
  },
];

export default function TrustStrip() {
  return (
    <section className="relative px-4 py-6 overflow-hidden bg-white border-b border-border/40">
      
      {/* Top fade — melts from Hero */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/0 to-white pointer-events-none" />

      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6"
        >
          {trustSignals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                // FIXED: We combined entrance + floating animations into ONE transition object
                transition={{ 
                  delay: index * 0.08, 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  y: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.15,
                  },
                }}
                animate={{
                  y: [0, -5, 0, -3, 0],
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.05,
                  boxShadow: "0 20px 40px -12px rgba(249, 115, 22, 0.25)",
                }}
                className="group relative flex items-center gap-2 sm:gap-3 rounded-2xl border border-white/20 bg-white/70 px-3 sm:px-4 py-2 sm:py-2.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 w-full sm:w-auto sm:flex-1 min-w-[140px] sm:min-w-[160px] max-w-[180px] sm:max-w-[220px] md:max-w-[240px]"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full pointer-events-none" />

                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                  className="absolute -top-1.5 -right-1.5 h-3 w-3 rounded-full bg-accent/40 blur-sm pointer-events-none"
                />

                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                  className="relative z-10 flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 text-accent transition-all duration-300 group-hover:from-accent group-hover:to-accent/80 group-hover:text-white group-hover:shadow-lg group-hover:shadow-accent/25"
                >
                  <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                </motion.div>

                <div className="relative z-10 min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-text-primary whitespace-nowrap">
                    {signal.label}
                  </p>
                  <p className="text-[8px] sm:text-[10px] text-text-secondary whitespace-nowrap">
                    {signal.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}