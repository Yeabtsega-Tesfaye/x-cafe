"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, ArrowRight, Loader2 } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { submitOrder } from "../actions/submit-order";
import { useRouter } from "next/navigation";

export function FloatingCart({ tableId }: { tableId?: string }) {
    const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { items, getTotalItems, getTotalPrice, updateQuantity, clearCart } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();


  const handleCheckout = () => {
    if (!tableId) {
      alert("Error: No table ID found. Are you scanning a valid QR code?");
      return;
    }

    startTransition(async () => {
      const result = await submitOrder(tableId, items, totalPrice);
      
if (result.success) {
        clearCart();
        setIsOpen(false);
        // Redirect the user to the success page, passing the orderId in the URL
        router.push(`/menu/${tableId}/success?orderId=${result.orderId}`);
      } else {
        alert(result.error);
      }
    });
  };

  // If cart is empty, render nothing
  if (totalItems === 0) {
    if (isOpen) setIsOpen(false); // Auto-close if they empty it
    return null;
  }

  return (
    <>
      {/* Backdrop overlay when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-background/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* The Cart Container */}
      <div className="fixed bottom-6 left-0 right-0 z-50 mx-auto flex w-full max-w-md flex-col items-center px-4">
        <motion.div
          layout
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="w-full overflow-hidden rounded-3xl border border-border/50 bg-background/80 shadow-2xl backdrop-blur-xl"
        >
          <AnimatePresence mode="popLayout">
            {isOpen ? (
              // --- OPEN STATE (The Drawer) ---
              <motion.div
                key="open"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex max-h-[60vh] flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/50 p-4">
                  <h3 className="font-display text-lg font-bold text-text-primary">Your Order</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-2 text-text-secondary transition-colors hover:bg-border/50 hover:text-text-primary"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {items.map((item) => (
                    <motion.div layout key={item.id} className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-bold text-sm text-text-primary">{item.name}</p>
                        <p className="text-xs text-text-secondary">ETB {(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 rounded-full border border-border/50 bg-background-secondary p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-background shadow-sm transition-transform active:scale-95"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-background shadow-sm transition-transform active:scale-95"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                        {/* Checkout Button */}
                <div className="border-t border-border/50 bg-background-secondary/50 p-4">
                  <button 
                    onClick={handleCheckout}
                    disabled={isPending}
                    className="group flex w-full items-center justify-between rounded-2xl bg-accent px-6 py-4 text-white shadow-lg transition-transform active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
                  >
                    <span className="font-bold">
                      {isPending ? "Sending..." : "Send to Kitchen"}
                    </span>
                    <div className="flex items-center gap-2 font-bold">
                      {isPending ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          ETB {totalPrice.toFixed(2)}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </motion.div>
            ) : (
              // --- CLOSED STATE (The Pill) ---
              <motion.div
                key="closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(true)}
                className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-border/20"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white">
                    <ShoppingBag className="h-5 w-5" />
                    <motion.span
                      key={totalItems} // Re-animates when count changes
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-text-primary text-[10px] font-bold text-background"
                    >
                      {totalItems}
                    </motion.span>
                  </div>
                  <span className="font-bold text-text-primary">View Order</span>
                </div>
                <span className="font-display text-lg font-extrabold text-accent">
                  ETB {totalPrice.toFixed(2)}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}