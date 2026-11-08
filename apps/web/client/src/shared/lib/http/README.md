# http

HTTP 요청 헤더, URL 쿼리, 이동 경로를 다룹니다.

## Functions

### `getSafeRedirectPath` (server only)

사용자 입력으로 받은 이동 경로를 앱 내부 경로로 제한합니다(오픈 리다이렉트 방지). `APP_BASE_URL`과 다른 origin으로 해석되거나 제어 문자, 역슬래시가 있으면 `fallback`을 돌려줍니다.

#### Parameters

| 이름       | 타입      | 설명                                                       |
| ---------- | --------- | ---------------------------------------------------------- |
| `value`    | `unknown` | 검사할 이동 경로입니다. `/`로 시작하는 문자열만 씁니다.    |
| `fallback` | `string?` | 경로가 안전하지 않을 때 쓸 경로입니다. 기본값은 `/`입니다. |

#### Returns

`string`: 앱 내부 경로(경로, 쿼리, 해시)입니다. 안전하지 않으면 `fallback`입니다.

#### Examples

```ts
import { getSafeRedirectPath } from '$shared/lib/http/server';

redirect(getSafeRedirectPath(previousState.state['redirect-to']));
```

---

### `createSearchParams`

객체를 `URLSearchParams`로 바꿉니다. 값이 `undefined`나 `null`인 키는 뺍니다.

#### Parameters

| 이름    | 타입      | 설명                                            |
| ------- | --------- | ----------------------------------------------- |
| `query` | `object?` | 쿼리로 바꿀 객체입니다. 값은 문자열로 바꿉니다. |

#### Returns

`URLSearchParams`: 변환한 쿼리입니다. `query`가 없으면 빈 값입니다.

#### Examples

```ts
import { createSearchParams } from '$shared/lib/http';

const searchParams = createSearchParams({ page: 1, limit: undefined });

clientFetcher('/api/organization?' + searchParams.toString(), options);
```

---

### `getClientIp`

`x-forwarded-for`, `x-real-ip` 헤더에서 클라이언트 IP를 읽습니다.

#### Parameters

| 이름      | 타입      | 설명             |
| --------- | --------- | ---------------- |
| `headers` | `Headers` | 요청 헤더입니다. |

#### Returns

`string | null`: 클라이언트 IP입니다. 두 헤더가 모두 없으면 `null`입니다.

#### Examples

```ts
import { getClientIp } from '$shared/lib/http';

const clientIp = getClientIp(request.headers);
```

## Types

### `SearchParams`

Next 페이지가 받는 `searchParams`의 값 타입입니다. `{ [key: string]: string | string[] | undefined }`입니다.

#### Examples

```tsx
import type { SearchParams } from '$shared/lib/http';

interface Props {
  searchParams: Promise<SearchParams>;
}
```
