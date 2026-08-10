"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Coffee, ChevronLeft, ChevronRight } from "lucide-react";
import { authClient } from "@/features/auth/services/auth-client"; 
import { ALL_NAV_LINKS } from "@/data/dashboard";
import { useSidebarStore } from "@/store/useSidebarStore";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const { isCollapsed, toggleSidebar } = useSidebarStore(); 
  
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const userRole = ((user as any)?.role as string)?.toLowerCase() || "kitchen";

  const authorizedLinks = ALL_NAV_LINKS.filter((link) => 
    link.roles.includes(userRole)
  );

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <aside 
      className={`relative sticky top-4 hidden h-[calc(100vh-2rem)] flex-col rounded-3xl border border-border/50 bg-background shadow-sm transition-all duration-300 ease-in-out md:flex ${
        isCollapsed ? "w-24" : "w-64"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-4 top-8 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-background text-text-secondary shadow-md transition-transform hover:scale-110 hover:text-text-primary"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* STATIC BRAND HEADER */}
      <div className={`shrink-0 flex items-center border-b border-border/50 p-6 transition-all duration-300 ${isCollapsed ? "justify-center px-0" : "gap-3"}`}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white shadow-lg">
          <Coffee size={24} />
        </div>
        <div className={`flex flex-col whitespace-nowrap transition-all duration-300 ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
          <h2 className="font-display text-lg font-bold leading-tight text-text-primary">X Cafe</h2>
          <p className="text-xs capitalize text-text-secondary">{userRole} Panel</p>
        </div>
      </div>

      {/* SCROLLABLE DYNAMIC NAVIGATION */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto no-scrollbar">
        <nav className="space-y-2 p-4">
          {authorizedLinks.map(({ href, label, icon: Icon }) => {
            const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`group relative flex items-center rounded-xl p-3 text-sm font-semibold transition-all duration-200 ${
                  active 
                    ? "bg-accent/10 text-accent" 
                    : "text-text-secondary hover:bg-background-secondary hover:text-text-primary"
                } ${isCollapsed ? "justify-center" : "gap-3"}`}
              >
                <Icon size={20} className="shrink-0" />
                
                <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? "w-0 overflow-hidden opacity-0" : "w-auto opacity-100"}`}>
                  {label}
                </span>

                {isCollapsed && (
                  <div className="absolute left-full ml-4 invisible rounded-md bg-accent px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-sm transition-all group-hover:visible group-hover:opacity-100 z-50 whitespace-nowrap">
                    {label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* STATIC FOOTER / USER PROFILE */}
      <div className="shrink-0 border-t border-border/50 p-4">
        <div className={`mb-4 flex items-center transition-all duration-300 ${isCollapsed ? "justify-center" : "gap-3 px-2"}`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 font-bold text-accent">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? "w-0 overflow-hidden opacity-0" : "w-auto opacity-100"}`}>
            <h4 className="truncate text-sm font-bold text-text-primary">{user?.name || "Loading..."}</h4>
            <p className="truncate text-xs text-text-secondary">{user?.email || "..."}</p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className={`group relative flex items-center justify-center rounded-xl bg-background-secondary p-2.5 text-sm font-bold text-text-secondary transition-colors hover:bg-red-500/10 hover:text-red-500 ${isCollapsed ? "" : "w-full gap-2"}`}
        >
          <LogOut size={18} className="shrink-0" />
          
          <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? "w-0 overflow-hidden opacity-0" : "w-auto opacity-100"}`}>
            Logout
          </span>

          {isCollapsed && (
            <div className="absolute left-full ml-4 invisible rounded-md bg-red-500 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-sm transition-all group-hover:visible group-hover:opacity-100 z-50 whitespace-nowrap">
              Logout
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}