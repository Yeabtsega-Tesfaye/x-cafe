import { FULL_MENU, CATEGORIES } from "@/data/menu";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function DashboardMenuPage() {
  return (
    <div className="min-h-screen bg-background-secondary p-4 md:p-8 pt-28">
      <div className="mx-auto max-w-7xl rounded-3xl border border-border/50 bg-background p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-text-primary">Menu Catalog</h2>
            <p className="text-text-secondary">Viewing all active items available in the cafe system.</p>
          </div>
          <span className="rounded-full bg-accent/10 px-3.5 py-1.5 text-xs font-bold text-accent w-fit">
            {FULL_MENU.length} Total Items
          </span>
        </div>

        {/* Categories Grid Preview */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FULL_MENU.map((item, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all hover:shadow-md"
            >
              <div>
                <div className="relative h-40 w-full overflow-hidden bg-background-secondary">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
                  {item.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold text-accent shadow-sm backdrop-blur-sm">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-text-secondary">{item.category}</span>
                    <span className="font-bold text-accent">{item.price}</span>
                  </div>
                  <h3 className="mt-1 font-display text-base font-bold text-text-primary">{item.name}</h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="border-t border-border/50 px-4 py-3 bg-background-secondary/30 flex items-center justify-between text-xs">
                <span className="font-medium text-text-secondary">Status</span>
                <span className="font-bold text-green-600 bg-green-500/10 px-2.5 py-0.5 rounded-full">Available</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}