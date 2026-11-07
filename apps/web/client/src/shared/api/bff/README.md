# bff

Next 서버의 BFF(`/api/...`, `/action/...`)를 거쳐 백엔드를 호출하는 요청 도구입니다. 브라우저는 백엔드를 직접 호출하지 않고, BFF가 쿠키의 토큰을 붙여 전달합니다.

## Rules

- 클라이언트 코드는 `clientFetcher`, RSC와 Server Action은 `serverFetcher`를 씁니다.
- `fetch('/api/...')`를 직접 쓰지 않습니다. `x-nook-request` 헤더가 빠져 404가 됩니다.
- BFF와 `app/action/` 핸들러는 `isBffRequest`로 헤더를 확인합니다. 헤더가 없거나 주소창으로 연 요청(`sec-fetch-mode: navigate`)이면 404를 반환합니다.
- `x-nook-request` 값은 비밀이 아닙니다. 주소창 접근과 다른 사이트의 요청(CSRF)을 막는 용도입니다.
- 백엔드로는 허용 목록의 헤더와 `x-internal-secret`(서버 환경 변수 `INTERNAL_API_SECRET`)만 전달합니다. 이 값은 브라우저로 나가지 않으며, API 서버는 이 값이 맞는 요청만 처리합니다.
- `app/action/`에 Route Handler를 추가하면 핸들러 첫 줄에서 `isBffRequest`를 검사합니다.

## Exports

### Functions

#### `serverFetcher` (server only)

RSC, Server Action, 서버 쿼리에서 BFF를 호출합니다. 들어온 요청의 쿠키와 클라이언트 정보를 함께 전달합니다.

```ts
import { serverFetcher } from '$shared/api/bff/server';

const response = await serverFetcher('/api/organization', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(body),
});
```

#### `isBffRequest` (server only)

`clientFetcher`나 `serverFetcher`로 보낸 요청인지 확인합니다.

```ts
import { isBffRequest } from '$shared/api/bff/server';

if (!isBffRequest(request)) {
  return new NextResponse(null, { status: 404 });
}
```

#### `createForwardedHeaders` (server only)

백엔드로 전달할 헤더를 만듭니다. `authorization`을 넘기면 `Bearer` 토큰으로 붙입니다.

```ts
import { createForwardedHeaders } from '$shared/api/bff/server';

const headers = createForwardedHeaders(request, accessToken);
```

#### `clientFetcher`

브라우저에서 BFF를 호출합니다.

```ts
import { clientFetcher } from '$shared/api/bff';

const response = await clientFetcher('/api/user/me');
```
