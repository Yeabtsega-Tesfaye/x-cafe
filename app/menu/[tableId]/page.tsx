import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MenuPage } from "@/features/menu/components/MenuPage";

export default async function MenuTableRoute({
  params,
}: {
  params: Promise<{ tableId: string }>;
}) {
  const resolvedParams = await params;
  
  // 1. Safeguard against Turbopack hot-reload glitches
  if (!resolvedParams?.tableId) {
    return <div className="p-8 text-red-500">Error: No table ID provided.</div>;
  }

  const table = await prisma.table.findUnique({
    where: {
      id: resolvedParams.tableId,
    },
  });

  if (!table) {
    notFound();
  }

  return (
    <div>
      <MenuPage tableNumber={table.number} tableId={table.id} />
    </div>
  );
}