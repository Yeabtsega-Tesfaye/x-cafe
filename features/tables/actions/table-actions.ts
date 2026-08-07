"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTable(formData: FormData) {
  const number = parseInt(formData.get("number") as string);
  const seats = parseInt(formData.get("seats") as string) || 4;

  await prisma.table.create({
    data: {
      number,
    },
  });
  
  revalidatePath("/admin/tables");
}

export async function deleteTable(id: string) {
  await prisma.table.delete({
    where: { id },
  });
  
  revalidatePath("/admin/tables");
}