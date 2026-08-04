"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { FadeUp } from "../ui/FadeUp";

const reviews = [
  {
    name: "Meron Tesfaye",
    role: "Loyal Customer",
    text: "The coffee here is unmatched. Every visit feels like a ritual.",
    rating: 5,
  },
  {
    name: "Dawit Alemu",
    role: "Food Enthusiast",
    text: "Fresh ingredients, bold flavors, and the service is always top-tier.",
    rating: 5,
  },
  {
    name: "Sara Hailu",
    role: "Bank Worker",
    text: "My go-to spot for working. Great WiFi, even better coffee.",
    rating: 5,
  },
  {
    name: "Henok Tekle",
    role: "Coffee Lover",
    text: "Best flat white in town. The atmosphere is pure inspiration.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#FFF8F5] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Warm blobs */}
      <div className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-orange-100/30 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-amber-100/20 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 lg:mb-14">
          <FadeUp>
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="shrink-0 text-xs font-black uppercase tracking-[0.25em] text-accent sm:text-sm">
                Testimonials
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/60 via-accent/20 to-transparent" />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Loved by Our
              <br />
              <span className="text-gradient">Community</span>
            </h2>
          </FadeUp>
        </div>

        {/* Horizontal Scroll Cards */}
        <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative min-w-[260px] max-w-[300px] flex-shrink-0 snap-start rounded-2xl border border-border/60 bg-white p-5 shadow-lg transition-all duration-300 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 sm:p-6"
            >
              <Quote className="h-6 w-6 text-accent/20" />

              <div className="mt-3 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 + i * 0.05 }}
                  >
                    <Star
                      size={14}
                      className={i < review.rating ? "fill-accent text-accent" : "text-text-muted/40"}
                    />
                  </motion.div>
                ))}
              </div>

              <p className="mt-3 text-sm font-medium leading-relaxed text-text-primary sm:text-base">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-accent/10 text-sm font-bold text-accent">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-primary">{review.name}</h3>
                  <p className="text-xs text-text-secondary">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-2 text-center text-xs text-text-muted sm:hidden"
        >
          ← Swipe for more →
        </motion.p>
      </div>
    </section>
  );
}