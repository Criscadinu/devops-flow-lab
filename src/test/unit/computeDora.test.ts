import { describe, it, expect } from 'vitest'
import { computeDora, doraBaseline } from '@/lib/dora'

describe('computeDora', () => {
  it('returns baseline when no missions are completed', () => {
    const result = computeDora(new Set())
    expect(result).toEqual(doraBaseline)
  })

  it('M-01 has no DORA impact — VSM is analysis only', () => {
    const result = computeDora(new Set(['M-01']))
    expect(result).toEqual(doraBaseline)
  })

  it('applies M-01 + M-02: only CFR and LT update (DF stays at baseline)', () => {
    const result = computeDora(new Set(['M-01', 'M-02']))
    expect(result.df).toEqual(doraBaseline.df)
    expect(result.cfr.value).toBe('28%')
    expect(result.lt.value).toBe('36 days')
    expect(result.mttr).toEqual(doraBaseline.mttr)
  })

  it('applies M-01 + M-02 + M-03: CFR and LT update again (DF still at baseline)', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-03']))
    expect(result.df).toEqual(doraBaseline.df)
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
    expect(result.lt.value).toBe('14 days')     // M-04 wins (applied last)
    expect(result.df.value).toBe('1× per week') // M-04 is first to set DF
  })

  it('applies M-05: CFR improves', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-03', 'M-04', 'M-05']))
    expect(result.cfr.value).toBe('10%')
    expect(result.cfr.perf).toBe('MEDIUM PERFORMER')
  })

  it('applies M-06: LT improves', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-03', 'M-04', 'M-05', 'M-06']))
    expect(result.lt.value).toBe('7 days')
  })

  it('applies M-07: DF and CFR reach high performer', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-03', 'M-04', 'M-05', 'M-06', 'M-07']))
    expect(result.df.perf).toBe('HIGH PERFORMER')
    expect(result.cfr.perf).toBe('HIGH PERFORMER')
  })

  it('applies M-08: MTTR improves from 72 hours to 4 hours', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-03', 'M-04', 'M-05', 'M-06', 'M-07', 'M-08']))
    expect(result.mttr.value).toBe('4 hours')
    expect(result.mttr.perf).not.toBe('LOW PERFORMER')
  })

  it('applies M-09: MTTR improves to 1 hour', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-03', 'M-04', 'M-05', 'M-06', 'M-07', 'M-08', 'M-09']))
    expect(result.mttr.value).toBe('1 hour')
  })

  it('applies M-10: MTTR improves to 30 minutes', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-03', 'M-04', 'M-05', 'M-06', 'M-07', 'M-08', 'M-09', 'M-10']))
    expect(result.mttr.value).toBe('30 minutes')
  })

  it('full M-01 through M-10 produces elite or high performer across all metrics', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-03', 'M-04', 'M-05', 'M-06', 'M-07', 'M-08', 'M-09', 'M-10']))
    expect(['HIGH PERFORMER', 'ELITE']).toContain(result.df.perf)
    expect(['HIGH PERFORMER', 'ELITE']).toContain(result.lt.perf)
    expect(['HIGH PERFORMER', 'ELITE']).toContain(result.cfr.perf)
    expect(['HIGH PERFORMER', 'ELITE']).toContain(result.mttr.perf)
  })
})
