import Card from "@/components/ui/Card";
import { KitchenStat } from "@/types";

type StatCardProps = {
  stat: KitchenStat;
};

export default function StatCard({
  stat,
}: StatCardProps) {
  const Icon = stat.icon;

  return (
    <Card className="stat-card">
      <div className="stat-card-top">
        <div className={`stat-icon stat-${stat.color}`}>
          <Icon size={22} />
        </div>

        <span className="stat-title">
          {stat.title}
        </span>
      </div>

      <div className="stat-value">
        {stat.value}
      </div>

      <p className="stat-change">
        {stat.change}
      </p>
    </Card>
  );
}