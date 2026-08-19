# @server/api

Nook의 Backend API 애플리케이션입니다.

Bun과 Elysia를 기반으로 HTTP API를 제공하며, 데이터베이스 접근은 `@packages/api-db`, 공용 메시지는 `@packages/i18n`을 사용합니다.

## Tech Stack

- Bun
- Elysia
- TypeScript
- Prisma
- PostgreSQL
- Zod
- JWT
- Pino
- bcrypt

## Structure

```text
src/
├── modules/     # Domain / feature modules
├── shared/      # Shared server utilities
└── index.ts     # Application entry point
```

### `modules`

기능 또는 도메인 단위의 API 코드를 관리합니다.

각 module은 가능한 한 자신의 route, validation, service 등의 책임을 내부에 유지합니다.

### `shared`

여러 module에서 공통으로 사용하는 기능을 관리합니다.

특정 도메인에 종속되는 코드는 `shared`에 두지 않습니다.

## Environment Variables

`.env.example`을 복사해 `.env`를 생성합니다.

```bash
cp .env.example .env
```

필요한 환경 변수:

```env
APP_PORT=4000

DATABASE_URL="postgresql://..."

ACCESS_TOKEN_SECRET="..."
ACCESS_TOKEN_EXPIRES="10m"

REFRESH_TOKEN_SECRET="..."
REFRESH_TOKEN_EXPIRES="14d"

HASH_TOKEN_SECRET="..."
```

실제 secret 값은 저장소에 commit하지 않습니다.

## Development

Repository root에서:

```bash
pnpm server/api:dev
```

또는 이 workspace에서:

```bash
pnpm dev
```

`dev` 명령은 다음 과정을 수행합니다.

1. PostgreSQL Docker container 실행
2. Prisma Client 생성
3. Bun watch mode로 API 서버 실행

## Database

### Start

```bash
pnpm db:up
```

### Stop

```bash
pnpm db:down
```

### Logs

```bash
pnpm db:logs
```

### Push Schema

```bash
pnpm db:push
```

Database schema 및 Prisma 관련 작업에 대한 자세한 내용은 `packages/api-db`를 참고해주세요.

## OpenAPI

개발 서버 실행 후 OpenAPI schema는 다음 endpoint에서 사용할 수 있습니다.

```text
http://localhost:4000/openapi/json
```

이 schema는 `@packages/api-client`의 API Client 및 Zod schema 생성에 사용됩니다.

## Type Check

```bash
pnpm typecheck
```

## Workspace Dependencies

- `@packages/api-db`
- `@packages/i18n`
