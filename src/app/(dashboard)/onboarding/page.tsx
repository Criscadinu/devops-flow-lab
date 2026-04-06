import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { OnboardingClient } from "./OnboardingClient"

export default async function OnboardingPage() {
  const session = await auth()
  if (!session?.user?.email) redirect("/")

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  })

  if (user) {
    const hasProgress = await prisma.userProgress.findFirst({
      where: { userId: user.id },
      select: { id: true },
    })
    if (hasProgress) redirect("/dashboard")
  }

  return <OnboardingClient />
}
