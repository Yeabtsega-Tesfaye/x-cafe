import {
  Bell,
  ChefHat,
  CheckCircle2,
} from "lucide-react";

import { activities } from "@/data/activity";

import {
  Card,
  SectionHeader,
  Button,
} from "@/components/ui";

const icons = {
  new: <Bell size={18} />,
  preparing: <ChefHat size={18} />,
  ready: <CheckCircle2 size={18} />,
};

export default function RecentActivity() {
  return (
    <Card className="activity-card">
      <SectionHeader
        title="Recent Activity"
        subtitle="Kitchen updates"
        action={
          <Button variant="ghost">
            View All
          </Button>
        }
      />

      <div className="activity-list">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="activity-item"
          >
            <div
              className={`activity-icon activity-${activity.type}`}
            >
              {icons[activity.type]}
            </div>

            <div className="activity-content">
              <h4>{activity.title}</h4>

              <p>{activity.description}</p>

              <span>{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}