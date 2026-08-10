"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Coffee, Leaf, Clock, Home, Award, ArrowRight } from "lucide-react";
import { FadeUp } from "../ui/FadeUp";

const features = [
  { icon: Leaf, label: "Fresh Ingredients", desc: "Sourced daily from local farms" },
  { icon: Clock, label: "Fast Service", desc: "Order & receive in minutes" },
  { icon: Home, label: "Cozy Atmosphere", desc: "Designed for comfort" },
  { icon: Award, label: "Expert Baristas", desc: "Passionate about every cup" },
];

const ScrollHighlight = ({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    // Moved font-bold here so BOTH layers are exactly the same width
    <span className="relative inline-block whitespace-nowrap font-bold">
      {/* The base gray text */}
      <span className="text-text-secondary/60">{children}</span>
      
      {/* The colored text that fades in over it */}
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0 text-accent drop-shadow-sm"
        aria-hidden="true" 
      >
        {children}
      </motion.span>
    </span>
  );
};

export default function About() {
  const textRef = useRef<HTMLDivElement>(null);
  
  // Track scroll specifically over the text container
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 85%", "center 45%"], // Starts fading in when text is 85% down the screen
  });

  return (
    <section id="about" className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Decorative rings */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -right-32 -top-32 h-64 w-64 rounded-full border-2 border-accent/5"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full border-2 border-accent/5"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <FadeUp>
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="shrink-0 text-xs font-black uppercase tracking-[0.25em] text-accent sm:text-sm">
                About Us
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/60 via-accent/20 to-transparent" />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Where Great Coffee
              <br />
              <span className="text-gradient">Meets Community</span>
            </h2>
          </FadeUp>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -left-3 -top-3 h-full w-full rounded-2xl border-2 border-accent/20 lg:-left-4 lg:-top-4" />
            <div className="absolute -bottom-3 -right-3 h-16 w-16 rounded-full border-2 border-accent/20 lg:-bottom-4 lg:-right-4" />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl"
            >
              <Image
                src="/images/cafe-about.jpg"
                alt="X Cafe experience"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm">
                <Coffee className="h-4 w-4 text-accent" />
                <span className="text-xs font-bold text-text-primary">Est. 2024</span>
              </div>
            </motion.div>
          </motion.div>

{/* Content */}
<div>
  <div ref={textRef} className="space-y-4">
    <FadeUp delay={0.2}>
      <p className="text-base leading-relaxed text-text-secondary/80 sm:text-lg">
        At X Cafe, we believe a cup of{" "}
        <ScrollHighlight progress={scrollYProgress} range={[0, 0.15]}>
          great coffee
        </ScrollHighlight>{" "}
        is the perfect way to start your day. We carefully source the best{" "}
        <ScrollHighlight progress={scrollYProgress} range={[0.15, 0.3]}>
          quality ingredients
        </ScrollHighlight>{" "}
        from local farmers who care about their craft just as much as we do.
      </p>
    </FadeUp>

    <FadeUp delay={0.3}>
      <p className="text-base leading-relaxed text-text-secondary/80 sm:text-lg">
        When you walk through our doors, you will find a warm, inviting space designed just for you. Paired with our friendly,{" "}
        <ScrollHighlight progress={scrollYProgress} range={[0.3, 0.5]}>
          modern service
        </ScrollHighlight>
        , it is easy to unwind, connect, and create{" "}
        <ScrollHighlight progress={scrollYProgress} range={[0.5, 0.7]}>
          memorable moments
        </ScrollHighlight>{" "}
        every single day.
      </p>
    </FadeUp>

    <FadeUp delay={0.4}>
      <p className="text-base leading-relaxed text-text-secondary/80 sm:text-lg">
        Whether you are grabbing a{" "}
        <ScrollHighlight progress={scrollYProgress} range={[0.7, 0.85]}>
          quick coffee
        </ScrollHighlight>{" "}
        on your way to work, hosting a casual meeting, or sitting down for a{" "}
        <ScrollHighlight progress={scrollYProgress} range={[0.85, 1]}>
          relaxing meal
        </ScrollHighlight>
        , we are here to make your experience truly special from the first sip to the last bite.
      </p>
    </FadeUp>
  </div>

  <FadeUp delay={0.5}>
    <button className="group mt-8 inline-flex h-12 items-center gap-2 rounded-button bg-accent px-6 text-sm font-bold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]">
      Our Story
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  </FadeUp>
</div>
        </div>
      </div>
    </section>
  );
}