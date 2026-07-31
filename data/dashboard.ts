import {
  LayoutDashboard,
  ChefHat,
  ClipboardList,
  UtensilsCrossed,
  BarChart3,
  Settings,
} from "lucide-react";

import { DashboardMenuItem } from "@/types";

export const dashboardMenu: DashboardMenuItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Current Orders",
    href: "/dashboard/kitchen",
    icon: ChefHat,
  },
  {
    label: "All Orders",
    href: "/dashboard/orders",
    icon: ClipboardList,
  },
  {
    label: "Menu Items",
    href: "/dashboard/menu",
    icon: UtensilsCrossed,
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];