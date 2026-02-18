"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { StepId, AnswerState } from "@/lib/estimate/types"
import { getFlowStep } from "@/lib/estimate/flow"
import { getNextStepId, getTotalSteps } from "@/lib/estimate/navigator"
import StepRenderer from "./StepRenderer"
import ResultScreen from "./ResultScreen"

const INITIAL_STEP: StepId = "PRODUCT_TYPE"

export default function EstimateWizard() {
  const router = useRouter()
  const [currentStepId, setCurrentStepId] = useState<StepId>(INITIAL_STEP)
  const [answers, setAnswers] = useState<AnswerState>({})
  const [stepIndex, setStepIndex] = useState(1)

  const isResult = currentStepId === "RESULT"
  const step = isResult ? null : getFlowStep(currentStepId)
  const total = getTotalSteps(answers.productType)

  function handleCommit(field: keyof AnswerState | null, value: unknown) {
    const newAnswers: AnswerState = field
      ? ({ ...answers, [field]: value } as AnswerState)
      : answers

    setAnswers(newAnswers)
    const nextId = getNextStepId(currentStepId, newAnswers)
    setCurrentStepId(nextId)
    setStepIndex((prev) => prev + 1)
  }

  function handleReset() {
    setAnswers({})
    setCurrentStepId(INITIAL_STEP)
    setStepIndex(1)
    router.replace("/estimate")
  }

  return (
    <main className="flex min-h-screen flex-col bg-brand-black pt-16">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 py-12">
        {/* 진행 표시 */}
        {!isResult && (
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-brand-yellow/50">
                {stepIndex} / {total}
              </span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-brand-yellow/20">
              <div
                className="h-full rounded-full bg-brand-yellow transition-all duration-300"
                style={{ width: `${Math.min((stepIndex / total) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* 카드 */}
        <div className="rounded-2xl bg-brand-yellow p-8">
          {isResult ? (
            <>
              <h2 className="mb-6 text-2xl font-extrabold text-brand-black">
                견적이 준비됐어요!
              </h2>
              <ResultScreen answers={answers} onReset={handleReset} />
            </>
          ) : (
            step && (
              <>
                <h2 className="mb-6 text-2xl font-extrabold text-brand-black">
                  {step.question}
                </h2>
                <StepRenderer
                  step={step}
                  answers={answers}
                  onCommit={handleCommit}
                />
              </>
            )
          )}
        </div>
      </div>
    </main>
  )
}
