import { prisma } from "@/lib/prisma";
import { MenuPage } from "@/features/menu/components/MenuPage";

export default async function Menu() {
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

  return <MenuPage menuItems={mappedMenu} categories={categoryList} />;
}