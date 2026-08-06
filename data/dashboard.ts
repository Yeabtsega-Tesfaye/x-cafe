import { 
  LayoutDashboard, 
  ChefHat, 
  ClipboardList, 
  UtensilsCrossed, 
  BarChart3, 
  Settings,
  ShoppingBag,
  Utensils,
  CreditCard
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: any;
  roles: string[];
};

export const ALL_NAV_LINKS = [
  {
    href: "/dashboard/payments",
    label: "Payments",
    icon: CreditCard, // or whatever icon you use
    roles: ["cashier", "manager"],
  },
    {
    href: "/dashboard/kitchen",
    label: "Kitchen Panel",
    icon: Utensils,
    roles: ["kitchen", "chef"],
  },
  {
    href: "/dashboard/orders",
    label: "Orders",
    icon: ShoppingBag,
    roles: ["cashier", "manager", "kitchen", "chef"], // if cashiers need to see orders too
  },
];