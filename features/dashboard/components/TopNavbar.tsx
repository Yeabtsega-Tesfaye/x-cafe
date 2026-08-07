"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";

export default function TopNavbar() {
  const [now, setNow] = useState(new Date());
  const pathname = usePathname();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Dynamically set the subtitle based on the current route
  let subtitle = "Manage today's café operations.";
  if (pathname?.includes("/kitchen")) {
    subtitle = "Manage today's kitchen operations.";
  } else if (pathname?.includes("/payments")) {
    subtitle = "Manage payment verifications & revenue.";
  } else if (pathname?.includes("/orders")) {
    subtitle = "Overview of all active café orders.";
  } else if (pathname?.includes("/menu")) {
    subtitle = "Update and manage the café menu.";
  } else if (pathname?.includes("/admin")) {
    subtitle = "Manage system settings and tables.";
  }

  return (
    <header className="fixed left-4 right-4 top-4 z-30 flex h-20 items-center justify-between rounded-3xl border border-border/50 bg-background/80 px-6 shadow-sm backdrop-blur-md md:left-[17.5rem]">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xl">👋</span>
          <h1 className="font-display text-xl font-bold text-text-primary">
            {greeting}
          </h1>
        </div>
        <p className="text-sm text-text-secondary">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden text-right md:block">
          <p className="text-sm font-medium text-text-primary">{date}</p>
          <p className="text-xs font-bold text-text-secondary">{time}</p>
        </div>

        <button className="relative rounded-full border border-border/50 bg-background-secondary p-2.5 text-text-secondary transition-colors hover:bg-background hover:text-text-primary">
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background"></span>
        </button>
      </div>
    </header>
  );
}