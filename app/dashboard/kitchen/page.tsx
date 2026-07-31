import { prisma } from "@/lib/prisma";
import OrdersBoard from "@/features/kitchen/components/orders/OrdersBoard";
import StatsSection from "@/features/kitchen/components/stats/StatsSection";
import RecentActivity from "@/features/kitchen/components/activity/RecentActivity";

export const dynamic = "force-dynamic"; // Ensures the page never caches stale data

export default async function KitchenDashboardRoute() {
  // Fetch active orders. Prisma includes `updatedAt` by default on all records!
  const orders = await prisma.order.findMany({
    where: { 
      status: { not: "PAID" } 
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
    <div className="min-h-screen bg-background-secondary p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Top Row: Live Stats Calculator */}
        <StatsSection orders={orders} />
        
        {/* Bottom Row: Asymmetric Grid Layout */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
          
          {/* Main Board takes up 75% of the screen on desktop */}
          <div className="lg:col-span-3">
            <OrdersBoard initialOrders={orders} />
          </div>
          
          {/* Activity Feed takes up the remaining 25% sidebar */}
          <div className="lg:col-span-1">
            <RecentActivity orders={orders} />
          </div>
          
        </div>
      </div>
    </div>
  );
}