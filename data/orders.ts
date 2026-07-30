import { Order } from "@/types";

export const orders: Order[] = [
  {
    id: "#1024",
    table: "Table 5",
    items: [
      {
        name: "Classic Burger",
        quantity: 2,
      },
      {
        name: "Cappuccino",
        quantity: 1,
      },
    ],
    time: "2 min ago",
    status: "New",
    note: "No onions",
  },

  {
    id: "#1025",
    table: "Table 2",
    items: [
      {
        name: "Pepperoni Pizza",
        quantity: 1,
      },
      {
        name: "Cola",
        quantity: 2,
      },
    ],
    time: "6 min ago",
    status: "Preparing",
    note: "Extra cheese",
  },

  {
    id: "#1026",
    table: "Takeaway",
    items: [
      {
        name: "Pasta Alfredo",
        quantity: 1,
      },
      {
        name: "Orange Juice",
        quantity: 2,
      },
    ],
    time: "11 min ago",
    status: "Ready",
  },

  {
    id: "#1027",
    table: "Table 8",
    items: [
      {
        name: "Latte",
        quantity: 2,
      },
      {
        name: "Chocolate Cake",
        quantity: 1,
      },
    ],
    time: "13 min ago",
    status: "Preparing",
  },

  {
    id: "#1028",
    table: "Table 1",
    items: [
      {
        name: "Caesar Salad",
        quantity: 1,
      },
      {
        name: "Sparkling Water",
        quantity: 1,
      },
    ],
    time: "18 min ago",
    status: "New",
  },
];