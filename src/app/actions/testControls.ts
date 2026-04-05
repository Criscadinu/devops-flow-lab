'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const ALLOWED_DOMAINS = ['cris.g.cadinu', 'agilefanatics']
const MISSION_ORDER = ['M-01', 'M-02', 'M-03', 'M-04', 'M-05', 'M-06', 'M-07']

async function getAuthorizedUser() {
  const session = await auth()
  if (!session?.user?.email) return null

  const isAllowed = ALLOWED_DOMAINS.some((d) => session.user!.email!.includes(d))
  if (!isAllowed) return null

  return prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  })
}

export async function resetAllMissions() {
  const user = await getAuthorizedUser()
  if (!user) return

  await prisma.userProgress.deleteMany({ where: { userId: user.id } })
  revalidatePath('/dashboard')
}

export async function completeUntilMission(missionId: string) {
  const user = await getAuthorizedUser()
  if (!user) return

  const idx = MISSION_ORDER.indexOf(missionId)
  if (idx === -1) return

  for (const moduleId of MISSION_ORDER.slice(0, idx + 1)) {
    try {
      await prisma.userProgress.create({ data: { userId: user.id, moduleId } })
    } catch {
      // already exists — ignore
    }
  }

  revalidatePath('/dashboard')
}
