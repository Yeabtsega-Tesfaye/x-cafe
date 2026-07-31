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
      type: "spring" as const,
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
        {/* Ambient glows */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-accent/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-accent/10 blur-[100px]" />
        </div>

       {/* Scattered animated food icons */}
<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
  
  {/* Coffee cup - top left */}
  <motion.div
    animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className="absolute top-[12%] left-[6%] opacity-15"
  >
    <svg className="w-16 h-16 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M6 4H16C17 4 17.5 4.5 17.5 5.5V6H4.5V5.5C4.5 4.5 5 4 6 4Z" />
      <path d="M4.5 6H17.5V14C17.5 15.5 17 16 15.5 16H6.5C5 16 4.5 15.5 4.5 14V6Z" />
      <path d="M17.5 8H18.5C19.5 8 20 8.5 20 9.5V12.5C20 13.5 19.5 14 18.5 14H17.5" />
      <path d="M10 16V20" />
      <path d="M8 20H12" />
    </svg>
  </motion.div>

  {/* Plate/fork - top right */}
  <motion.div
    animate={{ y: [0, -18, 0], rotate: [0, -6, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
    className="absolute top-[18%] right-[8%] opacity-12"
  >
    <svg className="w-20 h-20 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="12" cy="10" r="6" />
      <path d="M8 16L6 22" />
      <path d="M16 16L18 22" />
      <path d="M12 16V22" />
    </svg>
  </motion.div>

  {/* Leaf - middle left */}
  <motion.div
    animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
    className="absolute top-[44%] left-[4%] opacity-10"
  >
    <svg className="w-14 h-14 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22" />
      <path d="M12 2C12 2 16 6 16 12C16 18 12 22 12 22" />
      <path d="M12 2V22" />
      <path d="M6 12H18" />
    </svg>
  </motion.div>

  {/* Bowl - bottom right */}
  <motion.div
    animate={{ y: [0, -14, 0], rotate: [0, -8, 0] }}
    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
    className="absolute bottom-[22%] right-[10%] opacity-10"
  >
    <svg className="w-20 h-20 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4 10C4 6 8 4 12 4C16 4 20 6 20 10C20 12 18 14 16 15C14 16 13 16 12 16C11 16 10 16 8 15C6 14 4 12 4 10Z" />
      <path d="M6 15L4 20H20L18 15" />
    </svg>
  </motion.div>

  {/* Small sparkle - bottom left */}
  <motion.div
    animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.2, 0.08] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    className="absolute bottom-[30%] left-[8%]"
  >
    <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  </motion.div>

  {/* Dots */}
  <motion.div
    animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0.12, 0.05] }}
    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
    className="absolute top-[30%] right-[22%]"
  >
    <div className="w-2 h-2 rounded-full bg-accent/30" />
  </motion.div>

  <motion.div
    animate={{ scale: [1, 1.3, 1], opacity: [0.04, 0.1, 0.04] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
    className="absolute bottom-[42%] left-[18%]"
  >
    <div className="w-2 h-2 rounded-full bg-accent/20" />
  </motion.div>
</div>

        {/* Glow behind burger */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="w-[50vw] h-[50vw] rounded-full bg-accent/20 blur-[120px]" />
        </div>

        {/* Burger Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -20, 0],
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
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

        {/* Text Content */}
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
              <span className="text-transparent bg-clip-text bg-liner-to-r from-accent to-accent/70">
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

            {/* Stats with hover scale */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-6 sm:gap-10">
              <motion.div whileHover={{ scale: 1.15 }} className="flex items-center gap-3 cursor-default">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background shadow-md">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <motion.p
                    className="text-xl font-black tracking-tight text-text-primary drop-shadow-sm"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 1,
                    }}
                  >
                    500+
                  </motion.p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary sm:text-xs">
                    Customers
                  </p>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.15 }} className="flex items-center gap-3 cursor-default">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background shadow-md">
                  <UtensilsCrossed className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <motion.p
                    className="text-xl font-black tracking-tight text-text-primary drop-shadow-sm"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.5,
                    }}
                  >
                    40+
                  </motion.p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary sm:text-xs">
                    Items
                  </p>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.15 }} className="flex items-center gap-3 cursor-default">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background shadow-md">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                </div>
                <div>
                  <motion.p
                    className="text-xl font-black tracking-tight text-text-primary drop-shadow-sm"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.2,
                    }}
                  >
                    4.9
                  </motion.p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary sm:text-xs">
                    Rating
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}