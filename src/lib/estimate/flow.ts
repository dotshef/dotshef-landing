import type { FlowStep, StepId } from "./types"

export const FLOW_STEPS: FlowStep[] = [
  {
    id: "PRODUCT_TYPE",
    question: "어떤 서비스가 필요하신가요?",
    inputType: "single-select",
    field: "productType",
    options: [
      {
        value: "LANDING",
        label: "랜딩 페이지",
        description: "외부 링크, 반응형, SEO 기본",
      },
      {
        value: "CMS",
        label: "콘텐츠형(CMS)",
        description: "게시물 추가/수정/삭제, 로그인, 관리자 기능",
      },
      {
        value: "SAAS",
        label: "데이터관리 SaaS",
        description: "로그인 권한 별 액션 분리, 데이터 취합",
      },
    ],
  },
  {
    id: "CMS_POST_TYPE_COUNT",
    question: "게시물 종류는 몇 가지인가요?",
    inputType: "number",
    field: "postTypeCount",
  },
  {
    id: "CMS_ATTACHMENT",
    question: "게시물에 파일 첨부가 필요한가요?",
    inputType: "boolean",
    field: "hasAttachment",
  },
  {
    id: "CMS_WYSIWYG",
    question: "리치 에디터(WYSIWYG)가 필요한가요?",
    inputType: "boolean",
    field: "needsWysiwyg",
  },
  {
    id: "SAAS_DATA_KIND_COUNT",
    question: "관리할 데이터 종류는 몇 가지인가요?",
    inputType: "number",
    field: "dataKindCount",
  },
  {
    id: "SAAS_ROLE_KIND_COUNT",
    question: "권한(역할) 종류는 몇 가지인가요?",
    inputType: "number",
    field: "roleKindCount",
  },
  {
    id: "ADDONS",
    question: "추가 기능이 필요하신가요?",
    inputType: "multi-select",
    field: "addons",
    options: [
      { value: "CONTACT_FORM", label: "문의 입력 폼(이메일)" },
      { value: "MAP", label: "지도" },
    ],
  },
  {
    id: "CUSTOM_REQUIREMENT",
    question: "기타 요구사항이 있으신가요?",
    inputType: "textarea",
    field: "customRequirement",
  },
]

export function getFlowStep(id: StepId): FlowStep {
  const step = FLOW_STEPS.find((s) => s.id === id)
  if (!step) throw new Error(`Unknown step: ${id}`)
  return step
}
