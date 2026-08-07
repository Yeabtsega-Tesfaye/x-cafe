import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { 
  TrendingUp, 
  ShoppingBag, 
  ChefHat, 
  AlertCircle, 
  ArrowRight 
} from "lucide-react";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import StatCard from "@/features/cashier/components/stats/StatsCard";
import HourlySalesChart from "@/features/admin/components/analaytics/HourlySalesChart"; // <-- Import the chart!

export const dynamic = "force-dynamic";

export default async function ManagerOverviewRoute() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysOrders = await prisma.order.findMany({
    where: { createdAt: { gte: today } },
    include: { items: true },
  });

  // --- 1. EXISTING STATS MATH ---
  const totalRevenue = todaysOrders
    .filter((o) => o.paymentStatus === "PAID")
    .reduce((sum, o) => sum + o.total, 0);
  
  const totalOrders = todaysOrders.length;
  
  const pendingVerifications = todaysOrders
    .filter((o) => o.paymentStatus === "VERIFICATION_REQUIRED").length;

  const activeKitchenOrders = todaysOrders
    .filter((o) => o.status === "PENDING" || o.status === "PREPARING").length;

  const formattedRevenue = totalRevenue.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // --- 2. NEW CHART DATA PROCESSING ---
  // Create an array representing 24 hours of the day
  const rawHourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, "0")}:00`,
    revenue: 0,
  }));

  // Populate the array with actual revenue from PAID orders
  todaysOrders.forEach((order) => {
    if (order.paymentStatus === "PAID") {
      const orderHour = new Date(order.createdAt).getHours();
      rawHourlyData[orderHour].revenue += order.total;
    }
  });

  // Filter to only show active café hours (6 AM to 10 PM) for a cleaner chart
  const cafeHoursData = rawHourlyData.slice(6, 23);

  return (
        <RoleGuard allowedRoles={["admin","manager"]}>
    <div className="flex flex-col gap-6 p-4 md:p-8">
      
      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today's Revenue" value={`ETB ${formattedRevenue}`} icon={TrendingUp} colorTheme="green" />
        <StatCard title="Total Orders" value={totalOrders} icon={ShoppingBag} colorTheme="blue" />
        <StatCard title="Kitchen Backlog" value={activeKitchenOrders} icon={ChefHat} colorTheme="amber" />
        <StatCard title="Pending Payments" value={pendingVerifications} icon={AlertCircle} colorTheme="red" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Left Column: Hourly Sales Chart */}
        <div className="flex flex-col rounded-3xl border border-border/50 bg-background p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-text-primary">
              Hourly Performance
            </h2>
            <span className="text-sm font-medium text-text-secondary">Today</span>
          </div>
          
          {/* Render the Recharts Component */}
          <HourlySalesChart data={cafeHoursData} />
        </div>

        {/* Right Column: Quick Actions */}
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-border/50 bg-background p-6 shadow-sm">
            <h2 className="mb-4 font-display text-lg font-bold text-text-primary">
              Quick Actions
            </h2>
            
            <div className="flex flex-col gap-3">
              <Link href="/dashboard/payments" className="group flex items-center justify-between rounded-xl bg-background-secondary/50 p-4 transition-all hover:bg-background-secondary">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-text-primary group-hover:text-accent">
                    Verify Payments
                  </span>
                  {pendingVerifications > 0 && (
                    <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white shadow-sm">
                      {pendingVerifications}
                    </span>
                  )}
                </div>
                <ArrowRight className="h-4 w-4 text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </Link>

              <Link href="/dashboard/menu" className="group flex items-center justify-between rounded-xl bg-background-secondary/50 p-4 transition-all hover:bg-background-secondary">
                <span className="font-medium text-text-primary group-hover:text-accent">
                  Manage Menu
                </span>
                <ArrowRight className="h-4 w-4 text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </Link>

              <Link href="/admin/tables" className="group flex items-center justify-between rounded-xl bg-background-secondary/50 p-4 transition-all hover:bg-background-secondary">
                <span className="font-medium text-text-primary group-hover:text-accent">
                  Table Settings
                </span>
                <ArrowRight className="h-4 w-4 text-text-secondary transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    </RoleGuard>
  );
}