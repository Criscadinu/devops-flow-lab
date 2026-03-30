"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

// ─── Data ─────────────────────────────────────────────────────────────────────

const CORRECT_ORDER = [
  "Idea / Ticket",
  "Write Code",
  "Code Review",
  "QA Testing",
  "Acceptance (ACC)",
  "Deploy to Production",
] as const;

type Step = (typeof CORRECT_ORDER)[number];

// In hours (1 day = 8 hours)
const CORRECT_TIMES: { pt: number; wt: number }[] = [
  { pt: 16, wt: 40 },  // Idea/Ticket: 2d, 5d
  { pt: 24, wt: 24 },  // Write Code: 3d, 3d
  { pt: 4,  wt: 8  },  // Code Review: 4h, 1d
  { pt: 16, wt: 40 },  // QA Testing: 2d, 5d
  { pt: 8,  wt: 64 },  // Acceptance: 1d, 8d
  { pt: 4,  wt: 96 },  // Deploy: 4h, 12d
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function toHours(value: number, unit: "dagen" | "uren"): number {
  return unit === "dagen" ? value * 8 : value;
}


// ─── Sortable card ────────────────────────────────────────────────────────────

function SortableCard({
  id,
  wrongIds,
}: {
  id: Step;
  wrongIds: Set<Step>;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const isWrong = wrongIds.has(id);

  return (
    <div
      ref={setNodeRef}
      className="flex items-center gap-3 px-4 py-3 border select-none"
      aria-label={id}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.25 : 1,
        backgroundColor: isWrong ? "#130606" : "#0a0a0a",
        borderColor: isWrong ? "rgba(239,68,68,0.5)" : "rgb(31,41,55)",
        borderLeft: isWrong
          ? "3px solid rgb(239,68,68)"
          : "3px solid rgb(6,182,212)",
      }}
    >
      {/* Drag handle */}
      <span
        {...listeners}
        className="text-gray-700 text-base font-mono cursor-grab active:cursor-grabbing select-none shrink-0"
        aria-label="Drag to reorder"
      >
        ⠿
      </span>

      <span className="text-gray-200 text-sm flex-1">{id}</span>

      {isWrong && (
        <span className="text-xs font-mono shrink-0" style={{ color: "rgb(239,68,68)" }}>
          ✗ Wrong
        </span>
      )}
    </div>
  );
}

function DragCard({ id }: { id: Step }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 border shadow-2xl"
      style={{
        backgroundColor: "#0f1a1a",
        borderColor: "rgb(6,182,212)",
        borderLeft: "3px solid rgb(6,182,212)",
        rotate: "1.5deg",
      }}
    >
      <span className="text-gray-500 text-base font-mono">⠿</span>
      <span className="text-white text-sm">{id}</span>
    </div>
  );
}

// ─── Part 1 - Sort the steps ──────────────────────────────────────────────────

function Part1({ onComplete }: { onComplete: () => void }) {
  const [items, setItems] = useState<Step[]>(() => shuffle([...CORRECT_ORDER]));
  const [activeId, setActiveId] = useState<Step | null>(null);
  const [wrongIds, setWrongIds] = useState<Set<Step>>(new Set());
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragStart(e: DragStartEvent) {
    setActiveId(e.active.id as Step);
    // Clear errors on new drag
    if (wrongIds.size > 0) setWrongIds(new Set());
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveId(null);
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const from = prev.indexOf(active.id as Step);
        const to = prev.indexOf(over.id as Step);
        return arrayMove(prev, from, to);
      });
    }
  }

  function checkOrder() {
    const wrong = new Set<Step>();
    items.forEach((step, i) => {
      if (step !== CORRECT_ORDER[i]) wrong.add(step);
    });
    setWrongIds(wrong);
    setChecked(true);
    if (wrong.size === 0) {
      setCorrect(true);
      setTimeout(onComplete, 1200);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl text-white" style={{ ...syne.style, fontWeight: 700 }}>
          Step 1 - Sort the steps in the correct order
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Drag the steps from idea to production in the order you think is correct.
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2">
            {items.map((step) => (
              <SortableCard key={step} id={step} wrongIds={wrongIds} />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId ? <DragCard id={activeId} /> : null}
        </DragOverlay>
      </DndContext>

      <div className="flex items-center gap-4">
        {!correct && (
          <button
            onClick={checkOrder}
            className="px-6 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
            style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style }}
          >
            Check order
          </button>
        )}

        {checked && !correct && wrongIds.size > 0 && (
          <p className="text-sm font-mono" style={{ color: "rgb(239,68,68)" }}>
            {wrongIds.size} step{wrongIds.size !== 1 ? "s" : ""} in the wrong position.
          </p>
        )}

        {correct && (
          <p className="text-sm font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>
            ✓ Correct! Order is right.
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Part 2 - Fill in the times ───────────────────────────────────────────────

type Unit = "dagen" | "uren";

interface Row {
  ptValue: string;
  ptUnit: Unit;
  wtValue: string;
  wtUnit: Unit;
}

interface RowResult {
  ptCorrect: boolean;
  wtCorrect: boolean;
}

// Human-readable correct answers + source quote per cell
const STEP_META = [
  {
    ptLabel: "2 days",  wtLabel: "5 days",
    ptSource: "Tom: \"Writing specs costs me 2 days per feature.\"",
    wtSource: "Tom: \"A ticket sits 5 days before a developer picks it up.\"",
  },
  {
    ptLabel: "3 days",  wtLabel: "3 days",
    ptSource: "Lisa: \"Writing code takes 3 days.\"",
    wtSource: "Lisa: \"I wait 3 days for code review.\"",
  },
  {
    ptLabel: "4 hours", wtLabel: "1 day",
    ptSource: "Lisa: \"The review takes 4 hours.\"",
    wtSource: "Lisa: \"Then 1 day before QA picks it up.\"",
  },
  {
    ptLabel: "2 days",  wtLabel: "5 days",
    ptSource: "Kai: \"Testing takes 2 days.\"",
    wtSource: "Kai: \"We wait 5 days before we can start — the test environment is busy.\"",
  },
  {
    ptLabel: "1 day",   wtLabel: "8 days",
    ptSource: "Marco: \"Acceptance testing in ACC takes 1 day.\"",
    wtSource: "Marco: \"Deployment to ACC: 8 days waiting — it has to be scheduled.\"",
  },
  {
    ptLabel: "4 hours", wtLabel: "12 days",
    ptSource: "Marco: \"Deploy to production is manual, takes 4 hours.\"",
    wtSource: "Marco: \"Locked to the last Friday — average 12 days wait time.\"",
  },
] as const;

function formatEntry(value: string, unit: Unit): string {
  const n = parseFloat(value);
  if (isNaN(n) || value === "") return "(empty)";
  const label =
    unit === "dagen"
      ? n === 1 ? "day" : "days"
      : n === 1 ? "hour" : "hours";
  return `${n} ${label}`;
}

function isCorrect10(input: number, unit: Unit, correctHours: number): boolean {
  const inputHours = toHours(input, unit);
  return Math.abs(inputHours - correctHours) <= correctHours * 0.1;
}

function Part2({ onComplete }: { onComplete: () => void }) {
  const [rows, setRows] = useState<Row[]>(
    CORRECT_ORDER.map(() => ({ ptValue: "", ptUnit: "dagen", wtValue: "", wtUnit: "dagen" }))
  );
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<RowResult[]>(
    CORRECT_ORDER.map(() => ({ ptCorrect: false, wtCorrect: false }))
  );

  function updateRow(i: number, patch: Partial<Row>) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }

  const CORRECT_FILL: Row[] = [
    { ptValue: "2", ptUnit: "dagen", wtValue: "5",  wtUnit: "dagen" },
    { ptValue: "3", ptUnit: "dagen", wtValue: "3",  wtUnit: "dagen" },
    { ptValue: "4", ptUnit: "uren",  wtValue: "1",  wtUnit: "dagen" },
    { ptValue: "2", ptUnit: "dagen", wtValue: "5",  wtUnit: "dagen" },
    { ptValue: "1", ptUnit: "dagen", wtValue: "8",  wtUnit: "dagen" },
    { ptValue: "4", ptUnit: "uren",  wtValue: "12", wtUnit: "dagen" },
  ];

  function calculate() {
    setResults(
      rows.map((row, i) => {
        const ptNum = parseFloat(row.ptValue);
        const wtNum = parseFloat(row.wtValue);
        return {
          ptCorrect: !isNaN(ptNum) && isCorrect10(ptNum, row.ptUnit, CORRECT_TIMES[i].pt),
          wtCorrect: !isNaN(wtNum) && isCorrect10(wtNum, row.wtUnit, CORRECT_TIMES[i].wt),
        };
      })
    );
    setSubmitted(true);
  }

  function fillCorrectAnswers() {
    setRows(CORRECT_FILL);
    setResults(CORRECT_ORDER.map(() => ({ ptCorrect: true, wtCorrect: true })));
    setSubmitted(true);
  }

  function cellStyle(correct: boolean | null) {
    if (correct === null) return { backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)" };
    return correct
      ? { backgroundColor: "#061206", borderColor: "rgba(34,197,94,0.5)" }
      : { backgroundColor: "#130606", borderColor: "rgba(239,68,68,0.5)" };
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl text-white" style={{ ...syne.style, fontWeight: 700 }}>
          Step 2 - Fill in the process time and wait time per step
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Use the information from the conversations. You&apos;ve heard all the numbers.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-800 text-sm">
          <thead>
            <tr style={{ backgroundColor: "#0d0d0d" }}>
              <th className="text-left px-4 py-3 border border-gray-800 text-gray-500 font-mono text-xs tracking-widest uppercase font-normal">
                Step
              </th>
              <th className="px-4 py-3 border border-gray-800 text-gray-500 font-mono text-xs tracking-widest uppercase font-normal text-center" colSpan={2}>
                Process Time
              </th>
              <th className="px-4 py-3 border border-gray-800 text-gray-500 font-mono text-xs tracking-widest uppercase font-normal text-center" colSpan={2}>
                Wait Time
              </th>
            </tr>
          </thead>
          <tbody>
            {CORRECT_ORDER.map((step, i) => {
              const row = rows[i];
              const r = results[i];
              const ptStyle = cellStyle(submitted ? r.ptCorrect : null);
              const wtStyle = cellStyle(submitted ? r.wtCorrect : null);
              return (
                <tr
                  key={step}
                  className="border border-gray-800"
                  style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#060606" }}
                >
                  <td className="px-4 py-3 border border-gray-800 text-gray-300 text-sm whitespace-nowrap">
                    <span className="font-mono text-xs mr-2" style={{ color: "rgb(6,182,212)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </td>

                  {/* PT value */}
                  <td className="px-2 py-2 border border-gray-800">
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={row.ptValue}
                      onChange={(e) => updateRow(i, { ptValue: e.target.value })}
                      placeholder="0"
                      className="w-20 px-2 py-1.5 text-sm font-mono text-white outline-none border"
                      style={ptStyle}
                    />
                  </td>

                  {/* PT unit */}
                  <td className="px-2 py-2 border border-gray-800">
                    <select
                      value={row.ptUnit}
                      onChange={(e) => updateRow(i, { ptUnit: e.target.value as Unit })}
                      className="px-2 py-1.5 text-sm font-mono text-gray-300 outline-none border"
                      style={{ backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)" }}
                    >
                      <option value="dagen">days</option>
                      <option value="uren">hours</option>
                    </select>
                  </td>

                  {/* WT value */}
                  <td className="px-2 py-2 border border-gray-800">
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={row.wtValue}
                      onChange={(e) => updateRow(i, { wtValue: e.target.value })}
                      placeholder="0"
                      className="w-20 px-2 py-1.5 text-sm font-mono text-white outline-none border"
                      style={wtStyle}
                    />
                  </td>

                  {/* WT unit */}
                  <td className="px-2 py-2 border border-gray-800">
                    <select
                      value={row.wtUnit}
                      onChange={(e) => updateRow(i, { wtUnit: e.target.value as Unit })}
                      className="px-2 py-1.5 text-sm font-mono text-gray-300 outline-none border"
                      style={{ backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)" }}
                    >
                      <option value="dagen">days</option>
                      <option value="uren">hours</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Calculate button - always shown */}
      <div>
        <button
          onClick={calculate}
          className="px-6 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
          style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style }}
        >
          Calculate
        </button>
      </div>

      {/* ── Results section ─────────────────────────────────────────────────── */}
      {submitted && (
        <div className="flex flex-col gap-5">

          {/* Per-row validation */}
          <div className="flex flex-col gap-0 border border-gray-800">
            <div
              className="px-4 py-3 border-b border-gray-800"
              style={{ backgroundColor: "#0d0d0d" }}
            >
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                Answer review
              </span>
            </div>

            {CORRECT_ORDER.map((step, i) => {
              const row = rows[i];
              const r = results[i];
              const meta = STEP_META[i];
              const allOk = r.ptCorrect && r.wtCorrect;

              return (
                <div
                  key={step}
                  className="flex flex-col gap-3 px-4 py-4 border-b border-gray-800 last:border-b-0"
                  style={{
                    backgroundColor: allOk ? "#060f06" : i % 2 === 0 ? "#080808" : "#060606",
                    borderLeft: `3px solid ${allOk ? "rgb(34,197,94)" : "rgb(239,68,68)"}`,
                  }}
                >
                  {/* Step header */}
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-mono font-bold shrink-0"
                      style={{ color: allOk ? "rgb(34,197,94)" : "rgb(239,68,68)" }}
                    >
                      {allOk ? "✓" : "✗"}
                    </span>
                    <span className="text-sm font-mono font-bold text-white">{step}</span>
                  </div>

                  {/* PT result */}
                  {r.ptCorrect ? (
                    <div className="flex items-center gap-2 pl-5">
                      <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓</span>
                      <span className="text-xs font-mono text-gray-500">PT</span>
                      <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>
                        {meta.ptLabel}
                      </span>
                    </div>
                  ) : (
                    <div
                      className="flex flex-col gap-1 pl-5 pr-3 py-2 border-l-2"
                      style={{ borderColor: "rgba(239,68,68,0.4)" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono" style={{ color: "rgb(239,68,68)" }}>✗</span>
                        <span className="text-xs font-mono text-gray-500">PT</span>
                        <span className="text-xs font-mono text-gray-400">
                          Expected:{" "}
                          <span className="text-white">{meta.ptLabel}</span>
                          {" — "}You entered:{" "}
                          <span style={{ color: "rgb(239,68,68)" }}>
                            {formatEntry(row.ptValue, row.ptUnit)}
                          </span>
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 font-mono pl-4">{meta.ptSource}</p>
                    </div>
                  )}

                  {/* WT result */}
                  {r.wtCorrect ? (
                    <div className="flex items-center gap-2 pl-5">
                      <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓</span>
                      <span className="text-xs font-mono text-gray-500">WT</span>
                      <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>
                        {meta.wtLabel}
                      </span>
                    </div>
                  ) : (
                    <div
                      className="flex flex-col gap-1 pl-5 pr-3 py-2 border-l-2"
                      style={{ borderColor: "rgba(239,68,68,0.4)" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono" style={{ color: "rgb(239,68,68)" }}>✗</span>
                        <span className="text-xs font-mono text-gray-500">WT</span>
                        <span className="text-xs font-mono text-gray-400">
                          Expected:{" "}
                          <span className="text-white">{meta.wtLabel}</span>
                          {" — "}You entered:{" "}
                          <span style={{ color: "rgb(239,68,68)" }}>
                            {formatEntry(row.wtValue, row.wtUnit)}
                          </span>
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 font-mono pl-4">{meta.wtSource}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Show correct answers button — only when not all correct */}
          {!results.every((r) => r.ptCorrect && r.wtCorrect) && (
            <button
              onClick={fillCorrectAnswers}
              className="self-start px-5 py-2.5 text-sm font-mono font-bold border transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "#0a0a0a",
                borderColor: "rgba(6,182,212,0.4)",
                color: "rgb(6,182,212)",
              }}
            >
              Show correct answers
            </button>
          )}

          {/* Totals block - always shown after submit */}
          <div
            className="flex flex-col gap-5 border p-6"
            style={{
              backgroundColor: "#080808",
              borderColor: "rgb(31,41,55)",
              borderLeft: "3px solid rgb(6,182,212)",
            }}
          >
            <p
              className="text-xs font-mono font-bold uppercase tracking-widest"
              style={{ color: "rgb(6,182,212)" }}
            >
              The correct numbers — Nexus Corp value stream
            </p>

            {/* Metric tiles */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">Total PT</p>
                <p className="text-2xl font-mono font-bold" style={{ ...syne.style, color: "rgb(34,197,94)" }}>
                  7.5 days
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">Total WT</p>
                <p className="text-2xl font-mono font-bold" style={{ ...syne.style, color: "rgb(239,68,68)" }}>
                  34 days
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">Lead Time</p>
                <p className="text-2xl font-mono font-bold" style={{ ...syne.style, color: "rgb(6,182,212)" }}>
                  41.5 days
                </p>
              </div>
            </div>

            {/* Flow efficiency highlight */}
            <div
              className="flex items-center gap-4 p-4 border"
              style={{ backgroundColor: "#0a0a0a", borderColor: "rgb(31,41,55)" }}
            >
              <div className="flex flex-col gap-1">
                <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">Flow Efficiency</p>
                <p className="text-4xl font-mono font-bold" style={{ ...syne.style, color: "rgb(6,182,212)" }}>
                  18%
                </p>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                Only <span className="text-white font-semibold">18%</span> of the total lead time is
                actual work. The other <span className="text-white font-semibold">82%</span> is pure waiting.
              </p>
            </div>

            {/* Calculation breakdown */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">How it was calculated</p>
              <div
                className="p-4 font-mono text-xs leading-relaxed"
                style={{ backgroundColor: "#0d0d0d", borderLeft: "3px solid rgb(31,41,55)", color: "rgb(156,163,175)" }}
              >
                <p>PT  = 2d + 3d + 4h + 2d + 1d + 4h  = 7.5 days</p>
                <p>WT  = 5d + 3d + 1d + 5d + 8d + 12d = 34 days</p>
                <p>LT  = PT + WT = 7.5 + 34            = 41.5 days</p>
                <p>FE  = PT / LT × 100%                = 7.5 / 41.5 × 100% = 18%</p>
              </div>
            </div>
          </div>

          {/* Continue link */}
          <a
            href="?fase=4"
            className="self-start px-8 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
            style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}
          >
            View your results →
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Context panel ────────────────────────────────────────────────────────────

const contextCards = [
  {
    initials: "SM",
    name: "Sarah",
    role: "Engineering Manager",
    accent: "rgb(6,182,212)",
    quote: "Features take an average of 6 weeks from idea to production.",
  },
  {
    initials: "TO",
    name: "Tom",
    role: "Product Owner",
    accent: "rgb(167,139,250)",
    quote: "A ticket sits 5 days before a developer picks it up. Writing specs costs me 2 days per feature.",
  },
  {
    initials: "LI",
    name: "Lisa",
    role: "Developer",
    accent: "rgb(34,197,94)",
    quote: "Writing code takes 3 days. I wait 3 days for code review. The review takes 4 hours. Then 1 day before QA picks it up.",
  },
  {
    initials: "KA",
    name: "Kai",
    role: "QA Engineer",
    accent: "rgb(251,146,60)",
    quote: "Testing takes 2 days. We wait 5 days before we can start — the test environment is busy or not stable.",
  },
  {
    initials: "MA",
    name: "Marco",
    role: "Ops Engineer",
    accent: "rgb(239,68,68)",
    quote: "Acceptance testing in ACC takes 1 day. Deployment to ACC: 8 days waiting — it has to be scheduled. Deploy to production is manual, takes 4 hours, locked to the last Friday — average 12 days wait time.",
  },
]

function ContextPanel() {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="border"
      style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 transition-colors hover:bg-[#0d0d0d]"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: "rgb(6,182,212)" }}>//</span>
          <span className="text-sm font-mono font-bold text-white tracking-wide">
            Context — What the team told you
          </span>
        </div>
        <span className="text-xs font-mono text-gray-600 shrink-0">
          {open ? "Hide context ↑" : "Show context ↓"}
        </span>
      </button>

      {open && (
        <div
          className="flex flex-col gap-0 border-t"
          style={{ borderColor: "rgb(31,41,55)" }}
        >
          {contextCards.map((c, i) => (
            <div
              key={c.initials}
              className="flex gap-4 px-5 py-4"
              style={{
                borderBottom: i < contextCards.length - 1 ? "1px solid rgb(21,31,43)" : undefined,
                borderLeft: `3px solid ${c.accent}`,
                backgroundColor: i % 2 === 0 ? "#080808" : "#060606",
              }}
            >
              <div
                className="w-8 h-8 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5"
                style={{
                  backgroundColor: `${c.accent}18`,
                  border: `1px solid ${c.accent}40`,
                  color: c.accent,
                }}
              >
                {c.initials}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-mono font-bold text-white">{c.name}</span>
                  <span className="text-xs text-gray-600">{c.role}</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">&ldquo;{c.quote}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Reference panel ──────────────────────────────────────────────────────────

function ReferencePanel() {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="border"
      style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 transition-colors hover:bg-[#0d0d0d]"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: "rgb(167,139,250)" }}>//</span>
          <span className="text-sm font-mono font-bold text-white tracking-wide">
            Quick reference — Process time vs Wait time
          </span>
        </div>
        <span className="text-xs font-mono text-gray-600 shrink-0">
          {open ? "Hide reference ↑" : "Show reference ↓"}
        </span>
      </button>

      {open && (
        <div className="border-t flex flex-col gap-0" style={{ borderColor: "rgb(31,41,55)" }}>

          {/* PT */}
          <div
            className="flex gap-4 px-5 py-5"
            style={{ borderBottom: "1px solid rgb(21,31,43)", borderLeft: "3px solid rgb(34,197,94)", backgroundColor: "#060606" }}
          >
            <div className="shrink-0 mt-0.5">
              <span
                className="text-xs font-mono font-bold px-1.5 py-0.5"
                style={{ backgroundColor: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)", color: "rgb(34,197,94)" }}
              >
                PT
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: "rgb(34,197,94)" }}>
                Process Time
              </span>
              <p className="text-sm text-gray-400 leading-relaxed">
                The time work is <span className="text-white">actively being done</span>. Someone is working on it right now.
              </p>
              <p className="text-xs font-mono text-gray-600 mt-1">
                Examples: writing code, reviewing a PR, running a test, deploying.
              </p>
            </div>
          </div>

          {/* WT */}
          <div
            className="flex gap-4 px-5 py-5"
            style={{ borderBottom: "1px solid rgb(21,31,43)", borderLeft: "3px solid rgb(239,68,68)", backgroundColor: "#080808" }}
          >
            <div className="shrink-0 mt-0.5">
              <span
                className="text-xs font-mono font-bold px-1.5 py-0.5"
                style={{ backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", color: "rgb(239,68,68)" }}
              >
                WT
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: "rgb(239,68,68)" }}>
                Wait Time
              </span>
              <p className="text-sm text-gray-400 leading-relaxed">
                The time work <span className="text-white">sits idle</span>. Nobody is actively working on it.
              </p>
              <p className="text-xs font-mono text-gray-600 mt-1">
                Examples: waiting for a developer to pick up a ticket, waiting for a code review, waiting for the test environment, waiting for the release window.
              </p>
            </div>
          </div>

          {/* Flow Efficiency */}
          <div
            className="flex gap-4 px-5 py-5"
            style={{ borderBottom: "1px solid rgb(21,31,43)", borderLeft: "3px solid rgb(6,182,212)", backgroundColor: "#060606" }}
          >
            <div className="shrink-0 mt-0.5">
              <span
                className="text-xs font-mono font-bold px-1.5 py-0.5"
                style={{ backgroundColor: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.3)", color: "rgb(6,182,212)" }}
              >
                FE
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: "rgb(6,182,212)" }}>
                Flow Efficiency
              </span>
              <p className="text-sm text-gray-400 leading-relaxed">
                The percentage of total lead time that is actual work.
              </p>
              <div
                className="px-4 py-3 font-mono text-sm"
                style={{ backgroundColor: "#0d0d0d", borderLeft: "3px solid rgb(31,41,55)", color: "rgb(156,163,175)" }}
              >
                PT / (PT + WT) × 100%
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Example: a step with 3 days of work and 7 days of waiting → 3/(3+7) × 100% = <span className="text-white font-mono">30%</span>
              </p>
            </div>
          </div>

          {/* Goal */}
          <div
            className="flex gap-4 px-5 py-5"
            style={{ borderLeft: "3px solid rgb(234,179,8)", backgroundColor: "#080808" }}
          >
            <div className="shrink-0 mt-0.5">
              <span
                className="text-xs font-mono font-bold px-1.5 py-0.5"
                style={{ backgroundColor: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.3)", color: "rgb(234,179,8)" }}
              >
                →
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: "rgb(234,179,8)" }}>
                The goal
              </span>
              <p className="text-sm text-gray-400 leading-relaxed">
                Fill in the PT and WT for each step based on what the team told you. You will calculate the total lead time and flow efficiency at the end.
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

// ─── Fase3 (main export) ──────────────────────────────────────────────────────

export function Fase3() {
  const [part, setPart] = useState<1 | 2>(1);

  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-14">

        <div className="flex flex-col gap-2">
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Your VSM Analysis
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Use what you&apos;ve heard and learned. Work through both steps.
          </p>
        </div>

        <ContextPanel />
        <ReferencePanel />

        {/* Step indicator */}
        <div className="flex items-center gap-0">
          {([1, 2] as const).map((n) => (
            <div key={n} className="flex items-center">
              <div
                className="flex items-center justify-center w-7 h-7 text-xs font-mono font-bold border"
                style={{
                  backgroundColor: part >= n ? "rgb(6,182,212)" : "#0a0a0a",
                  borderColor: part >= n ? "rgb(6,182,212)" : "rgb(31,41,55)",
                  color: part >= n ? "#000" : "rgb(75,85,99)",
                }}
              >
                {n}
              </div>
              {n < 2 && (
                <div className="w-12 h-px" style={{ backgroundColor: part > 1 ? "rgb(6,182,212)" : "rgb(31,41,55)" }} />
              )}
            </div>
          ))}
          <span className="ml-4 text-xs font-mono text-gray-600">
            {part === 1 ? "Determine order" : "Fill in times"}
          </span>
        </div>

        {/* Parts */}
        <div
          className="border p-6 flex flex-col gap-6"
          style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)" }}
        >
          {part === 1 && <Part1 onComplete={() => setPart(2)} />}
          {part === 2 && <Part2 onComplete={() => {}} />}
        </div>

      </div>
    </div>
  );
}
