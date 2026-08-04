"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ChefHat, ArrowLeft } from "lucide-react";

type OrderData = {
id: string;
    total: number;
    type: "DINE_IN" | "TAKEAWAY" | "DELIVERY";
    customerName?: string | null;
    customerPhone?: string | null;
    deliveryAddress?: string | null;
    table: { id: string; number: number } | null; // <-- Must allow null
    items: { name: string; quantity: number; price: number }[];
};

export function StatusView({ order }: { order: OrderData }) {
  const orderNumber = order.id.slice(-6).toUpperCase();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24">
      <div className="w-full max-w-md text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/30"
        >
          <Check className="h-12 w-12 text-white" strokeWidth={3} />
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
<h1 className="text-3xl font-extrabold text-text-primary">Order Sent!</h1>
<p className="text-text-secondary">
  {order.type === "DINE_IN" && order.table
    ? `for Table ${order.table.number}.`
    : order.type === "DELIVERY"
    ? `for Delivery.`
    : `for Takeaway.`}
</p>

          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-background-secondary text-left shadow-sm">
            <div className="flex items-center justify-between border-b border-border/50 bg-background/50 p-4">
              <span className="text-sm font-bold text-text-secondary">Order #{orderNumber}</span>
              <ChefHat className="h-5 w-5 text-accent" />
            </div>

            <div className="space-y-3 p-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="font-medium text-text-primary">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-text-secondary">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between border-t border-border/50 bg-background/50 p-4 font-bold text-text-primary">
              <span>Total</span>
              <span className="text-accent">${order.total.toFixed(2)}</span>
            </div>
          </div>

<Link
  href={order.table ? `/menu/${order.table.id}` : "/menu"}
  className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline"
>
  <ArrowLeft className="h-4 w-4" />
  Back to Menu
</Link>
        </motion.div>
      </div>
    </div>
  );
}