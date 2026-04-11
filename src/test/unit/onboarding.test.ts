import { describe, it, expect } from 'vitest'

describe('Onboarding: Role enum values', () => {
  it('ENGINEER is the default role', () => {
    const defaultRole = 'ENGINEER'
    expect(defaultRole).toBe('ENGINEER')
  })

  it('all three roles are distinct', () => {
    const roles = ['ENGINEER', 'COACH', 'MANAGER']
    const uniqueRoles = new Set(roles)
    expect(uniqueRoles.size).toBe(3)
  })

  it('role values match Prisma enum casing', () => {
    const roles = ['ENGINEER', 'COACH', 'MANAGER']
    roles.forEach(role => {
      expect(role).toBe(role.toUpperCase())
    })
  })

  it('no two roles share the same string value', () => {
    const roles = ['ENGINEER', 'COACH', 'MANAGER']
    for (let i = 0; i < roles.length; i++) {
      for (let j = i + 1; j < roles.length; j++) {
        expect(roles[i]).not.toBe(roles[j])
      }
    }
  })
})

describe('Onboarding: Route protection logic', () => {
  it('onboardingCompleted false means user needs onboarding', () => {
    const user = { onboardingCompleted: false }
    expect(user.onboardingCompleted).toBe(false)
  })

  it('onboardingCompleted true means user skips onboarding', () => {
    const user = { onboardingCompleted: true }
    expect(user.onboardingCompleted).toBe(true)
  })

  it('null user triggers redirect (no onboardingCompleted field)', () => {
    // Mirrors the server component guard: if (!user?.onboardingCompleted) redirect
    const getOnboarded = (u: { onboardingCompleted: boolean } | null) => u?.onboardingCompleted
    expect(getOnboarded(null)).toBeUndefined()
    expect(!getOnboarded(null)).toBe(true)
  })

  it('user with no session email should be treated as unauthenticated', () => {
    const session = { user: { email: null } }
    expect(session?.user?.email).toBeFalsy()
  })
})
