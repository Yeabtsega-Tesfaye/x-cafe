import DashboardLayout from "@/components/dashboard/DashboardLayout";

import StatsSection from "@/components/kitchen/stats/StatsSection";
import OrdersSection from "@/components/kitchen/orders/OrdersSection";
import RecentActivity from "@/components/kitchen/activity/RecentActivity";

export default function KitchenPage() {
  return (
   <DashboardLayout>
  <div className="dashboard-page">
    <StatsSection />

    <div className="dashboard-grid">
      <OrdersSection />
      <RecentActivity />
    </div>
  </div>
</DashboardLayout>
  );
}