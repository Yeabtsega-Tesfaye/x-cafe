"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative px-4 py-16 bg-background-secondary overflow-hidden">
      
      {/* Morphing background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-accent/5 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-accent/8 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        
        <FadeUp>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Testimonials
            </p>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-accent" />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-text-primary md:text-5xl">
            Loved by Our
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">
              Community
            </span>
          </h2>
        </FadeUp>

        {/* Horizontal scrollable cards - no blur, staggered appear */}
        <div
          ref={scrollRef}
          className="mt-6 flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.12, duration: 0.5, ease: "easeOut" }}
              whileHover={{ 
                y: -12, 
                rotateX: 5,
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="relative min-w-[260px] max-w-[280px] snap-start rounded-2xl border border-border/60 bg-white p-5 shadow-lg transition-all duration-300 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10"
              style={{
                transformStyle: "preserve-3d",
                perspective: "600px",
              }}
            >
              {/* 3D shadow / standing effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Animated border glow */}
              <motion.div
                animate={{
                  opacity: [0.15, 0.4, 0.15],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 via-transparent to-accent/5"
              />

              <div className="relative z-10">
                <Quote className="h-5 w-5 text-accent/30" />

                <div className="mt-3 flex gap-0.5 text-accent">
                  {[...Array(review.rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.12 + i * 0.04 }}
                    >
                      <Star size={14} fill="currentColor" />
                    </motion.span>
                  ))}
                </div>

                <p className="mt-3 text-sm font-medium leading-relaxed text-text-primary">
                  &quot;{review.text}&quot;
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-accent/10 text-sm font-bold text-accent shadow-md">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-text-primary">{review.name}</h3>
                    <p className="text-xs text-text-secondary">{review.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-4 text-center text-xs text-text-muted"
        >
          ← Swipe →
        </motion.div>

      </div>

      <style jsx>{`
        .snap-mandatory {
          scroll-snap-type: x mandatory;
        }
        .snap-start {
          scroll-snap-align: start;
        }
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}