export type ProductType = "LANDING" | "CMS" | "SAAS"

export type StepId =
  | "PRODUCT_TYPE"
  | "LANDING_SECTION_COUNT"
  | "CMS_POST_TYPE_COUNT"
  | "CMS_ATTACHMENT"
  | "CMS_WYSIWYG"
  | "SAAS_DATA_KIND_COUNT"
  | "SAAS_ROLE_KIND_COUNT"
  | "ADDONS"
  | "CUSTOM_REQUIREMENT"
  | "RESULT"

export type InputType =
  | "single-select"
  | "number"
  | "boolean"
  | "multi-select"
  | "textarea"

export interface SelectOption {
  value: string
  label: string
  comment?: string
}

export interface FlowStep {
  id: StepId
  question: string
  comment?: string
  inputType: InputType
  field: keyof AnswerState | null
  options?: SelectOption[]
}

export interface AnswerState {
  productType?: ProductType
  sectionCount?: number
  postTypeCount?: number
  hasAttachment?: boolean
  needsWysiwyg?: boolean
  dataKindCount?: number
  roleKindCount?: number
  addons?: string[]
  customRequirement?: string
}

export interface EstimateResult {
  min: number
  max: number
}
