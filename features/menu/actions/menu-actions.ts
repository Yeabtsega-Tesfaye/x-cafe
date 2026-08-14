"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createMenuItem(formData: FormData) {
  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || null;
  const price = parseFloat(formData.get("price") as string);
  const categoryId = formData.get("categoryId") as string;
  const image = (formData.get("image") as string) || null;
  const badge = (formData.get("badge") as string) || null;
  const isAvailable = formData.get("isAvailable") === "true";

  await prisma.menuItem.create({
    data: { name, description, price, categoryId, image, badge, isAvailable },
  });

  revalidatePath("/dashboard/menu");
}

export async function updateMenuItem(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || null;
  const price = parseFloat(formData.get("price") as string);
  const categoryId = formData.get("categoryId") as string;
  const image = (formData.get("image") as string) || null;
  const badge = (formData.get("badge") as string) || null;
  const isAvailable = formData.get("isAvailable") === "true";

  await prisma.menuItem.update({
    where: { id },
    data: { name, description, price, categoryId, image, badge, isAvailable },
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