"use client";
import { useState } from "react";
import { OrderStatus, OrderType } from "@prisma/client";
import { Utensils, ShoppingBag, Truck, Clock, CheckCircle, ChefHat } from "lucide-react";
import { updateOrderStatus } from "@/features/kitchen/actions/update-status";

type OrderCardProps = {
  order: {
    id: string;
    status: OrderStatus;
    type: OrderType;
    createdAt: Date;
    table: { number: number } | null;
    customerName: string | null;
    items: { id: string; name: string; quantity: number }[];
  };
};

const ORDER_TYPE_META: Record<OrderType, { label: string; icon: any; color: string }> = {
  DINE_IN: { label: "Dine-in", icon: Utensils, color: "bg-blue-500/10 text-blue-500" },
  TAKEAWAY: { label: "Takeaway", icon: ShoppingBag, color: "bg-purple-500/10 text-purple-500" },
  DELIVERY: { label: "Delivery", icon: Truck, color: "bg-emerald-500/10 text-emerald-500" },
};

export default function OrderCard({ order }: OrderCardProps) {
  const [loading, setLoading] = useState(false);
  const typeMeta = ORDER_TYPE_META[order.type];
  const TypeIcon = typeMeta?.icon || Utensils;

  const handleNextStatus = async () => {
    setLoading(true);
    let nextStatus: OrderStatus = "PREPARING";
    if (order.status === "PENDING") nextStatus = "PREPARING";
    else if (order.status === "PREPARING") nextStatus = "DELIVERED";
    else if (order.status === "DELIVERED") nextStatus = "PAID";

    await updateOrderStatus(order.id, nextStatus);
    setLoading(false);
  };

  const timeFormatted = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(order.createdAt));

  const subject = order.table ? `Table ${order.table.number}` : order.customerName ?? typeMeta.label;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-background p-5 shadow-sm transition-all hover:shadow-md">
      <div>
        {/* Header Metadata */}
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <div className="flex items-center gap-2">
            <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${typeMeta.color}`}>
              <TypeIcon size={16} />
            </span>
            <div>
              <h4 className="font-display text-sm font-bold text-text-primary">{subject}</h4>
              <span className="text-[10px] text-text-secondary">ID: {order.id.slice(-6).toUpperCase()}</span>
            </div>
          </div>
          <span className="rounded-full bg-background-secondary px-2.5 py-1 text-[10px] font-bold text-text-secondary">
            {order.status}
          </span>
        </div>

        {/* Item List */}
        <div className="my-4 space-y-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <span className="font-medium text-text-primary">{item.name}</span>
              <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent">
                x{item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer & Action Button */}
      <div className="border-t border-border/50 pt-3">
        <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {timeFormatted}
          </span>
          <span>{order.items.reduce((acc, i) => acc + i.quantity, 0)} items</span>
        </div>

        <button
          onClick={handleNextStatus}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent py-5 text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
        >
          {order.status === "PENDING" && <><ChefHat size={14} /> Start Preparing</>}
          {order.status === "PREPARING" && <><CheckCircle size={14} /> Mark Ready / Delivered</>}
          {order.status === "DELIVERED" && <><CheckCircle size={14} /> Close & Mark Paid</>}
        </button>
      </div>
    </div>
  );
}