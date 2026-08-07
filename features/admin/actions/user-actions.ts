"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

export async function deleteUser(id: string) {
  // Thanks to onDelete: Cascade in your schema, this also deletes their Accounts and Sessions!
  await prisma.user.delete({
    where: { id },
  });
  
  revalidatePath("/admin/users");
}

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  // 1. Generate a unique ID for the new user
  const userId = crypto.randomUUID();

  // 2. Hash the password (REPLACE THIS with your actual hash function from your auth setup!)
  // const hashedPassword = await myHashFunction(password);
  const hashedPassword = password; // WARNING: Do not store plain text passwords in production

  // 3. Create the User and their associated Account credentials
  await prisma.user.create({
    data: {
      id: userId,
      name,
      email,
      role,
      accounts: {
        create: {
          id: crypto.randomUUID(),
          accountId: email,
          providerId: "credential", // Assuming email/password login
          password: hashedPassword,
        }
      }
    },
  });

  revalidatePath("/admin/users");
}