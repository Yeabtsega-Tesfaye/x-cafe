import { prisma } from "@/lib/prisma";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import UserBoard from "@/features/admin/components/users/UserBoard";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <RoleGuard allowedRoles={["admin","manager"]}>
    <div className="min-h-screen bg-background-secondary p-4 md:p-8 pt-28">
      <div className="mx-auto max-w-7xl rounded-3xl border border-border/50 bg-background p-6 shadow-sm">
        <UserBoard initialUsers={users} />
      </div>
    </div>
    </RoleGuard>
  );
}