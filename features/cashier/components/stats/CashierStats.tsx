"use client";

import { Clock, CheckCircle2, XCircle, Banknote } from "lucide-react";
import StatCard from "./StatsCard";

type CashierOrder = {
  paymentStatus: string;
  total: number;
};

export default function CashierStats({ orders }: { orders: CashierOrder[] }) {
  // 1. Calculate the verification pipeline
  const pending = orders.filter((o) => o.paymentStatus === "VERIFICATION_REQUIRED").length;
  const approved = orders.filter((o) => o.paymentStatus === "PAID").length;
  const rejected = orders.filter((o) => o.paymentStatus === "REJECTED").length;

  // 2. Calculate the total verified revenue (only counting PAID orders)
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "PAID")
    .reduce((acc, order) => acc + order.total, 0);

  // Format the revenue nicely (e.g., "1,250.00")
  const formattedRevenue = totalRevenue.toLocaleString(undefined, { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        title="Needs Verification" 
        value={pending} 
        icon={Clock} 
        colorTheme="amber" 
      />
      <StatCard 
        title="Verified & Paid" 
        value={approved} 
        icon={CheckCircle2} 
        colorTheme="green" 
      />
      <StatCard 
        title="Verified Revenue" 
        value={`ETB ${formattedRevenue}`} 
        icon={Banknote} 
        colorTheme="blue" 
      />
      <StatCard 
        title="Rejected Receipts" 
        value={rejected} 
        icon={XCircle} 
        colorTheme="red" 
      />
    </div>
  );
}