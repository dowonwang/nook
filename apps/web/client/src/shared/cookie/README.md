# cookie

앱의 모든 쿠키를 읽고 씁니다. 쿠키마다 `auth`, `flash`, `i18n`, `theme` 폴더로 나눕니다.

## Rules

- 쿠키를 읽거나 쓰는 코드는 주제와 상관없이 이 세그먼트에 둡니다. 언제 세션을 갱신할지 같은 판단은 쿠키 코드가 아니므로 해당 슬라이스에 둡니다.
- 쿠키를 다루는 함수는 `$shared/cookie/server`로 공개합니다. 브라우저에서 쓰는 `setThemeCookie`, `useConsumeFlashCookie`와 상수만 `$shared/cookie`로 공개합니다.
- 함수 이름은 `get<주제>Cookie`, `set<주제>Cookie`, `clear<주제>Cookie`로 짓습니다. `NextResponse`에 쓰는 함수는 `ToResponse`, `NextRequest`에서 읽는 함수는 `FromRequest`를 붙입니다.
- 인증 쿠키는 `httpOnly`이고 값을 서명해서 저장합니다. 읽을 때 서명이 맞지 않으면 `null`을 돌려줍니다.
- flash 쿠키는 다음 화면에 한 번 보여 줄 메시지입니다. 10초 뒤 만료되고, 읽은 뒤에는 `useConsumeFlashCookie`로 지웁니다.
- 테마 쿠키는 사용자가 전환 버튼을 눌렀을 때만 만듭니다. JS가 쓰므로 `httpOnly`가 아닙니다.

## Exports

### Hooks

#### `useConsumeFlashCookie`

`/action/flash-token`을 호출해 읽은 flash 쿠키를 지웁니다.

```tsx
import { useConsumeFlashCookie } from '$shared/cookie';

useConsumeFlashCookie(!!flashToken);
```

### Functions

#### `getAuthAccessFromCookie`, `getAuthRefreshFromCookie` (server only)

서명을 확인하고 액세스 토큰, 리프레시 토큰을 읽습니다.

```ts
import { getAuthAccessFromCookie } from '$shared/cookie/server';

const accessToken = await getAuthAccessFromCookie();
```

#### `setAuthCookie`, `setAuthCookieToResponse` (server only)

토큰을 서명해서 저장합니다.

```ts
import { setAuthCookie } from '$shared/cookie/server';

await setAuthCookie(accessToken, refreshToken);
```

#### `clearAuthCookie`, `clearAuthCookieToResponse` (server only)

인증 쿠키를 지웁니다.

```ts
import { clearAuthCookieToResponse } from '$shared/cookie/server';

clearAuthCookieToResponse(response);
```

#### `createAuthCookieHeader` (server only)

갱신한 토큰을 반영한 `cookie` 헤더 문자열을 만듭니다.

```ts
import { createAuthCookieHeader } from '$shared/cookie/server';

const cookie = createAuthCookieHeader(request, accessToken, refreshToken);
```

#### `getFlashCookie`, `setFlashCookie`, `setFlashCookieToResponse`, `clearFlashCookie`, `clearFlashCookieToResponse` (server only)

flash 메시지를 읽고, 저장하고, 지웁니다.

```ts
import { setFlashCookie } from '$shared/cookie/server';

await setFlashCookie(SIGN_UP_SUCCESS_SIGNIN_REQUIRED);
```

#### `getI18nCookie`, `getI18nCookieFromRequest`, `setI18nCookieToResponse` (server only)

언어를 읽고 저장합니다. 쿠키가 없으면 기본 언어를 돌려줍니다. `getI18nCookieFromRequest`에 `false`를 넘기면 대신 `null`을 돌려줍니다.

```ts
import { getI18nCookie } from '$shared/cookie/server';

const locale = await getI18nCookie();
```

#### `getThemeCookie` (server only)

서버에서 테마를 읽습니다. 쿠키가 없으면 `null`을 돌려줍니다.

```ts
import { getThemeCookie } from '$shared/cookie/server';

const theme = await getThemeCookie();
```

#### `setThemeCookie`

브라우저에서 테마를 저장합니다.

```ts
import { setThemeCookie } from '$shared/cookie';

setThemeCookie('dark');
```

### Constants

#### `ACCESS_TOKEN_COOKIE_NAME`, `REFRESH_TOKEN_COOKIE_NAME`, `AUTH_COOKIE_OPTIONS`

#### `FLASH_COOKIE_NAME`, `FLASH_COOKIE_OPTIONS`

#### `I18N_COOKIE_NAME`, `I18N_COOKIE_MAX_AGE`, `I18N_COOKIE_OPTIONS`

쿠키 이름과 옵션입니다. 미들웨어나 언어 전환처럼 쿠키 이름이 직접 필요할 때 씁니다.

```ts
import { I18N_COOKIE_NAME } from '$shared/cookie';
```
