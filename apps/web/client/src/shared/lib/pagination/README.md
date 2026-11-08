# pagination

URL 쿼리에서 페이지네이션 값을 읽습니다. `page`, `limit`처럼 숫자인 값은 양의 정수일 때만 쓰고, 그 외에는 `undefined`로 돌려줍니다.

커서 쿼리는 지금 쓰는 곳이 없지만 API 서버의 커서 페이지네이션에 맞춰 둔 코드입니다. 사용처가 없어도 지우지 않습니다.

## Hooks

### `useOffsetQuery`

클라이언트 컴포넌트에서 현재 URL의 `page`, `limit`을 읽습니다.

#### Parameters

없음

#### Returns

`OffsetPaginationQuery`: 현재 URL의 `page`, `limit`입니다.

#### Examples

```tsx
import { useOffsetQuery } from '$shared/lib/pagination';

const pagination = useOffsetQuery();
const { data } = useQuery(myOrganizationListQueryOptions(pagination));
```

---

### `useCursorQuery`

클라이언트 컴포넌트에서 현재 URL의 `cursor`, `limit`을 읽습니다.

#### Parameters

없음

#### Returns

`CursorPaginationQuery`: 현재 URL의 `cursor`, `limit`입니다.

#### Examples

```tsx
import { useCursorQuery } from '$shared/lib/pagination';

const { cursor, limit } = useCursorQuery();
```

## Functions

### `getOffsetPaginationQuery` (server only)

서버 컴포넌트에서 `searchParams`의 `page`, `limit`을 읽습니다.

#### Parameters

| 이름           | 타입                    | 설명                         |
| -------------- | ----------------------- | ---------------------------- |
| `searchParams` | `Promise<SearchParams>` | 페이지가 받은 쿼리 값입니다. |

#### Returns

`Promise<OffsetPaginationQuery>`: 읽은 `page`, `limit`입니다.

#### Examples

```tsx
import { getOffsetPaginationQuery } from '$shared/lib/pagination/server';

const pagination = await getOffsetPaginationQuery(searchParams);

await queryClient.prefetchQuery(
  serverMyOrganizationListQueryOptions(pagination),
);
```

---

### `getCursorPaginationQuery` (server only)

서버 컴포넌트에서 `searchParams`의 `cursor`, `limit`을 읽습니다.

#### Parameters

| 이름           | 타입                    | 설명                         |
| -------------- | ----------------------- | ---------------------------- |
| `searchParams` | `Promise<SearchParams>` | 페이지가 받은 쿼리 값입니다. |

#### Returns

`Promise<CursorPaginationQuery>`: 읽은 `cursor`, `limit`입니다. `cursor`는 문자열일 때만 씁니다.

#### Examples

```tsx
import { getCursorPaginationQuery } from '$shared/lib/pagination/server';

const { cursor, limit } = await getCursorPaginationQuery(searchParams);
```

## Types

### `OffsetPaginationQuery`

오프셋 페이지네이션 값입니다. 요청 함수나 쿼리 옵션의 인자에 씁니다.

#### Properties

| 이름    | 타입                  | 설명                              |
| ------- | --------------------- | --------------------------------- |
| `page`  | `number \| undefined` | 1부터 시작하는 페이지 번호입니다. |
| `limit` | `number \| undefined` | 한 페이지의 항목 수입니다.        |

#### Examples

```ts
import type { OffsetPaginationQuery } from '$shared/lib/pagination';

function getMyOrganizationList(query?: OffsetPaginationQuery) {
  // ...
}
```

---

### `CursorPaginationQuery`

커서 페이지네이션 값입니다.

#### Properties

| 이름     | 타입                  | 설명                            |
| -------- | --------------------- | ------------------------------- |
| `cursor` | `string \| undefined` | 이전 응답이 준 다음 위치입니다. |
| `limit`  | `number \| undefined` | 한 번에 가져올 항목 수입니다.   |

#### Examples

```ts
import type { CursorPaginationQuery } from '$shared/lib/pagination';
```
