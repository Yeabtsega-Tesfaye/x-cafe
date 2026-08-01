"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp } from "../ui/FadeUp";

const services = [
  {
    title: "Dine In & Relax",
    description:
      "Enjoy handcrafted meals in a warm and welcoming atmosphere designed for comfort.",
    image: "/images/dine.jpg",
  },
  {
    title: "QR Ordering",
    description:
      "Scan the QR code, browse the menu, order instantly, and pay securely from your table.",
    image: "/images/qr.jpg",
  },
  {
    title: "Specialty Coffee",
    description:
      "Premium Ethiopian Arabica beans, expertly roasted and brewed for every cup.",
    image: "/images/jebena-buna.jpg",
  },
  {
    title: "Events & Gatherings",
    description:
      "Host birthdays, meetings, and special celebrations in a stylish and comfortable space.",
    image: "/images/cafe-about.jpg",
  },
];

type ServiceCardProps = {
  title: string;
  description: string;
  image: string;
  className: string;
  delay: number;
};

function ServiceCard({
  title,
  description,
  image,
  className,
  delay,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      className={`group relative overflow-hidden rounded-[24px] ${className}`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/80" />

      {/* Text content - sits directly on image */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-transform duration-300 group-hover:-translate-y-1">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mt-1 max-w-md text-sm leading-relaxed text-white/80">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#FDF8F3] px-4 py-16"
    >
      {/* Background Glow — warm food vibe */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100/20 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

              {/* ================= Section Header ================= */}
<div className="mb-12">

  {/* Top Row */}
  <FadeUp>
    <div className="flex w-full items-center gap-5">
      {/* Long Line */}
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-orange-400" />

      {/* Label */}
      <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">
        Experience X Cafe
      </span>

      {/* Short Line */}
      <div className="h-px w-16 bg-orange-500" />
    </div>
  </FadeUp>

  {/* Right Aligned Content */}
  <div className="mt-8 flex flex-col items-end">

    <FadeUp delay={0.1}>
      <h2 className="text-right text-4xl font-bold leading-[1.1] tracking-tight text-[#04122d] md:text-5xl">
        Designed Around
        <br />
        <span className="text-[#f27d3a]">
          Every Visit
        </span>
      </h2>
    </FadeUp>

    <FadeUp delay={0.2}>
      <p className="mt-5 max-w-[750px] text-right text-[18px] leading-relaxed text-[#4a5568]">
        From effortless QR ordering to handcrafted coffee and memorable
        gatherings, every experience at X Cafe is thoughtfully designed
        to make every visit feel special.
      </p>
    </FadeUp>

  </div>

</div>

        {/* Editorial Bento Grid — shorter height */}
<div className="grid auto-rows-[140px] grid-cols-12 gap-4">
  
  <ServiceCard
    title={services[0].title}
    description={services[0].description}
    image={services[0].image}
    delay={0}
    className="col-span-12 lg:col-span-7 row-span-2"
  />

  <ServiceCard
    title={services[1].title}
    description={services[1].description}
    image={services[1].image}
    delay={0.1}
    className="col-span-12 lg:col-span-5 row-span-2"
  />

  <ServiceCard
    title={services[2].title}
    description={services[2].description}
    image={services[2].image}
    delay={0.2}
    className="col-span-12 md:col-span-6 lg:col-span-4 row-span-1"
  />

  <ServiceCard
    title={services[3].title}
    description={services[3].description}
    image={services[3].image}
    delay={0.3}
    className="col-span-12 md:col-span-6 lg:col-span-8 row-span-1"
  />

</div>
      </div>
    </section>
  );
}