"use client";

import { Clock3, UtensilsCrossed, CheckCircle2, Flame } from "lucide-react";
import { OrderStatus } from "@prisma/client";
import StatCard from "./StatCard";

// We only need the properties required for our math
type KitchenOrder = {
  status: OrderStatus;
  items: { quantity: number }[];
};

export default function StatsSection({ orders }: { orders: KitchenOrder[] }) {
  // 1. Calculate pipeline bottlenecks
  const pending = orders.filter((o) => o.status === "PENDING").length;
  const preparing = orders.filter((o) => o.status === "PREPARING").length;
  const ready = orders.filter((o) => o.status === "DELIVERED").length;

  // 2. Calculate the total volume of food (e.g., 3 orders of 2 items each = 6 plates to cook)
  const itemsToCook = orders
    .filter((o) => o.status === "PENDING" || o.status === "PREPARING")
    .reduce((acc, order) => {
      return acc + order.items.reduce((sum, item) => sum + item.quantity, 0);
    }, 0);

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        title="New Orders" 
        value={pending} 
        icon={Clock3} 
        colorTheme="red" 
      />
      <StatCard 
        title="Cooking Now" 
        value={preparing} 
        icon={UtensilsCrossed} 
        colorTheme="amber" 
      />
      <StatCard 
        title="Plates to Cook" 
        value={itemsToCook} 
        icon={Flame} 
        colorTheme="blue" 
      />
      <StatCard 
        title="Ready to Serve" 
        value={ready} 
        icon={CheckCircle2} 
        colorTheme="green" 
      />
    </div>
  );
}