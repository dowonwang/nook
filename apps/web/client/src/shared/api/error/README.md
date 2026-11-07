# error

백엔드 에러 응답을 읽습니다. 응답 본문은 `{ error: { code } }` 형태입니다.

## Exports

### Functions

#### `findErrorCode`

응답 본문에서 `error.code`를 찾습니다. 형태가 맞지 않으면 `null`을 돌려줍니다.

```ts
import { findErrorCode } from '$shared/api/error';

const errorCode = findErrorCode(await response.json());
```
