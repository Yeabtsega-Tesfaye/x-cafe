import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  connectionTimeoutMillis: 30_000, 
  max: 10,
});

const RETRYABLE_CODES = new Set([
  "ETIMEDOUT", 
  "ECONNRESET", 
  "EAI_AGAIN",
  "P1001",
  "P1008",
  "P2024"
]);

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
              const code = (error as { code?: string })?.code;
              const isTransient = code !== undefined && RETRYABLE_CODES.has(code);

              if (!isTransient || attempt === maxRetries) {
                throw error;
              }

              await new Promise((resolve) =>
                setTimeout(resolve, retryDelayMs * (attempt + 1))
              );
            }
          }

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