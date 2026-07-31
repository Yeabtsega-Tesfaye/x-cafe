import { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export default function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface p-10 text-center">
      {icon && (
        <div className="mb-4 text-3xl text-muted">
          {icon}
        </div>
      )}

      <h3 className="heading-3">
        {title}
      </h3>

      {description && (
        <p className="body-small text-secondary mt-2 max-w-md">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}