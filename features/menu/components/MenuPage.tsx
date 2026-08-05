"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  LayoutGrid,
  Rows3,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/FadeUp";
import { CATEGORIES, FULL_MENU } from "@/data/menu";
import { useCartStore } from "@/features/orders/store/useCartStore";

type ViewMode = "grid" | "list";
interface MenuPageProps {
  tableNumber?: number;
  tableId?: string;
}

export function MenuPage({ tableNumber, tableId }: MenuPageProps) {
  const addItem = useCartStore((state) => state.addItem);

  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // NEW: State to track selected sizes per item (maps item.name -> selected size)
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const filteredMenu = FULL_MENU.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const parsePrice = (priceStr: string) => {
    return parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  };

  // NEW: Helper to update the selected size for a specific item
  const handleSizeSelect = (itemName: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [itemName]: size }));
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      {/* Page header */}
      <section className="px-6 lg:px-8" id="menu">
        <div className="mx-auto max-w-7xl text-center">
          <FadeUp>
            <h1 className="text-5xl font-extrabold tracking-tight text-text-primary sm:text-6xl">
              {tableNumber ? `Table ${tableNumber} Menu` : "Our Full Menu"}
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

      {/* Search + filter toggle + view toggle */}
      <section className="mt-12 border-b border-border bg-background px-6 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the menu..."
                className="w-full rounded-button border border-border bg-background-secondary py-2.5 pl-16 pr-4 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Filter toggle */}
              <button
                onClick={() => setIsFilterOpen((v) => !v)}
                aria-expanded={isFilterOpen}
                className={`relative flex items-center rounded-button border p-1 text-sm font-bold transition-colors ${
                  isFilterOpen
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-background-secondary text-text-secondary hover:text-text-primary"
                }`}
              >
                <SlidersHorizontal className="h-3 w-3" />
                Filters
                {activeCategory !== "All" && !isFilterOpen && (
                  <span className="absolute -right-1 -top-1 h-2 w-2.5 rounded-full bg-accent ring-2 ring-background" />
                )}
              </button>

              {/* Grid / List toggle */}
              <div className="flex shrink-0 items-center gap-1 rounded-button border border-border bg-background-secondary p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}
                  className={`flex h-9 w-9 items-center justify-center rounded-button transition-colors ${
                    viewMode === "grid"
                      ? "bg-background text-accent shadow-sm"
                      : "text-text-secondary"
                  }`}
                >
                  <LayoutGrid className="h-3 w-3" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}
                  className={`flex h-9 w-9 items-center justify-center rounded-button transition-colors ${
                    viewMode === "list"
                      ? "bg-background text-accent shadow-sm"
                      : "text-text-secondary"
                  }`}
                >
                  <Rows3 className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Visible reminder of the active filter */}
          {!isFilterOpen && activeCategory !== "All" && (
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-button bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent">
                {activeCategory}
                <button
                  onClick={() => setActiveCategory("All")}
                  aria-label="Clear filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            </div>
          )}

          {/* Expandable category panel */}
          <AnimatePresence initial={false}>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-3">
                  {CATEGORIES.map((category) => {
                    const isActive = activeCategory === category;
                    return (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`whitespace-nowrap rounded-button px-5 py-2 text-sm font-bold transition-all duration-200 ${
                          isActive
                            ? "bg-accent text-white shadow-md shadow-accent/30"
                            : "bg-background-secondary text-text-secondary hover:bg-border/50 hover:text-text-primary"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Menu items */}
      <section className="px-6 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {filteredMenu.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-medium text-text-secondary">
                {searchQuery
                  ? `No items match "${searchQuery}".`
                  : "No items found in this category."}
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <StaggerContainer
              key={`grid-${activeCategory}-${searchQuery}`}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredMenu.map((item: any) => {
                // NEW: Default to the first size if item has sizes but none is selected yet
                const activeSize = selectedSizes[item.name] || (item.sizes ? item.sizes[0] : null);

                return (
                  <StaggerItem
                    key={item.name}
                    className={`group flex flex-col overflow-hidden rounded-card border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      item.badge ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-48">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {item.badge && (
                        <div className="absolute left-3 top-3 rounded-button bg-background px-3 py-1 text-xs font-bold text-accent shadow-sm">
                          {item.badge}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-text-secondary">
                          {item.category}
                        </span>
                        <span className="font-bold text-accent">
                          {item.price}
                        </span>
                      </div>

                      <h3 className="mt-2 text-base font-bold text-text-primary sm:text-lg">
                        {item.name}
                      </h3>

                      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-text-secondary">
                        {item.description}
                      </p>

                      {/* NEW: Size Pills for Grid View */}
                      {item.sizes && item.sizes.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.sizes.map((size: string) => {
                            const isSelected = activeSize === size;
                            return (
                              <button
                                key={size}
                                onClick={() => handleSizeSelect(item.name, size)}
                                className={`rounded-button px-3 py-1 text-xs font-bold transition-all ${
                                  isSelected
                                    ? "bg-accent text-white shadow-sm"
                                    : "bg-background-secondary text-text-secondary hover:bg-border/50 hover:text-text-primary"
                                }`}
                              >
                                {size}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      <button
                        onClick={() =>
                          addItem({
                            // Append size to ID and Name so different sizes don't overlap in the cart
                            id: activeSize ? `${item.name}-${activeSize}` : item.name,
                            name: activeSize ? `${item.name} (${activeSize})` : item.name,
                            price: parsePrice(item.price),
                          })
                        }
                        className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-bold text-accent transition-all duration-200 group-hover:gap-2.5"
                      >
                        Add to Order
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          ) : (
            <StaggerContainer
              key={`list-${activeCategory}-${searchQuery}`}
              className="flex flex-col gap-3"
            >
              {filteredMenu.map((item: any) => {
                // NEW: Default to the first size if item has sizes but none is selected yet
                const activeSize = selectedSizes[item.name] || (item.sizes ? item.sizes[0] : null);

                return (
                  <StaggerItem
                    key={item.name}
                    className="group flex flex-col justify-between rounded-card border border-border bg-background p-3 shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row sm:items-center sm:gap-6 sm:p-4"
                  >
                    <div className="flex gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-button sm:h-20 sm:w-20">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1 sm:hidden">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="truncate text-sm font-bold text-text-primary sm:text-base">
                            {item.name}
                          </h3>
                          <span className="shrink-0 font-bold text-accent">
                            {item.price}
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-1 text-xs text-text-secondary sm:text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="hidden min-w-0 flex-1 sm:block">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate text-sm font-bold text-text-primary sm:text-base">
                          {item.name}
                        </h3>
                        <span className="shrink-0 font-bold text-accent">
                          {item.price}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-xs text-text-secondary sm:text-sm">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4 sm:mt-0 sm:shrink-0">
                      {/* NEW: Size Pills for List View */}
                      {item.sizes && item.sizes.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.sizes.map((size: string) => {
                            const isSelected = activeSize === size;
                            return (
                              <button
                                key={size}
                                onClick={() => handleSizeSelect(item.name, size)}
                                className={`rounded-button px-2.5 py-1 text-xs font-bold transition-all ${
                                  isSelected
                                    ? "bg-accent text-white shadow-sm"
                                    : "bg-background-secondary text-text-secondary hover:bg-border/50 hover:text-text-primary"
                                }`}
                              >
                                {size.charAt(0)} {/* Truncated to first letter (S, M, L) in list view to save space */}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      <button
                        onClick={() =>
                          addItem({
                            // Append size to ID and Name so different sizes don't overlap in the cart
                            id: activeSize ? `${item.name}-${activeSize}` : item.name,
                            name: activeSize ? `${item.name} (${activeSize})` : item.name,
                            price: parsePrice(item.price),
                          })
                        }
                        aria-label={`Add ${item.name} to order`}
                        className="shrink-0 rounded-button bg-accent px-4 py-2 text-xs font-bold text-white transition-colors hover:brightness-95 sm:text-sm active:scale-95"
                      >
                        Add
                      </button>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>
    </div>
  );
}