import { prisma } from "@/lib/prisma";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import CashierBoard from "@/features/cashier/components/CashierBoard";

export const dynamic = "force-dynamic";

export default async function PaymentVerificationRoute() {
  // Fetch the last 50 orders to populate the board and activity feed
  const orders = await prisma.order.findMany({
    take: 50,
    orderBy: { createdAt: "desc" }, // Newest first!
    include: { table: true, items: true },
  });

  return(
    <>
      <RoleGuard allowedRoles={["admin","manager","cashier"]}>
        <CashierBoard initialOrders={orders} />;
      </RoleGuard>

    </>
  )
}