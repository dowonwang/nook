# http

HTTP 요청 헤더와 URL 쿼리를 다룹니다.

## Functions

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
