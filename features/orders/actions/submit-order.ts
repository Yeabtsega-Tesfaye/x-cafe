"use server";
import { prisma } from "@/lib/prisma";
import { OrderType, PaymentMethod, PaymentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

type OrderPayload = {
  tableId?: string;
  type: OrderType;
  customerName?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  note?: string;
  paymentMethod: PaymentMethod;
  receiptPhoto?: File | null;
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

    if (data.paymentMethod !== "CASH" && (!data.receiptPhoto)) {
      return {
        success: false,
        error: "A transaction reference and receipt photo are required for digital payments.",
      };
    }

    let receiptUrl: string | null = null;
    if (data.receiptPhoto) {
      const blob = await put(
        `receipts/${Date.now()}-${data.receiptPhoto.name}`,
        data.receiptPhoto,
        { access: "public" }
      );
      receiptUrl = blob.url;
    }

    const computedTotal = data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Cash needs no digital verification — it's confirmed in person when
    // money changes hands, so it should never block the kitchen. Digital
    // payments start held until a cashier actually checks the receipt.
    const paymentStatus: PaymentStatus =
      data.paymentMethod === "CASH" ? "PENDING" : "VERIFICATION_REQUIRED";

    const order = await prisma.order.create({
      data: {
        tableId: data.tableId || null,
        type: data.type,
        customerName: data.customerName || null,
        customerPhone: data.customerPhone || null,
        deliveryAddress: data.deliveryAddress || null,
        note: data.note || null,
        paymentMethod: data.paymentMethod,
        paymentStatus,
        receiptUrl,
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
    revalidatePath("/dashboard/payments");
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order Submission Failed:", error);
    return { success: false, error: "Failed to process order. Please try again." };
  }
}