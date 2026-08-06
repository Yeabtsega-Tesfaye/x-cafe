"use client";
import { useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, ArrowRight, ArrowLeft, Loader2, UtensilsCrossed, Bike, Store, CreditCard, Camera } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { submitOrder } from "../actions/submit-order";

type OrderType = "DINE_IN" | "TAKEAWAY" | "DELIVERY";
type PaymentMethod = "CASH" | "TELEBIRR" | "CBE";

export function FloatingCart() {
  const router = useRouter();
  const params = useParams();

  const tableId = params?.tableId as string | undefined;
  const [isPending, startTransition] = useTransition();
  const [view, setView] = useState<"cart" | "checkout">("cart");

  const [orderType, setOrderType] = useState<OrderType>(tableId ? "DINE_IN" : "TAKEAWAY");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("TELEBIRR");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  // Revoke the object URL when it's replaced or the component unmounts,
  // so we don't leak memory holding onto old preview images.
  useEffect(() => {
    return () => {
      if (receiptPreview) URL.revokeObjectURL(receiptPreview);
    };
  }, [receiptPreview]);

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReceiptFile(file);
    setReceiptPreview(URL.createObjectURL(file));
  };

  const clearReceipt = () => {
    setReceiptFile(null);
    setReceiptPreview(null);
  };

  const { items, isOpen, setIsOpen, getTotalItems, getTotalPrice, updateQuantity, clearCart } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleFinalSubmit = () => {
    if (orderType === "DELIVERY" && (!formData.address || !formData.phone)) {
      alert("Please fill in your delivery address and phone number.");
      return;
    }
    if (paymentMethod !== "CASH" && (!receiptFile)) {
      alert("Please enter your transaction reference and upload a photo of your receipt.");
      return;
    }

    startTransition(async () => {
      const payload = {
        tableId: tableId,
        type: orderType,
        customerName: formData.name,
        customerPhone: formData.phone,
        deliveryAddress: formData.address,
        paymentMethod: paymentMethod,
        receiptPhoto: receiptFile,
        items: items,
        total: totalPrice,
      };
      const result = await submitOrder(payload);

      if (result.success) {
        clearCart();
        clearReceipt();
        setIsOpen(false);
        setView("cart");
        router.push(`/success?orderId=${result.orderId}`);
      } else {
        alert(result.error);
      }
    });
  };

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
                    <div className="flex-1 space-y-4 overflow-y-auto p-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-sm font-bold text-text-primary">{item.name}</p>
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
                  <h3 className="font-display text-lg font-bold text-text-primary">Checkout & Payment</h3>
                </div>
                <div className="flex-1 space-y-6 overflow-y-auto p-5">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-text-secondary">Order Type</label>
                    <div className="grid grid-cols-3 gap-2 rounded-xl border border-border/50 bg-background-secondary p-1">
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
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-text-secondary">Your Name</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Nati" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                    </div>
                    {(orderType === "DELIVERY" || orderType === "TAKEAWAY") && (
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-text-secondary">Phone Number <span className="text-red-500">*</span></label>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="0911..." className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                      </div>
                    )}
                    {orderType === "DELIVERY" && (
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-text-secondary">Delivery Address <span className="text-red-500">*</span></label>
                        <textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Bole, Addis Ababa..." className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" rows={2} />
                      </div>
                    )}
                  </div>

                  {/* Payment Method — now matches Order Type's segmented-control styling exactly */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-text-secondary">Payment Method</label>
                    <div className="grid grid-cols-3 gap-2 rounded-xl border border-border/50 bg-background-secondary p-1">
                      <button onClick={() => setPaymentMethod("TELEBIRR")} className={`flex flex-col items-center gap-1.5 rounded-lg py-2.5 text-xs font-bold transition-all ${paymentMethod === "TELEBIRR" ? "bg-background text-accent shadow-sm" : "text-text-secondary"}`}>
                        <CreditCard className="h-4 w-4" /> Telebirr
                      </button>
                      <button onClick={() => setPaymentMethod("CBE")} className={`flex flex-col items-center gap-1.5 rounded-lg py-2.5 text-xs font-bold transition-all ${paymentMethod === "CBE" ? "bg-background text-accent shadow-sm" : "text-text-secondary"}`}>
                        <CreditCard className="h-4 w-4" /> CBE
                      </button>
                      <button onClick={() => setPaymentMethod("CASH")} className={`flex flex-col items-center gap-1.5 rounded-lg py-2.5 text-xs font-bold transition-all ${paymentMethod === "CASH" ? "bg-background text-accent shadow-sm" : "text-text-secondary"}`}>
                        <Store className="h-4 w-4" /> Cash
                      </button>
                    </div>

                    {paymentMethod !== "CASH" && (
                      <div className="space-y-3">
                        <div>
                          <label className="mb-1.5 block text-xs font-bold text-text-secondary">
                            Receipt Photo <span className="text-red-500">*</span>
                          </label>
                          {receiptPreview ? (
                            <div className="relative overflow-hidden rounded-xl border border-border">
                              <img src={receiptPreview} alt="Receipt preview" className="h-40 w-full object-cover" />
                              <button
                                type="button"
                                onClick={clearReceipt}
                                aria-label="Remove receipt photo"
                                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-text-primary shadow-sm"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background py-6 text-xs font-medium text-text-secondary transition-colors hover:border-accent hover:text-accent">
                              <Camera className="h-5 w-5" />
                              Take or upload a photo of your receipt
                              <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                onChange={handleReceiptChange}
                                className="hidden"
                              />
                            </label>
                          )}
                          <p className="mt-1 text-[10px] text-text-secondary">
                            Transfer the total to X Cafe's account, then upload a screenshot or photo of the confirmation.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="border-t border-border/50 p-4">
                  <button onClick={handleFinalSubmit} disabled={isPending} className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-white shadow-lg transition-transform active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100">
                    {isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="font-bold">Processing Order...</span>
                      </>
                    ) : (
                      <>
                        <span className="font-bold">Place Order</span> • <span>ETB {totalPrice.toFixed(2)}</span>
                      </>
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