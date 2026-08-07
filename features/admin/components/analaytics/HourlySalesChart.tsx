"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

type ChartData = {
  hour: string;
  revenue: number;
};

export default function HourlySalesChart({ data }: { data: ChartData[] }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              {/* Using a nice green theme for revenue */}
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
          
          <XAxis 
            dataKey="hour" 
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
          
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#10b981" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}