import type { AnswerState, EstimateResult } from "./types"
import priceTable from "@/data/price-table.json"

const CUSTOM_REQUIREMENT_FLOOR = 1_500_000

export function calculateEstimate(state: AnswerState): EstimateResult {
  let min = 0
  let max = 0

  // 1. BASE
  if (state.productType) {
    const base = priceTable.BASE[state.productType]
    min += base.price.min
    max += base.price.max
  }

  // 2. UNIT × 수량
  if (state.productType === "LANDING") {
    const sectionCount = state.sectionCount ?? 1
    min += priceTable.UNIT.LANDING_SECTION.price.min * sectionCount
    max += priceTable.UNIT.LANDING_SECTION.price.max * sectionCount
  }

  if (state.productType === "CMS") {
    const postTypeCount = state.postTypeCount ?? 1
    min += priceTable.UNIT.CMS_POST_TYPE.price.min * postTypeCount
    max += priceTable.UNIT.CMS_POST_TYPE.price.max * postTypeCount

    if (state.hasAttachment) {
      min += priceTable.UNIT.CMS_ATTACHMENT.price.min
      max += priceTable.UNIT.CMS_ATTACHMENT.price.max
    }
  }

  if (state.productType === "SAAS") {
    const dataKindCount = state.dataKindCount ?? 1
    min += priceTable.UNIT.SAAS_POST_TYPE.price.min * dataKindCount
    max += priceTable.UNIT.SAAS_POST_TYPE.price.max * dataKindCount

    const roleKindCount = state.roleKindCount ?? 1
    min += priceTable.UNIT.SAAS_ROLE_TYPE.price.min * roleKindCount
    max += priceTable.UNIT.SAAS_ROLE_TYPE.price.max * roleKindCount
  }

  // 3. ADDON 합산
  if (state.addons && state.addons.length > 0) {
    const addonTable = priceTable.ADDON as Record<string, { price: { min: number; max: number } }>
    for (const addonKey of state.addons) {
      const addon = addonTable[addonKey]
      if (addon) {
        min += addon.price.min
        max += addon.price.max
      }
    }
  }

  // 4. FLOOR — customRequirement가 있으면 최소 150만원
  if (state.customRequirement?.trim()) {
    min = Math.max(min, CUSTOM_REQUIREMENT_FLOOR)
  }

  return { min, max }
}

export function formatPrice(amount: number): string {
  const man = Math.floor(amount / 10_000)
  return `${man}만원`
}
