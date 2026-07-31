"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ChefHat, ClipboardList, UtensilsCrossed, BarChart3, Settings, LogOut, Coffee } from "lucide-react";
import { authClient } from "@/features/auth/services/auth-client"; // Import better-auth client

const links = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Kitchen", href: "/dashboard/kitchen", icon: ChefHat },
  { label: "All Orders", href: "/dashboard/orders", icon: ClipboardList },
  { label: "Menu Items", href: "/dashboard/menu", icon: UtensilsCrossed },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Fetch real user data from better-auth
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-border/50 bg-background md:flex">
      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Brand */}
        <div className="flex items-center gap-3 border-b border-border/50 p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow-lg">
            <Coffee size={24} />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold leading-tight text-text-primary">X Cafe</h2>
            <p className="text-xs text-text-secondary">Restaurant System</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {links.map(({ href, label, icon: Icon }) => {
            const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  active 
                    ? "bg-accent/10 text-accent" 
                    : "text-text-secondary hover:bg-background-secondary hover:text-text-primary"
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile */}
      <div className="border-t border-border/50 p-4">
        <div className="mb-4 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 font-bold text-accent">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="overflow-hidden">
            <h4 className="truncate text-sm font-bold text-text-primary">{user?.name || "Loading..."}</h4>
            <p className="truncate text-xs text-text-secondary">{user?.email || "..."}</p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-background-secondary py-2.5 text-sm font-bold text-text-secondary transition-colors hover:bg-red-500/10 hover:text-red-500"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}