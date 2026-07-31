import { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  colorTheme: "red" | "amber" | "green" | "blue";
};

export default function StatCard({ title, value, icon: Icon, colorTheme }: StatCardProps) {
  // Map our themes to smooth, modern Tailwind colors
  const colors = {
    red: "bg-red-500/10 text-red-500 border-red-500/20",
    amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    green: "bg-green-500/10 text-green-500 border-green-500/20",
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  };

  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-background p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-secondary">{title}</span>
        
        {/* The Icon Pill */}
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${colors[colorTheme]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      
      <div className="mt-4">
        <span className="font-display text-4xl font-extrabold text-text-primary">
          {value}
        </span>
      </div>
    </div>
  );
}