import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  connectionTimeoutMillis: 15_000,
  max: 10,
});

// Wraps every single query, on every model, with retry logic for transient
// connection failures (Neon cold starts, brief network blips). This is what
// actually fixes "fails once, works on refresh" — it makes the retry happen
// inside the request itself instead of relying on the user hitting refresh.
function withConnectionRetry(client: PrismaClient) {
  return client.$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query }) {
          const maxRetries = 2;
          const retryDelayMs = 750;

          for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
              return await query(args);
            } catch (error) {
              const isTransient =
                error instanceof Error &&
                (error.message.includes("ETIMEDOUT") ||
                  error.message.includes("Connection terminated") ||
                  error.message.includes("connection"));

              if (!isTransient || attempt === maxRetries) {
                throw error;
              }

              await new Promise((resolve) =>
                setTimeout(resolve, retryDelayMs * (attempt + 1))
              );
            }
          }

          // Unreachable — the loop above always either returns or throws —
          // but TypeScript needs an explicit path here.
          throw new Error("Unreachable: retry loop exited without resolution");
        },
      },
    },
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof withConnectionRetry>;
};

export const prisma =
  globalForPrisma.prisma || withConnectionRetry(new PrismaClient({ adapter }));

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;