import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MenuPage } from "@/features/menu/components/MenuPage";

export default async function MenuTableRoute({
  params,
}: {
  params: Promise<{ tableId: string }>;
}) {
  const resolvedParams = await params;

  if (!resolvedParams?.tableId) {
    return <div>Error: No table ID provided.</div>;
  }

  const table = await prisma.table.findUnique({
    where: { id: resolvedParams.tableId },
  });

  if (!table) {
    notFound();
  }

  const menuItems = await prisma.menuItem.findMany({
    where: { isAvailable: true },
    include: { category: true },
    orderBy: { createdAt: "asc" },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const mappedMenu = menuItems.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description || "",
    price: item.price,
    priceFormatted: `ETB ${item.price}`,
    image: item.image || "/images/placeholder.jpg",
    badge: item.badge,
    category: item.category.name,
  }));

  const categoryList = ["All", ...categories.map((c) => c.name)];

  return (
    <MenuPage
      tableNumber={table.number}
      menuItems={mappedMenu}
      categories={categoryList}
    />
  );
}