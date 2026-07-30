import { PrismaClient } from '@prisma/client'
import { neonConfig } from '@neondatabase/serverless' // 1. We no longer import 'Pool'
import { PrismaNeon } from '@prisma/adapter-neon'
import ws from 'ws'

// Set up WebSocket for Neon Serverless
neonConfig.webSocketConstructor = ws

const connectionString = `${process.env.DATABASE_URL}`

// 2. We pass the config directly to PrismaNeon, skipping the manual Pool setup!
const adapter = new PrismaNeon({ connectionString })

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Pass the Neon adapter into the Prisma Client
export const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma