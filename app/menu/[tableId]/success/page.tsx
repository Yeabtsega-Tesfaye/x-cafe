import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { StatusView } from "@/features/orders/components/StatusView";

export default async function SuccessRoute({
  params,
  searchParams,
}: {
  params: Promise<{ tableId: string }>;
  searchParams: Promise<{ orderId: string }>;
}) {
  // In Next.js 16, both dynamic route params AND searchParams (query strings) must be awaited
  const { tableId } = await params;
  const { orderId } = await searchParams;

  if (!orderId) {
    notFound(); // No order ID provided in the URL
  }

  // Fetch the order, explicitly including the nested table and items data
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      table: true,
      items: true,
    },
  });

  // Security check: Make sure the order actually belongs to this table
  if (!order || order.tableId !== tableId) {
    notFound(); 
  }

  return <StatusView order={order} />;
}