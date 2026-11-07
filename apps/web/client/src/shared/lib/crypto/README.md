# crypto

HMAC-SHA256으로 값을 서명하고 검증합니다. 쿠키 값이 위조되지 않았는지 확인할 때 씁니다.

`node:crypto`를 쓰기 때문에 서버 코드에서만 호출할 수 있습니다.

## Exports

### Functions

#### `signedValue` (server only)

값을 base64url로 인코딩하고 서명을 붙입니다. 결과는 `<인코딩한 값>.<서명>` 형태입니다.

```ts
import { signedValue } from '$shared/lib/crypto';

const cookieValue = signedValue(accessToken, secret);
```

#### `verifySignedValue` (server only)

서명을 확인하고 원래 값을 돌려줍니다. 서명이 맞지 않으면 `null`을 돌려줍니다.

```ts
import { verifySignedValue } from '$shared/lib/crypto';

const accessToken = verifySignedValue(cookieValue, secret);
```

#### `sign` (server only)

문자열의 서명만 만듭니다. 보통은 `signedValue`를 쓰고, 서명 값 자체가 필요할 때만 씁니다.

```ts
import { sign } from '$shared/lib/crypto';

const signature = sign(value, secret);
```
