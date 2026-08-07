import { redirect } from "next/navigation";
import { headers } from "next/headers"; 
import { auth } from "@/lib/auth";

import DashboardLayoutUI from "@/features/dashboard/components/DashboardLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const userRole = (session.user?.role as string)?.toLowerCase() || "kitchen";

  // Optional: Prevent kitchen/chef staff from accessing manager-only or admin routes if they type them manually
  // (Note: Since headers() doesn't give the pathname directly in Server Layouts easily without middleware, 
  // you can handle specific page security in individual page files using this same session check, 
  // or use Next.js Middleware for global path matching).

  return <DashboardLayoutUI>{children}</DashboardLayoutUI>;
}