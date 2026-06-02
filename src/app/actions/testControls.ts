'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const ALLOWED_DOMAINS = ['cris.g.cadinu', 'agilefanatics']
const MISSION_ORDER = [
  'M-01', 'M-02', 'M-03', 'M-04',
  'M-05', 'M-06', 'M-07', 'M-08', 'M-09', 'M-10', 'M-11', 'M-12', 'M-13',
  'M-14', 'M-15',
  'M-16', 'M-17', 'M-18', 'M-19', 'M-20',
  'M-21', 'M-22', 'M-23', 'M-24', 'M-25', 'M-26', 'M-27',
]

const FIRST_WAY  = [
  'M-01', 'M-02', 'M-03', 'M-04',
  'M-05', 'M-06', 'M-07', 'M-08', 'M-09', 'M-10', 'M-11', 'M-12', 'M-13',
  'M-14', 'M-15',
  'M-16', 'M-17', 'M-18', 'M-19', 'M-20',
]
const SECOND_WAY = [...FIRST_WAY, 'M-21', 'M-22', 'M-23', 'M-24', 'M-25']
const THIRD_WAY  = [...SECOND_WAY, 'M-26', 'M-27']

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

async function completeMissions(missions: string[]) {
  const user = await getAuthorizedUser()
  if (!user) return

  for (const moduleId of missions) {
    try {
      await prisma.userProgress.create({ data: { userId: user.id, moduleId } })
    } catch {
      // already exists — ignore
    }
  }

  revalidatePath('/dashboard')
}

export async function resetAllMissions() {
  const user = await getAuthorizedUser()
  if (!user) return

  await prisma.userProgress.deleteMany({ where: { userId: user.id } })
  revalidatePath('/dashboard')
}

export async function completeUntilMission(missionId: string) {
  const idx = MISSION_ORDER.indexOf(missionId)
  if (idx === -1) return
  await completeMissions(MISSION_ORDER.slice(0, idx + 1))
}

export async function completeFirstWay() {
  await completeMissions(FIRST_WAY)
}

export async function completeSecondWay() {
  await completeMissions(SECOND_WAY)
}

export async function completeThirdWay() {
  await completeMissions(THIRD_WAY)
}
