# error

백엔드 에러 응답을 읽습니다. 응답 본문은 `{ error: { code } }` 형태입니다.

## Functions

### `findErrorCode`

응답 본문에서 `error.code`를 찾습니다.

#### Parameters

| 이름   | 타입      | 설명                           |
| ------ | --------- | ------------------------------ |
| `body` | `unknown` | JSON으로 읽은 응답 본문입니다. |

#### Returns

`string | null`: 에러 코드입니다. 형태가 맞지 않으면 `null`입니다.

#### Examples

```ts
import { findErrorCode } from '$shared/api/error';

const errorCode = findErrorCode(await response.json());
```
