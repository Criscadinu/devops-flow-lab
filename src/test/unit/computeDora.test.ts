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

  it('applies M-01 + M-02 + M-05: CFR and LT update again (DF still at baseline)', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-05']))
    expect(result.df).toEqual(doraBaseline.df)
    expect(result.cfr.value).toBe('18%')
    expect(result.lt.value).toBe('28 days')
    expect(result.mttr).toEqual(doraBaseline.mttr)
  })

  it('applies all four missions M-01 through M-16 correctly', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-05', 'M-16']))
    // M-16 overrides DF and LT
    expect(result.df.value).toBe('1× per week')
    expect(result.lt.value).toBe('14 days')
    // M-05 set CFR to 18%
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

  it('missions are always applied in canonical order M-01→M-16 regardless of Set insertion order', () => {
    // M-16 inserted before M-05 in the Set — result should still reflect M-16 overriding M-05's LT
    const result = computeDora(new Set(['M-16', 'M-05', 'M-02', 'M-01']))
    expect(result.lt.value).toBe('14 days')     // M-16 wins (applied last)
    expect(result.df.value).toBe('1× per week') // M-16 is first to set DF
  })

  it('applies M-06: CFR improves', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-05', 'M-16', 'M-06']))
    expect(result.cfr.value).toBe('10%')
    expect(result.cfr.perf).toBe('MEDIUM PERFORMER')
  })

  it('applies M-04: LT improves', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-05', 'M-16', 'M-06', 'M-04']))
    expect(result.lt.value).toBe('7 days')
  })

  it('applies M-20: DF and CFR reach high performer', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-05', 'M-16', 'M-06', 'M-04', 'M-20']))
    expect(result.df.perf).toBe('HIGH PERFORMER')
    expect(result.cfr.perf).toBe('HIGH PERFORMER')
  })

  it('applies M-23: MTTR improves from 72 hours to 4 hours', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-05', 'M-16', 'M-06', 'M-04', 'M-20', 'M-23']))
    expect(result.mttr.value).toBe('4 hours')
    expect(result.mttr.perf).not.toBe('LOW PERFORMER')
  })

  it('M-08 through M-13 have no direct DORA impact — they are AUTOMATED_TESTING foundation missions', () => {
    const withFoundation = computeDora(new Set(['M-01', 'M-02', 'M-05', 'M-16', 'M-06']))
    const withAll = computeDora(new Set(['M-01', 'M-02', 'M-05', 'M-16', 'M-06', 'M-08', 'M-09', 'M-10', 'M-11', 'M-12', 'M-13']))
    expect(withAll.df).toEqual(withFoundation.df)
    expect(withAll.lt).toEqual(withFoundation.lt)
    expect(withAll.cfr).toEqual(withFoundation.cfr)
    expect(withAll.mttr).toEqual(withFoundation.mttr)
  })

  it('applies M-24: MTTR improves to 1 hour', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-05', 'M-16', 'M-06', 'M-04', 'M-20', 'M-23', 'M-24']))
    expect(result.mttr.value).toBe('1 hour')
  })

  it('applies M-17: MTTR improves to 30 minutes', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-05', 'M-16', 'M-06', 'M-04', 'M-20', 'M-23', 'M-24', 'M-17']))
    expect(result.mttr.value).toBe('30 minutes')
  })

  it('full M-01 through M-17 produces elite or high performer across all metrics', () => {
    const result = computeDora(new Set(['M-01', 'M-02', 'M-05', 'M-16', 'M-06', 'M-04', 'M-20', 'M-23', 'M-24', 'M-17']))
    expect(['HIGH PERFORMER', 'ELITE']).toContain(result.df.perf)
    expect(['HIGH PERFORMER', 'ELITE']).toContain(result.lt.perf)
    expect(['HIGH PERFORMER', 'ELITE']).toContain(result.cfr.perf)
    expect(['HIGH PERFORMER', 'ELITE']).toContain(result.mttr.perf)
  })
})
