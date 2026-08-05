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
 { left: 5, delay: 0 }, { left: 15, delay: 2 }, { left: 25, delay: 4 },
 { left: 35, delay: 1 }, { left: 45, delay: 3 }, { left: 55, delay: 5 },
 { left: 65, delay: 1.5 }, { left: 75, delay: 3.5 }, { left: 85, delay: 2.5 }, { left: 95, delay: 4.5 },
];

export default function CTA() {
 return (
   <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
     <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-border/60 bg-[#FFF8F5] px-6 py-20 text-center shadow-lg sm:rounded-[2.5rem] sm:px-8 sm:py-24">
       {/* Falling Leaves */}
       <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
         {rainItems.map((item, i) => (
           <motion.div
             key={i}
             className="absolute text-2xl opacity-10"
             style={{ left: `${item.left}%`, top: "-10%" }}
             animate={{ y: ["-10vh", "110vh"], rotate: [0, 360, 720] }}
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
       {/* Content */}
       <div className="relative z-10 mx-auto max-w-3xl">
         <FadeUp delay={0.1}>
           <h2 className="text-4xl font-black leading-[1.1] tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
             Your{" "}
             <span className="text-gradient">Perfect Coffee</span>
             <br />
             Moment Awaits
           </h2>
         </FadeUp>

         <FadeUp delay={0.2}>
           <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
             Order your favorite coffee and fresh meals from X Cafe. Crafted
             with quality ingredients and delivered with care.
           </p>
         </FadeUp>

         <FadeUp delay={0.3}>
           <motion.button
             whileHover={{ scale: 1.03, y: -2 }}
             whileTap={{ scale: 0.97 }}
             className="group mt-10 inline-flex h-14 items-center gap-3 rounded-button bg-accent px-8 text-base font-bold text-white shadow-xl shadow-accent/30 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/40 sm:h-16 sm:px-10 sm:text-lg"
           >
             Start Your Order
             <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
           </motion.button>
         </FadeUp>
       </div>
     </div>
   </section>
 );
}