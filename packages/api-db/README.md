# @packages/api-db

Classroom Backend에서 사용하는 Database package입니다.

PostgreSQL 개발 환경과 Prisma schema, Prisma Client configuration을 한 곳에서 관리합니다.

## Tech Stack

- PostgreSQL
- Prisma
- `@prisma/client`
- `@prisma/adapter-pg`
- Docker Compose

## Structure

```text
.
├── prisma/
│   └── ...
├── client.ts
├── index.ts
├── docker-compose.yml
├── prisma.config.ts
└── .env.example
```

## Environment Variables

`.env.example`을 복사합니다.

```bash
cp .env.example .env
```

기본 설정:

```env
POSTGRES_PORT=5432

POSTGRES_USER=classroom
POSTGRES_PASSWORD=your_password
POSTGRES_DB=classroom
TZ=Asia/Seoul

DATABASE_URL="postgresql://classroom:your_password@localhost:5432/classroom?schema=public"
```

## PostgreSQL

Docker Compose를 사용해 local PostgreSQL을 실행합니다.

API workspace에서:

```bash
pnpm db:up
```

종료:

```bash
pnpm db:down
```

logs:

```bash
pnpm db:logs
```

## Prisma

### Generate Client

```bash
pnpm db:generate
```

### Create / Apply Development Migration

```bash
pnpm db:migrate
```

### Push Schema

```bash
pnpm db:push
```

### Prisma Studio

```bash
pnpm db:studio
```

## Usage

다른 workspace에서는 직접 새로운 Prisma Client instance를 생성하지 않고 이 package에서 제공하는 client를 사용하는 것을 원칙으로 합니다.

```ts
import { ... } from '@packages/api-db';
```

이를 통해 database connection과 Prisma configuration을 한 곳에서 관리합니다.

## Schema Changes

Database schema를 변경할 때는 다음 흐름을 권장합니다.

1. Prisma schema 수정
2. Migration 생성 및 적용
3. Prisma Client 재생성
4. API type check
5. 변경된 API contract가 있다면 API Client 재생성
