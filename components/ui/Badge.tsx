type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "info";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
};

export default function Badge({
  children,
  variant = "info",
}: BadgeProps) {
  return (
    <span className={`badge badge-${variant}`}>
      {children}
    </span>
  );
}