/**
 * Seed UserProgress records for a given user email.
 *
 * Usage:
 *   npx tsx scripts/seed-progress.ts cris@example.com
 *
 * The script reads DATABASE_URL from the environment (or a .env file if you
 * load it beforehand). It upserts M-01, M-02, and M-03 as completed for the
 * specified user.
 */

import { PrismaClient } from "../src/generated/prisma/client"

const MISSIONS_TO_SEED = ["M-01", "M-02", "M-03"]

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.error("ERROR: DATABASE_URL environment variable is not set.")
    process.exit(1)
  }

  if (url.includes("neon.tech")) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaNeonHttp } = require("@prisma/adapter-neon")
    const adapter = new PrismaNeonHttp(url, {})
    return new PrismaClient({ adapter })
  } else {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaPg } = require("@prisma/adapter-pg")
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Pool } = require("pg")
    const pool = new Pool({ connectionString: url })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  }
}

async function main() {
  const email = process.argv[2]

  if (!email) {
    console.error("Usage: npx tsx scripts/seed-progress.ts <user-email>")
    process.exit(1)
  }

  const prisma = createClient()

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true },
    })

    if (!user) {
      console.error(`ERROR: No user found with email "${email}"`)
      process.exit(1)
    }

    console.log(`Found user: ${user.email} (${user.id})`)
    console.log(`Seeding ${MISSIONS_TO_SEED.length} missions...`)

    for (const moduleId of MISSIONS_TO_SEED) {
      await prisma.userProgress.upsert({
        where: { userId_moduleId: { userId: user.id, moduleId } },
        create: { userId: user.id, moduleId },
        update: {},
      })
      console.log(`  ✓ ${moduleId}`)
    }

    console.log(`Done. ${MISSIONS_TO_SEED.length} missions marked complete for ${email}.`)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
