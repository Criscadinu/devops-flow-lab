"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function completeMission(moduleId: string) {
  const session = await auth()
  if (!session?.user?.email) return

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  })
  if (!user) return

  await prisma.userProgress.upsert({
    where: { userId_moduleId: { userId: user.id, moduleId } },
    create: { userId: user.id, moduleId },
    update: {},
  })
}
