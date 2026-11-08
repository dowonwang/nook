# bff

Next 서버의 BFF(`/api/...`, `/action/...`)를 거쳐 백엔드를 호출하는 요청 도구입니다. 브라우저는 백엔드를 직접 호출하지 않고, BFF가 쿠키의 토큰을 붙여 전달합니다.

## Rules

- 클라이언트 코드는 `clientFetcher`, RSC와 Server Action은 `serverFetcher`를 씁니다.
- `fetch('/api/...')`를 직접 쓰지 않습니다. `x-nook-request` 헤더가 빠져 404가 됩니다.
- BFF와 `app/action/` 핸들러는 `isBffRequest`로 헤더를 확인합니다. 헤더가 없거나 주소창으로 연 요청(`sec-fetch-mode: navigate`)이면 404를 반환합니다.
- `x-nook-request` 값은 비밀이 아닙니다. 주소창 접근과 다른 사이트의 요청(CSRF)을 막는 용도입니다.
- 백엔드로는 허용 목록의 헤더와 `x-internal-secret`(서버 환경 변수 `INTERNAL_API_SECRET`)만 전달합니다. 이 값은 브라우저로 나가지 않으며, API 서버는 이 값이 맞는 요청만 처리합니다.
- `app/action/`에 Route Handler를 추가하면 핸들러 첫 줄에서 `isBffRequest`를 검사합니다.
- BFF의 실패 응답 규칙
  - 백엔드에 연결하지 못하면 502(`common_error_InternalServerError`)를 반환합니다. 백엔드의 에러 응답은 그대로 전달하며, `error.code`는 JSON 응답일 때만 읽습니다.
  - 액세스 토큰 만료로 세션을 갱신할 때, 갱신이 거절되면 401(`auth_error_refresh_token_expired`), 그 외 실패는 502를 반환합니다.
  - 백엔드 주소는 `REST_API_BASE_URL`과 같은 origin일 때만 요청하고, 다른 origin으로 해석되면 404를 반환합니다.
- `@packages/api-client/api`의 request function은 서버 환경 변수 `REST_API_BASE_URL`로 주소를 만들므로 서버 코드(`*.server.ts`)에서만 호출합니다. 브라우저 요청은 `clientFetcher`를 씁니다.

## Functions

### `serverFetcher` (server only)

RSC, Server Action, 서버 쿼리에서 BFF를 호출합니다. 들어온 요청의 쿠키와 클라이언트 IP, User-Agent를 함께 전달합니다.

#### Parameters

| 이름      | 타입          | 설명                                              |
| --------- | ------------- | ------------------------------------------------- |
| `url`     | `string`      | `/api/...`처럼 앱 기준의 경로입니다.              |
| `options` | `RequestInit` | `fetch` 옵션입니다. 캐시는 항상 `no-store`입니다. |

#### Returns

`Promise<Response>`: BFF의 응답입니다.

#### Examples

```ts
import { serverFetcher } from '$shared/api/bff/server';

const response = await serverFetcher('/api/organization', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(body),
});
```

---

### `isBffRequest` (server only)

`clientFetcher`나 `serverFetcher`로 보낸 요청인지 확인합니다.

#### Parameters

| 이름      | 타입          | 설명                             |
| --------- | ------------- | -------------------------------- |
| `request` | `NextRequest` | Route Handler가 받은 요청입니다. |

#### Returns

`boolean`: `x-nook-request` 헤더가 있고 주소창으로 연 요청이 아니면 `true`입니다.

#### Examples

```ts
import { isBffRequest } from '$shared/api/bff/server';

if (!isBffRequest(request)) {
  return new NextResponse(null, { status: 404 });
}
```

---

### `createForwardedHeaders` (server only)

백엔드로 전달할 헤더를 만듭니다.

#### Parameters

| 이름            | 타입              | 설명                                                                       |
| --------------- | ----------------- | -------------------------------------------------------------------------- |
| `request`       | `Request?`        | BFF가 받은 요청입니다. 없으면 빈 헤더를 돌려줍니다.                        |
| `authorization` | `string \| null?` | 액세스 토큰입니다. 요청에 `authorization`이 없을 때만 `Bearer`로 붙입니다. |

#### Returns

`Headers`: 허용 목록의 헤더, 클라이언트 정보, `x-internal-secret`을 담은 헤더입니다.

#### Examples

```ts
import { createForwardedHeaders } from '$shared/api/bff/server';

const headers = createForwardedHeaders(request, accessToken);
```

---

### `clientFetcher`

브라우저에서 BFF를 호출합니다.

#### Parameters

| 이름      | 타입           | 설명                                     |
| --------- | -------------- | ---------------------------------------- |
| `url`     | `string`       | `/api/...`, `/action/...` 경로입니다.    |
| `options` | `RequestInit?` | `fetch` 옵션입니다. 기본값은 `{}`입니다. |

#### Returns

`Promise<Response>`: BFF의 응답입니다.

#### Examples

```ts
import { clientFetcher } from '$shared/api/bff';

const response = await clientFetcher('/api/user/me');
```
