import {
  Package,
  Clock3,
  CookingPot,
  CircleCheckBig,
} from "lucide-react";

import { KitchenStat } from "@/types";

export const kitchenStats: KitchenStat[] = [
  {
    title: "Today's Orders",
    value: 24,
    icon: Package,
    color: "primary",
    change: "+4 since last hour",
  },
  {
    title: "Pending",
    value: 8,
    icon: Clock3,
    color: "warning",
    change: "Needs attention",
  },
  {
    title: "Preparing",
    value: 5,
    icon: CookingPot,
    color: "info",
    change: "In progress",
  },
  {
    title: "Ready",
    value: 11,
    icon: CircleCheckBig,
    color: "success",
    change: "Waiting pickup",
  },
];