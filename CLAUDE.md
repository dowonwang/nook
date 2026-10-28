# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

"Nook" — a pnpm workspace monorepo (pnpm `10.30.3`) with a Bun/Elysia API server, a Next.js 16 / React 19 web client, and shared packages. Docs, commit messages, and comments are written in Korean.

| Workspace              | Path                  | Role                                                    |
| ---------------------- | --------------------- | ------------------------------------------------------- |
| `@server/api`          | `apps/server/api`     | Elysia API (Bun runtime), port 4000                     |
| `@web/client`          | `apps/web/client`     | Next.js App Router client (FSD structure)               |
| `@packages/api-db`     | `packages/api-db`     | Prisma schema/client + Postgres docker-compose          |
| `@packages/api-client` | `packages/api-client` | Orval-generated fetch client + Zod schemas from OpenAPI |
| `@packages/i18n`       | `packages/i18n`       | Shared response/validation messages (server + web)      |
| `@packages/ui`         | `packages/ui`         | Domain-agnostic UI primitives (cva + tailwind-merge)    |

Shared dependency versions live in `pnpm-workspace.yaml` catalogs (`catalog:` / `catalog:next16`).

## Commands

Run from the repo root unless noted.

```bash
pnpm install
pnpm server/api:dev        # starts Postgres container, runs prisma generate, then bun --watch
pnpm web/client:dev        # next dev
pnpm typecheck             # tsc --noEmit in every workspace
pnpm -F @web/client typecheck   # single workspace
pnpm lint:fix              # eslint --fix
pnpm format                # prettier --write (format:check to verify)
pnpm generate:packages     # regenerate api-client + i18n validation keys (API server must be running on :4000)
pnpm -F @web/client build
```

Database (`packages/api-db`, or via `@server/api` scripts `db:up` / `db:down` / `db:logs` / `db:push`):

```bash
pnpm -C packages/api-db db:migrate    # prisma migrate dev
pnpm -C packages/api-db db:generate
pnpm -C packages/api-db db:studio
```

Env setup: copy `packages/api-db/.env.example` and `apps/server/api/.env.example` to `.env`.

There is no test runner configured. Bruno request collections live in `apps/server/api/bruno`.

Git hooks (Husky): `pre-commit` runs `pnpm -r typecheck` + lint-staged (prettier + eslint); `commit-msg` runs commitlint. Never bypass hooks (`--no-verify`, `HUSKY=0`).

## Commit convention

Conventional commits per `commitlint.config.mjs`. Allowed types: `build chore ci docs feat fix perf refactor revert style test wip`. Scope is free-form (e.g. `organization`, `sidebar`, `web-client`, `packages/ui`). Subject and bullet body are in Korean:

```text
feat(organization): 받은 초대 목록 페이지네이션 적용

- 변경사항 1
- 변경사항 2
```

`.opencode/commands/commit.md` holds a detailed commit workflow: by default commit only unstaged + untracked changes (preserve the existing staged state, never `git add -A`/`.`), `--staged` commits only what is staged; read every changed file before drafting; show the message and get explicit approval before committing.

## API contract pipeline

The backend is the source of truth for types shared with the web client:

1. Server routes declare Zod schemas → Elysia exposes OpenAPI at `http://localhost:4000/openapi/json` (`zodToOpenApiSchema` in `$shared/responses`).
2. `pnpm -C packages/api-client generate` (Orval, `orval.config.ts`) writes `src/api/index.ts` (fetch client + response types) and `src/schema/**` (Zod, per tag). Zod params go through `src/lib/zod-params.ts`, which embeds validation-key metadata.
3. `pnpm -C packages/i18n generate:validation` scans the generated schemas for `zodParams({...})` calls and writes validation message keys into `packages/i18n/src/validation`.

Never hand-edit `packages/api-client/src/api` or `src/schema`; change the server and regenerate. Schema change flow: edit Prisma schema → migrate → generate client → typecheck API → regenerate packages.

## Server architecture (`apps/server/api`)

Path aliases: `$modules/*`, `$shared/*`, `$/*`. Server docs are split by scope — follow them for new code and when renaming:

- `apps/server/docs/convention.md` — shared by every server app (`apps/server/*`): DDD/CQRS layering, file/symbol naming, import boundaries, and cross-module rules (no DB FK between modules — reference other modules by ID only; command side never joins other modules' tables, query side may join only when filtering/sorting by another module's data and must return DTOs).
- `apps/server/api/docs/convention.md` — api-only: directory tree, Elysia presentation, Prisma infrastructure, DI, transactions, and current deviations from the shared rules.
- `apps/server/api/docs/organization.md` — organization domain rules (UUID vs slug identifiers, slug format, role/invitation invariants).

Key naming rule: file names are short and carry no role suffix (the role folder identifies it; words already in the path such as the module name are dropped), while class/function names carry full context plus a role suffix (`Aggregate`, `Entity`, `Vo`, `Port`, `Adapter`, `Service`, `Error`, ...) — e.g. `organization/application/commands/create-organization/handler.ts` exports `CreateOrganizationHandler`, `organization/domain/entities/member.ts` exports `OrganizationMemberEntity`, `organization/error/not-found.ts` exports `OrganizationNotFoundError`. Log event values are `snake_case` with `_` only (`org_invitation_expired`).

Each module under `src/modules/<name>/` (auth, user, organization) follows DDD/hexagonal + CQRS layering:

- `domain/` — `aggregates/`, `entities/`, `value-objects/`, `events/`, `repositories/` (interfaces), `services/`, `policies/` (base classes in `$shared/ddd`)
- `application/` — `commands/<use-case>/` and `queries/<use-case>/` each with `command.ts|query.ts` + `handler.ts`; `ports/` (interfaces), `dto/`, `mappers/`, `services/`
- `infrastructure/` — Prisma repositories split into `*CommandRepository` / `*QueryRepository`, `mappers/`, `adapters/` (port implementations), `services/`
- `presentation/` — `controller.ts` (Elysia plugin factory), `http-model.ts` (request Zod), `response.ts`, `routes/<use-case>.ts`
- `error/` — one `AppError` subclass per file, log constants in `error/constants/`

Dependency wiring is manual constructor injection in the module's `index.ts`, which default-exports the controller plugin; `src/index.ts` `.use()`s each module after `errorPlugin`. Other modules are imported through their barrel (e.g. `authGuard` from `$modules/auth`).

Shared infra (`src/shared`): `database` (Prisma transaction manager using AsyncLocalStorage), `http` (error plugin mapping AppError/Prisma/validation errors), `responses` (response builder + OpenAPI helpers), `pagination` (offset/cursor plugins), `logger` (pino). Always use the Prisma client exported by `@packages/api-db` (`prismaApiClient`) rather than creating a new one.

## Web architecture (`apps/web/client`)

- **Routes** live in the root `app/` directory (not `src/app`). Public routes are under `app/[locale]/(public)/` (localized); authenticated routes are under `app/(private)/` (not locale-prefixed). The root `pages/` dir exists only so Next ignores `src/pages`.
- **`src/` follows Feature-Sliced Design**: `app → pages → widgets → features → entities → shared`; lower layers must not import higher ones. Aliases: `$app`, `$pages`, `$widgets`, `$features`, `$entities`, `$shared`.
- **BFF**: the browser never calls the backend directly. `app/api/[...path]/route.ts` → `src/app/bff` forwards to the backend with the access token from cookies, and on an access-token-expired error code refreshes the session, retries, and resets the auth cookies. Client code fetches `/api/...`; server actions use `bffFetcher` from `$shared/api/bff`. Response types are imported from `@packages/api-client/api`.
- **Middleware**: root `proxy.ts` (Next 16's middleware) delegates to `src/app/middleware` (route scope resolution, locale redirect, session/sign-in redirect).
- **i18n**: i18next / react-i18next (the README mentions next-intl, but the code uses i18next). Each slice can own an `i18n/` folder with `ko.json` + `en.json` and an `index.ts` that types keys from `ko.json` (`en satisfies I18nKey`) and exports a namespace constant like `'entities/session'`.

Conventions (from `apps/web/docs/convention.md`):

- Directories and file names are `kebab-case`; component/function names carry full context (`OrganizationCreateForm` in `ui/form.tsx`, `useOrganizationCreate` in `api/use-create-org.ts`).
- Slice segments: `ui/`, `api/`, `model/` (types in `types.ts`), `config/`, `lib/`, `i18n/`.
- Server-only files use the `*.server.ts` suffix (no `server/` dir). Each slice exposes client/shared code via `index.ts` and server-only code via `server.ts`.
- Within a slice use relative imports; across slices/layers use the alias and import only from the slice's `index.ts` / `server.ts`, never deep paths.
- Generic UI goes in `@packages/ui` (imported as `@packages/ui/components/<name>`); domain UI stays in the app's entities/features/widgets.
