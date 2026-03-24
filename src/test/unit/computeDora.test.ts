import { describe, it, expect } from 'vitest'
import { computeDora, doraBaseline } from '@/lib/dora'

describe('computeDora', () => {
  it('returns baseline when no missions are completed', () => {
    const result = computeDora(new Set())
    expect(result).toEqual(doraBaseline)
  })

  it('applies M-01 impact: DF improves to 2x per month', () => {
    const result = computeDora(new Set(['M-01']))
    expect(result.df.value).toBe('2× per month')
    expect(result.df.perf).toBe('MEDIUM PERFORMER')
    // Other metrics unchanged
    expect(result.lt).toEqual(doraBaseline.lt)
    expect(result.cfr).toEqual(doraBaseline.cfr)
    expect(result.mttr).toEqual(doraBaseline.mttr)
  })

  it('applies M-01 + M-02: DF, CFR, and LT all update', () => {
    const result = computeDora(new Set(['M-01', 'M-02']))
    expect(result.df.value).toBe('2× per month')
    expect(result.cfr.value).toBe('28%')
    expect(result.lt.value).toBe('36 days')
    expect(result.mttr).toEqual(doraBaseline.mttr)
  })

  it('applies M-01 + M-02 + M-03: CFR and LT update again', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-03']))
    expect(result.df.value).toBe('2× per month')
    expect(result.cfr.value).toBe('18%')
    expect(result.lt.value).toBe('28 days')
    expect(result.mttr).toEqual(doraBaseline.mttr)
  })

  it('applies all four missions M-01 through M-04 correctly', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-03', 'M-04']))
    // M-04 overrides DF and LT
    expect(result.df.value).toBe('1× per week')
    expect(result.lt.value).toBe('14 days')
    // M-03 set CFR to 18%
    expect(result.cfr.value).toBe('18%')
    // MTTR never touched
    expect(result.mttr).toEqual(doraBaseline.mttr)
    // All are medium performer
    expect(result.df.perf).toBe('MEDIUM PERFORMER')
    expect(result.lt.perf).toBe('MEDIUM PERFORMER')
    expect(result.cfr.perf).toBe('MEDIUM PERFORMER')
  })

  it('applies M-02 even without M-01 (order independence of input set)', () => {
    const result = computeDora(new Set(['M-02']))
    // M-01 skipped — DF stays at baseline
    expect(result.df).toEqual(doraBaseline.df)
    // M-02 still applies
    expect(result.cfr.value).toBe('28%')
    expect(result.lt.value).toBe('36 days')
  })

  it('missions are always applied in canonical order M-01→M-04 regardless of Set insertion order', () => {
    // M-04 inserted before M-03 in the Set — result should still reflect M-04 overriding M-03's LT
    const result = computeDora(new Set(['M-04', 'M-03', 'M-02', 'M-01']))
    expect(result.lt.value).toBe('14 days')   // M-04 wins (applied last)
    expect(result.df.value).toBe('1× per week') // M-04 overrides M-01
  })
})
