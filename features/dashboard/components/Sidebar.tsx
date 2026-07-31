"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  ChefHat,
  ClipboardList,
  UtensilsCrossed,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Kitchen",
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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="dashboard-sidebar">
      <div>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">☕</div>

          <div>
            <h2>X Cafe</h2>
            <p>Restaurant Management</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {links.map(({ href, label, icon: Icon }) => {
            const active =
  href === "/dashboard"
    ? pathname === href
    : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`sidebar-link ${
                  active ? "active" : ""
                }`}
              >
                <Icon size={20} />

                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <Avatar
            name="Kitchen Staff"
            size="md"
          />

          <div>
            <h4>Kitchen Manager</h4>
            <p>kitchen@xcafe.com</p>
          </div>
        </div>

        <Button
          variant="secondary"
          className="sidebar-logout"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </aside>
  );
}