"use client";
import { Receipt, CheckCircle2, XCircle, Clock } from "lucide-react";

type CashierOrder = {
  id: string;
  paymentStatus: string;
  paymentMethod: string;
  updatedAt: Date;
  table: { number: number } | null;
  customerName: string | null;
  total: number;
};

export default function CashierRecentActivity({ orders }: { orders: CashierOrder[] }) {
  // Sort by updatedAt to ensure the most recently acted-upon orders are at the top
  const recentActivities = [...orders]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const getActivityMeta = (status: string) => {
    switch (status) {
      case "VERIFICATION_REQUIRED":
        return {
          title: "Verification Needed",
          description: "New receipt uploaded",
          icon: Receipt,
          color: "bg-amber-500/10 text-amber-500",
        };
      case "PAID":
        return {
          title: "Payment Approved",
          description: "Transaction verified",
          icon: CheckCircle2,
          color: "bg-green-500/10 text-green-500",
        };
      case "REJECTED":
        return {
          title: "Payment Rejected",
          description: "Receipt marked as invalid",
          icon: XCircle,
          color: "bg-red-500/10 text-red-500",
        };
      default:
        return {
          title: "Order Updated",
          description: "Status changed",
          icon: Clock,
          color: "bg-blue-500/10 text-blue-500",
        };
    }
  };

  return (
    <div className="flex max-h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-3xl border border-border/50 bg-background shadow-sm">
      <div className="flex items-center justify-between border-b border-border/50 p-6">
        <div>
          <h2 className="font-display text-lg font-bold text-text-primary">Recent Activity</h2>
          <p className="text-sm text-text-secondary">Live payment updates</p>
        </div>
      </div>
      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        {recentActivities.length === 0 ? (
          <p className="text-center text-sm text-text-secondary">No recent activity.</p>
        ) : (
          recentActivities.map((order) => {
            const meta = getActivityMeta(order.paymentStatus);
            const Icon = meta.icon;

            const time = new Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "numeric",
            }).format(new Date(order.updatedAt));

            const subject = order.table
              ? `Table ${order.table.number}`
              : order.customerName ?? "Customer";

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
                    {meta.description} (ETB {order.total.toFixed(2)} via {order.paymentMethod})
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