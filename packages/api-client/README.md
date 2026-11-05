# @packages/api-client

Nook API의 OpenAPI specification으로부터 생성되는 API Client와 Zod schema를 관리하는 패키지입니다.

API 요청/응답 타입과 validation schema를 Web Client와 공유하여 Backend와 Frontend 사이의 contract를 일관되게 유지합니다.

## Generated From

API Server가 제공하는 OpenAPI schema를 사용합니다.

```text
<APP_URL><OPEN_API_SPEC_PATH>   # 예: http://localhost:4000/openapi/json
```

`orval.config.ts`가 `apps/server/api/.env`를 읽어 `APP_URL`과 `OPEN_API_SPEC_PATH`로 주소를 만듭니다. 이미 설정된 환경 변수는 env 파일보다 우선하며, 두 값 중 하나라도 없으면 생성을 중단합니다.

API Server도 같은 env(`OPEN_API_PATH`, `OPEN_API_SPEC_PATH`)로 OpenAPI 문서 경로를 등록하고, 이 경로는 내부 요청 검사(`x-internal-secret`)에서 제외합니다.

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

#### API 주소 (env)

생성된 request function은 API 주소를 코드에 고정하지 않습니다. 경로만 만들어 `src/lib/custom-fetch.ts`(Orval mutator)에 넘기고, `customFetch`가 요청할 때 `process.env.REST_API_BASE_URL`을 읽어 주소를 붙입니다.

- request function을 사용하는 앱은 `REST_API_BASE_URL`을 설정해야 합니다. 없으면 요청할 때 에러가 납니다.
- Web Client는 BFF와 같은 env(`apps/web/client/.env`의 `REST_API_BASE_URL`)를 그대로 사용합니다.
- 서버 환경 변수를 읽으므로 서버 코드(`*.server.ts`)에서만 호출합니다. 브라우저에서 호출하면 env가 없어 실패합니다.
- 생성 시 OpenAPI를 읽어 오는 주소([Generated From](#generated-from))는 로컬 API Server이며, 런타임 주소와는 별개입니다.

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
