# Portfolio Section

## 위치
- Outsourcing Section과 Footer 사이 (세 번째 섹션)

## 스타일
- **배경색**: bg-white (기존 섹션 동일)
- **섹션 높이**: min-h-dvh
- **SectionFx**: variant="white" (기존 섹션 동일)

## 구성

### 제목
- "웹사이트 포트폴리오를 확인해보세요"

### 포트폴리오 카드 (2x2 그리드)
- **레이아웃**: 데스크탑 2열 x 2행 / 모바일 1열
- **이미지 스타일**: rounded 없음 (sharp corners)
- **hover 효과**: 살짝 확대 (scale)
- **클릭 동작**: 해당 웹사이트로 새 탭 이동 (`target="_blank"`)
- **이미지 아래**: 웹사이트 이름 텍스트 공간
- **이미지/링크**: placeholder 사용 (추후 사용자가 직접 삽입)

## 구현 계획

1. `page.tsx`에 Portfolio Section 추가
   - Outsourcing Section 아래, `</main>` 위
   - 포트폴리오 데이터 배열 정의 (`image`, `url`, `name`)
2. 카드 구현
   - Tailwind `grid grid-cols-1 md:grid-cols-2`
   - `<a target="_blank" rel="noopener noreferrer">`로 감싸기
   - `next/image`로 이미지 렌더링
   - 이미지 아래에 웹사이트 이름 텍스트
   - hover 시 `scale` 효과 (transition)
3. placeholder 데이터
   - 이미지: `/placeholder-1.png` ~ `/placeholder-4.png`
   - URL: `#`
   - 이름: `"포트폴리오 1"` ~ `"포트폴리오 4"`
