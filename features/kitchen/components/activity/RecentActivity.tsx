"use client";
import { Bell, ChefHat, CheckCircle2, Receipt } from "lucide-react";
import { OrderStatus, OrderType } from "@prisma/client";

type KitchenOrder = {
  id: string;
  status: OrderStatus;
  type: OrderType;
  updatedAt: Date;
  table: { number: number } | null;
  customerName: string | null;
  items: { quantity: number }[];
};

const ORDER_TYPE_LABEL: Record<OrderType, string> = {
  DINE_IN: "Dine-in",
  TAKEAWAY: "Takeaway",
  DELIVERY: "Delivery",
};

export default function RecentActivity({ orders }: { orders: KitchenOrder[] }) {
  const recentActivities = [...orders]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

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
<div className="flex max-h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-3xl border border-border/50 bg-background shadow-sm">
    <div className="flex items-center justify-between border-b border-border/50 p-6">
        <div>
          <h2 className="font-display text-lg font-bold text-text-primary">Recent Activity</h2>
          <p className="text-sm text-text-secondary">Live kitchen updates</p>
        </div>
      </div>
      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        {recentActivities.length === 0 ? (
          <p className="text-center text-sm text-text-secondary">No recent activity.</p>
        ) : (
          recentActivities.map((order) => {
            const meta = getActivityMeta(order.status);
            const Icon = meta.icon;

            const time = new Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "numeric",
            }).format(new Date(order.updatedAt));

            const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

            // Falls back to customer name, then order type, when there's no
            // table — matches the same nullable-table handling as OrderCard.
            const subject = order.table
              ? `Table ${order.table.number}`
              : order.customerName ?? ORDER_TYPE_LABEL[order.type];

            return (
              <div key={order.id} className="flex gap-4">
                <div
                  className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${meta.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-text-primary">
                      {meta.title} <span className="font-medium text-text-secondary">· {subject}</span>
                    </h4>
                    <span className="shrink-0 text-xs font-medium text-text-secondary">{time}</span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    {meta.description} ({totalItems} {totalItems === 1 ? "item" : "items"})
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