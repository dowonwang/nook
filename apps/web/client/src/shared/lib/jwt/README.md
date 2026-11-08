# jwt

JWT의 payload를 읽고 만료 여부를 계산합니다. 서명은 검증하지 않으므로, 토큰의 유효성은 API 서버가 판단합니다.

Node의 `Buffer`를 쓰기 때문에 서버 코드에서만 호출할 수 있습니다. 브라우저에서 호출하면 해석에 실패해서 토큰이 만료된 것으로 처리됩니다.

## Functions

### `isTokenExpired` (server only)

토큰이 만료되었는지 확인합니다.

#### Parameters

| 이름      | 타입                     | 설명                  |
| --------- | ------------------------ | --------------------- |
| `token`   | `string`                 | 확인할 JWT입니다.     |
| `options` | `IsTokenExpiredOptions?` | 만료 계산 옵션입니다. |

#### Returns

`boolean`: 만료되었으면 `true`입니다. `exp`를 읽지 못해도 `true`입니다.

#### Examples

```ts
import { isTokenExpired } from '$shared/lib/jwt';

const expired = isTokenExpired(accessToken, {
  refreshBeforeSeconds: SESSION_REFRESH_BEFORE_SECOND,
});
```

---

### `decodeJwtPayload` (server only)

토큰의 payload를 객체로 바꿉니다.

#### Parameters

| 이름    | 타입     | 설명              |
| ------- | -------- | ----------------- |
| `token` | `string` | 해석할 JWT입니다. |

#### Returns

`JwtPayload | null`: payload입니다. 해석하지 못하면 `null`입니다.

#### Examples

```ts
import { decodeJwtPayload } from '$shared/lib/jwt';

const payload = decodeJwtPayload(accessToken);
```

## Types

### `JwtPayload`

JWT payload입니다. 아래 외의 값도 들어 있을 수 있습니다.

#### Properties

| 이름  | 타입                  | 설명                      |
| ----- | --------------------- | ------------------------- |
| `exp` | `number \| undefined` | 만료 시각(초 단위)입니다. |
| `iat` | `number \| undefined` | 발급 시각(초 단위)입니다. |

#### Examples

```ts
import type { JwtPayload } from '$shared/lib/jwt';
```

---

### `IsTokenExpiredOptions`

`isTokenExpired`의 옵션입니다.

#### Properties

| 이름                   | 타입                  | 설명                                                      |
| ---------------------- | --------------------- | --------------------------------------------------------- |
| `refreshBeforeSeconds` | `number \| undefined` | 만료되기 이만큼 전부터 만료로 봅니다. 기본값은 `0`입니다. |
| `now`                  | `number \| undefined` | 기준 시각(밀리초)입니다. 기본값은 `Date.now()`입니다.     |

#### Examples

```ts
import type { IsTokenExpiredOptions } from '$shared/lib/jwt';
```
