import { prisma } from "@/lib/prisma";
import { $Enums } from "@prisma/client";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { ClipboardList, Search, Utensils, ShoppingBag, Truck, CheckCircle2, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

const ORDER_TYPE_ICONS: Record<$Enums.OrderType, any> = {
  DINE_IN: Utensils,
  TAKEAWAY: ShoppingBag,
  DELIVERY: Truck,
};

const STATUS_COLORS: Record<$Enums.OrderStatus, string> = {
  PENDING: "bg-red-500/10 text-red-500",
  PREPARING: "bg-amber-500/10 text-amber-500",
  DELIVERED: "bg-green-500/10 text-green-500",
  PAID: "bg-blue-500/10 text-blue-500",
};

export default async function AllOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { table: true, items: true },
  });

  return (
        <RoleGuard allowedRoles={["admin","manager","chef","kitchen","cashier"]}>
    <div className="min-h-screen bg-background-secondary p-4 md:p-8 pt-28">
      <div className="mx-auto max-w-7xl rounded-3xl border border-border/50 bg-background p-6 shadow-sm">
        
        {/* Header Section */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-text-primary">All Cafe Orders</h2>
            <p className="text-sm text-text-secondary">Complete ledger of live and past orders</p>
          </div>
          <span className="rounded-full bg-accent/10 px-3.5 py-1.5 text-xs font-bold text-accent w-fit">
            {orders.length} Total Recorded
          </span>
        </div>

        {/* Orders Table Container */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
            <ClipboardList className="h-10 w-10 text-text-secondary mb-2" />
            <p className="font-display text-lg font-bold text-text-primary">No orders recorded yet</p>
            <p className="text-sm text-text-secondary">Orders placed by customers will appear here automatically.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-xs font-bold uppercase text-text-secondary">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Type / Destination</th>
                  <th className="py-3 px-4">Items Summary</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-sm">
                {orders.map((order) => {
                  const TypeIcon = ORDER_TYPE_ICONS[order.type] || Utensils;
                  const shortId = order.id.slice(-6).toUpperCase();
                  const targetLabel = order.table ? `Table ${order.table.number}` : order.customerName ?? order.type;
                  const timeFormatted = new Intl.DateTimeFormat("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  }).format(new Date(order.createdAt));

                  return (
                    <tr key={order.id} className="transition-colors hover:bg-background-secondary/50">
                      <td className="py-4 px-4 font-mono font-bold text-text-primary">#{shortId}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                            <TypeIcon size={14} />
                          </span>
                          <span className="font-semibold text-text-primary">{targetLabel}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-text-secondary">
                        {order.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                      </td>
                      <td className="py-4 px-4 font-bold text-accent">ETB {order.total.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_COLORS[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs text-text-secondary">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {timeFormatted}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
    </RoleGuard>
  );
}