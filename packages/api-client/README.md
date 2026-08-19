# @packages/api-client

Nook API의 OpenAPI specification으로부터 생성되는 API Client와 Zod schema를 관리하는 패키지입니다.

API 요청/응답 타입과 validation schema를 Web Client와 공유하여 Backend와 Frontend 사이의 contract를 일관되게 유지합니다.

## Generated From

API Server가 제공하는 OpenAPI schema를 사용합니다.

```text
http://localhost:4000/openapi/json
```

따라서 code generation을 실행하기 전에 API Server가 실행 중이어야 합니다.

## Structure

```text
src/
├── api/        # Generated fetch API client
├── schema/     # Generated Zod schemas
└── lib/        # Code generation helpers
```

## Generate

Repository root에서:

```bash
pnpm generate:packages
```

이 패키지만 생성하는 경우:

```bash
pnpm -C packages/api-client generate
```

또는:

```bash
cd packages/api-client
pnpm generate
```

## Exports

### API Client

```ts
import { ... } from '@packages/api-client/api';
```

### Schema

```ts
import { ... } from '@packages/api-client/schema/...';
```

### i18n

```ts
import { ... } from '@packages/api-client/i18n';
```

## Generation

API Client는 Orval을 사용해 생성합니다.

현재 생성되는 항목은 크게 두 종류입니다.

### Fetch Client

OpenAPI operation을 기반으로 HTTP request function을 생성합니다.

```text
src/api
```

### Zod Schema

OpenAPI schema를 기반으로 runtime validation에 사용할 Zod schema를 생성합니다.

```text
src/schema
```

## Important

`src/api`와 `src/schema` 내부의 generated code는 직접 수정하지 않는 것을 원칙으로 합니다.

API contract 변경이 필요한 경우 Backend API specification을 변경한 후 다시 generate합니다.

```bash
pnpm generate
```

## Type Check

```bash
pnpm typecheck
```
