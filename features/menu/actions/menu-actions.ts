"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Adjust these fields if your Prisma schema uses different names
export async function createMenuItem(formData: FormData) {
  await prisma.menuItem.create({
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      isAvailable: formData.get("isAvailable") === "true",
      // We will leave imageUrl blank for now until you connect the image uploader!
    },
  });
  revalidatePath("/dashboard/menu");
}

export async function updateMenuItem(id: string, formData: FormData) {
  await prisma.menuItem.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      isAvailable: formData.get("isAvailable") === "true",
    },
  });
  revalidatePath("/dashboard/menu");
}

export async function toggleAvailability(id: string, isAvailable: boolean) {
  await prisma.menuItem.update({
    where: { id },
    data: { isAvailable },
  });
  revalidatePath("/dashboard/menu");
}

export async function deleteMenuItem(id: string) {
  await prisma.menuItem.delete({ where: { id } });
  revalidatePath("/dashboard/menu");
}