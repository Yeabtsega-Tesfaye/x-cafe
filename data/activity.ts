export interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "new" | "preparing" | "ready";
}

export const activities: Activity[] = [
  {
    id: 1,
    title: "New Order",
    description: "Table 5 placed a new order.",
    time: "1 min ago",
    type: "new",
  },
  {
    id: 2,
    title: "Preparing",
    description: "Order #1025 is now being prepared.",
    time: "4 min ago",
    type: "preparing",
  },
  {
    id: 3,
    title: "Order Ready",
    description: "Takeaway Order #1026 is ready.",
    time: "8 min ago",
    type: "ready",
  },
  {
    id: 4,
    title: "New Order",
    description: "Table 1 placed a new order.",
    time: "12 min ago",
    type: "new",
  },
  {
    id: 5,
    title: "Preparing",
    description: "Table 8 order moved to preparing.",
    time: "18 min ago",
    type: "preparing",
  },
];