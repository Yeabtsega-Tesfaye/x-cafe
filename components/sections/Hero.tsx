"use client";

import { useRef } from "react";
import Image from "next/image";
import { Coffee, Users, UtensilsCrossed, Star, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import TopographicBackground from "../ui/TopographicBackground";
import { useCartStore } from "@/features/orders/store/useCartStore";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export default function Hero() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const isTextVisible = useInView(triggerRef, { once: true });

  return (
    <section className="relative h-[150vh] w-full bg-background-secondary">
      <div
        ref={triggerRef}
        className="pointer-events-none absolute left-0 top-[100vh] mt-12 h-px w-full"
      />

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        <TopographicBackground />

        {/* Ambient Glows */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -right-[5%] -top-[10%] h-[60vw] w-[60vw] rounded-full bg-accent/15 blur-[120px]" />
          <div className="absolute -left-[5%] -bottom-[10%] h-[40vw] w-[40vw] rounded-full bg-accent/10 blur-[100px]" />
        </div>

        {/* Floating Food Icons */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden hidden sm:block">
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[6%] top-[12%] opacity-15"
          >
            <Coffee className="h-16 w-16 text-accent" strokeWidth={1} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -18, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="absolute right-[8%] top-[18%] opacity-10"
          >
            <UtensilsCrossed className="h-20 w-20 text-accent" strokeWidth={1} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute left-[4%] top-[44%] opacity-10"
          >
            <Star className="h-14 w-14 text-accent" strokeWidth={1} />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.2, 0.08] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[30%] left-[8%]"
          >
            <div className="h-3 w-3 rounded-full bg-accent/40" />
          </motion.div>
        </div>

        {/* Glow Behind Burger */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <div className="h-[70vw] w-[70vw] sm:h-[50vw] sm:w-[50vw] rounded-full bg-accent/15 blur-[100px] sm:blur-[120px]" />
        </div>

        {/* Mobile Text Protection Gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-3/5 bg-gradient-to-t from-background-secondary via-background-secondary/90 to-transparent lg:hidden" />

        {/* Burger Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
          transition={{
            opacity: { duration: 1 },
            scale: { duration: 1 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="pointer-events-none absolute inset-0 z-10 flex items-start justify-center pt-[15vh] lg:items-center lg:pt-0"
        >
          <div className="relative h-[45vh] w-[90vw] lg:h-[75vh] lg:w-full lg:max-w-5xl drop-shadow-2xl">
            <Image
              src="/images/hero.png"
              alt="Signature Cafe Burger"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 90vw, 1280px"
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="absolute inset-0 z-30 flex flex-col justify-end pb-10 px-5 sm:pb-20 sm:px-16 lg:pb-24 lg:px-32 xl:px-48">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isTextVisible ? "visible" : "hidden"}
            className="pointer-events-auto w-full max-w-xl"
          >
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/90 px-4 py-1.5 text-xs font-bold text-accent shadow-sm backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Freshly Brewed Every Day
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
            >
              Fresh Food.
              <br className="hidden sm:block" /> Great Coffee.
              <br className="hidden sm:block" />
              <span className="text-gradient lg:mt-2 lg:inline-block">Effortless.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary sm:mt-6 sm:max-w-md sm:text-lg"
            >
              Enjoy handcrafted meals, freshly brewed coffee, and a seamless
              dining experience — all from one modern café.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row"
            >
              <a
                href="#menu"
                onClick={() => useCartStore.getState().setIsOpen(true)}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-button bg-accent px-6 text-sm font-bold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40 active:scale-[0.98] sm:w-auto sm:h-14 sm:px-8 sm:text-base"
              >
                Order Now
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#menu"
                className="inline-flex h-12 w-full items-center justify-center rounded-button border border-border bg-white/90 px-6 text-sm font-bold text-text-primary shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:scale-[0.98] sm:w-auto sm:h-14 sm:px-8 sm:text-base"
              >
                View Menu
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-8 grid grid-cols-3 gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:gap-10"
            >
              {[
                { icon: Users, value: "500+", label: "Customers" },
                { icon: UtensilsCrossed, value: "40+", label: "Items" },
                { icon: Star, value: "4.9", label: "Rating", fill: true },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center text-center gap-2 sm:flex-row sm:text-left sm:gap-3"
                >
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-md">
                    <stat.icon
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.fill ? "fill-accent text-accent" : "text-accent"}`}
                    />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-black tracking-tight text-text-primary">
                      {stat.value}
                    </p>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-text-secondary sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}