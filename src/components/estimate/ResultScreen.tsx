"use client"

import { useState } from "react"
import { calculateEstimate, formatPrice } from "@/lib/estimate/calculator"
import type { AnswerState } from "@/lib/estimate/types"
import ContactModal from "@/components/ContactModal"

interface Props {
  answers: AnswerState
  onReset: () => void
}

export default function ResultScreen({ answers, onReset }: Props) {
  const [modalOpen, setModalOpen] = useState(false)
  const result = calculateEstimate(answers)
  const hasCustom = !!answers.customRequirement?.trim()

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* 결과 표시 */}
        <div className="rounded-xl border-2 border-brand-black bg-brand-black px-6 py-8 text-center">
          <p className="mb-2 text-sm font-bold text-brand-yellow/70">예상 견적</p>
          {hasCustom ? (
            <p className="text-2xl font-extrabold text-brand-yellow">
              예상 견적은 150만원 이상입니다.
            </p>
          ) : (
            <p className="text-2xl font-extrabold text-brand-yellow">
              {formatPrice(result.min)} ~ {formatPrice(result.max)}
            </p>
          )}
          <p className="mt-3 text-xs text-brand-yellow/50">
            실제 견적은 상담 후 확정됩니다.
          </p>
        </div>

        {/* 버튼 */}
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="w-full rounded-xl bg-brand-black py-4 text-base font-bold text-brand-yellow
                     transition-opacity hover:opacity-80 cursor-pointer"
        >
          실제 견적 요청하기
        </button>
        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-xl border-2 border-brand-black bg-transparent py-4
                     text-base font-bold text-brand-black transition-all
                     hover:bg-brand-black hover:text-brand-yellow cursor-pointer"
        >
          다시 견적 내기
        </button>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
