import { 
  LayoutDashboard, 
  ChefHat, 
  ClipboardList, 
  BarChart3, 
  Table,
  ShoppingBag,
  CreditCard,
  Users
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: string[];
};

export const ALL_NAV_LINKS: NavItem[] = [
  // --- MANAGER & ADMIN ROUTES ---
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    roles: ["manager", "admin"],
  },
  {
    href: "/dashboard/admin/users",
    label: "Staff",
    icon: Users,
    roles: ["admin"],
  },
  {
    href: "/dashboard/analytics",
    label: "Reports",
    icon: BarChart3,
    roles: ["manager", "admin"],
  },
  {
    href: "/dashboard/menu",
    label: "Menu",
    icon: ClipboardList,
    roles: ["manager", "admin"],
  },
  {
    href: "/dashboard/admin/tables",
    label: "Tables",
    icon: Table,
    roles: ["manager", "admin"],
  },

  // --- OPERATIONAL ROUTES ---
  {
    href: "/dashboard/payments",
    label: "Payments",
    icon: CreditCard,
    roles: ["cashier", "manager", "admin"],
  },
  {
    href: "/dashboard/kitchen",
    label: "Kitchen",
    icon: ChefHat,
    roles: ["kitchen", "chef", "manager", "admin"], 
  },
  {
    href: "/dashboard/orders",
    label: "Orders",
    icon: ShoppingBag,
    roles: ["cashier", "kitchen", "chef", "manager", "admin"],
  },
];