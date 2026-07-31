"use client";

import { useTransition } from "react";
import { Clock3, UtensilsCrossed, CheckCircle2, Loader2 } from "lucide-react";
import { OrderStatus } from "@prisma/client";
import { updateOrderStatus } from "../../actions/update-status";

// 1. Define the exact shape of the data coming from Prisma
type KitchenOrder = {
  id: string;
  status: OrderStatus;
  createdAt: Date;
  table: { number: number };
  items: { id: string; name: string; quantity: number }[];
};

export default function OrderCard({ order }: { order: KitchenOrder }) {
  const [isPending, startTransition] = useTransition();

  // 2. Map the database enums to human-readable UI logic
  const statusConfig = {
    PENDING: {
      label: "New Order",
      color: "bg-red-100 text-red-700 border-red-200",
      nextAction: "Start Preparing",
      nextStatus: OrderStatus.PREPARING,
      icon: Clock3,
    },
    PREPARING: {
      label: "Cooking",
      color: "bg-amber-100 text-amber-700 border-amber-200",
      nextAction: "Mark Ready",
      nextStatus: OrderStatus.DELIVERED,
      icon: UtensilsCrossed,
    },
    DELIVERED: {
      label: "Served",
      color: "bg-blue-100 text-blue-700 border-blue-200",
      nextAction: "Close & Pay",
      nextStatus: OrderStatus.PAID,
      icon: CheckCircle2,
    },
    PAID: {
      label: "Completed",
      color: "bg-green-100 text-green-700 border-green-200",
      nextAction: null,
      nextStatus: null,
      icon: CheckCircle2,
    },
  };

  const current = statusConfig[order.status];
  const Icon = current.icon;
  
  // Format the Prisma DateTime to "4:30 PM"
  const timeFormatted = new Intl.DateTimeFormat('en-US', { 
    hour: 'numeric', minute: 'numeric' 
  }).format(new Date(order.createdAt));

  const handleStatusUpdate = () => {
    if (!current.nextStatus) return;
    startTransition(async () => {
      await updateOrderStatus(order.id, current.nextStatus as OrderStatus);
    });
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm transition-all hover:shadow-md">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 bg-background-secondary/30 p-4">
        <div>
          <h3 className="font-display text-lg font-bold text-text-primary">
            Table {order.table.number}
          </h3>
          <p className="text-xs text-text-secondary">
            ID: {order.id.slice(-6).toUpperCase()}
          </p>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${current.color}`}>
          <Icon className="h-3.5 w-3.5" />
          {current.label}
        </span>
      </div>

      {/* Items List */}
      <div className="flex-1 p-4 space-y-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-start justify-between text-sm">
            <span className="font-medium text-text-primary">{item.name}</span>
            <strong className="rounded-md bg-background-secondary px-2 py-0.5 text-text-primary">
              x{item.quantity}
            </strong>
          </div>
        ))}
      </div>

      {/* Footer & Action */}
      <div className="border-t border-border/50 bg-background p-4">
        <div className="mb-4 flex items-center text-xs font-medium text-text-secondary">
          <Clock3 className="mr-1.5 h-4 w-4" />
          Ordered at {timeFormatted}
        </div>

        {current.nextAction && (
          <button
            onClick={handleStatusUpdate}
            disabled={isPending}
            className="flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white transition-transform active:scale-95 disabled:opacity-70 disabled:active:scale-100"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              current.nextAction
            )}
          </button>
        )}
      </div>
    </div>
  );
}