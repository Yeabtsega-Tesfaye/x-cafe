import { create } from "zustand";

export interface CartItem {
  id: string;   // We will use the item's name as the ID for now
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  
  // Actions
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // Computed values
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (newItem) => {
    set((state) => {
      // Check if the food is already in the cart
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        // If it exists, just bump the quantity by 1
        return {
          items: state.items.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      
      // If it's new, add it to the array with a quantity of 1
      return { items: [...state.items, { ...newItem, quantity: 1 }] };
    });
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  updateQuantity: (id, quantity) => {
    set((state) => ({
      items: state.items
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        // If they drop the quantity to 0, automatically remove it from the cart
        .filter((item) => item.quantity > 0),
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));