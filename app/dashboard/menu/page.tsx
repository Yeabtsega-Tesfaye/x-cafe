import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { FULL_MENU } from "@/data/menu";
import MenuBoard from "@/features/menu/components/MenuBoard";

export default function DashboardMenuPage() {
  // We don't need 'force-dynamic' since this is entirely static data!
  
  // Ensure every item has an 'id' and 'isAvailable' flag for the UI to work with
  const mappedMenu = FULL_MENU.map((item, index) => ({
    id: `static-${index}`, // Generate a fake ID
    name: item.name,
    description: item.description,
    // Convert string prices like "ETB 150" to numbers if necessary, or just use as is
    price: typeof item.price === "string" ? parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0 : item.price,
    category: item.category,
    imageUrl: item.image,
    isAvailable: true, // Defaulting everything to available
  }));

  return (
    <RoleGuard allowedRoles={["admin","manager"]}>
    <div className="min-h-screen bg-background-secondary p-4 md:p-8 pt-28">
      <div className="mx-auto max-w-7xl rounded-3xl border border-border/50 bg-background p-6 shadow-sm">
        <MenuBoard initialItems={mappedMenu} />
      </div>
    </div>
    </RoleGuard>
  );
}