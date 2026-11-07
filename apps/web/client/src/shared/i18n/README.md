# i18n

next-i18next 설정과 언어 판별 도구입니다. 문구는 슬라이스마다 `i18n/` 폴더에 두고, 이 세그먼트에는 공통 설정과 도구만 둡니다.

## Rules

### 슬라이스 i18n 폴더

슬라이스마다 `i18n/` 폴더를 두고 그 슬라이스의 문구만 넣습니다.

```text
pages/organization/home/i18n/
├── ko.json     # 기준 언어. 키 구조의 원본
├── en.json     # ko.json과 같은 키 구조
└── index.ts    # 키 타입 검사와 네임스페이스 상수
```

```ts
// pages/organization/home/i18n/index.ts
import en from './en.json';

import type { DeepStringify } from '$shared/i18n';
import type ko from './ko.json';

type I18nKey = DeepStringify<typeof ko>;

en satisfies I18nKey; // en.json에 키가 빠지거나 남으면 typecheck 실패

export const PAGES_ORGANIZATION_HOME_I18N_NAMESPACE = 'pages/organization/home';
```

### 새 i18n 폴더 만들기

새 폴더는 스니펫으로 만듭니다.

1. `i18n/` 폴더에 `ko.json`, `en.json`을 만들고 문구를 넣습니다. 처음에는 `{}`도 됩니다.
2. `i18n/index.ts`를 만들어 먼저 저장한 뒤, 빈 파일에서 `i18nns`를 입력하고 스니펫을 선택합니다(`.vscode/i18n.code-snippets`).
3. 스니펫이 파일 경로로 네임스페이스 상수 이름과 값을 채웁니다.

저장하지 않은 파일은 경로가 없어 이름이 채워지지 않습니다. 스니펫 내용을 바꾸면 이 문서의 예시도 함께 맞춥니다.

### 네임스페이스

- 값은 `src` 아래 슬라이스 경로와 같습니다. 리소스를 `<네임스페이스>/i18n/<locale>.json`에서 불러오기 때문입니다.
- 상수 이름은 `<레이어>_<슬라이스 경로>_I18N_NAMESPACE`입니다. 레이어는 폴더 이름 그대로 복수형 대문자(`ENTITIES`, `FEATURES`, `PAGES`, `WIDGETS`)를 쓰고, 경로의 `/`와 `-`는 `_`로 바꿉니다. 예: `features/organization-invitation/change-status`는 `FEATURES_ORGANIZATION_INVITATION_CHANGE_STATUS_I18N_NAMESPACE`입니다.

### 문구 사용

- 서버 컴포넌트는 `getT(네임스페이스)`(`next-i18next/server`), 클라이언트 컴포넌트는 `useT(네임스페이스)`(`next-i18next/client`)를 씁니다.
- 화면에 보이는 문구는 컴포넌트에 하드코딩하지 않고 `ko.json`과 `en.json`에 함께 추가합니다.

## Exports

### Hooks

#### `useLocale`

현재 언어를 돌려줍니다.

```tsx
import { useLocale } from '$shared/i18n';

const locale = useLocale();
```

### Functions

#### `resolveRequestLocale` (server only)

요청의 쿠키, `accept-language` 순서로 언어를 정합니다. 둘 다 없으면 기본 언어를 돌려줍니다.

```ts
import { resolveRequestLocale } from '$shared/i18n/server';

const locale = resolveRequestLocale(request);
```

#### `getLocaleFromPathname`

경로의 첫 부분에서 언어를 읽습니다. 지원하지 않는 언어면 `null`을 돌려줍니다.

```ts
import { getLocaleFromPathname } from '$shared/i18n';

getLocaleFromPathname('/ko/signin'); // 'ko'
```

#### `removeLocaleFromPathname`

경로에서 언어 부분을 뺍니다.

```ts
import { removeLocaleFromPathname } from '$shared/i18n';

removeLocaleFromPathname('/ko/signin'); // '/signin'
```

#### `createLocalizedPathname`

경로 앞에 언어를 붙입니다.

```ts
import { createLocalizedPathname } from '$shared/i18n';

createLocalizedPathname('/signin', 'ko'); // '/ko/signin'
```

### Constants

#### `i18nConfig` (server only)

next-i18next 서버 설정입니다. 앱 레이아웃과 미들웨어에서 씁니다.

```ts
import { i18nConfig } from '$shared/i18n/server';

initServerI18next(i18nConfig);
```

#### `resourceBackendServer`, `resourceBackendServerDev` (server only)

서버에서 번역 파일을 불러오는 i18next 플러그인입니다. `i18nConfig`에서만 씁니다.

```ts
import { resourceBackendServer } from '$shared/i18n/server';
```

#### `resourceBackend`

브라우저에서 번역 파일을 불러오는 i18next 플러그인입니다. 앱 설정에서만 씁니다.

```ts
import { resourceBackend } from '$shared/i18n';
```

#### `I18N_LOCALE`, `I18N_NAMESPACE`, `I18N_FALLBACK_LOCALE`

지원 언어, 불러올 수 있는 네임스페이스 접두사, 기본 언어입니다.

```ts
import { I18N_FALLBACK_LOCALE } from '$shared/i18n';
```

### Types

#### `I18nLocale`, `I18nNamespace`, `DeepStringify`

언어와 네임스페이스 값의 타입, 번역 키 구조를 검사하는 타입입니다.

```ts
import type { I18nLocale } from '$shared/i18n';
```
