# 🧊 3×3 큐브 블록 3D 애니메이션 — 작업 목록

> **기반 문서**: `reference/cube-animation.md` v3.0
> **작성일**: 2026-03-17

---

## Phase 0: 환경 설정 & 의존성 설치

### Task 0.1 — 3D/애니메이션 패키지 설치
- [ ] `three` (r160+) 설치
- [ ] `@react-three/fiber` 설치
- [ ] `@react-three/drei` 설치 (RoundedBox, PerspectiveCamera 등 유틸)
- [ ] `@react-three/postprocessing` 설치 (SSAO 후처리)
- [ ] `gsap` 설치 (Timeline + CustomEase)
- [ ] `@types/three` 설치 (devDependencies)
- **검증**: `npm run build` 통과 확인

### Task 0.2 — Tailwind 테마 색상 확장
- [ ] `globals.css`의 `@theme inline`에 큐브 전용 색상 추가
  - `--color-cube-primary: #1A1A1A`
  - `--color-cube-secondary: #F5F5F5`
  - `--color-cube-accent: #4A90D9`
- **참고**: 기존 `brand-black(#000000)`과 구분되는 다크 그레이

---

## Phase 1: 기본 3D 장면 구성 (M1)

### Task 1.1 — Canvas 래퍼 컴포넌트 생성
- [ ] `src/components/cube/CubeAnimation.tsx` 생성
- [ ] React Three Fiber `<Canvas>` 설정
  - `camera`: PerspectiveCamera, FOV 45~50, 위에서 20~25도 하향
  - `gl`: `{ alpha: true, antialias: true, pixelRatio: Math.min(window.devicePixelRatio, 2) }`
  - `style`: `{ background: 'transparent' }`
- [ ] Props 인터페이스 정의 (`width`, `height`, `primaryColor`, `secondaryColor`, `accentColor`, `autoPlay`, `enableParallax`)
- [ ] `'use client'` 지시어 + `dynamic import`로 SSR 방지
- **산출물**: 투명 배경의 빈 3D 캔버스가 렌더링됨

### Task 1.2 — 라이팅 설정
- [ ] Ambient Light: 강도 0.5, `#FFFFFF`
- [ ] Directional Light: 우상단 45도, 강도 0.8
- [ ] 소프트 섀도우 활성화 (큐브 아래 + 평면 위)
- **검증**: 빈 장면에 조명이 올바르게 적용되는지 시각 확인

### Task 1.3 — 카메라 위치 & 시점 조정
- [ ] 큐브 조립 영역(공중)과 블록 평면(아래)이 모두 시야에 들어오도록 카메라 position 조정
- [ ] FOV 45~50도 설정
- [ ] 정면에서 약간 위(20~25도)에서 내려다보는 각도
- **검증**: 개발자 도구에서 카메라 시점 확인

---

## Phase 2: 큐비 & 블록 지오메트리 (M1~M2)

### Task 2.1 — 큐비 지오메트리 정의
- [ ] RoundedBox 지오메트리 (1×1×1, bevel 0.05)
- [ ] MeshStandardMaterial 설정
  - Primary `#1A1A1A`: roughness 0.7, metalness 0.0
  - Secondary `#F5F5F5`: roughness 0.8, metalness 0.0
- [ ] `InstancedMesh` 활용을 위한 구조 설계 (27+30개 동일 형태)

### Task 2.2 — 3×3×3 큐브 슬롯 배치
- [ ] 27개 큐비의 목표 위치 계산 (3 Layer × 3×3)
  - 큐비 간 간격: 0.08 단위
  - 전체 큐브 크기: 약 3.24 × 3.24 × 3.24 단위
- [ ] `CubeAssembly` 컴포넌트 생성: 각 슬롯의 좌표 배열 관리
- [ ] 큐브 블록 넘버링 (기획서 5.3 참조) 데이터 구조화
- **검증**: 27개 큐비가 올바른 3×3×3 위치에 정적으로 렌더링됨

### Task 2.3 — 5×6 블록 평면 생성
- [ ] `BlockPlane` 컴포넌트 생성
- [ ] 30개 블록(5열 × 6행) 배치
  - 블록 크기: 1×1×1 (큐비와 동일)
  - 블록 간 간격: 0.08 단위
- [ ] 평면 위치: 큐브 중심에서 Y축 아래 약 5~6 단위
- [ ] Secondary 색상(`#F5F5F5`) 적용
- **검증**: 큐브 아래에 5×6 평면 그리드가 수평으로 렌더링됨

---

## Phase 3: 블록 추출 애니메이션 (M2)

### Task 3.1 — 블록 추출 메커니즘 구현
- [ ] 평면에서 블록 선택 시 Accent(`#4A90D9`) 하이라이트 깜빡임 (0.2s)
- [ ] 선택된 블록이 Y축으로 +0.5 솟아오르는 애니메이션 (0.2s)
- [ ] 색상 전환: Secondary → Primary (페이드 0.15s)
- [ ] GSAP Timeline으로 시퀀스 제어

### Task 3.2 — 빈 자리 보충 시스템
- [ ] `RefillSystem` 로직 구현
- [ ] 블록 추출 후 빈 자리 상태 0.3s 유지
- [ ] 아래(Y축 -)에서 새 블록이 올라오며 빈 자리 채움
  - 이징: "back.out" (살짝 튀어오르며 착지)
  - 소요 시간: 0.4s
- [ ] 빈 자리에 미세한 그림자 홀(shadow hole) 표현
- [ ] 보충 블록은 Secondary 색상으로 등장
- **검증**: 블록 추출 → 빈 자리 → 보충 사이클이 자연스럽게 동작

---

## Phase 4: 포물선 이동 애니메이션 (M3)

### Task 4.1 — 베지어 곡선 경로 계산
- [ ] `Three.js CubicBezierCurve3`로 포물선 궤적 생성
  - 시작점: 평면 Y + 0.5 (솟아오른 위치)
  - 정점: 시작-목표 중간에서 Y축 +2.0~3.0 단위
  - 끝점: 큐브 내 목표 슬롯 위치
- [ ] 각 블록마다 정점 높이에 ±0.5 랜덤 편차 적용
- [ ] 경로를 따라 블록이 이동하는 로직 구현

### Task 4.2 — 비행 블록 애니메이션
- [ ] `FlyingBlock` 컴포넌트 생성 (최대 1개만 존재)
- [ ] 이동 시간: 0.45s
- [ ] 이징: "power2.inOut"
- [ ] 이동 중 Y축 기준 180~360도 회전 (비행감)
- [ ] GSAP MotionPath 또는 커스텀 경로 추적 구현

### Task 4.3 — 큐브 안착 애니메이션
- [ ] 목표 위치 도착 시 미세 바운스로 착지 (0.1s)
- [ ] Primary 색상으로 큐브 슬롯에 고정
- **검증**: 평면 → 솟아오름 → 포물선 비행 → 안착 전체 흐름 확인

---

## Phase 5: 전체 타임라인 조립 (M4)

### Task 5.1 — Phase 1: 장면 등장 (0.0s ~ 1.0s)
- [ ] 평면 페이드인 + 스케일업 등장 애니메이션
- [ ] 큐브 조립 영역(빈 와이어프레임 or 투명) 미세 표시

### Task 5.2 — Phase 2: 블록 추출 & 조립 시퀀스 (1.0s ~ 8.0s)
- [ ] 추출 순서 배열 구현 (기획서 5.3 무작위 느낌 순서):
  ```
  5→4→6→7→9→10→1→2→3→
  15→12→8→14→11→13→16→18→17→
  27→19→25→20→21→22→24→26→23
  ```
- [ ] 블록당 약 0.25s 간격으로 추출 시작
- [ ] 27개 블록 순차 추출 → 이동 → 안착 전체 시퀀스
- [ ] GSAP Master Timeline으로 전체 오케스트레이션

### Task 5.3 — Phase 3: 완성 피드백 (8.0s ~ 8.8s)
- [ ] 마지막 블록 안착 후 Accent 글로우 스캔 효과
- [ ] 큐브 미세 바운스 (scale 1.0 → 1.03 → 1.0)

### Task 5.4 — Phase 4: 평면 퇴장 (8.8s ~ 9.5s)
- [ ] 평면이 아래로 서서히 내려가며 페이드아웃
- [ ] 큐브만 화면에 남음

### Task 5.5 — Phase 5: 아이들 회전 (9.5s~)
- [ ] 완성된 큐브 Y축 기준 자동 회전 (8초/1회전)
- [ ] 무한 루프 구현
- **검증**: Phase 1~5 전체 타임라인이 약 10초 내에 자연스럽게 재생됨

---

## Phase 6: 인터랙션 (M5)

### Task 6.1 — 마우스 패럴랙스
- [ ] `CameraRig` 컴포넌트 구현
- [ ] 마우스 위치에 따라 전체 장면 미세 기울어짐 (최대 ±12도)
- [ ] 평면 + 큐브 함께 반응
- [ ] `enableParallax` prop으로 on/off 제어

### Task 6.2 — 호버 인터랙션
- [ ] 큐브 영역 마우스 호버 시 아이들 회전 속도 50% 감소 (Phase 5에서만)
- [ ] 마우스 아웃 시 원래 속도 복귀 (0.5s ease-out)

### Task 6.3 — 모바일 터치 지원
- [ ] 터치 스와이프로 큐브 회전 (Phase 5에서만)
- [ ] 모바일 전용 터치 이벤트 핸들링

---

## Phase 7: 히어로 섹션 통합 (M7)

### Task 7.1 — 히어로 섹션 레이아웃 변경
- [ ] `src/app/page.tsx` 히어로 섹션 수정
- [ ] 기존 `BlockStack` 컴포넌트를 `CubeAnimation`으로 교체
- [ ] 데스크톱: 좌우 45:55 분할 레이아웃
- [ ] 모바일: 텍스트 상단 → 큐브 하단 세로 스택
- [ ] `CubeAnimation` dynamic import 적용 (SSR 방지)

### Task 7.2 — 도트 패턴 배경 연동
- [ ] 캔버스 `alpha: true`로 `SectionFx` 도트 패턴 비침 확인
- [ ] 투명 배경이 기존 사이트 톤과 자연스럽게 어울리는지 확인

---

## Phase 8: 반응형 & 접근성 (M6)

### Task 8.1 — 반응형 분기 처리
- [ ] Desktop (1200px+): 히어로 우측 55%, 풀 인터랙션 + SSAO
- [ ] Tablet (768~1199px): 히어로 우측 50%, 패럴랙스 비활성화
- [ ] Mobile (~767px): 텍스트 아래 100% / 높이 350px, SSAO 비활성화, 터치만

### Task 8.2 — 접근성 처리
- [ ] `prefers-reduced-motion` 감지 시 애니메이션 스킵 → 완성 큐브 정적 렌더링
- [ ] 캔버스에 `aria-hidden="true"` 적용
- [ ] 히어로 텍스트와 캔버스 별도 DOM 유지

---

## Phase 9: 성능 최적화 (M6)

### Task 9.1 — 렌더링 최적화
- [ ] `InstancedMesh` 활용 (27+30개 동일 지오메트리)
- [ ] `pixelRatio` 상한 2 적용
- [ ] Intersection Observer로 뷰포트 이탈 시 렌더 중단
- [ ] 모바일에서 SSAO 비활성화

### Task 9.2 — 번들 최적화
- [ ] 3D 관련 JS 번들 300KB 이하 (gzip) 목표
- [ ] Three.js tree-shaking 확인
- [ ] Dynamic import로 LCP 영향 제거
- [ ] CLS 0 유지 (캔버스 영역 사전 크기 확보)

### Task 9.3 — 폴백 처리
- [ ] WebGL 미지원 브라우저 감지
- [ ] 폴백: 기존 `BlockStack` 2D 3×3 그리드 아이콘 정적 렌더링
- **검증**: WebGL 비활성화 상태에서 폴백이 정상 동작하는지 확인

---

## Phase 10: 루프 & 최종 QA (M7)

### Task 10.1 — 루프 정책 구현
- [ ] 최초 방문: Phase 1~5 전체 재생 (약 10초)
- [ ] 이후: Phase 5(아이들 회전)만 무한 루프
- [ ] `Intersection Observer`로 뷰포트 이탈 시 애니메이션 일시 정지

### Task 10.2 — 크로스 브라우저 & 디바이스 QA
- [ ] Chrome, Firefox, Safari, Edge 테스트
- [ ] 데스크톱/태블릿/모바일 레이아웃 확인
- [ ] FPS 측정: 데스크톱 60fps, 모바일 30fps+ 목표
- [ ] 도트 패턴 배경 비침 + 전체 톤 통일성 확인

### Task 10.3 — 기존 코드 정리
- [ ] `BlockStack.tsx` 폴백 전용으로 유지 또는 제거 결정
- [ ] 불필요한 import/코드 정리
- [ ] `npm run build` 최종 통과 확인

---

## 의존성 그래프

```
Phase 0 (환경 설정)
  └─→ Phase 1 (장면 구성)
        └─→ Phase 2 (지오메트리)
              ├─→ Phase 3 (추출 애니메이션)
              │     └─→ Phase 4 (포물선 이동)
              │           └─→ Phase 5 (타임라인 조립)
              │                 └─→ Phase 6 (인터랙션)
              │                       └─→ Phase 7 (통합)
              └─────────────────────────────────→ Phase 7 (통합)
                                                    └─→ Phase 8 (반응형/접근성)
                                                          └─→ Phase 9 (성능 최적화)
                                                                └─→ Phase 10 (QA)
```

---

## 주요 파일 구조 (예상)

```
src/components/cube/
├── CubeAnimation.tsx       # 메인 래퍼 (Canvas + dynamic import)
├── CubeScene.tsx           # 3D 장면 루트 (Lights, Camera, PostProcessing)
├── CameraRig.tsx           # 마우스 패럴랙스 카메라 제어
├── CubeAssembly.tsx        # 27개 큐비 슬롯 관리
├── BlockPlane.tsx          # 5×6 평면 그리드 + 보충 시스템
├── FlyingBlock.tsx         # 이동 중 블록 (포물선 궤적)
├── useAnimationTimeline.ts # GSAP Master Timeline 훅
├── useCubePositions.ts     # 큐브 슬롯 좌표 계산 훅
└── constants.ts            # 색상, 크기, 타이밍 상수
```
