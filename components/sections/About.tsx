"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Coffee, Leaf, Clock, Home, Award } from "lucide-react";
import { FadeUp } from "../ui/FadeUp";

export default function About() {
  const features = [
    { icon: Leaf, label: "Fresh Ingredients", desc: "Sourced daily from local farms" },
    { icon: Clock, label: "Fast Service", desc: "Order & receive in minutes" },
    { icon: Home, label: "Cozy Atmosphere", desc: "Designed for comfort & connection" },
    { icon: Award, label: "Expert Baristas", desc: "Passionate about every cup" },
  ];

  return (
    <section className="relative px-4 py-8 bg-background-secondary overflow-hidden" id="about">
      
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 h-64 w-64 rounded-full border-2 border-accent/5"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.05, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full border-2 border-accent/5"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        
        <FadeUp>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-accent" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent whitespace-nowrap">
              About Us
            </p>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-accent" />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="text-center text-3xl font-black tracking-tight text-text-primary md:text-4xl">
            Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">Great Coffee</span> Meets Community
          </h2>
        </FadeUp>

        <div className="mt-6 grid gap-6 md:grid-cols-2 items-center">
          
          <div className="relative">
            <div className="absolute -top-3 -left-3 h-full w-full rounded-2xl border-2 border-accent/20 md:-top-4 md:-left-4" />
            <div className="absolute -bottom-3 -right-3 h-16 w-16 rounded-full border-2 border-accent/20 md:-bottom-4 md:-right-4" />
            
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative h-[200px] w-full overflow-hidden rounded-2xl shadow-2xl md:h-[280px]"
            >
              <Image
                src="/images/cafe-about.jpg"
                alt="X Cafe experience"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute bottom-3 left-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 shadow-lg flex items-center gap-2"
              >
                <Coffee className="h-3 w-3 text-accent" />
                <span className="text-[10px] font-bold text-text-primary">Est. 2024</span>
              </motion.div>
            </motion.div>
          </div>

          <div>
            <FadeUp delay={0.2}>
              <p className="text-sm leading-relaxed text-text-secondary">
                At X Cafe, we believe great coffee brings people together.
                We combine quality ingredients, modern service, and a welcoming
                atmosphere to create memorable moments every day.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                Whether you visit us for a quick coffee, a meeting, or a relaxing
                meal, we make every experience special.
              </p>
            </FadeUp>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="rounded-xl border border-border/40 bg-white/60 p-2 shadow-sm transition-all duration-300 hover:border-accent/30 hover:shadow-md hover:shadow-accent/5 backdrop-blur-sm"
                >
                  <feature.icon className="h-4 w-4 text-accent" />
                  <p className="mt-0.5 text-xs font-bold text-text-primary">{feature.label}</p>
                  <p className="text-[10px] text-text-secondary">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            <FadeUp delay={0.5}>
              <button className="group mt-4 inline-flex h-10 items-center justify-center rounded-button bg-accent px-4 text-xs font-bold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-1 hover:brightness-95 hover:shadow-accent/40">
                Our Story
                <span className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}