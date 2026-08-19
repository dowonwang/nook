# @packages/i18n

Classroom에서 공통으로 사용하는 internationalization 리소스를 관리하는 패키지입니다.

Frontend와 Backend 사이에서 공통 메시지와 validation translation을 공유하기 위해 사용합니다.

## Structure

```text
src/
├── lang/          # Language resources
├── response/      # API response messages
├── validation/    # Validation messages
└── script/        # i18n generation scripts
```

## Exports

### Response Messages

```ts
import { ... } from '@packages/i18n/response';
```

### Language Resources

```ts
import { ... } from '@packages/i18n/lang/...';
```

### Validation Messages

```ts
import { ... } from '@packages/i18n/validation';
```

## Generate Validation Resources

```bash
pnpm generate:validation
```

Repository root에서는 API Client generation과 함께 실행할 수 있습니다.

```bash
pnpm generate:packages
```

## Principles

공용으로 사용되는 사용자-facing message는 가능한 한 이 패키지에서 관리합니다.

다만 특정 UI component 내부에서만 사용하는 문구처럼 application-specific한 translation은 각 application에서 관리할 수 있습니다.

이 패키지에는 Backend와 Frontend가 함께 알아야 하는 message와 validation resource를 우선 배치합니다.

## Type Check

```bash
pnpm typecheck
```
