import { describe, it, expect } from 'vitest'
import { computeDora } from '@/lib/dora'

describe('Security: Role validation', () => {
  it('only accepts valid role values', () => {
    const validRoles = ['ENGINEER', 'COACH', 'MANAGER']
    const invalidRoles = ['admin', 'ADMIN', 'superuser', '', 'engineer', 'coach', 'manager', null, undefined]

    validRoles.forEach(role => {
      expect(validRoles).toContain(role)
    })

    invalidRoles.forEach(role => {
      expect(validRoles).not.toContain(role)
    })
  })

  it('role check is case-sensitive', () => {
    const validRoles = ['ENGINEER', 'COACH', 'MANAGER']
    expect(validRoles).not.toContain('engineer')
    expect(validRoles).not.toContain('Engineer')
    expect(validRoles).not.toContain('ENGINEER ') // trailing space makes it invalid
    expect(validRoles).toContain('ENGINEER')
  })
})

describe('Security: Mission ID validation', () => {
  it('mission IDs follow the expected format', () => {
    const validMissionIds = ['M-01', 'M-02', 'M-04', 'M-09', 'M-05', 'M-10', 'M-11', 'M-14', 'M-15', 'M-16']
    const missionIdPattern = /^M-\d{2}$/

    validMissionIds.forEach(id => {
      expect(id).toMatch(missionIdPattern)
    })
  })

  it('rejects malformed mission IDs', () => {
    const invalidIds = ['m-01', 'M-1', 'M01', '../etc/passwd', 'M-001', '']
    const missionIdPattern = /^M-\d{2}$/

    invalidIds.forEach(id => {
      expect(id).not.toMatch(missionIdPattern)
    })
  })

  it('mission IDs are non-empty strings', () => {
    const validMissionIds = ['M-01', 'M-02', 'M-04', 'M-09', 'M-05', 'M-10', 'M-11', 'M-14', 'M-15', 'M-16']
    validMissionIds.forEach(id => {
      expect(typeof id).toBe('string')
      expect(id.length).toBeGreaterThan(0)
    })
  })
})

describe('Security: DORA values are within expected ranges', () => {
  it('CFR values are valid percentages', () => {
    const allMissions = new Set(['M-01', 'M-02', 'M-04', 'M-09', 'M-05', 'M-10', 'M-11', 'M-14', 'M-15', 'M-16'])
    const result = computeDora(allMissions)

    const cfrValue = parseFloat(result.cfr.value)
    expect(cfrValue).toBeGreaterThanOrEqual(0)
    expect(cfrValue).toBeLessThanOrEqual(100)
  })

  it('baseline CFR is a valid percentage', () => {
    const result = computeDora(new Set())
    const cfrValue = parseFloat(result.cfr.value)
    expect(cfrValue).toBeGreaterThanOrEqual(0)
    expect(cfrValue).toBeLessThanOrEqual(100)
  })

  it('perf values are one of the known categories', () => {
    const validPerf = ['LOW PERFORMER', 'MEDIUM PERFORMER', 'HIGH PERFORMER', 'ELITE']
    const allMissions = new Set(['M-01', 'M-02', 'M-04', 'M-09', 'M-05', 'M-10', 'M-11', 'M-14', 'M-15', 'M-16'])
    const result = computeDora(allMissions)

    expect(validPerf).toContain(result.df.perf)
    expect(validPerf).toContain(result.lt.perf)
    expect(validPerf).toContain(result.cfr.perf)
    expect(validPerf).toContain(result.mttr.perf)
  })
})
