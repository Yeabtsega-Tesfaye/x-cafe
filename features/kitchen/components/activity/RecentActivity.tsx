"use client";

import { Bell, ChefHat, CheckCircle2, Receipt } from "lucide-react";
import { OrderStatus } from "@prisma/client";

// Define the shape of the data we need from Prisma
type KitchenOrder = {
  id: string;
  status: OrderStatus;
  updatedAt: Date;
  table: { number: number };
  items: { quantity: number }[];
};

export default function RecentActivity({ orders }: { orders: KitchenOrder[] }) {
  // 1. Sort the orders by most recently updated and grab the top 5
  const recentActivities = [...orders]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  // 2. Map database states to UI logic
  const getActivityMeta = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return {
          title: "New Order",
          description: "Just sent to the kitchen",
          icon: Bell,
          color: "bg-red-500/10 text-red-500",
        };
      case "PREPARING":
        return {
          title: "Cooking Started",
          description: "Chef is preparing the order",
          icon: ChefHat,
          color: "bg-amber-500/10 text-amber-500",
        };
      case "DELIVERED":
        return {
          title: "Order Ready",
          description: "Waiting for waiter to serve",
          icon: CheckCircle2,
          color: "bg-green-500/10 text-green-500",
        };
      case "PAID":
        return {
          title: "Order Complete",
          description: "Table has paid",
          icon: Receipt,
          color: "bg-blue-500/10 text-blue-500",
        };
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/50 bg-background shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 p-6">
        <div>
          <h2 className="font-display text-lg font-bold text-text-primary">Recent Activity</h2>
          <p className="text-sm text-text-secondary">Live kitchen updates</p>
        </div>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {recentActivities.length === 0 ? (
          <p className="text-center text-sm text-text-secondary">No recent activity.</p>
        ) : (
          recentActivities.map((order) => {
            const meta = getActivityMeta(order.status);
            const Icon = meta.icon;
            
            // Format time (e.g., "4:32 PM")
            const time = new Intl.DateTimeFormat('en-US', {
              hour: 'numeric',
              minute: 'numeric',
            }).format(new Date(order.updatedAt));

            // Calculate total items for context
            const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

            return (
              <div key={order.id} className="flex gap-4">
                {/* Icon Column */}
                <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${meta.color}`}>
                  <Icon className="h-5 w-5" />
                </div>

                {/* Content Column */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-text-primary">
                      {meta.title} <span className="font-medium text-text-secondary">· Table {order.table.number}</span>
                    </h4>
                    <span className="shrink-0 text-xs font-medium text-text-secondary">{time}</span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    {meta.description} ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}