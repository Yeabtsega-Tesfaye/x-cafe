"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/FadeUp";
import { CATEGORIES, FULL_MENU } from "@/data/menu";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter the menu items based on the active category
  const filteredMenu = FULL_MENU.filter((item) => 
    activeCategory === "All" ? true : item.category === activeCategory
  );

  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      {/* STEP 1: PAGE HEADER */}
      <section className="px-6 lg:px-8" id="menu">
        <div className="mx-auto max-w-7xl text-center">
          <FadeUp>
            <h1 className="text-5xl font-extrabold tracking-tight text-text-primary sm:text-6xl">
              Our Full Menu
            </h1>
          </FadeUp>
          
          <FadeUp delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">
              From traditional Ethiopian dishes to modern café classics. 
              Everything is crafted fresh to order.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* STEP 2: CATEGORY FILTER BAR */}
      <section className="sticky top-20 z-40 mt-12 border-b border-border bg-background/80 px-6 py-4 backdrop-blur-xl lg:px-8">
        <FadeUp delay={0.2} className="mx-auto flex max-w-7xl gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-button px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-accent text-white shadow-md shadow-accent/30"
                    : "bg-background-secondary text-text-secondary hover:bg-border/50 hover:text-text-primary"
                }`}
              >
                {category}
              </button>
            );
          })}
        </FadeUp>
      </section>

      {/* STEP 3: ANIMATED MENU GRID */}
      <section className="px-6 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Key forces the animation to re-trigger when category changes */}
          <StaggerContainer key={activeCategory} className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            
            {filteredMenu.map((item) => (
              <StaggerItem
                key={item.name}
                className="group overflow-hidden rounded-card border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col"
              >
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Optional Badge */}
                  {item.badge && (
                    <div className="absolute left-4 top-4 rounded-button bg-background px-3 py-1 text-xs font-bold text-accent shadow-sm">
                      {item.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
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

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <Star className="h-4 w-4 fill-accent text-accent" />
                  </div>

                  <button className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent transition-all duration-200 group-hover:gap-3">
                    Add to Order
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </StaggerItem>
            ))}

            {/* Empty State if a category somehow has no items */}
            {filteredMenu.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <p className="text-lg font-medium text-text-secondary">
                  No items found in this category.
                </p>
              </div>
            )}

          </StaggerContainer>
        </div>
      </section>
      
    </main>
  );
}