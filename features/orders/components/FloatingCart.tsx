"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, ArrowRight, ArrowLeft, Loader2, UtensilsCrossed, Bike, Store, MapPin } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { submitOrder } from "../actions/submit-order";
import { useRouter } from "next/navigation";

// Must match your Prisma Enum exactly
type OrderType = "DINE_IN" | "TAKEAWAY" | "DELIVERY";

export function FloatingCart({ tableId }: { tableId?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  // Local UI State
  const [view, setView] = useState<"cart" | "checkout">("cart");
  const [orderType, setOrderType] = useState<OrderType>(tableId ? "DINE_IN" : "TAKEAWAY");
  
  // Form State
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  
  const { items, isOpen, setIsOpen, getTotalItems, getTotalPrice, updateQuantity, clearCart } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleFinalSubmit = () => {
    // Basic Client Validation
    if (orderType === "DELIVERY" && (!formData.address || !formData.phone)) {
      alert("Please fill in your delivery address and phone number.");
      return;
    }

    startTransition(async () => {
      const payload = {
        tableId: tableId, // Undefined if they ordered from the homepage
        type: orderType,
        customerName: formData.name,
        customerPhone: formData.phone,
        deliveryAddress: formData.address,
        items: items,
        total: totalPrice,
      };

      const result = await submitOrder(payload);
      
      if (result.success) {
        clearCart();
        setIsOpen(false);
        setView("cart");
        // Route to the success page (you can create a generic one if there is no tableId)
        router.push(tableId ? `/menu/${tableId}/success?orderId=${result.orderId}` : `/success?orderId=${result.orderId}`);
      } else {
        alert(result.error);
      }
    });
  };

  // Hide cart if empty
  if (totalItems === 0 && !isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-background/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 left-0 right-0 z-50 mx-auto flex w-full max-w-md flex-col items-center px-4">
        <motion.div
          layout
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="w-full overflow-hidden rounded-3xl border border-border/50 bg-background/95 shadow-2xl backdrop-blur-xl"
        >
          <AnimatePresence mode="wait">
            {/* --- CLOSED STATE --- */}
            {!isOpen && (
              <motion.div
                key="closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(true)}
                className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-border/20"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-md shadow-accent/20">
                    <ShoppingBag className="h-5 w-5" />
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-text-primary text-[10px] font-bold text-background">
                      {totalItems}
                    </span>
                  </div>
                  <span className="font-bold text-text-primary">View Order</span>
                </div>
                <span className="font-display text-lg font-extrabold text-accent">
                  ETB {totalPrice.toFixed(2)}
                </span>
              </motion.div>
            )}

            {/* --- CART VIEW --- */}
            {isOpen && view === "cart" && (
              <motion.div
                key="cart-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex max-h-[75vh] flex-col"
              >
                <div className="flex items-center justify-between border-b border-border/50 p-4">
                  <h3 className="font-display text-lg font-bold text-text-primary">Your Order</h3>
                  <button onClick={() => setIsOpen(false)} className="rounded-full p-2 text-text-secondary hover:bg-border/50">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {totalItems === 0 ? (
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background-secondary">
                      <UtensilsCrossed className="h-8 w-8 text-text-secondary" />
                    </div>
                    <p className="font-bold text-text-primary">Your cart is empty</p>
                    <p className="mt-1 text-sm text-text-secondary">Add some delicious food to get started!</p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-4">
                          <div className="flex-1">
                            <p className="font-bold text-sm text-text-primary">{item.name}</p>
                            <p className="text-xs text-text-secondary">ETB {(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-3 rounded-full border border-border/50 bg-background-secondary p-1">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-background active:scale-95">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-background active:scale-95">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border/50 p-4">
                      <button onClick={() => setView("checkout")} className="group flex w-full items-center justify-between rounded-2xl bg-accent px-6 py-4 text-white shadow-lg transition-transform active:scale-[0.98]">
                        <span className="font-bold">Checkout</span>
                        <div className="flex items-center gap-2 font-bold">
                          ETB {totalPrice.toFixed(2)}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* --- CHECKOUT VIEW --- */}
            {isOpen && view === "checkout" && (
              <motion.div
                key="checkout-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex max-h-[85vh] flex-col"
              >
                <div className="flex items-center gap-3 border-b border-border/50 p-4">
                  <button onClick={() => setView("cart")} className="rounded-full p-2 text-text-secondary hover:bg-border/50">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <h3 className="font-display text-lg font-bold text-text-primary">Checkout Details</h3>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                  {/* Order Type Toggle */}
                  <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-background-secondary border border-border/50">
                    <button onClick={() => setOrderType("TAKEAWAY")} className={`flex flex-col items-center gap-1.5 rounded-lg py-2.5 text-xs font-bold transition-all ${orderType === "TAKEAWAY" ? "bg-background text-accent shadow-sm" : "text-text-secondary"}`}>
                      <Store className="h-4 w-4" /> Pick Up
                    </button>
                    <button onClick={() => setOrderType("DELIVERY")} className={`flex flex-col items-center gap-1.5 rounded-lg py-2.5 text-xs font-bold transition-all ${orderType === "DELIVERY" ? "bg-background text-accent shadow-sm" : "text-text-secondary"}`}>
                      <Bike className="h-4 w-4" /> Delivery
                    </button>
                    <button onClick={() => setOrderType("DINE_IN")} disabled={!tableId} className={`flex flex-col items-center gap-1.5 rounded-lg py-2.5 text-xs font-bold transition-all ${orderType === "DINE_IN" ? "bg-background text-accent shadow-sm" : "text-text-secondary"} disabled:opacity-40`}>
                      <UtensilsCrossed className="h-4 w-4" /> Dine In
                    </button>
                  </div>

                  {/* Dynamic Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-text-secondary">Your Name</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" className="w-full rounded-xl border border-border bg-background py-3 px-4 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                    </div>

                    {(orderType === "DELIVERY" || orderType === "TAKEAWAY") && (
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-text-secondary">Phone Number <span className="text-red-500">*</span></label>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="0911..." className="w-full rounded-xl border border-border bg-background py-3 px-4 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                      </div>
                    )}

                    {orderType === "DELIVERY" && (
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-text-secondary">Delivery Address <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
                          <textarea value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Bole, Rwanda..." className="w-full resize-none rounded-xl border border-border bg-background py-3 pl-9 pr-4 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" rows={2} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-border/50 p-4">
                  <button onClick={handleFinalSubmit} disabled={isPending} className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-white shadow-lg transition-transform active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100">
                    {isPending ? (
                      <><Loader2 className="h-5 w-5 animate-spin" /><span className="font-bold">Processing Order...</span></>
                    ) : (
                      <><span className="font-bold">Place Order</span> • <span>ETB {totalPrice.toFixed(2)}</span></>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}