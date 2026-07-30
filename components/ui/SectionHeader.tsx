import { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export default function SectionHeader({
  title,
  subtitle,
  action,
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div className="section-header-content">
        <h2 className="section-title">{title}</h2>

        {subtitle && (
          <p className="body-small text-secondary">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="section-header-action">
          {action}
        </div>
      )}
    </div>
  );
}