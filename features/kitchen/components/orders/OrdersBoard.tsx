"use client";
import { useMemo, useState } from "react";
import { OrderStatus } from "@prisma/client";
import OrderCard from "./OrderCard";

type KitchenOrder = {
  id: string;
  status: OrderStatus;
  type: "DINE_IN" | "TAKEAWAY" | "DELIVERY"; 
  customerName: string | null;               
  deliveryAddress: string | null;
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
    <div className="rounded-2xl border border-border/50 bg-background p-4 shadow-sm sm:rounded-3xl sm:p-6">
      <div className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          {/* 2. Scaled down text for mobile */}
          <h2 className="font-display text-xl font-bold text-text-primary sm:text-2xl">Kitchen Display System</h2>
          <p className="text-sm text-text-secondary sm:text-base">{filteredOrders.length} active orders requiring attention</p>
        </div>
      </div>

      {/* 3. Swipeable tab row on mobile instead of awkward wrapping */}
      <div className="mb-6 flex w-full overflow-x-auto rounded-xl bg-background-secondary/50 p-1.5 sm:mb-8 sm:w-fit sm:rounded-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs font-bold transition-all sm:rounded-xl sm:text-sm ${
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
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center sm:rounded-2xl sm:py-24">
          <p className="font-display text-base font-bold text-text-primary sm:text-lg">No orders found</p>
          <p className="text-xs text-text-secondary sm:text-sm">The kitchen is all caught up!</p>
        </div>
      ) : (
<div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
  {filteredOrders.map((order) => (
    <OrderCard key={order.id} order={order} />
  ))}
</div>
      )}
    </div>
  );
}