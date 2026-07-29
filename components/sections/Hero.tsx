"use client";

import { useRef } from "react";
import Image from "next/image";
import { Coffee, Users, UtensilsCrossed, Star } from "lucide-react";
import { motion, useInView } from "framer-motion";
import TopographicBackground from "../ui/TopographicBackground";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
};

export default function Hero() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const isTextVisible = useInView(triggerRef);

  return (
    <section className="relative h-[150vh] w-full bg-background-secondary">
      <TopographicBackground />

      <div ref={triggerRef} className="absolute top-[100vh] mt-12 left-0 w-full h-px pointer-events-none" />

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ambient glows — kept per your call; now driven by --accent instead of a hardcoded shade */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -right-[5%] w-[60vw] h-[60vw] rounded-full bg-accent/20 blur-[120px]" />
          <div className="absolute -bottom-[10%] -left-[5%] w-[40vw] h-[40vw] rounded-full bg-accent/10 blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-full max-w-5xl h-[80vh] sm:h-[85vh] drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]">
            <Image
              src="/images/hero.png"
              alt="Signature Cafe Burger"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-end pb-12 sm:pb-20 lg:pb-24 pl-10 sm:pl-24 lg:pl-80 xl:pl-96">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isTextVisible ? "visible" : "hidden"}
            className="pointer-events-auto w-full max-w-xl"
          >
            <motion.div variants={itemVariants} className="mb-3 inline-flex items-center gap-2 rounded-button border border-accent/30 bg-background/80 backdrop-blur-sm p-1 text-xs font-bold text-accent shadow-sm">
              <Coffee className="h-2 w-2" />
              <span>Freshly Brewed Every Day</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants} 
              className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-6xl drop-shadow-sm"
            >
              Fresh Food. <br className="hidden sm:block" /> Great Coffee. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">
                Effortless.
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-6 text-base leading-relaxed text-text-primary sm:text-lg font-medium max-w-sm sm:max-w-md drop-shadow-sm">
              Enjoy handcrafted meals, freshly brewed coffee, and a seamless dining
              experience—all from one modern café.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#"
                className="inline-flex h-14 items-center justify-center rounded-button bg-accent px-8 text-base font-bold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-1 hover:brightness-95 hover:shadow-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Order Now
              </a>

              <a
                href="#"
                className="inline-flex h-14 items-center justify-center rounded-button border border-border bg-background/90 px-8 text-base font-bold text-text-primary shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                View Menu
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-6 sm:gap-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background shadow-md">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xl font-black tracking-tight text-text-primary drop-shadow-sm">500+</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary sm:text-xs">Customers</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background shadow-md">
                  <UtensilsCrossed className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xl font-black tracking-tight text-text-primary drop-shadow-sm">40+</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary sm:text-xs">Items</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background shadow-md">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                </div>
                <div>
                  <p className="text-xl font-black tracking-tight text-text-primary drop-shadow-sm">4.9</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary sm:text-xs">Rating</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}