"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp } from "../ui/FadeUp";

const services = [
  {
    title: "Dine In & Relax",
    description: "Enjoy handcrafted meals in a warm and welcoming atmosphere designed for comfort.",
    image: "/images/dine.jpg",
  },
  {
    title: "QR Ordering",
    description: "Scan, browse, order instantly, and pay securely from your table.",
    image: "/images/qr.jpg",
  },
  {
    title: "Specialty Coffee",
    description: "Premium Ethiopian Arabica beans, expertly roasted and brewed for every cup.",
    image: "/images/jebena-buna.jpg",
  },
  {
    title: "Events & Gatherings",
    description: "Host birthdays, meetings, and special celebrations in a stylish space.",
    image: "/images/cafe-about.jpg",
  },
];

function ServiceCard({
  title,
  description,
  image,
  className,
  delay,
}: {
  title: string;
  description: string;
  image: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-card shadow-card ${className}`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/80" />
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white transition-transform duration-300 group-hover:-translate-y-1 sm:p-6">
        <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>
        <p className="mt-1 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#FDF8F3] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Warm Blobs */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-orange-100/40 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-amber-100/30 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <FadeUp>
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="shrink-0 text-xs font-black uppercase tracking-[0.25em] text-accent sm:text-sm">
                Experience X Cafe
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/60 via-accent/20 to-transparent" />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Designed Around
              <br />
              <span className="text-gradient">Every Visit</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
              From effortless QR ordering to handcrafted coffee and memorable
              gatherings, every experience is thoughtfully designed.
            </p>
          </FadeUp>
        </div>

        {/* Bento Grid */}
        <div className="grid auto-rows-[130px] grid-cols-12 gap-4 sm:auto-rows-[150px] sm:gap-5">
          <ServiceCard
            title={services[0].title}
            description={services[0].description}
            image={services[0].image}
            delay={0}
            className="col-span-12 row-span-2 lg:col-span-7"
          />
          <ServiceCard
            title={services[1].title}
            description={services[1].description}
            image={services[1].image}
            delay={0.1}
            className="col-span-12 row-span-2 lg:col-span-5"
          />
          <ServiceCard
            title={services[2].title}
            description={services[2].description}
            image={services[2].image}
            delay={0.2}
            className="col-span-12 row-span-1 md:col-span-6 lg:col-span-4"
          />
          <ServiceCard
            title={services[3].title}
            description={services[3].description}
            image={services[3].image}
            delay={0.3}
            className="col-span-12 row-span-1 md:col-span-6 lg:col-span-8"
          />
        </div>
      </div>
    </section>
  );
}