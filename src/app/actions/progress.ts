"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function resetOnboarding() {
  const session = await auth()
  if (!session?.user?.email) return

  await prisma.user.update({
    where: { email: session.user.email },
    data: { onboardingCompleted: false },
  })
}

export async function completeMission(moduleId: string) {
  const session = await auth()
  if (!session?.user?.email) return

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  })
  if (!user) return

  try {
    await prisma.userProgress.create({
      data: { userId: user.id, moduleId },
    })
  } catch {
    // already exists, ignore
  }
}
