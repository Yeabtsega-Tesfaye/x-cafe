import { prisma } from "@/lib/prisma";
import { 
  TrendingUp, 
  CreditCard, 
  Receipt, 
  PieChart as PieChartIcon 
} from "lucide-react";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import StatCard from "@/features/cashier/components/stats/StatsCard";
import AnalyticsCharts from "@/features/admin/components/analaytics/AnalyticsCharts";

export const dynamic = "force-dynamic";

export default async function AnalyticsRoute() {
  // 1. Define the time range (Last 7 Days)
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  // 2. Fetch all completed orders from the last week
  const recentOrders = await prisma.order.findMany({
    where: { 
      createdAt: { gte: sevenDaysAgo },
      paymentStatus: "PAID", // Only count successful transactions
    },
    include: { items: true },
    orderBy: { createdAt: "asc" }
  });

// 3. Calculate Key Performance Indicators (KPIs)
  const totalRevenue = recentOrders.reduce((sum: number, order: any) => sum + order.total, 0);
  const totalOrders = recentOrders.length;
  const averageTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Calculate total items sold
  const itemsSold = recentOrders.reduce((acc: number, order: any) => {
    return acc + order.items.reduce((itemSum: number, item: any) => itemSum + item.quantity, 0);
  }, 0);

  const formattedRevenue = totalRevenue.toLocaleString(undefined, {
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  });
  const formattedAvg = averageTicket.toLocaleString(undefined, {
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  });

  // 4. Format Data for the Daily Revenue Chart
  const dailyDataMap = new Map<string, number>();
  
  // Pre-fill the map with the last 7 days so days with $0 revenue still show up
  for (let i = 0; i < 7; i++) {
    const d = new Date(sevenDaysAgo);
    d.setDate(d.getDate() + i);
    const dateString = d.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' });
    dailyDataMap.set(dateString, 0);
  }

  // Populate actual revenue
  recentOrders.forEach((order) => {
    const dateString = new Date(order.createdAt).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' });
    if (dailyDataMap.has(dateString)) {
      dailyDataMap.set(dateString, dailyDataMap.get(dateString)! + order.total);
    }
  });

  const chartData = Array.from(dailyDataMap, ([date, revenue]) => ({ date, revenue }));

  return (
        <RoleGuard allowedRoles={["admin","manager"]}>
    <div className="flex flex-col gap-6 p-4 md:p-8 pt-28">
      
      {/* Header */}
      <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">Business Analytics</h2>
          <p className="text-text-secondary">Performance metrics for the last 7 days.</p>
        </div>
        <button className="rounded-xl border border-border bg-background px-4 py-2 text-sm font-bold text-text-secondary transition-colors hover:bg-background-secondary">
          Export Report
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="7-Day Revenue" value={`ETB ${formattedRevenue}`} icon={TrendingUp} colorTheme="green" />
        <StatCard title="Total Orders" value={totalOrders} icon={Receipt} colorTheme="blue" />
        <StatCard title="Avg. Ticket Size" value={`ETB ${formattedAvg}`} icon={CreditCard} colorTheme="amber" />
        <StatCard title="Total Items Sold" value={itemsSold} icon={PieChartIcon} colorTheme="red" />
      </div>

      {/* Charts Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Main Chart (Spans 2 columns) */}
        <div className="flex flex-col rounded-3xl border border-border/50 bg-background p-6 shadow-sm lg:col-span-2">
          <div className="mb-6">
            <h3 className="font-display text-lg font-bold text-text-primary">Revenue Trend</h3>
            <p className="text-sm text-text-secondary">Daily gross sales over the last week.</p>
          </div>
          <AnalyticsCharts data={chartData} />
        </div>

        {/* Side Panel (Spans 1 column) */}
        <div className="flex flex-col rounded-3xl border border-border/50 bg-background p-6 shadow-sm">
          <h3 className="mb-6 font-display text-lg font-bold text-text-primary">Top Performing</h3>
          
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background-secondary/30 text-center p-6">
            <PieChartIcon className="mb-2 h-8 w-8 text-border" />
            <p className="font-medium text-text-primary">Item Breakdown</p>
            <p className="text-sm text-text-secondary">
              Calculate top-selling individual items or categories to display here.
            </p>
          </div>
        </div>

      </div>
    </div>
    </RoleGuard>
  );
}