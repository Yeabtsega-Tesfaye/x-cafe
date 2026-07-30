import { LucideIcon } from "lucide-react";

export interface KitchenStat {
  title: string;
  value: number;
  icon: LucideIcon;
  color: "primary" | "warning" | "info" | "success";
  change?: string;
}