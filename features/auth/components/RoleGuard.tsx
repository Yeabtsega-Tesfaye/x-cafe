import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type RoleGuardProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

export async function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const userRole = (session.user?.role as string)?.toLowerCase() || "kitchen";

  // If the user's role is not allowed, redirect them to their designated safe zone
  if (!allowedRoles.includes(userRole)) {
    if (userRole === "cashier") redirect("/dashboard/payments");
    if (userRole === "kitchen" || userRole === "chef") redirect("/dashboard/kitchen");
    redirect("/dashboard"); // Manager / Admin fallback
  }

  return <>{children}</>;
}