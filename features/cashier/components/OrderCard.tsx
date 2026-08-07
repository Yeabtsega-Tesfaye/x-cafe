import { verifyPayment } from "@/features/kitchen/actions/verify-payment";
import { ReceiptImage } from "@/components/ui/ReceiptImage";

// Update these types to match your Prisma schema if needed
type CashierOrder = {
  id: string;
  paymentStatus: string;
  total: number;
  paymentMethod: string;
  customerName: string | null;
  table: { number: number } | null;
  receiptUrl: string | null;
  items: { id: string; name: string; quantity: number }[];
};

export default function CashierOrderCard({ order }: { order: CashierOrder }) {
  const isPending = order.paymentStatus === "VERIFICATION_REQUIRED";

  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-2xl border border-border/40 bg-background-secondary/30 p-4 shadow-sm transition-all hover:border-border/80 xl:flex-row xl:items-start">
      {order.receiptUrl && <ReceiptImage src={order.receiptUrl} />}

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold text-text-primary">
              {order.table ? `Table ${order.table.number}` : order.customerName ?? "Customer"}
              <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent">
                {order.paymentMethod}
              </span>
            </h3>
            <span className="font-bold text-text-primary">ETB {order.total.toFixed(2)}</span>
          </div>

          <ul className="mt-3 space-y-1 text-sm text-text-secondary">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-start">
                <span className="mr-2 font-medium text-text-primary">{item.quantity}x</span> 
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Area: Show buttons if pending, otherwise show status badge */}
        <div className="mt-5">
          {isPending ? (
            <div className="flex gap-2">
              <form action={verifyPayment.bind(null, order.id, "PAID")} className="flex-1">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:brightness-110 active:scale-95"
                >
                  Confirm
                </button>
              </form>
              <form action={verifyPayment.bind(null, order.id, "REJECTED")} className="flex-1">
                <button
                  type="submit"
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-bold text-text-secondary transition-all hover:bg-background-secondary active:scale-95"
                >
                  Reject
                </button>
              </form>
            </div>
          ) : (
            <div className={`inline-flex items-center rounded-lg px-3 py-1 text-xs font-bold ${
              order.paymentStatus === "PAID" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
            }`}>
              {order.paymentStatus === "PAID" ? "✓ Verified & Paid" : "✕ Payment Rejected"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}