import { describe, it, expect } from 'vitest'
import { computeDora, doraBaseline } from '@/lib/dora'

describe('Mission ordering and DORA progression', () => {
  it('baseline has LOW PERFORMER MTTR', () => {
    const result = computeDora(new Set())
    expect(result.mttr.perf).toBe('LOW PERFORMER')
    expect(result.mttr.value).toBe('72 hours')
  })

  it('MTTR only improves after M-14, not before', () => {
    const beforeM08 = computeDora(new Set(['M-01', 'M-02', 'M-04', 'M-09', 'M-05', 'M-10', 'M-11']))
    expect(beforeM08.mttr.value).toBe('72 hours')

    const afterM08 = computeDora(new Set(['M-01', 'M-02', 'M-04', 'M-09', 'M-05', 'M-10', 'M-11', 'M-14']))
    expect(afterM08.mttr.value).toBe('4 hours')
  })

  it('CFR only reaches HIGH PERFORMER after M-11', () => {
    const beforeM07 = computeDora(new Set(['M-01', 'M-02', 'M-04', 'M-09', 'M-05', 'M-10']))
    expect(beforeM07.cfr.perf).not.toBe('HIGH PERFORMER')

    const afterM07 = computeDora(new Set(['M-01', 'M-02', 'M-04', 'M-09', 'M-05', 'M-10', 'M-11']))
    expect(afterM07.cfr.perf).toBe('HIGH PERFORMER')
  })

  it('empty set returns exact baseline values', () => {
    const result = computeDora(new Set())
    expect(result.df.value).toBe('1× per month')
    expect(result.lt.value).toBe('43 days')
    expect(result.cfr.value).toBe('42%')
    expect(result.mttr.value).toBe('72 hours')
  })

  it('doraBaseline export matches computeDora with empty set', () => {
    const result = computeDora(new Set())
    expect(result).toEqual(doraBaseline)
  })

  it('M-14 through M-16 form a continuous MTTR improvement chain', () => {
    const after08 = computeDora(new Set(['M-01', 'M-02', 'M-04', 'M-09', 'M-05', 'M-10', 'M-11', 'M-14']))
    const after09 = computeDora(new Set(['M-01', 'M-02', 'M-04', 'M-09', 'M-05', 'M-10', 'M-11', 'M-14', 'M-15']))
    const after10 = computeDora(new Set(['M-01', 'M-02', 'M-04', 'M-09', 'M-05', 'M-10', 'M-11', 'M-14', 'M-15', 'M-16']))

    expect(after08.mttr.value).toBe('4 hours')
    expect(after09.mttr.value).toBe('1 hour')
    expect(after10.mttr.value).toBe('30 minutes')
  })

  it('completing only Second Way missions without First Way still applies their impact', () => {
    // M-14 standalone — MTTR should still improve even without M-01–M-11
    const result = computeDora(new Set(['M-14']))
    expect(result.mttr.value).toBe('4 hours')
    // First Way metrics stay at baseline
    expect(result.df.value).toBe('1× per month')
  })
})
