"use server";

import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });

    // Instantly refresh the kitchen dashboard so the UI updates
    revalidatePath("/dashboard/kitchen");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update status:", error);
    return { success: false, error: "Failed to update order status." };
  }
}