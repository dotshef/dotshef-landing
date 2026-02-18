import type { StepId, AnswerState, ProductType } from "./types"

export function getNextStepId(currentStepId: StepId, state: AnswerState): StepId {
  switch (currentStepId) {
    case "PRODUCT_TYPE":
      if (state.productType === "CMS") return "CMS_POST_TYPE_COUNT"
      if (state.productType === "SAAS") return "SAAS_DATA_KIND_COUNT"
      return "ADDONS"
    case "CMS_POST_TYPE_COUNT":
      return "CMS_ATTACHMENT"
    case "CMS_ATTACHMENT":
      return "CMS_WYSIWYG"
    case "CMS_WYSIWYG":
      return "ADDONS"
    case "SAAS_DATA_KIND_COUNT":
      return "SAAS_ROLE_KIND_COUNT"
    case "SAAS_ROLE_KIND_COUNT":
      return "ADDONS"
    case "ADDONS":
      return "CUSTOM_REQUIREMENT"
    case "CUSTOM_REQUIREMENT":
      return "RESULT"
    default:
      return "RESULT"
  }
}

export function getTotalSteps(productType?: ProductType): number {
  if (productType === "CMS") return 6  // PRODUCT_TYPE → CMS_POST_TYPE_COUNT → CMS_ATTACHMENT → CMS_WYSIWYG → ADDONS → CUSTOM_REQUIREMENT
  if (productType === "SAAS") return 5 // PRODUCT_TYPE → SAAS_DATA_KIND_COUNT → SAAS_ROLE_KIND_COUNT → ADDONS → CUSTOM_REQUIREMENT
  return 3                             // PRODUCT_TYPE → ADDONS → CUSTOM_REQUIREMENT
}
