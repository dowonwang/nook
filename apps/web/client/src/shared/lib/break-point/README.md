# break-point

브라우저 창 너비를 Tailwind 브레이크포인트 이름으로 알려 줍니다. 창 크기가 바뀌면 값도 함께 바뀝니다.

첫 렌더링에서는 `null`이고, 마운트된 뒤에 실제 값이 들어옵니다.

## Hooks

### `useBreakPoint`

현재 브레이크포인트를 돌려줍니다. 스타일만 바꿀 때는 이 hook 대신 Tailwind 반응형 유틸리티를 씁니다.

#### Parameters

없음

#### Returns

`{ breakPoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | null }`: 현재 브레이크포인트입니다. 마운트되기 전에는 `null`입니다.

#### Examples

```tsx
import { useBreakPoint } from '$shared/lib/break-point';

const { breakPoint } = useBreakPoint();
const isMobile = breakPoint === 'sm' || breakPoint === 'md';
```
