import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
// Make sure to import your actual MenuPage component here
import { MenuPage } from "@/features/menu/components/MenuPage";

export default async function MenuTableRoute({
  params,
}: {
  params: Promise<{ tableId: string }>;
}) {
  // 1. Next.js 16 REQUIRES you to await params before using them
  const resolvedParams = await params;

  // 2. Now we pass the pure string (e.g., "1234") to Prisma
  const table = await prisma.table.findUnique({
    where: {
      id: resolvedParams.tableId,
    },
  });

  // 3. If the user scans a fake QR code, show a 404 page
  if (!table) {
    notFound();
  }

  // 4. Render the menu, passing the table context
  return (
    <div>
 <MenuPage tableNumber={table.number} />
      <h1>Ordering for Table {table.number}</h1>
    </div>
  );
}