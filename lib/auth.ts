import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  // Only "kitchen" is actually used today. "admin" values are still valid
  // here, just no longer enforced by an enum-like array (that generator
  // path doesn't support it) — restricting to real allowed values would
  // need application-level validation, which isn't worth building until
  // there's an actual admin-creation flow.
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "kitchen",
        input: false, // server-assigned only — never trust a client-supplied role
      },
    },
  },
});