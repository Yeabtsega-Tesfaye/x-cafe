"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "../ui/FadeUp";
import { FEATURED_FOOD } from "@/data/menu";
import { useCartStore } from "@/features/orders/store/useCartStore";

export default function Menu() {
  // Pull the addItem function from your global cart store
  const addItem = useCartStore((state) => state.addItem);

  // Helper to convert "ETB 100" into a clean number (100)
  const parsePrice = (priceStr: string) => {
    return parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  };

  return (
    <section id="menu" className="bg-background-secondary px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="max-w-3xl">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Our Menu
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              Taste Ethiopia, Crafted Fresh
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              Discover authentic Ethiopian flavors, freshly brewed coffee, and
              modern café favorites prepared with care every day.
            </p>
          </FadeUp>
        </div>

        {/* Menu Cards */}
        <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {FEATURED_FOOD.map((item) => (
            <StaggerItem
              key={item.name}
              className="group overflow-hidden rounded-card border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute left-4 top-4 rounded-full bg-background px-3 py-1 text-xs font-semibold text-accent shadow-sm">
                  {item.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-secondary">
                    {item.category}
                  </span>

                  <span className="font-bold text-accent">
                    {item.price}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold text-text-primary">
                  {item.name}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>

                <div className="mt-5 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <Star className="h-4 w-4 fill-accent text-accent" />
                </div>

                {/* The fully functional Add to Cart button */}
                <button 
                  onClick={() =>
                    addItem({
                      id: item.name,
                      name: item.name,
                      price: parsePrice(item.price),
                    })
                  }
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all duration-200 group-hover:gap-3 active:scale-95"
                >
                  Order Now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        {/* The Stylish "View Full Menu" button you asked for */}
        <FadeUp delay={0.3} className="mt-16 flex justify-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-button bg-accent px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            View Full Menu
            <ArrowRight className="h-5 w-5" />
          </Link>
        </FadeUp>

      </div>
    </section>
  );
}