import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const VALID_ROLES = ["engineer", "manager", "coach"] as const;
type Role = (typeof VALID_ROLES)[number];

export async function POST(req: NextRequest) {
  console.log("[onboarding/complete] POST called");

  const session = await auth();
  console.log("[onboarding/complete] session:", JSON.stringify(session?.user ?? null));

  if (!session?.user?.email) {
    console.log("[onboarding/complete] No session or email — returning 401");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const role = body.role as Role;
  console.log("[onboarding/complete] role from body:", role);

  if (!VALID_ROLES.includes(role)) {
    console.log("[onboarding/complete] Invalid role:", role);
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  try {
    const user = await prisma.user.upsert({
      where: { email: session.user.email },
      update: { role, onboardingCompleted: true },
      create: {
        email: session.user.email,
        name: session.user.name ?? null,
        image: session.user.image ?? null,
        role,
        onboardingCompleted: true,
      },
    });
    console.log("[onboarding/complete] upserted user id:", user.id);
  } catch (err) {
    console.error("[onboarding/complete] DB error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
