# action

Server Action의 응답 상태를 만들고, 폼에서 에러를 표시하는 도구입니다.

## Rules

- 폼은 `useActionState`와 이 모듈의 도구를 씁니다. 상태 모양은 `ActionState<TState, TResponseError>`입니다.
- 입력 검증 실패는 `createActionStateError(zodError)`로 필드별 에러를 만들고 `useActionFieldErrors`로 표시합니다.
- 서버 응답 에러는 응답의 `error.code`를 그대로 담고 `useActionErrorMessage`가 i18n 키로 번역합니다.

Server Action 파일 위치와 이름 규칙은 [컨벤션 문서 6.3](../../../../../docs/convention.md#63-변경-server-action과-무효화)을 따릅니다.

## Hooks

### `useActionFieldErrors`

입력 검증 에러를 필드별로 꺼내고, 첫 번째 에러 필드에 포커스를 옮깁니다.

#### Parameters

| 이름    | 타입                          | 설명                                |
| ------- | ----------------------------- | ----------------------------------- |
| `error` | `ActionStateZodError \| null` | Server Action 상태의 `error`입니다. |

#### Returns

`{ register, getFieldError, fieldErrors }`: 필드 연결 함수와 에러 조회 값입니다.

| 이름            | 타입                                                       | 설명                             |
| --------------- | ---------------------------------------------------------- | -------------------------------- |
| `register`      | `(name: string) => (element: HTMLElement \| null) => void` | 입력 요소의 `ref`에 연결합니다.  |
| `getFieldError` | `(name: string) => string`                                 | 필드의 에러 메시지를 돌려줍니다. |
| `fieldErrors`   | `Record<string, string>`                                   | 필드 이름별 에러 메시지입니다.   |

#### Examples

```tsx
import { useActionFieldErrors } from '$shared/api/action';

const { register, getFieldError } = useActionFieldErrors(
  actionState.error as ActionStateZodError,
);

const titleError = getFieldError('title');

<Input ref={register('title')} name='title' />;
```

---

### `useActionErrorMessage`

에러의 `code`를 i18n 키로 번역합니다.

#### Parameters

| 이름    | 타입      | 설명                                |
| ------- | --------- | ----------------------------------- |
| `error` | `unknown` | Server Action 상태의 `error`입니다. |

#### Returns

`string | null`: 번역한 메시지입니다. `code`가 없거나 번역이 없으면 `null`입니다.

#### Examples

```tsx
import { useActionErrorMessage } from '$shared/api/action';

const actionError = useActionErrorMessage(actionState.error);
```

## Functions

### `createActionStateError`

Zod 에러를 `ActionStateZodError`로 바꿉니다.

#### Parameters

| 이름    | 타입       | 설명                             |
| ------- | ---------- | -------------------------------- |
| `error` | `ZodError` | `safeParse`가 돌려준 에러입니다. |

#### Returns

`ActionStateZodError`: 필드 경로와 메시지 목록입니다.

#### Examples

```ts
import { createActionStateError } from '$shared/api/action';

const body = schema.safeParse(input);

if (!body.success) {
  return actionStateBuilder.error(state, createActionStateError(body.error));
}
```

## Constants

### `actionStateBuilder.success`

Server Action의 성공 상태를 만듭니다.

#### Parameters

| 이름    | 타입     | 설명                       |
| ------- | -------- | -------------------------- |
| `state` | `TState` | 폼에 돌려줄 상태 값입니다. |

#### Returns

`ActionState<TState, TResponseError>`: `success`가 `true`이고 `error`가 `null`인 상태입니다.

#### Examples

```ts
import { actionStateBuilder } from '$shared/api/action';

return actionStateBuilder.success(state);
```

---

### `actionStateBuilder.error`

Server Action의 실패 상태를 만듭니다.

#### Parameters

| 이름    | 타입                                    | 설명                                                  |
| ------- | --------------------------------------- | ----------------------------------------------------- |
| `state` | `TState`                                | 폼에 돌려줄 상태 값입니다. 입력값을 유지할 때 씁니다. |
| `error` | `TResponseError \| ActionStateZodError` | 서버 응답 에러나 입력 검증 에러입니다.                |

#### Returns

`ActionState<TState, TResponseError>`: `success`가 `false`인 상태입니다.

#### Examples

```ts
import { actionStateBuilder } from '$shared/api/action';

return actionStateBuilder.error(state, createActionStateError(body.error));
```

## Types

### `ActionState`

Server Action 상태입니다. `TState`는 폼 상태, `TResponseError`는 서버 응답 에러의 타입입니다.

#### Properties

| 이름      | 타입                                            | 설명                      |
| --------- | ----------------------------------------------- | ------------------------- |
| `success` | `boolean`                                       | 성공했는지 여부입니다.    |
| `state`   | `TState`                                        | 폼 상태 값입니다.         |
| `error`   | `TResponseError \| ActionStateZodError \| null` | 실패했을 때의 에러입니다. |

#### Examples

```ts
import type { ActionState } from '$shared/api/action';

type CreateOrganizationActionState = ActionState<
  CreateOrganizationState,
  CreateOrganizationResponseError['error']
>;
```

---

### `ActionStateZodError`

입력 검증 에러 목록입니다. 배열의 각 항목은 아래 속성을 가집니다.

#### Properties

| 이름      | 타입            | 설명                         |
| --------- | --------------- | ---------------------------- |
| `field`   | `PropertyKey[]` | 에러가 난 필드의 경로입니다. |
| `message` | `string`        | 에러 메시지입니다.           |

#### Examples

```ts
import type { ActionStateZodError } from '$shared/api/action';
```
