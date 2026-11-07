# jwt

JWT의 payload를 읽고 만료 여부를 계산합니다. 서명은 검증하지 않으므로, 토큰의 유효성은 API 서버가 판단합니다.

Node의 `Buffer`를 쓰기 때문에 서버 코드에서만 호출할 수 있습니다. 브라우저에서 호출하면 해석에 실패해서 토큰이 만료된 것으로 처리됩니다.

## Exports

### Functions

#### `isTokenExpired` (server only)

토큰이 만료되었는지 확인합니다. `exp`를 읽지 못해도 만료로 처리합니다. `refreshBeforeSeconds`를 주면 만료되기 그만큼 전부터 만료로 봅니다.

```ts
import { isTokenExpired } from '$shared/lib/jwt';

const expired = isTokenExpired(accessToken, {
  refreshBeforeSeconds: SESSION_REFRESH_BEFORE_SECOND,
});
```

#### `decodeJwtPayload` (server only)

토큰의 payload를 객체로 돌려줍니다. 해석하지 못하면 `null`을 돌려줍니다.

```ts
import { decodeJwtPayload } from '$shared/lib/jwt';

const payload = decodeJwtPayload(accessToken);
```

### Types

#### `JwtPayload`, `IsTokenExpiredOptions`

`decodeJwtPayload`의 반환 타입과 `isTokenExpired`의 옵션 타입입니다.

```ts
import type { JwtPayload } from '$shared/lib/jwt';
```
