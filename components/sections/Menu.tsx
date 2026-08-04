"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Star, ShoppingBag, Plus, Check, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "../ui/FadeUp";
import { FEATURED_FOOD } from "@/data/menu";
import { useCartStore } from "@/features/orders/store/useCartStore";

interface MenuItem {
  name: string;
  image: string;
  badge: string;
  category: string;
  price: string;
  description: string;
  rating?: number;
}

const parsePrice = (priceStr: string): number => {
  return parseFloat(priceStr.replace(/[^0-9.]/g, ""));
};

/* ─── Skeleton Card (Tailwind + Framer Motion only) ─── */
function SkeletonCard() {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-card border border-border/50 bg-background shadow-sm">
      <div className="relative aspect-[16/10] overflow-hidden bg-border/50">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="w-2/3 space-y-2">
            <div className="h-3 w-16 animate-pulse rounded-full bg-border" />
            <div className="h-5 w-full animate-pulse rounded-md bg-border" />
          </div>
          <div className="h-5 w-14 animate-pulse rounded-md bg-border" />
        </div>
        <div className="mt-1 space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-border" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-border" />
        </div>
        <div className="mt-auto pt-2">
          <div className="h-10 w-full animate-pulse rounded-button bg-border" />
        </div>
      </div>
    </div>
  );
}

function RatingStars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 transition-colors duration-300 ${
            i < rating ? "fill-accent text-accent" : "fill-transparent text-text-muted/40"
          }`}
        />
      ))}
      <span className="ml-1 text-[11px] font-semibold text-text-muted">{rating.toFixed(1)}</span>
    </div>
  );
}

function AddToCartButton({ onAdd }: { onAdd: () => void }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    onAdd();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.96 }}
      className={`group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-button px-4 py-3 text-sm font-bold transition-all duration-300 ${
        isAdded ? "bg-success text-white" : "bg-accent text-white hover:shadow-lg hover:shadow-accent/25"
      }`}
    >
      <AnimatePresence mode="wait">
        {isAdded ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-1.5"
          >
            <Check className="h-4 w-4" />
            Added
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-1.5"
          >
            <ShoppingBag className="h-4 w-4" />
            Order
            <Plus className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:rotate-90" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const addItem = useCartStore((state) => state.addItem);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="group/card relative flex flex-col overflow-hidden rounded-card border border-border/60 bg-background shadow-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-accent/5"
      >
        {/* Image — 16:10 for max visibility */}
        <div className="relative aspect-[16/10] overflow-hidden bg-background-secondary">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover transition-all duration-700 ease-out group-hover/card:scale-110 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImgLoaded(true)}
            priority={index < 4}
          />

          <AnimatePresence>
            {!imgLoaded && (
              <motion.div
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-border/60"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />

          <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-accent shadow-sm backdrop-blur-md ring-1 ring-border/50">
              <Flame className="h-3 w-3" />
              {item.badge}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
            <span className="inline-block rounded-lg bg-background/95 px-3 py-1.5 text-sm font-bold text-text-primary shadow-lg backdrop-blur-md ring-1 ring-border/50">
              {item.price}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-muted">
                {item.category}
              </span>
              <h3 className="mt-1 truncate text-base font-bold text-text-primary transition-colors duration-300 group-hover/card:text-accent sm:text-lg">
                {item.name}
              </h3>
            </div>
          </div>

          <p className="mt-2 line-clamp-1 text-sm leading-relaxed text-text-secondary sm:line-clamp-2">
            {item.description}
          </p>

          <div className="mt-3">
            <RatingStars />
          </div>

          <div className="mt-4">
            <AddToCartButton
              onAdd={() =>
                addItem({
                  id: item.name,
                  name: item.name,
                  price: parsePrice(item.price),
                })
              }
            />
          </div>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

export default function Menu() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="menu" className="relative overflow-hidden bg-[#FFFBF7] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Warm Blobs */}
      <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-orange-100/40 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[600px] w-[600px] rounded-full bg-amber-100/30 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-orange-50/50 blur-[90px]" />

      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl">
          <FadeUp>
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="shrink-0 text-xs font-black uppercase tracking-[0.25em] text-accent sm:text-sm">
                Our Menu
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/60 via-accent/20 to-transparent" />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Taste Ethiopia,
              <br />
              <span className="text-gradient">Crafted Fresh Every Day</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-text-secondary sm:text-base">
              Discover authentic Ethiopian flavors, freshly brewed coffee, and
              modern café favorites prepared with care every day.
            </p>
          </FadeUp>
        </div>

        {/* Grid */}
        <div className="mt-12 sm:mt-14">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5"
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <SkeletonCard />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5">
                  {FEATURED_FOOD.map((item, index) => (
                    <MenuCard key={item.name} item={item} index={index} />
                  ))}
                </StaggerContainer>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <FadeUp delay={0.3}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:mt-16 sm:flex-row">
            <Link
              href="/menu"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-button bg-accent px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.97] sm:px-10 sm:py-4 sm:text-base"
            >
              <span className="relative z-10">View Full Menu</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
            <span className="text-sm text-text-muted">{FEATURED_FOOD.length}+ dishes available</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}