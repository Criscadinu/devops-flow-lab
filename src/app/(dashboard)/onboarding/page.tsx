import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { OnboardingScreen } from "./OnboardingScreen";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { onboardingCompleted: true },
  });

  if (user?.onboardingCompleted) {
    redirect("/dashboard");
  }

  return <OnboardingScreen />;
}
