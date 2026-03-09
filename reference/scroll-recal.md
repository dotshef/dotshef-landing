배경 지식
-   min-h-screen은 Tailwind에서 min-height: 100vh로 컴파일된다. iOS Safari에서 100vh는 툴바가 숨겨진 상태의 큰 viewport 높이로 고정된다. 그래서:

1. 페이지 로드 시 → 섹션들이 100vh (large) 기준으로 렌더링
2. 하단으로 스크롤 → 툴바 재등장 → viewport 높이 축소
3. 브라우저가 스크롤 위치를 재계산 → 레이아웃 reflow 발생

-   Tailwind v4에서 min-h-dvh는 min-height: 100dvh로 컴파일된다. dvh는 툴바 상태에 따라 동적으로 변하는 최신 CSS 단위라 iOS Safari와 올바르게   
    협동한다.



원인
- iOS Safari는 100vh를 툴바가 숨겨진 상태(large viewport)의 높이로 고정 계산한다. 페이지 하단에 도달하면 툴바가 다시 나타나 viewport 높이가   
줄어들고, 브라우저가 스크롤 위치를 강제로 재계산하면서 뚝뚝 끊기는 현상이 발생한다.

결과
- min-h-dvh(100dvh)는 툴바 표시 여부에 따라 동적으로 변하는 viewport 높이를 기준으로 삼기 때문에, 툴바가 나타나도 레이아웃 reflow가 일어나지  
않아 스크롤이 끊기지 않는다.
