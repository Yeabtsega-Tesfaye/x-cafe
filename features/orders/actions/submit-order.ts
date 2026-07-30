"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache"; // 1. Add this import

export async function submitOrder(
  tableId: string, 
  items: { name: string; price: number; quantity: number }[], 
  total: number
) {
  try {
    const order = await prisma.order.create({
      data: {
        tableId,
        total,
        items: {
          create: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    });

    // 2. Add this line: Tell Next.js to refresh the memory for this specific table
    revalidatePath(`/menu/${tableId}`);

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Failed to submit order:", error);
    return { success: false, error: "Failed to send order to kitchen." };
  }
}