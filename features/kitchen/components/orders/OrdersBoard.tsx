"use client";
import { useMemo, useState } from "react";
import { OrderStatus } from "@prisma/client";
import OrderCard from "./OrderCard";

// Kept in sync with OrderCard's type — table is nullable because takeaway
// and delivery orders genuinely have no table.
type KitchenOrder = {
  id: string;
  status: OrderStatus;
  createdAt: Date;
  table: { number: number } | null;
  items: { id: string; name: string; quantity: number }[];
};

const tabs = ["ALL", "PENDING", "PREPARING", "DELIVERED"];

export default function OrdersBoard({ initialOrders }: { initialOrders: KitchenOrder[] }) {
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredOrders = useMemo(() => {
    const activeOnly = initialOrders.filter((order) => order.status !== "PAID");
    if (activeTab === "ALL") return activeOnly;
    return activeOnly.filter((order) => order.status === activeTab);
  }, [activeTab, initialOrders]);

  return (
    <div className="rounded-3xl border border-border/50 bg-background p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">Kitchen Display System</h2>
          <p className="text-text-secondary">{filteredOrders.length} active orders requiring attention</p>
        </div>
      </div>

      <div className="mb-8 flex w-fit flex-wrap gap-2 rounded-2xl bg-background-secondary/50 p-1.5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
              activeTab === tab
                ? "bg-background text-text-primary shadow-sm"
                : "text-text-secondary hover:bg-background/50 hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
          <p className="font-display text-lg font-bold text-text-primary">No orders found</p>
          <p className="text-sm text-text-secondary">The kitchen is all caught up!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}