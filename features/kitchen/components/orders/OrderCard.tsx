"use client";

import { Clock3, NotebookPen } from "lucide-react";

import {
  Button,
  Card,
  DropdownMenu,
  StatusBadge,
} from "@/components/ui";

import { Order } from "@/types";

type OrderCardProps = {
  order: Order;
};

export default function OrderCard({
  order,
}: OrderCardProps) {
  return (
    <Card className="order-card">

      {/* Header */}

      <div className="order-header">

        <div>
          <h3 className="heading-3">
            {order.table}
          </h3>

          <p className="caption text-secondary">
            Order {order.id}
          </p>
        </div>

        <div className="order-header-right">

          <StatusBadge status={order.status} />

          <DropdownMenu />

        </div>

      </div>

      <div className="divider" />

      {/* Items */}

      <div className="order-items">

        {order.items.map((item) => (
          <div
            key={item.name}
            className="order-item"
          >
            <span>{item.name}</span>

            <strong>x{item.quantity}</strong>
          </div>
        ))}

      </div>

      <div className="divider" />

      {/* Footer */}

      <div className="order-footer">

        <div className="order-info">

          <div className="order-time">
            <Clock3 size={16} />

            <span>{order.time}</span>
          </div>

          {order.note && (
            <div className="order-note">
              <NotebookPen size={16} />

              <span>{order.note}</span>
            </div>
          )}

        </div>

        <Button
          className="order-button"
          fullWidth
        >
          {order.status === "New"
            ? "Start Preparing"
            : order.status === "Preparing"
            ? "Mark Ready"
            : "Complete Order"}
        </Button>

      </div>

    </Card>
  );
}