import Badge from "./Badge";

type Status =
  | "New"
  | "Pending"
  | "Preparing"
  | "Ready"
  | "Completed"
  | "Cancelled";

type StatusBadgeProps = {
  status: Status;
};

const variants = {
  New: "warning",
  Pending: "warning",
  Preparing: "info",
  Ready: "success",
  Completed: "success",
  Cancelled: "danger",
} as const;

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <Badge variant={variants[status]}>
      {status}
    </Badge>
  );
}