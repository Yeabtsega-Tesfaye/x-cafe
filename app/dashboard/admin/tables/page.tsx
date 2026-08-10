import { prisma } from "@/lib/prisma";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import TableBoard from "@/features/tables/components/TableBoard";

export const dynamic = "force-dynamic";

export default async function AdminTablesPage() {
  // Fetch all tables from Neon, sorted by table number
  const tables = await prisma.table.findMany({
    orderBy: { number: "asc" },
  });

  return (
    <RoleGuard allowedRoles={["admin","manager"]}>
    <div className="min-h-screen bg-background-secondary p-4 md:p-8 pt-28">
      <div className="mx-auto max-w-7xl rounded-3xl border border-border/50 bg-background p-6 shadow-sm">
        <TableBoard initialTables={tables} />
      </div>
    </div>
    </RoleGuard>
  );
}