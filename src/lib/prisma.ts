import { PrismaClient } from "@/generated/prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  const url = process.env.DATABASE_URL!
  if (url.includes("neon.tech")) {
    const { PrismaNeonHttp } = require("@prisma/adapter-neon")
    const adapter = new PrismaNeonHttp(url, {})
    return new PrismaClient({ adapter })
  } else {
    const { PrismaPg } = require("@prisma/adapter-pg")
    const { Pool } = require("pg")
    const pool = new Pool({ connectionString: url })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
