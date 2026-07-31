"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

export default function TopNavbar() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const hour = now.getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

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
    <header className="dashboard-topbar">
      <div className="topbar-left">
        <p className="topbar-greeting">
          👋 {greeting}
        </p>

        <h1 className="topbar-title">
          Kitchen Dashboard
        </h1>

        <p className="topbar-subtitle">
          Manage today`s kitchen operations.
        </p>
      </div>

      <div className="topbar-right">
        <div className="topbar-datetime">
          <span>{date}</span>
          <strong>{time}</strong>
        </div>

        <button
          className="icon-button"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
}