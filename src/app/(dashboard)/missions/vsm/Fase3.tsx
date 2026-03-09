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

function isCorrect(input: number, unit: "dagen" | "uren", correctHours: number): boolean {
  const inputHours = toHours(input, unit);
  return Math.abs(inputHours - correctHours) <= correctHours * 0.2;
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
        ...attributes.style,
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
type CellState = "idle" | "correct" | "wrong";

interface Row {
  ptValue: string;
  ptUnit: Unit;
  wtValue: string;
  wtUnit: Unit;
}

interface Validation {
  pt: CellState;
  wt: CellState;
}

function Part2({ onComplete }: { onComplete: () => void }) {
  const [rows, setRows] = useState<Row[]>(
    CORRECT_ORDER.map(() => ({ ptValue: "", ptUnit: "dagen", wtValue: "", wtUnit: "dagen" }))
  );
  const [validation, setValidation] = useState<Validation[]>(
    CORRECT_ORDER.map(() => ({ pt: "idle", wt: "idle" }))
  );
  const [allCorrect, setAllCorrect] = useState(false);

  function updateRow(i: number, patch: Partial<Row>) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
    // Reset cell validation on edit
    setValidation((prev) =>
      prev.map((v, idx) => {
        if (idx !== i) return v;
        const next = { ...v };
        if ("ptValue" in patch || "ptUnit" in patch) next.pt = "idle";
        if ("wtValue" in patch || "wtUnit" in patch) next.wt = "idle";
        return next;
      })
    );
  }

  function checkTimes() {
    const next: Validation[] = rows.map((row, i) => {
      const ptNum = parseFloat(row.ptValue);
      const wtNum = parseFloat(row.wtValue);
      return {
        pt: !isNaN(ptNum) && isCorrect(ptNum, row.ptUnit, CORRECT_TIMES[i].pt) ? "correct" : "wrong",
        wt: !isNaN(wtNum) && isCorrect(wtNum, row.wtUnit, CORRECT_TIMES[i].wt) ? "correct" : "wrong",
      };
    });
    setValidation(next);
    const done = next.every((v) => v.pt === "correct" && v.wt === "correct");
    if (done) setAllCorrect(true);
  }

  function cellBg(state: CellState) {
    if (state === "correct") return { backgroundColor: "#061206", borderColor: "rgba(34,197,94,0.5)" };
    if (state === "wrong") return { backgroundColor: "#130606", borderColor: "rgba(239,68,68,0.5)" };
    return { backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)" };
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
              const v = validation[i];
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
                      disabled={v.pt === "correct"}
                      className="w-20 px-2 py-1.5 text-sm font-mono text-white outline-none border"
                      style={{
                        ...cellBg(v.pt),
                        ...(v.pt === "idle" ? { "":""} : {}),
                      }}
                    />
                  </td>

                  {/* PT unit */}
                  <td className="px-2 py-2 border border-gray-800">
                    <select
                      value={row.ptUnit}
                      onChange={(e) => updateRow(i, { ptUnit: e.target.value as Unit })}
                      disabled={v.pt === "correct"}
                      className="px-2 py-1.5 text-sm font-mono text-gray-300 outline-none border"
                      style={{ backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)", color: v.pt === "correct" ? "rgb(34,197,94)" : "inherit" }}
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
                      disabled={v.wt === "correct"}
                      className="w-20 px-2 py-1.5 text-sm font-mono text-white outline-none border"
                      style={cellBg(v.wt)}
                    />
                  </td>

                  {/* WT unit */}
                  <td className="px-2 py-2 border border-gray-800">
                    <select
                      value={row.wtUnit}
                      onChange={(e) => updateRow(i, { wtUnit: e.target.value as Unit })}
                      disabled={v.wt === "correct"}
                      className="px-2 py-1.5 text-sm font-mono text-gray-300 outline-none border"
                      style={{ backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)", color: v.wt === "correct" ? "rgb(34,197,94)" : "inherit" }}
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

      {/* Validation feedback */}
      <div className="flex flex-wrap items-center gap-4">
        {!allCorrect && (
          <button
            onClick={checkTimes}
            className="px-6 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
            style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style }}
          >
            Check times
          </button>
        )}

        {validation.some((v) => v.pt === "wrong" || v.wt === "wrong") && !allCorrect && (
          <p className="text-sm font-mono" style={{ color: "rgb(239,68,68)" }}>
            Not all times are correct. Red fields are wrong - try again.
          </p>
        )}
      </div>

      {/* Success */}
      {allCorrect && (
        <div
          className="flex flex-col gap-5 border p-6"
          style={{ backgroundColor: "#060f06", borderColor: "rgba(34,197,94,0.3)", borderLeft: "3px solid rgb(34,197,94)" }}
        >
          <p className="text-sm font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>
            ✓ All times correct!
          </p>

          <div className="flex gap-6">
            <div>
              <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-1">Total Process Time</p>
              <p className="text-2xl font-mono font-bold" style={{ ...syne.style, color: "rgb(34,197,94)" }}>~9 days</p>
            </div>
            <div>
              <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-1">Total Wait Time</p>
              <p className="text-2xl font-mono font-bold" style={{ ...syne.style, color: "rgb(239,68,68)" }}>~34 days</p>
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            Only <span className="text-white font-semibold">21%</span> of the total lead time (~43 days)
            is actual work time. The rest is waiting.
          </p>

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
