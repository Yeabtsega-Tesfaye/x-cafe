import { kitchenStats } from "@/data/stats";

import StatCard from "./StatCard";

export default function StatsSection() {
  return (
    <section className="stats-grid">
      {kitchenStats.map((stat) => (
        <StatCard
          key={stat.title}
          stat={stat}
        />
      ))}
    </section>
  );
}