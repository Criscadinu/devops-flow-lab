export type DoraMetric = {
  value: string
  perf: string
}

export type DoraState = {
  df:   DoraMetric
  lt:   DoraMetric
  cfr:  DoraMetric
  mttr: DoraMetric
}

export const doraBaseline: DoraState = {
  df:   { value: "1× per month", perf: "LOW PERFORMER" },
  lt:   { value: "43 days",      perf: "LOW PERFORMER" },
  cfr:  { value: "42%",          perf: "LOW PERFORMER" },
  mttr: { value: "72 hours",     perf: "LOW PERFORMER" },
}

export const missionImpact: Record<string, Partial<DoraState>> = {
  "M-01": {
    df: { value: "2× per month", perf: "MEDIUM PERFORMER" },
  },
  "M-02": {
    cfr: { value: "28%",     perf: "MEDIUM PERFORMER" },
    lt:  { value: "36 days", perf: "MEDIUM PERFORMER" },
  },
  "M-03": {
    cfr: { value: "18%",     perf: "MEDIUM PERFORMER" },
    lt:  { value: "28 days", perf: "MEDIUM PERFORMER" },
  },
  "M-04": {
    df: { value: "1× per week", perf: "MEDIUM PERFORMER" },
    lt: { value: "14 days",     perf: "MEDIUM PERFORMER" },
  },
  "M-05": {
    cfr: { value: "10%",     perf: "MEDIUM PERFORMER" },
    lt:  { value: "10 days", perf: "MEDIUM PERFORMER" },
  },
  "M-06": {
    cfr: { value: "7%",     perf: "MEDIUM PERFORMER" },
    lt:  { value: "7 days", perf: "MEDIUM PERFORMER" },
  },
  "M-07": {
    cfr: { value: "4%",                   perf: "HIGH PERFORMER"   },
    lt:  { value: "5 days",               perf: "HIGH PERFORMER"   },
    df:  { value: "Multiple times / week", perf: "HIGH PERFORMER"  },
  },
}

/** Apply mission impacts in canonical order (M-01 → M-07) to produce current DORA state. */
export function computeDora(completedIds: Set<string>): DoraState {
  let state = { ...doraBaseline }
  for (const id of ["M-01", "M-02", "M-03", "M-04", "M-05", "M-06", "M-07"]) {
    if (completedIds.has(id) && missionImpact[id]) {
      state = { ...state, ...missionImpact[id] }
    }
  }
  return state
}
