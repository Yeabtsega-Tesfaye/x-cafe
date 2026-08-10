"use server";

import { revalidatePath } from "next/cache";

// ============================================================================
// MOCKED MENU ACTIONS
// These are currently bypassing Prisma so the app can build using menu.ts!
// The admin buttons will click successfully, but won't save data permanently.
// ============================================================================

export async function createMenuItem(formData: FormData) {
  console.log("Mocked Create:", formData.get("name"));
  revalidatePath("/dashboard/menu");
}

export async function updateMenuItem(id: string, formData: FormData) {
  console.log("Mocked Update:", id, formData.get("name"));
  revalidatePath("/dashboard/menu");
}

export async function toggleAvailability(id: string, isAvailable: boolean) {
  console.log("Mocked Toggle:", id, isAvailable);
  revalidatePath("/dashboard/menu");
}

export async function deleteMenuItem(id: string) {
  console.log("Mocked Delete:", id);
  revalidatePath("/dashboard/menu");
}