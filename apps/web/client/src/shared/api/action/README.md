# action

Server Action의 응답 상태를 만들고, 폼에서 에러를 표시하는 도구입니다.

## Rules

- 폼은 `useActionState`와 이 모듈의 도구를 씁니다. 상태 모양은 `ActionState<TState, TResponseError>`입니다.
- 입력 검증 실패는 `createActionStateError(zodError)`로 필드별 에러를 만들고 `useActionFieldErrors`로 표시합니다.
- 서버 응답 에러는 응답의 `error.code`를 그대로 담고 `useActionErrorMessage`가 i18n 키로 번역합니다.

Server Action 파일 위치와 이름 규칙은 [컨벤션 문서 6.3](../../../../../docs/convention.md#63-변경-server-action과-무효화)을 따릅니다.

## Exports

### Hooks

#### `useActionFieldErrors`

입력 검증 에러를 필드별로 꺼내고, 첫 번째 에러 필드에 포커스를 옮깁니다. 입력 요소에는 `register`를 연결합니다.

```tsx
import { useActionFieldErrors } from '$shared/api/action';

const { register, getFieldError } = useActionFieldErrors(
  actionState.error as ActionStateZodError,
);

const titleError = getFieldError('title');

<Input ref={register('title')} name='title' />;
```

#### `useActionErrorMessage`

에러의 `code`를 i18n 키로 번역합니다. 코드가 없거나 번역이 없으면 `null`을 돌려줍니다.

```tsx
import { useActionErrorMessage } from '$shared/api/action';

const actionError = useActionErrorMessage(actionState.error);
```

### Functions

#### `createActionStateError`

Zod 에러를 `ActionStateZodError`로 바꿉니다.

```ts
import { createActionStateError } from '$shared/api/action';

const body = schema.safeParse(input);

if (!body.success) {
  return actionStateBuilder.error(state, createActionStateError(body.error));
}
```

### Constants

#### `actionStateBuilder`

Server Action의 성공, 실패 상태를 만듭니다.

```ts
import { actionStateBuilder } from '$shared/api/action';

return actionStateBuilder.success(state);
return actionStateBuilder.error(state, error);
```

### Types

#### `ActionState`, `ActionStateZodError`

Server Action 상태와 입력 검증 에러의 타입입니다.

```ts
import type { ActionState } from '$shared/api/action';

type CreateOrganizationActionState = ActionState<
  CreateOrganizationState,
  CreateOrganizationResponseError['error']
>;
```
