import { prisma } from "@/lib/prisma";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import OrdersBoard from "@/features/kitchen/components/orders/OrdersBoard";
import StatsSection from "@/features/kitchen/components/stats/StatsSection";
import RecentActivity from "@/features/kitchen/components/activity/RecentActivity";

export const dynamic = "force-dynamic"; // Ensures the page never caches stale data

export default async function KitchenDashboardRoute() {
  // Fetch active orders. Prisma includes `updatedAt` by default on all records!
  const orders = await prisma.order.findMany({
where: {
  status: { not: "PAID" },
  paymentStatus: { not: "VERIFICATION_REQUIRED" },
},
    orderBy: { 
      createdAt: "asc" 
    },
    include: { 
      table: true, 
      items: true 
    },
  });

  return (
        <RoleGuard allowedRoles={["chef","kitchen","admin"]}>
    <div className="min-h-screen bg-background-secondary p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Top Row: Live Stats Calculator */}
        <StatsSection orders={orders} />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 xl:gap-8">
          
          {/* Main Board now takes 2/3 of the space (66%) instead of 3/4 */}
          {/* FIX: Changed from lg:col-span-3 to lg:col-span-2 */}
          <div className="lg:col-span-2">
            <OrdersBoard initialOrders={orders} />
          </div>
          
          {/* Activity Feed now takes 1/3 of the space (33%) instead of 1/4 */}
          <div className="self-start sticky top-28 lg:col-span-1">
            <RecentActivity orders={orders} />
          </div>
          
        </div>
      </div>
    </div>
    </RoleGuard>
  );
}