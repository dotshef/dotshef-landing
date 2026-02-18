import type { AnswerState } from "./types"
import { FLOW_STEPS } from "./flow"

function getOptionLabel(stepId: string, value: string): string {
  const step = FLOW_STEPS.find((s) => s.id === stepId)
  return step?.options?.find((o) => o.value === value)?.label ?? value
}

export function summarizeAnswers(answers: AnswerState): string {
  const lines: string[] = ["[견적 문의]", ""]

  if (answers.productType) {
    lines.push(`서비스 종류: ${getOptionLabel("PRODUCT_TYPE", answers.productType)}`)
  }

  if (answers.productType === "LANDING" && answers.sectionCount !== undefined) {
    lines.push(`전체 섹션 개수: ${answers.sectionCount}개`)
  }

  if (answers.productType === "CMS") {
    if (answers.postTypeCount !== undefined) {
      lines.push(`게시물 종류: ${answers.postTypeCount}가지`)
    }
    if (answers.hasAttachment !== undefined) {
      lines.push(`파일 첨부: ${answers.hasAttachment ? "필요" : "불필요"}`)
    }
    if (answers.needsWysiwyg !== undefined) {
      lines.push(`리치 에디터(WYSIWYG): ${answers.needsWysiwyg ? "필요" : "불필요"}`)
    }
  }

  if (answers.productType === "SAAS") {
    if (answers.dataKindCount !== undefined) {
      lines.push(`데이터 종류: ${answers.dataKindCount}가지`)
    }
    if (answers.roleKindCount !== undefined) {
      lines.push(`권한 종류: ${answers.roleKindCount}가지`)
    }
  }

  if (answers.addons && answers.addons.length > 0) {
    const addonLabels = answers.addons
      .map((a) => getOptionLabel("ADDONS", a))
      .join(", ")
    lines.push(`추가 기능: ${addonLabels}`)
  }

  if (answers.customRequirement?.trim()) {
    lines.push("")
    lines.push("기타 요구사항:")
    lines.push(answers.customRequirement.trim())
  }

  return lines.join("\n")
}
