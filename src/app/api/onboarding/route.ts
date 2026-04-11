import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

const VALID_ROLES = ["ENGINEER", "COACH", "MANAGER"] as const
type Role = (typeof VALID_ROLES)[number]

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const role = body.role as Role

  if (!VALID_ROLES.includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 })
  }

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { role, onboardingCompleted: true },
    })
  } catch {
    // User record may not exist yet — create it
    try {
      await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name ?? null,
          image: session.user.image ?? null,
          role,
          onboardingCompleted: true,
        },
      })
    } catch (err) {
      console.error("[api/onboarding] DB error:", err)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }
  }

  return NextResponse.json({ ok: true })
}
