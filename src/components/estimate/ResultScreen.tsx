"use client"

import { useRouter } from "next/navigation"
import { calculateEstimate, formatPrice } from "@/lib/estimate/calculator"
import type { AnswerState } from "@/lib/estimate/types"

interface Props {
  answers: AnswerState
  onReset: () => void
}

export default function RequestScreen({ answers, onReset }: Props) {
  const router = useRouter()
  const result = calculateEstimate(answers)
  const hasCustom = !!answers.customRequirement?.trim()

  function handleRequest() {
    sessionStorage.setItem("estimate_answers", JSON.stringify(answers))
    router.push("/request")
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 결과 표시 */}
      <div className="rounded-xl border-2 border-brand-yellow bg-brand-yellow px-6 py-8 text-center">
        <p className="mb-2 text-base font-bold text-brand-black/70">예상 견적</p>
        {hasCustom ? (
          <p className="text-2xl font-extrabold text-brand-black">
            {formatPrice(result.min)} 이상
          </p>
        ) : (
          <p className="text-2xl font-extrabold text-brand-black">
            {formatPrice(result.min)} ~ {formatPrice(result.max)}
          </p>
        )}
        <p className="mt-3 text-sm text-brand-black/90">
          실제 견적은 상담 후 확정됩니다.
        </p>
      </div>

      {/* 버튼 */}
      <button
        type="button"
        onClick={handleRequest}
        className="w-full rounded-xl border-2 border-brand-black bg-brand-yellow py-4 text-base font-bold text-brand-black
                   transition-all hover:bg-brand-black hover:text-brand-yellow cursor-pointer"
      >
        견적 요청하기
      </button>
      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-full border-2 border-brand-black bg-brand-yellow py-4
                   text-base font-bold text-brand-black transition-all
                   hover:bg-brand-black hover:text-brand-yellow cursor-pointer mx-auto block"
      >
        다시 견적 계산
      </button>
    </div>
  )
}
