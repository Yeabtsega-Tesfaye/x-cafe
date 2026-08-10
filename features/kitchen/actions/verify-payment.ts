"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function verifyPayment(orderId: string, actionType: string) {
  try {
    const isApproved = actionType === "PAID";

    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: isApproved ? "PAID" : "REJECTED",
        // If approved, send to kitchen queue (PENDING).
        // If rejected, pass undefined so Prisma leaves the status exactly as it is!
        status: isApproved ? "PENDING" : undefined, 
      },
    });

    revalidatePath("/dashboard/payments");
    revalidatePath("/dashboard/kitchen"); 
    return { success: true };
  } catch (error) {
    return { success: false, error: "Verification failed" };
  }
}