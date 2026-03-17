# 큐브 드래그 회전 문제 분석

## 현상
- 마우스 드래그로 큐브를 돌려도 **회전 방향이 바뀌지 않는다**
- 드래그 중 큐브가 약간 움직이는 것처럼 보이지만, 놓으면 원래 방향으로 바로 복귀

## 원인 (3가지)

### 1. R3F 포인터 이벤트는 레이캐스트 기반 — 드래그가 사실상 작동하지 않음
- `onPointerMove`가 `<group>` (cubeGroupRef)에 바인딩되어 있음
- R3F에서 3D 오브젝트의 포인터 이벤트는 **레이캐스트로 메시에 교차할 때만** 발생
- 큐비 사이에 0.08 간격이 있으므로, 마우스가 틈새로 이동하면 이벤트가 **끊김**
- 결과: `onPointerMove`가 거의 호출되지 않아 `dx`, `dy`가 사실상 0
- `setPointerCapture`도 R3F 이벤트 시스템에서는 제대로 동작하지 않음

### 2. 속도 설정이 단일 프레임 기반 — 노이즈에 취약
```typescript
anim.current.spinVelY = dx * 0.3;  // 마지막 한 프레임의 dx만 사용
```
- 이벤트가 간헐적으로 발생하므로, 마지막 `dx`가 0일 확률이 높음
- 놓는 순간 velocity가 0으로 설정됨

### 3. 마찰이 항상 기본 방향으로 복귀시킴
```typescript
const baseSpeed = (2 * Math.PI) / TIMING.idleRotationPeriod;
a.spinVelY += (baseSpeed - a.spinVelY) * 0.01;
```
- `baseSpeed`는 양수(반시계 방향) 고정
- 어떤 방향으로 fling해도 결국 원래 방향으로 복귀
- **방향 전환 자체가 불가능한 구조**

## 해결 방안

### 핵심: DOM 레벨에서 포인터 이벤트 처리
R3F 3D 이벤트 대신, Canvas를 감싸는 **DOM 컨테이너**에서 pointer 이벤트를 처리해야 함.

### 구현 계획

**CubeAnimation.tsx (DOM 이벤트 담당)**
1. `containerRef`에 `onPointerDown/Move/Up` 핸들러 추가
2. 드래그 delta를 계산하여 CubeScene에 전달
3. CubeScene에 `onDrag` / `onDragEnd` 콜백 prop 추가

또는 더 간단하게:

**CubeScene.tsx에서 window 이벤트 사용**
1. `onPointerDown`은 기존 3D 이벤트로 "드래그 시작" 감지 (큐브 클릭)
2. 드래그 시작 후 `window`에 `pointermove` / `pointerup` 리스너를 등록
3. 이렇게 하면 마우스가 큐브 밖으로 나가도 이벤트가 계속 발생
4. `pointerup` 시 window 리스너 제거

**속도 계산 개선**
- 단일 프레임이 아닌 최근 N프레임의 이동 평균으로 velocity 계산
- 또는 간단히: `pointerup` 시점의 pointer 위치와 직전 위치의 차이를 사용

**마찰 로직 개선**
- `baseSpeed` 방향으로 강제 복귀하지 않음
- 대신 순수 마찰만 적용: `velocity *= 0.98`
- 속도가 충분히 줄어들면 기본 Y축 회전으로 자연스럽게 전환

### 수정할 파일
- `CubeScene.tsx`: 3D 포인터 이벤트 → window 이벤트 방식으로 변경, 마찰 로직 수정
