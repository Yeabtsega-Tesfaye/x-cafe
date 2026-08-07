"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Image as ImageIcon, X } from "lucide-react";

type MenuItem = {
  id: string;
  name: string;
  description: string | undefined;
  price: number;
  category: string;
  isAvailable: boolean;
  imageUrl: string | undefined;
};

export default function MenuBoard({ initialItems }: { initialItems: MenuItem[] }) {
  // 1. Store the static items in local state so the UI can update
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const categories = ["ALL", ...Array.from(new Set(items.map((item) => item.category)))];

  const filteredItems = useMemo(() => {
    if (activeCategory === "ALL") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  const openModal = (item?: MenuItem) => {
    setEditingItem(item || null);
    setIsModalOpen(true);
  };

  // --- LOCAL STATE "CRUD" ACTIONS ---
  const toggleAvailability = (id: string) => {
    setItems((prev) => 
      prev.map(item => item.id === id ? { ...item, isAvailable: !item.isAvailable } : item)
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newItem = {
      id: editingItem ? editingItem.id : `new-${Date.now()}`,
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      isAvailable: formData.get("isAvailable") === "true",
      imageUrl: editingItem?.imageUrl,
    };

    if (editingItem) {
      setItems((prev) => prev.map(item => item.id === editingItem.id ? newItem : item));
    } else {
      setItems((prev) => [newItem, ...prev]);
    }
    
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">Menu Catalog (Preview)</h2>
          <p className="text-text-secondary">Changes made here will reset on page refresh.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-fit rounded-full bg-accent/10 px-3.5 py-1.5 text-xs font-bold text-accent">
            {items.length} Total Items
          </span>
          <button onClick={() => openModal()} className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95">
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>
      </div>

      <div className="flex w-full overflow-x-auto rounded-2xl bg-background-secondary/50 p-1.5 sm:w-fit [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-bold transition-all ${
              activeCategory === cat ? "bg-background text-text-primary shadow-sm" : "text-text-secondary hover:bg-background/50 hover:text-text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all hover:shadow-md">
            <div>
              <div className="relative h-40 w-full overflow-hidden bg-background-secondary flex items-center justify-center">
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.name} fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                  <ImageIcon className="h-10 w-10 text-border" />
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-text-secondary">{item.category}</span>
                  <span className="font-bold text-accent">ETB {item.price.toFixed(2)}</span>
                </div>
                <h3 className="mt-1 font-display text-base font-bold text-text-primary">{item.name}</h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-secondary">{item.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/50 bg-background-secondary/30 px-4 py-3 text-xs">
              <button
                onClick={() => toggleAvailability(item.id)}
                className={`rounded-full px-2.5 py-0.5 font-bold transition-colors ${
                  item.isAvailable ? "bg-green-500/10 text-green-600 hover:bg-green-500/20" : "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                }`}
              >
                {item.isAvailable ? "Available" : "Sold Out"}
              </button>
              
              <div className="flex gap-2">
                <button onClick={() => openModal(item)} className="rounded p-1.5 text-text-secondary hover:bg-background hover:text-accent">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button onClick={() => deleteItem(item.id)} className="rounded p-1.5 text-text-secondary hover:bg-background hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-background p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-text-primary">
                {editingItem ? "Edit Menu Item" : "Add New Item"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="rounded-full p-2 hover:bg-background-secondary">
                <X className="h-5 w-5 text-text-secondary" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-text-secondary">Item Name</label>
                <input required type="text" name="name" defaultValue={editingItem?.name} className="w-full rounded-xl border border-border bg-background-secondary/50 p-3 text-text-primary focus:border-accent focus:outline-none" />
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-bold text-text-secondary">Price (ETB)</label>
                  <input required type="number" step="0.01" name="price" defaultValue={editingItem?.price} className="w-full rounded-xl border border-border bg-background-secondary/50 p-3 text-text-primary focus:border-accent focus:outline-none" />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-bold text-text-secondary">Category</label>
                  <input required type="text" name="category" defaultValue={editingItem?.category} className="w-full rounded-xl border border-border bg-background-secondary/50 p-3 text-text-primary focus:border-accent focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-text-secondary">Description</label>
                <textarea name="description" defaultValue={editingItem?.description || ""} rows={3} className="w-full resize-none rounded-xl border border-border bg-background-secondary/50 p-3 text-text-primary focus:border-accent focus:outline-none"></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" name="isAvailable" value="true" defaultChecked={editingItem ? editingItem.isAvailable : true} id="isAvailable" className="h-4 w-4 rounded border-border accent-accent" />
                <label htmlFor="isAvailable" className="text-sm font-bold text-text-primary">Item is currently available</label>
              </div>

              <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 rounded-xl border border-border p-3 font-bold text-text-secondary hover:bg-background-secondary">Cancel</button>
                <button type="submit" className="flex-1 rounded-xl bg-accent p-3 font-bold text-white hover:brightness-110">Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}