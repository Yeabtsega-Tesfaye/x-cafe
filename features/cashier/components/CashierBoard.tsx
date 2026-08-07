"use client";

import { useMemo, useState } from "react";
import CashierOrderCard from "./OrderCard";
import CashierStats from "./stats/CashierStats";
import RecentActivity from "@/features/cashier/components/activity/RecentActivity";

const tabs = [
  { id: "VERIFICATION_REQUIRED", label: "Needs Verification" },
  { id: "PAID", label: "Approved" },
  { id: "REJECTED", label: "Rejected" },
  { id: "ALL", label: "All Payments" },
];

export default function CashierBoard({ initialOrders }: { initialOrders: any[] }) {
  const [activeTab, setActiveTab] = useState("VERIFICATION_REQUIRED");

  // Filter orders based on the selected tab
  const filteredOrders = useMemo(() => {
    if (activeTab === "ALL") return initialOrders;
    return initialOrders.filter((order) => order.paymentStatus === activeTab);
  }, [activeTab, initialOrders]);

  return (
    <div className="p-4 md:p-8">
        <CashierStats orders={initialOrders} />

    <div className="flex flex-col gap-6 lg:flex-row lg:items-start p-4">
      
      {/* Main Board Area (Left Side) */}
      <div className="flex-1 rounded-3xl border border-border/50 bg-background p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-text-primary">
              Payment Verification
            </h1>
            <p className="text-text-secondary">
              {filteredOrders.length} {activeTab === "VERIFICATION_REQUIRED" ? "awaiting review" : "records found"}
            </p>
          </div>
        </div>

        {/* Filtering Tabs */}
        <div className="mb-8 flex w-full overflow-x-auto rounded-2xl bg-background-secondary/50 p-1.5 sm:w-fit [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-background text-text-primary shadow-sm"
                  : "text-text-secondary hover:bg-background/50 hover:text-text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Order Grid */}
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
            <p className="font-display text-lg font-bold text-text-primary">Nothing here</p>
            <p className="text-sm text-text-secondary">No payments match this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
            {filteredOrders.map((order) => (
              <CashierOrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>

      <div className="w-full lg:w-96 shrink-0">
        <RecentActivity orders={initialOrders} />
      </div>
      
    </div>
    </div>
  );
}