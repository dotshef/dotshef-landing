import type { Metadata } from "next"
import Header from "@/components/Header"
import EstimateWizard from "@/components/estimate/EstimateWizard"

export const metadata: Metadata = {
  title: "견적 내기 | DotShef",
  description: "몇 가지 질문으로 예상 견적을 확인하세요.",
}

export default function EstimatePage() {
  return (
    <>
      <Header />
      <EstimateWizard />
    </>
  )
}
