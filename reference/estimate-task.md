# /estimate 단계형 견적 폼 구현 태스크

> 기반 문서: `reference/estimate-architecture.md`
> 채택 전략: Config 기반 Flow + 중앙 Calculator (단방향, 되돌리기 없음)

---

## 파일 생성 목록

```
src/
  app/
    estimate/
      page.tsx               ← 진입점 (상태 초기화 + EstimateWizard 마운트)
  lib/
    estimate/
      flow.ts                ← Step 정의 (질문, 입력 타입, 다음 Step 함수)
      calculator.ts          ← 중앙 가격 계산 로직
      navigator.ts           ← 다음 Step ID 결정 함수
      types.ts               ← AnswerState 타입 정의
  components/
    estimate/
      EstimateWizard.tsx     ← 전체 위저드 컨테이너
      StepRenderer.tsx       ← 각 Step UI 렌더링
      ResultScreen.tsx       ← 최종 결과 화면
```

> `src/data/price-table.json` — 이미 존재, 수정 불필요

---

## Task 1: 타입 정의 (`types.ts`)

`AnswerState` 타입과 Step 관련 인터페이스를 정의한다.

```ts
type AnswerState = {
  productType?: "LANDING" | "CMS" | "SAAS"
  postTypeCount?: number
  hasAttachment?: boolean
  needsWysiwyg?: boolean
  dataKindCount?: number
  roleKindCount?: number
  addons?: string[]
  customRequirement?: string
}

type StepId =
  | "PRODUCT_TYPE"
  | "CMS_POST_TYPE_COUNT"
  | "CMS_ATTACHMENT"
  | "CMS_WYSIWYG"
  | "SAAS_DATA_KIND_COUNT"
  | "SAAS_ROLE_KIND_COUNT"
  | "ADDONS"
  | "CUSTOM_REQUIREMENT"
  | "RESULT"

type InputType = "single-select" | "number" | "boolean" | "multi-select" | "textarea"

interface FlowStep {
  id: StepId
  question: string
  inputType: InputType
  field: keyof AnswerState | null
  options?: { value: string; label: string }[]   // single-select / multi-select 전용
}
```

---

## Task 2: Flow 정의 (`flow.ts`)

각 Step을 배열로 정의한다. **가격 로직 포함 금지.**

| StepId | 질문 | 입력 타입 | field | 표시 조건 |
|---|---|---|---|---|
| PRODUCT_TYPE | 어떤 서비스가 필요하신가요? | single-select | productType | 항상 |
| CMS_POST_TYPE_COUNT | 게시물 종류는 몇 가지인가요? | number | postTypeCount | productType === "CMS" |
| CMS_ATTACHMENT | 게시물에 파일 첨부가 필요한가요? | boolean | hasAttachment | productType === "CMS" |
| CMS_WYSIWYG | 리치 에디터(WYSIWYG)가 필요한가요? | boolean | needsWysiwyg | productType === "CMS" |
| SAAS_DATA_KIND_COUNT | 관리할 데이터 종류는 몇 가지인가요? | number | dataKindCount | productType === "SAAS" |
| SAAS_ROLE_KIND_COUNT | 권한(역할) 종류는 몇 가지인가요? | number | roleKindCount | productType === "SAAS" |
| ADDONS | 추가 기능이 필요하신가요? | multi-select | addons | 항상 |
| CUSTOM_REQUIREMENT | 기타 요구사항이 있으신가요? | textarea | customRequirement | 항상 |
| RESULT | — | — | null | 항상 (마지막) |

---

## Task 3: Navigator 구현 (`navigator.ts`)

`getNextStepId(currentStepId, state): StepId` 함수를 구현한다.

분기 규칙:
- `PRODUCT_TYPE` → CMS면 `CMS_POST_TYPE_COUNT`, SAAS면 `SAAS_DATA_KIND_COUNT`, LANDING이면 `ADDONS`
- `CMS_POST_TYPE_COUNT` → `CMS_ATTACHMENT`
- `CMS_ATTACHMENT` → `CMS_WYSIWYG`
- `CMS_WYSIWYG` → `ADDONS`
- `SAAS_DATA_KIND_COUNT` → `SAAS_ROLE_KIND_COUNT`
- `SAAS_ROLE_KIND_COUNT` → `ADDONS`
- `ADDONS` → `CUSTOM_REQUIREMENT`
- `CUSTOM_REQUIREMENT` → `RESULT`

---

## Task 4: Calculator 구현 (`calculator.ts`)

`calculateEstimate(state: AnswerState): { min: number; max: number }` 함수를 구현한다.

계산 순서:
1. **BASE** — `price-table.json`의 `BASE[productType].price` 적용
2. **UNIT × 수량**
   - CMS: `CMS_POST_TYPE` × `postTypeCount`
   - CMS: `CMS_ATTACHMENT` (hasAttachment가 true인 경우 1회)
   - SAAS: `SAAS_POST_TYPE` × `dataKindCount`
   - SAAS: `SAAS_ROLE_TYPE` × `roleKindCount`
3. **ADDON 합산** — `addons` 배열의 각 항목 price 합산
4. **customRequirement 처리** — 값이 있으면 min을 1,500,000으로 올림 (FLOOR)
5. **결과 반환** — `{ min, max }`

> `needsWysiwyg`는 현재 price-table에 항목 없음 → 계산에서 제외 (향후 추가 가능)

---

## Task 5: EstimateWizard 컨테이너 (`EstimateWizard.tsx`)

위저드 전체 상태와 흐름을 관리한다.

```
상태:
  currentStepId: StepId   (초기값: "PRODUCT_TYPE")
  answers: AnswerState     (초기값: {})

동작:
  handleAnswer(field, value) → answers 업데이트
  handleNext()              → navigator로 다음 StepId 결정 → currentStepId 업데이트
  handleReset()             → router.replace("/estimate") (전체 초기화)
```

- `currentStepId === "RESULT"` 이면 `<ResultScreen>` 렌더링
- 그 외에는 `<StepRenderer>` 렌더링

---

## Task 6: StepRenderer 컴포넌트 (`StepRenderer.tsx`)

현재 Step의 `inputType`에 따라 UI를 렌더링한다.

| inputType | UI |
|---|---|
| single-select | 버튼 카드 목록 (클릭 즉시 다음 Step 이동) |
| boolean | "예" / "아니오" 버튼 2개 |
| number | 숫자 입력 + 확인 버튼 (1 이상의 정수만 허용) |
| multi-select | 체크박스 목록 + "다음" 버튼 (0개 선택도 허용) |
| textarea | 텍스트 입력 + "다음" 버튼 (빈 값 허용) |

---

## Task 7: ResultScreen 컴포넌트 (`ResultScreen.tsx`)

`calculateEstimate(answers)` 호출 후 결과를 표시한다.

표시 규칙:
- `customRequirement` 없음: "예상 견적: {min}원 ~ {max}원"
- `customRequirement` 있음: "예상 견적은 150만원 이상입니다."

버튼:
- "실제 견적 요청하기" → (기존 ContactModal 또는 이메일 링크)
- "다시 견적 내기" → `router.replace("/estimate")`

---

## Task 8: 페이지 진입점 (`app/estimate/page.tsx`)

```tsx
import EstimateWizard from "@/components/estimate/EstimateWizard"

export default function EstimatePage() {
  return <EstimateWizard />
}
```

---

## Task 9: 헤더/네비게이션 연결

`Header.tsx`에 `/estimate` 링크 추가 여부 확인 및 반영.

---

## 구현 순서 (의존성 기준)

```
Task 1 (types.ts)
  ↓
Task 2 (flow.ts) + Task 4 (calculator.ts) — 병렬 가능
  ↓
Task 3 (navigator.ts)
  ↓
Task 6 (StepRenderer) + Task 7 (ResultScreen) — 병렬 가능
  ↓
Task 5 (EstimateWizard)
  ↓
Task 8 (page.tsx)
  ↓
Task 9 (헤더 연결)
```

---

## 제약 사항 (아키텍처 명세 준수)

- 모든 가격 계산은 `calculator.ts`에만 존재한다
- `price-table.json`에는 조건 로직, 계산식, 분기가 없다
- `flow.ts`에는 가격 로직이 없다
- 뒤로 가기 기능은 구현하지 않는다
- "다시 견적 내기"는 `router.replace("/estimate")` 전체 초기화 방식이다
