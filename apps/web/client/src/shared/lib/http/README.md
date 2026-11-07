# http

HTTP 요청 헤더와 URL 쿼리를 다룹니다.

## Exports

### Functions

#### `createSearchParams`

객체를 `URLSearchParams`로 바꿉니다. 값이 `undefined`나 `null`인 키는 뺍니다.

```ts
import { createSearchParams } from '$shared/lib/http';

const searchParams = createSearchParams({ page: 1, limit: undefined });

clientFetcher('/api/organization?' + searchParams.toString(), options);
```

#### `getClientIp`

`x-forwarded-for`, `x-real-ip` 헤더에서 클라이언트 IP를 읽습니다. 값이 없으면 `null`을 돌려줍니다.

```ts
import { getClientIp } from '$shared/lib/http';

const clientIp = getClientIp(request.headers);
```

### Types

#### `SearchParams`

Next 페이지가 받는 `searchParams`의 타입입니다.

```tsx
import type { SearchParams } from '$shared/lib/http';

interface Props {
  searchParams: Promise<SearchParams>;
}
```
