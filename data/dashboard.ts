import { 
  LayoutDashboard, 
  ChefHat, 
  ClipboardList, 
  UtensilsCrossed, 
  BarChart3, 
  Settings,
  ShoppingBag,
  Utensils,
  CreditCard,
  Users
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: any;
  roles: string[];
};

export const ALL_NAV_LINKS: NavItem[] = [
  // --- MANAGER & ADMIN ROUTES ---
  {
  href: "/admin/users",
  label: "Staff Management",
  icon: Users,
  roles: ["admin"], // ONLY the admin should see this!
},
  {
    href: "/dashboard", // The main landing page for managers
    label: "Overview",
    icon: LayoutDashboard,
    roles: ["manager", "admin"],
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics & Reports",
    icon: BarChart3,
    roles: ["manager", "admin"],
  },
  {
    href: "/dashboard/menu",
    label: "Menu Management",
    icon: ClipboardList,
    roles: ["manager", "admin"],
  },
  {
    href: "/admin/tables",
    label: "Tables & Settings",
    icon: Settings,
    roles: ["manager", "admin"],
  },

  // --- OPERATIONAL ROUTES ---
  {
    href: "/dashboard/payments",
    label: "Payments",
    icon: CreditCard,
    roles: ["cashier", "manager", "admin"], // Added admin so they can audit
  },
  {
    href: "/dashboard/kitchen",
    label: "Kitchen Panel",
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