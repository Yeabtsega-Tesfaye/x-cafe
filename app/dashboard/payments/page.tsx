import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { verifyPayment } from "@/features/kitchen/actions/verify-payment";

export const dynamic = "force-dynamic";

export default async function PaymentVerificationRoute() {
  const pendingPayments = await prisma.order.findMany({
    where: { paymentStatus: "VERIFICATION_REQUIRED" },
    orderBy: { createdAt: "asc" },
    include: { table: true, items: true },
  });

  return (
    <div className="min-h-screen bg-background-secondary p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-text-primary">
            Payment Verification
          </h1>
          <p className="text-text-secondary">
            {pendingPayments.length} digital payment{pendingPayments.length === 1 ? "" : "s"} awaiting review
          </p>
        </div>

        {pendingPayments.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
            <p className="font-display text-lg font-bold text-text-primary">All caught up</p>
            <p className="text-sm text-text-secondary">No payments waiting on verification.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {pendingPayments.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-4 overflow-hidden rounded-2xl border border-border/50 bg-background p-4 shadow-sm sm:flex-row sm:items-start"
              >
                {order.receiptUrl && (
                  <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl border border-border sm:h-32 sm:w-32">
                    <Image
                      src={order.receiptUrl}
                      alt="Payment receipt"
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold text-text-primary">
                      {order.table
                        ? `Table ${order.table.number}`
                        : order.customerName ?? "Customer"}
                      <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent">
                        {order.paymentMethod}
                      </span>
                    </h3>
                    <span className="font-bold text-text-primary">ETB {order.total.toFixed(2)}</span>
                  </div>

                  <ul className="mt-2 space-y-0.5 text-sm text-text-secondary">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.quantity}x {item.name}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex gap-2">
                    <form action={verifyPayment.bind(null, order.id, "PAID")}>
                      <button
                        type="submit"
                        className="rounded-xl bg-accent px-4 py-2 text-sm font-bold text-white transition-colors hover:brightness-95"
                      >
                        Confirm Paid
                      </button>
                    </form>
                    <form action={verifyPayment.bind(null, order.id, "REJECTED")}>
                      <button
                        type="submit"
                        className="rounded-xl border border-border px-4 py-2 text-sm font-bold text-text-secondary transition-colors hover:bg-background-secondary"
                      >
                        Reject
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}