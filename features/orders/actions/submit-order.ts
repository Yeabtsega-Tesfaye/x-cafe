"use server";

import { prisma } from "@/lib/prisma";
import { OrderType } from "@prisma/client";
import { revalidatePath } from "next/cache";

// 1. Define the exact shape of data coming from the checkout form
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
    // Basic validation
    if (!data.items || data.items.length === 0) {
      return { success: false, error: "Cannot submit an empty order." };
    }

    if (data.type === "DELIVERY" && (!data.deliveryAddress || !data.customerPhone)) {
      return { success: false, error: "Delivery address and phone number are required." };
    }

    // 2. Save to Neon Database
    const order = await prisma.order.create({
      data: {
        tableId: data.tableId || null, // Optional for Delivery/Takeaway
        type: data.type,
        customerName: data.customerName || null,
        customerPhone: data.customerPhone || null,
        deliveryAddress: data.deliveryAddress || null,
        total: data.total,
        // Prisma allows us to create the OrderItems at the exact same time
        items: {
          create: data.items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    });

    // 3. Instantly ping the Kitchen Dashboard so it shows up live!
    revalidatePath("/dashboard/kitchen");

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order Submission Failed:", error);
    return { success: false, error: "Failed to process order. Please try again." };
  }
}