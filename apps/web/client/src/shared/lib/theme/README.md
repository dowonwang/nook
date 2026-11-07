# theme

사용자가 고른 테마 상태를 관리하고 화면에 적용합니다.

첫 화면의 테마는 CSS가 정합니다. 쿠키가 없으면 상태 값은 `null`이고, 화면은 시스템 설정을 따릅니다. 그래서 현재 테마가 필요하면 `theme ?? getSystemTheme()`으로 확인합니다.

## Exports

### Providers

#### `ThemeProvider`

테마 상태를 하위 컴포넌트에 전달합니다. 앱 레이아웃에서 쿠키 값을 넘겨 한 번만 감쌉니다.

```tsx
import { ThemeProvider } from '$shared/lib/theme';

<ThemeProvider initTheme={theme}>{children}</ThemeProvider>;
```

### Hooks

#### `useThemeContext`

사용자가 고른 테마와 변경 함수를 돌려줍니다. `ThemeProvider` 밖에서 쓰면 에러가 납니다.

```tsx
import { useThemeContext } from '$shared/lib/theme';

const { theme, setTheme } = useThemeContext();
```

### Functions

#### `applyTheme`

테마를 쿠키에 저장하고 `<html>` 클래스를 바꿉니다. 상태는 바꾸지 않으므로 `setTheme`과 함께 호출합니다.

```tsx
import { applyTheme } from '$shared/lib/theme';

applyTheme('dark');
setTheme('dark');
```

#### `getSystemTheme`

브라우저의 시스템 테마를 돌려줍니다. `window`를 쓰므로 이벤트 핸들러처럼 브라우저에서 실행되는 코드에서만 호출합니다.

```tsx
import { getSystemTheme } from '$shared/lib/theme';

const currentTheme = theme ?? getSystemTheme();
```

### Types

#### `Theme`

테마 값의 타입입니다. `'light' | 'dark'`입니다.

```ts
import type { Theme } from '$shared/lib/theme';
```
