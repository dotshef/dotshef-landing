"use client"

import { useState } from "react"
import type { FlowStep, AnswerState } from "@/lib/estimate/types"

interface Props {
  step: FlowStep
  answers: AnswerState
  onCommit: (field: keyof AnswerState | null, value: unknown) => void
}

export default function StepRenderer({ step, answers, onCommit }: Props) {
  switch (step.inputType) {
    case "single-select":
      return <SingleSelect step={step} onCommit={onCommit} />
    case "boolean":
      return <BooleanSelect step={step} onCommit={onCommit} />
    case "number":
      return <NumberInput step={step} answers={answers} onCommit={onCommit} />
    case "multi-select":
      return <MultiSelect step={step} answers={answers} onCommit={onCommit} />
    case "textarea":
      return <TextareaInput step={step} answers={answers} onCommit={onCommit} />
    default:
      return null
  }
}

// ─── Single Select ───────────────────────────────────────────────

function SingleSelect({
  step,
  onCommit,
}: {
  step: FlowStep
  onCommit: Props["onCommit"]
}) {
  return (
    <div className="flex flex-col gap-3">
      {step.options?.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onCommit(step.field, opt.value)}
          className="w-full rounded-xl border-2 border-brand-black bg-brand-black px-5 py-4 text-left
                     text-brand-yellow transition-all hover:bg-brand-yellow hover:text-brand-black
                     cursor-pointer"
        >
          <p className="text-base font-bold">{opt.label}</p>
          {opt.description && (
            <p className="mt-0.5 text-sm opacity-70">{opt.description}</p>
          )}
        </button>
      ))}
    </div>
  )
}

// ─── Boolean ─────────────────────────────────────────────────────

function BooleanSelect({
  step,
  onCommit,
}: {
  step: FlowStep
  onCommit: Props["onCommit"]
}) {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => onCommit(step.field, true)}
        className="flex-1 rounded-xl border-2 border-brand-black bg-brand-black py-4
                   text-center text-base font-bold text-brand-yellow
                   transition-all hover:bg-brand-yellow hover:text-brand-black cursor-pointer"
      >
        예
      </button>
      <button
        type="button"
        onClick={() => onCommit(step.field, false)}
        className="flex-1 rounded-xl border-2 border-brand-black bg-transparent py-4
                   text-center text-base font-bold text-brand-black
                   transition-all hover:bg-brand-black hover:text-brand-yellow cursor-pointer"
      >
        아니오
      </button>
    </div>
  )
}

// ─── Number Input ────────────────────────────────────────────────

function NumberInput({
  step,
  answers,
  onCommit,
}: {
  step: FlowStep
  answers: AnswerState
  onCommit: Props["onCommit"]
}) {
  const initialValue =
    step.field && step.field in answers
      ? ((answers[step.field as keyof AnswerState] as unknown) as number) ?? 1
      : 1
  const [value, setValue] = useState<number>(initialValue)

  function clamp(v: number) {
    return Math.max(1, Math.floor(v))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setValue((v) => clamp(v - 1))}
          className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-brand-black
                     text-2xl font-bold text-brand-black transition-all
                     hover:bg-brand-black hover:text-brand-yellow cursor-pointer"
        >
          −
        </button>
        <input
          type="number"
          min={1}
          value={value}
          onChange={(e) => setValue(clamp(Number(e.target.value)))}
          className="w-24 rounded-xl border-2 border-brand-black bg-transparent py-3 text-center
                     text-2xl font-extrabold text-brand-black focus:outline-none
                     [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={() => setValue((v) => v + 1)}
          className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-brand-black
                     text-2xl font-bold text-brand-black transition-all
                     hover:bg-brand-black hover:text-brand-yellow cursor-pointer"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={() => onCommit(step.field, value)}
        className="w-full rounded-xl bg-brand-black py-4 text-base font-bold text-brand-yellow
                   transition-opacity hover:opacity-80 cursor-pointer"
      >
        확인
      </button>
    </div>
  )
}

// ─── Multi Select ────────────────────────────────────────────────

function MultiSelect({
  step,
  answers,
  onCommit,
}: {
  step: FlowStep
  answers: AnswerState
  onCommit: Props["onCommit"]
}) {
  const [selected, setSelected] = useState<string[]>(answers.addons ?? [])

  function toggle(value: string) {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {step.options?.map((opt) => {
          const checked = selected.includes(opt.value)
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className={`flex items-center gap-3 rounded-xl border-2 px-5 py-4 text-left
                         transition-all cursor-pointer ${
                           checked
                             ? "border-brand-black bg-brand-black text-brand-yellow"
                             : "border-brand-black bg-transparent text-brand-black hover:bg-brand-black/10"
                         }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-brand-black
                             text-sm font-bold ${checked ? "bg-brand-yellow text-brand-black" : ""}`}
              >
                {checked ? "✓" : ""}
              </span>
              <span className="text-base font-bold">{opt.label}</span>
            </button>
          )
        })}
      </div>
      <button
        type="button"
        onClick={() => onCommit(step.field, selected)}
        className="w-full rounded-xl bg-brand-black py-4 text-base font-bold text-brand-yellow
                   transition-opacity hover:opacity-80 cursor-pointer"
      >
        다음
      </button>
    </div>
  )
}

// ─── Textarea ────────────────────────────────────────────────────

function TextareaInput({
  step,
  answers,
  onCommit,
}: {
  step: FlowStep
  answers: AnswerState
  onCommit: Props["onCommit"]
}) {
  const [text, setText] = useState<string>(answers.customRequirement ?? "")

  return (
    <div className="flex flex-col gap-4">
      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="없으면 비워두셔도 됩니다."
        className="w-full resize-none rounded-xl border-2 border-brand-black bg-transparent px-4 py-3
                   text-brand-black placeholder:text-brand-black/40 focus:outline-none"
      />
      <button
        type="button"
        onClick={() => onCommit(step.field, text)}
        className="w-full rounded-xl bg-brand-black py-4 text-base font-bold text-brand-yellow
                   transition-opacity hover:opacity-80 cursor-pointer"
      >
        다음
      </button>
    </div>
  )
}
