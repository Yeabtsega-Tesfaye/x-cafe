"use client";

import { useMemo, useState } from "react";

import { orders } from "@/data/orders";

import {
  Button,
  Card,
  SectionHeader,
  Tabs,
} from "@/components/ui";

import OrderCard from "./OrderCard";

const tabs = [
  "All",
  "New",
  "Preparing",
  "Ready",
];

export default function OrdersSection() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredOrders = useMemo(() => {
    if (activeTab === "All") {
      return orders;
    }

    return orders.filter(
      (order) => order.status === activeTab
    );
  }, [activeTab]);

  const visibleOrders = filteredOrders.slice(0, 3);

  const remainingOrders =
    filteredOrders.length - visibleOrders.length;

  return (
    <Card className="orders-section">
      <SectionHeader
        title="Current Orders"
        subtitle={`${filteredOrders.length} Active Orders`}
        action={
          <Button variant="ghost">
            View All
          </Button>
        }
      />

      <Tabs
        tabs={tabs}
        active={activeTab}
        onChange={setActiveTab}
      />

      <div className="orders-list">
        {visibleOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))}
      </div>

      {remainingOrders > 0 && (
        <div className="orders-footer">
          <Button variant="secondary">
            View {remainingOrders} More{" "}
            {remainingOrders === 1
              ? "Order"
              : "Orders"}
          </Button>
        </div>
      )}
    </Card>
  );
}