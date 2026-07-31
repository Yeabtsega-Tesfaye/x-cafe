import { ReactNode } from "react";
import { Inbox } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export default function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Inbox size={32} />
      </div>

      <h3 className="heading-3 empty-state-title">
        {title}
      </h3>

      <p className="body-small empty-state-description">
        {description}
      </p>

      {action}
    </div>
  );
}