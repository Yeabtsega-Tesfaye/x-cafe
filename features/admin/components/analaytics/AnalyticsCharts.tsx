"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

type DailyRevenue = {
  date: string;
  revenue: number;
};

export default function AnalyticsCharts({ data }: { data: DailyRevenue[] }) {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
          
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: "#6b7280" }} 
            dy={10} 
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: "#6b7280" }} 
            tickFormatter={(value) => `ETB ${value}`} 
          />
          
          <Tooltip
            cursor={{ fill: '#f3f4f6' }}
            contentStyle={{ 
              borderRadius: "16px", 
              border: "none", 
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.95)"
            }}
            itemStyle={{ color: "#111827", fontWeight: "bold" }}
            formatter={(value: number) => [`ETB ${value.toFixed(2)}`, "Revenue"]}
            labelStyle={{ color: "#6b7280", marginBottom: "4px" }}
          />
          
          <Bar 
            dataKey="revenue" 
            fill="#3b82f6" 
            radius={[6, 6, 0, 0]} 
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}