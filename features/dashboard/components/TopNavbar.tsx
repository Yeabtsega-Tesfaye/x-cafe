"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

export default function TopNavbar() {
  const [now, setNow] = useState(new Date());

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

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-md">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xl">👋</span>
          <h1 className="font-display text-xl font-bold text-text-primary">
            {greeting}
          </h1>
        </div>
        <p className="text-sm text-text-secondary">
          Manage today&apos;s kitchen operations.
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