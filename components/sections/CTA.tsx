"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FadeUp } from "../ui/FadeUp";

const foodItems = [
  { id: 1, name: "Sandwich", image: "/images/sandwich.png" },
  { id: 2, name: "Pasta", image: "/images/pasta.png" },
  { id: 3, name: "Beef", image: "/images/beef.png" },
  { id: 4, name: "Salad", image: "/images/salad.png" },
  { id: 5, name: "Rice", image: "/images/rice.png" },
];

const rainItems = [
  { left: 5, delay: 0 },
  { left: 15, delay: 2 },
  { left: 25, delay: 4 },
  { left: 35, delay: 1 },
  { left: 45, delay: 3 },
  { left: 55, delay: 5 },
  { left: 65, delay: 1.5 },
  { left: 75, delay: 3.5 },
  { left: 85, delay: 2.5 },
  { left: 95, delay: 4.5 },
];

export default function CTA() {
  return (
    <section className="px-6 py-24 lg:px-8 bg-background overflow-hidden">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-border bg-accent/5 px-8 py-20 text-center shadow-sm">

        {/* Falling leaves - background layer */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {rainItems.map((item, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-10"
              style={{
                left: `${item.left}%`,
                top: `-10%`,
              }}
              animate={{
                y: ["-10vh", "110vh"],
                rotate: [0, 360, 720],
              }}
              transition={{
                duration: 10 + i * 0.8,
                repeat: Infinity,
                ease: "linear",
                delay: item.delay,
              }}
            >
              🍃
            </motion.div>
          ))}
        </div>

        {/* Horizontal scrolling plates - background layer */}
        <div className="absolute left-0 right-0 z-0 pointer-events-none" style={{ top: "50%", transform: "translateY(-50%)" }}>
          <div className="w-full overflow-hidden py-4">
            <motion.div
              className="flex gap-12"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...foodItems, ...foodItems, ...foodItems].map((item, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-36 h-36 rounded-full bg-background/30 backdrop-blur-sm border border-border/40 shadow-lg flex items-center justify-center overflow-hidden"
                >
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Content - on top of everything */}
        <div className="relative z-10 mx-auto max-w-3xl">
          <FadeUp delay={0.1}>
            <h2 className="mt-8 text-5xl font-black tracking-tight text-text-primary md:text-6xl lg:text-7xl">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">Perfect Coffee</span> Moment Awaits
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Order your favorite coffee and fresh meals from X Cafe.
              Crafted with quality ingredients and delivered with care.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <button className="group mt-10 inline-flex h-16 items-center justify-center gap-3 rounded-button bg-accent px-10 text-lg font-bold text-white shadow-xl shadow-accent/40 transition-all duration-300 hover:-translate-y-1.5 hover:brightness-95 hover:shadow-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
              Start Your Order
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}