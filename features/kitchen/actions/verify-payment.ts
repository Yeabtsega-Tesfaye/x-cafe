"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Changed isApproved to a string to match your frontend binding!
export async function verifyPayment(orderId: string, actionType: string) {
  try {
    const isApproved = actionType === "PAID";

    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: isApproved ? "PAID" : "REJECTED",
        // If approved, send to kitchen. If rejected, cancel the order completely!
        status: isApproved ? "PENDING" : "CANCELLED", 
      },
    });

    revalidatePath("/dashboard/payments");
    revalidatePath("/dashboard/kitchen"); 
    return { success: true };
  } catch (error) {
    return { success: false, error: "Verification failed" };
  }
}