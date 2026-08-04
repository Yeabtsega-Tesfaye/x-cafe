"use server";
import { prisma } from "@/lib/prisma";
import { OrderType } from "@prisma/client";
import { revalidatePath } from "next/cache";

type OrderPayload = {
  tableId?: string;
  type: OrderType;
  customerName?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  items: { id: string; name: string; price: number; quantity: number }[];
  total: number;
};

export async function submitOrder(data: OrderPayload) {
  try {
    if (!data.items || data.items.length === 0) {
      return { success: false, error: "Cannot submit an empty order." };
    }

    if (data.type === "DINE_IN" && !data.tableId) {
      return { success: false, error: "Missing table for a dine-in order." };
    }

    if (data.type === "DELIVERY" && (!data.deliveryAddress || !data.customerPhone)) {
      return { success: false, error: "Delivery address and phone number are required." };
    }

    if (data.type === "TAKEAWAY" && !data.customerName) {
      return { success: false, error: "A name is required so we can call it out at pickup." };
    }

    // Recompute the total server-side from the submitted items rather than
    // trusting data.total directly — a client could otherwise send any
    // total it wants. Note this still trusts each item's *price* as sent
    // by the client; fully closing that gap means verifying against the
    // real menu data server-side, which is a separate, larger change.
    const computedTotal = data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        tableId: data.tableId || null,
        type: data.type,
        customerName: data.customerName || null,
        customerPhone: data.customerPhone || null,
        deliveryAddress: data.deliveryAddress || null,
        total: computedTotal,
        items: {
          create: data.items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    });

    revalidatePath("/dashboard/kitchen");
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order Submission Failed:", error);
    return { success: false, error: "Failed to process order. Please try again." };
  }
}