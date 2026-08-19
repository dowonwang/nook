# Classroom

Classroom은 웹 클라이언트와 API 서버, 그리고 공용 패키지를 하나의 저장소에서 관리하는 모노레포 프로젝트입니다.

pnpm workspace를 기반으로 애플리케이션과 공용 패키지 간 의존성을 관리합니다.

## Tech Stack

### Web

- Next.js 16
- React 19
- TypeScript
- TanStack Query
- Tailwind CSS
- next-intl
- Zod

### Server

- Bun
- Elysia
- TypeScript
- Prisma
- PostgreSQL
- Zod
- JWT

### Tooling

- pnpm workspace
- ESLint
- Prettier
- Husky
- lint-staged
- Commitlint
- Commitizen

## Monorepo Structure

```text
.
├── apps
│   ├── server
│   │   └── api          # Backend API server
│   └── web
│       └── client       # Web application
│
├── packages
│   ├── api-client       # Generated API client and schemas
│   ├── api-db           # Prisma database package
│   ├── i18n             # Shared internationalization resources
│   └── ui               # Shared UI components and styles
│
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.base.json
```

## Packages

| Workspace              | Description                                   |
| ---------------------- | --------------------------------------------- |
| `@server/api`          | Elysia 기반 Backend API                       |
| `@web/client`          | Next.js 기반 Web Client                       |
| `@packages/api-client` | OpenAPI 기반 API Client 및 Zod Schema         |
| `@packages/api-db`     | Prisma Client, Schema 및 PostgreSQL 개발 환경 |
| `@packages/i18n`       | 공용 다국어 메시지 및 validation message      |
| `@packages/ui`         | 공용 React UI Components 및 Styles            |

각 workspace에 대한 자세한 내용은 해당 디렉터리의 README를 참고해주세요.

## Requirements

개발 환경에 다음 도구가 필요합니다.

- Node.js
- pnpm `10.30.3`
- Bun
- Docker / Docker Compose

## Installation

저장소를 clone한 뒤 dependency를 설치합니다.

```bash
git clone <repository-url>
cd classroom

pnpm install
```

## Environment Variables

### Database

```bash
cp packages/api-db/.env.example packages/api-db/.env
```

### API Server

```bash
cp apps/server/api/.env.example apps/server/api/.env
```

환경별 값은 각 workspace의 README를 참고해주세요.

## Development

### API Server

```bash
pnpm server/api:dev
```

API 개발 서버를 실행하면 로컬 PostgreSQL Docker container를 실행하고 Prisma Client를 생성한 뒤 Elysia 서버를 시작합니다.

기본 API port:

```text
http://localhost:4000
```

### Web Client

```bash
pnpm web/client:dev
```

또는 workspace를 직접 실행할 수 있습니다.

```bash
pnpm -F @web/client dev
```

## Code Generation

API Client와 validation i18n 리소스를 생성합니다.

```bash
pnpm generate:packages
```

내부적으로 다음 작업을 수행합니다.

```bash
pnpm -C ./packages/api-client generate
pnpm -C ./packages/i18n generate:validation
```

API Client 생성 시 API 서버의 OpenAPI 문서를 사용하므로 API 서버가 `localhost:4000`에서 실행 중이어야 합니다.

## Quality Checks

### Type Check

```bash
pnpm typecheck
```

모든 workspace의 TypeScript type check를 실행합니다.

### Format

```bash
pnpm format
```

확인만 할 경우:

```bash
pnpm format:check
```

### Lint

```bash
pnpm lint:fix
```

## Commit

프로젝트는 Commitizen과 Commitlint를 사용합니다.

```bash
pnpm commit
```

## Cleanup

workspace에서 생성된 `.next`, `node_modules` 등의 파일을 제거합니다.

```bash
pnpm clean
```
