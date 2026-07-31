import { prisma } from "@/lib/prisma";
import { TableQRCode } from "@/features/tables/components/TableQRCode";

export default async function AdminTablesPage() {
  // Fetch all tables from Neon, sorted by table number
  const tables = await prisma.table.findMany({
    orderBy: { number: "asc" },
  });

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold text-text-primary mb-8">
          Table QR Codes
        </h1>
        
        {tables.length === 0 ? (
          <p className="text-text-secondary">No tables found. Add one in Prisma Studio!</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {tables.map((table) => (
              <TableQRCode
                key={table.id}
                tableId={table.id}
                tableNumber={table.number}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}