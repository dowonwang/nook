# cookie

앱의 모든 쿠키를 읽고 씁니다. 쿠키마다 `auth`, `flash`, `i18n`, `theme` 폴더로 나눕니다.

## Rules

- 쿠키를 읽거나 쓰는 코드는 주제와 상관없이 이 세그먼트에 둡니다. 언제 세션을 갱신할지 같은 판단은 쿠키 코드가 아니므로 해당 슬라이스에 둡니다.
- 쿠키를 다루는 함수는 `$shared/cookie/server`로 공개합니다. 브라우저에서 쓰는 `setThemeCookie`, `useConsumeFlashCookie`와 상수만 `$shared/cookie`로 공개합니다.
- 함수 이름은 `get<주제>Cookie`, `set<주제>Cookie`, `clear<주제>Cookie`로 짓습니다. `NextResponse`에 쓰는 함수는 `ToResponse`, `NextRequest`에서 읽는 함수는 `FromRequest`를 붙입니다.
- 인증 쿠키는 `httpOnly`이고 값을 서명해서 저장합니다. 읽을 때 서명이 맞지 않으면 `null`을 돌려줍니다.
- flash 쿠키는 다음 화면에 한 번 보여 줄 메시지입니다. 10초 뒤 만료되고, 읽은 뒤에는 `useConsumeFlashCookie`로 지웁니다.
- 테마 쿠키는 사용자가 전환 버튼을 눌렀을 때만 만듭니다. JS가 쓰므로 `httpOnly`가 아닙니다.

## Hooks

### `useConsumeFlashCookie`

`/action/flash-token`을 호출해 읽은 flash 쿠키를 지웁니다.

#### Parameters

| 이름            | 타입      | 설명                                                                      |
| --------------- | --------- | ------------------------------------------------------------------------- |
| `shouldConsume` | `boolean` | flash 쿠키가 있을 때 `true`를 넘깁니다. `false`면 아무것도 하지 않습니다. |

#### Returns

`void`

#### Examples

```tsx
import { useConsumeFlashCookie } from '$shared/cookie';

useConsumeFlashCookie(!!flashToken);
```

## Functions

### `getAuthAccessFromCookie` (server only)

서명을 확인하고 액세스 토큰을 읽습니다.

#### Parameters

없음

#### Returns

`Promise<string | null>`: 액세스 토큰입니다. 쿠키가 없거나 서명이 맞지 않으면 `null`입니다.

#### Examples

```ts
import { getAuthAccessFromCookie } from '$shared/cookie/server';

const accessToken = await getAuthAccessFromCookie();
```

---

### `getAuthRefreshFromCookie` (server only)

서명을 확인하고 리프레시 토큰을 읽습니다.

#### Parameters

없음

#### Returns

`Promise<string | null>`: 리프레시 토큰입니다. 쿠키가 없거나 서명이 맞지 않으면 `null`입니다.

#### Examples

```ts
import { getAuthRefreshFromCookie } from '$shared/cookie/server';

const refreshToken = await getAuthRefreshFromCookie();
```

---

### `setAuthCookie` (server only)

Server Action이나 RSC에서 토큰을 서명해서 저장합니다.

#### Parameters

| 이름           | 타입     | 설명                 |
| -------------- | -------- | -------------------- |
| `accessToken`  | `string` | 액세스 토큰입니다.   |
| `refreshToken` | `string` | 리프레시 토큰입니다. |

#### Returns

`Promise<void>`

#### Examples

```ts
import { setAuthCookie } from '$shared/cookie/server';

await setAuthCookie(accessToken, refreshToken);
```

---

### `setAuthCookieToResponse` (server only)

미들웨어나 Route Handler의 응답에 토큰을 서명해서 저장합니다.

#### Parameters

| 이름           | 타입           | 설명                  |
| -------------- | -------------- | --------------------- |
| `response`     | `NextResponse` | 쿠키를 쓸 응답입니다. |
| `accessToken`  | `string`       | 액세스 토큰입니다.    |
| `refreshToken` | `string`       | 리프레시 토큰입니다.  |

#### Returns

`void`

#### Examples

```ts
import { setAuthCookieToResponse } from '$shared/cookie/server';

setAuthCookieToResponse(response, accessToken, refreshToken);
```

---

### `clearAuthCookie` (server only)

Server Action이나 RSC에서 인증 쿠키를 지웁니다.

#### Parameters

없음

#### Returns

`Promise<void>`

#### Examples

```ts
import { clearAuthCookie } from '$shared/cookie/server';

await clearAuthCookie();
```

---

### `clearAuthCookieToResponse` (server only)

미들웨어나 Route Handler의 응답에서 인증 쿠키를 지웁니다.

#### Parameters

| 이름       | 타입           | 설명                    |
| ---------- | -------------- | ----------------------- |
| `response` | `NextResponse` | 쿠키를 지울 응답입니다. |

#### Returns

`void`

#### Examples

```ts
import { clearAuthCookieToResponse } from '$shared/cookie/server';

clearAuthCookieToResponse(response);
```

---

### `createAuthCookieHeader` (server only)

갱신한 토큰을 반영한 `cookie` 헤더 문자열을 만듭니다. 갱신 후 같은 요청을 다시 보낼 때 씁니다.

#### Parameters

| 이름           | 타입          | 설명                                            |
| -------------- | ------------- | ----------------------------------------------- |
| `request`      | `NextRequest` | 원래 요청입니다. 다른 쿠키는 그대로 유지합니다. |
| `accessToken`  | `string`      | 새 액세스 토큰입니다.                           |
| `refreshToken` | `string`      | 새 리프레시 토큰입니다.                         |

#### Returns

`string`: 인증 쿠키를 새 값으로 바꾼 `cookie` 헤더입니다.

#### Examples

```ts
import { createAuthCookieHeader } from '$shared/cookie/server';

const cookie = createAuthCookieHeader(request, accessToken, refreshToken);
```

---

### `getFlashCookie` (server only)

flash 메시지를 읽습니다.

#### Parameters

없음

#### Returns

`Promise<string | undefined>`: flash 메시지입니다. 없으면 `undefined`입니다.

#### Examples

```ts
import { getFlashCookie } from '$shared/cookie/server';

const flashToken = await getFlashCookie();
```

---

### `setFlashCookie` (server only)

Server Action에서 flash 메시지를 저장합니다.

#### Parameters

| 이름      | 타입     | 설명                                                       |
| --------- | -------- | ---------------------------------------------------------- |
| `message` | `string` | 다음 화면에 보여 줄 메시지입니다. 보통 i18n 키를 넣습니다. |

#### Returns

`Promise<void>`

#### Examples

```ts
import { setFlashCookie } from '$shared/cookie/server';

await setFlashCookie(SIGN_UP_SUCCESS_SIGNIN_REQUIRED);
```

---

### `setFlashCookieToResponse` (server only)

미들웨어나 Route Handler의 응답에 flash 메시지를 저장합니다.

#### Parameters

| 이름       | 타입           | 설명                              |
| ---------- | -------------- | --------------------------------- |
| `response` | `NextResponse` | 쿠키를 쓸 응답입니다.             |
| `message`  | `string`       | 다음 화면에 보여 줄 메시지입니다. |

#### Returns

`void`

#### Examples

```ts
import { setFlashCookieToResponse } from '$shared/cookie/server';

setFlashCookieToResponse(response, SESSION_REQUIRED_SIGN_IN);
```

---

### `clearFlashCookie` (server only)

Server Action이나 RSC에서 flash 쿠키를 지웁니다.

#### Parameters

없음

#### Returns

`Promise<void>`

#### Examples

```ts
import { clearFlashCookie } from '$shared/cookie/server';

await clearFlashCookie();
```

---

### `clearFlashCookieToResponse` (server only)

Route Handler의 응답에서 flash 쿠키를 지웁니다.

#### Parameters

| 이름       | 타입           | 설명                    |
| ---------- | -------------- | ----------------------- |
| `response` | `NextResponse` | 쿠키를 지울 응답입니다. |

#### Returns

`void`

#### Examples

```ts
import { clearFlashCookieToResponse } from '$shared/cookie/server';

clearFlashCookieToResponse(response);
```

---

### `getI18nCookie` (server only)

Server Action이나 RSC에서 언어를 읽습니다.

#### Parameters

없음

#### Returns

`Promise<I18nLocale>`: 저장된 언어입니다. 쿠키가 없으면 기본 언어입니다.

#### Examples

```ts
import { getI18nCookie } from '$shared/cookie/server';

const locale = await getI18nCookie();
```

---

### `getI18nCookieFromRequest` (server only)

미들웨어에서 요청의 언어를 읽습니다.

#### Parameters

| 이름          | 타입          | 설명                                                                 |
| ------------- | ------------- | -------------------------------------------------------------------- |
| `request`     | `NextRequest` | 미들웨어가 받은 요청입니다.                                          |
| `useFallback` | `boolean?`    | 쿠키가 없을 때 기본 언어를 돌려줄지 정합니다. 기본값은 `true`입니다. |

#### Returns

`I18nLocale | null`: 저장된 언어입니다. 쿠키가 없으면 `useFallback`이 `true`일 때 기본 언어, `false`일 때 `null`입니다.

#### Examples

```ts
import { getI18nCookieFromRequest } from '$shared/cookie/server';

const cookieLocale = getI18nCookieFromRequest(request, false);
```

---

### `setI18nCookieToResponse` (server only)

미들웨어의 응답에 언어를 저장합니다.

#### Parameters

| 이름       | 타입           | 설명                  |
| ---------- | -------------- | --------------------- |
| `response` | `NextResponse` | 쿠키를 쓸 응답입니다. |
| `value`    | `I18nLocale`   | 저장할 언어입니다.    |

#### Returns

`void`

#### Examples

```ts
import { setI18nCookieToResponse } from '$shared/cookie/server';

setI18nCookieToResponse(response, locale);
```

---

### `getThemeCookie` (server only)

서버에서 테마를 읽습니다.

#### Parameters

없음

#### Returns

`Promise<Theme | null>`: 저장된 테마입니다. 쿠키가 없거나 값이 올바르지 않으면 `null`입니다.

#### Examples

```ts
import { getThemeCookie } from '$shared/cookie/server';

const theme = await getThemeCookie();
```

---

### `setThemeCookie`

브라우저에서 테마를 저장합니다. 1년 동안 유지됩니다.

#### Parameters

| 이름    | 타입    | 설명               |
| ------- | ------- | ------------------ |
| `theme` | `Theme` | 저장할 테마입니다. |

#### Returns

`void`

#### Examples

```ts
import { setThemeCookie } from '$shared/cookie';

setThemeCookie('dark');
```

## Constants

### `ACCESS_TOKEN_COOKIE_NAME`, `REFRESH_TOKEN_COOKIE_NAME`, `AUTH_COOKIE_OPTIONS`

인증 쿠키의 이름과 옵션입니다. 옵션은 `httpOnly`, `secure`, `sameSite: 'lax'`, `path: '/'`입니다.

#### Examples

```ts
import { ACCESS_TOKEN_COOKIE_NAME } from '$shared/cookie';
```

---

### `FLASH_COOKIE_NAME`, `FLASH_COOKIE_OPTIONS`

flash 쿠키의 이름과 옵션입니다. 인증 쿠키 옵션에 `maxAge: 10`(초)이 더해집니다.

#### Examples

```ts
import { FLASH_COOKIE_NAME } from '$shared/cookie';
```

---

### `I18N_COOKIE_NAME`, `I18N_COOKIE_MAX_AGE`, `I18N_COOKIE_OPTIONS`

언어 쿠키의 이름, 유지 시간(1년, 초 단위), 옵션입니다. next-i18next 설정과 언어 전환에서 쿠키 이름이 필요할 때 씁니다.

#### Examples

```ts
import { I18N_COOKIE_NAME } from '$shared/cookie';
```
