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
        comment: "외부 링크 추가 무제한, 반응형 제작, 기본 SEO 처리",
      },
      {
        value: "CMS",
        label: "콘텐츠형(CMS)",
        comment: "게시물 추가/수정/삭제, 관리자만 로그인 가능",
      },
      {
        value: "SAAS",
        label: "데이터관리 SaaS",
        comment: "유저 초대, 권한 관리, 권한 별 액션 및 조회 기능",
      },
    ],
  },
  {
    id: "LANDING_SECTION_COUNT",
    question: "전체 섹션의 개수는 몇개인가요?",
    comment: "섹션이란 페이지에 들어가는 하나의 블록을 의미합니다.",
    inputType: "number",
    field: "sectionCount",
  },
  {
    id: "CMS_POST_TYPE_COUNT",
    question: "게시물 종류는 몇 가지인가요?",
    comment: "게시물이란 추가/수정/삭제 가능한 것을 의미합니다. 기본적으로 로그인 기능 및 데이터베이스 연결이 필요합니다.",
    inputType: "number",
    field: "postTypeCount",
  },
  {
    id: "CMS_ATTACHMENT",
    question: "게시물에 파일 첨부가 필요한가요?",
    comment: "이미지도 파일 첨부에 해당합니다.",
    inputType: "boolean",
    field: "hasAttachment",
  },
  {
    id: "CMS_WYSIWYG",
    question: "리치 에디터(WYSIWYG)가 필요한가요?",
    comment: "리치 에디터를 쓰면, 작성자가 폰트, 굵기, 크기, 정렬 등을 변경할 수 있고, 문단 중간에 이미지 등을 첨부할 수 있습니다.",
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
    question: "다음 기능이 필요하신가요?",
    inputType: "multi-select",
    field: "addons",
    options: [
      { value: "CONTACT_FORM", label: "문의 입력 폼 -> 이메일 전송" },
      { value: "MAP", label: "실시간 지도 렌더링" },
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
