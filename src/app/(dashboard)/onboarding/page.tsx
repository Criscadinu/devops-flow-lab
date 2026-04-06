import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { OnboardingClient } from "./OnboardingClient"

export default async function OnboardingPage() {
  const session = await auth()
  if (!session?.user?.email) redirect("/")

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { onboardingCompleted: true },
  })

  if (user?.onboardingCompleted) redirect("/dashboard")

  return <OnboardingClient />
}
