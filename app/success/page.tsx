import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StatusView } from "@/features/orders/components/StatusView";

export default async function GlobalSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  if (!orderId) {
    notFound();
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { table: true, items: true },
  });

  // Security check: We ONLY 404 if the order doesn't exist in the database.
  // We DO NOT check for a table, because Takeaway/Delivery orders don't have them!
  if (!order) {
    notFound();
  }

  return (
    <StatusView
      order={{
        id: order.id,
        total: order.total,
        type: order.type,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        deliveryAddress: order.deliveryAddress,
        // Safely pass the table if it exists, otherwise pass null
        table: order.table ? { id: order.table.id, number: order.table.number } : null,
        items: order.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      }}
    />
  );
}