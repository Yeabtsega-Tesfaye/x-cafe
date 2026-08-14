import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { prisma } from "@/lib/prisma";
import MenuBoard from "@/features/menu/components/MenuBoard";

export default async function DashboardMenuPage() {
  const items = await prisma.menuItem.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const mappedMenu = items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description || "",
    price: item.price,
    category: item.category.name,
    categoryId: item.category.id,
    imageUrl: item.image || undefined,
    badge: item.badge,
    isAvailable: item.isAvailable,
  }));

  const categoryOptions = categories.map((c) => ({
    id: c.id,
    name: c.name,
  }));

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <MenuBoard initialItems={mappedMenu} categories={categoryOptions} />
    </RoleGuard>
  );
}