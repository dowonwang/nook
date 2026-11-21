# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

"Nook" — a pnpm workspace monorepo (pnpm `12.21.0`) with a Bun/Elysia API server, a Next.js 16 / React 19 web client, and shared packages. Docs, commit messages, and comments are written in Korean. Don't use emoji in docs (including heading decorations and Good/Bad markers; write them as text), and offer to remove existing emoji when editing a doc. Docs, scripts, and editor config (e.g. `.vscode` snippets) assume a macOS development environment; Windows is not supported as-is (path separators, shell commands).

| Workspace                 | Path                     | Role                                                             |
| ------------------------- | ------------------------ | ---------------------------------------------------------------- |
| `@server/api`             | `apps/server/api`        | Elysia API (Bun runtime), port 4000                              |
| `@web/client`             | `apps/web/client`        | Next.js App Router client (FSD structure)                        |
| `@packages/api-db`        | `packages/api-db`        | Prisma schema/client + Postgres docker-compose                   |
| `@packages/api-client`    | `packages/api-client`    | Orval-generated fetch client + Zod schemas from OpenAPI          |
| `@packages/i18n`          | `packages/i18n`          | Shared response/validation messages (server + web)               |
| `@packages/ui`            | `packages/ui`            | Domain-agnostic UI primitives (cva + tailwind-merge)             |
| `@packages/eslint-config` | `packages/eslint-config` | Shared ESLint flat configs (base, next, react, fsd, ddd, server) |

Shared dependency versions live in `pnpm-workspace.yaml` catalogs, pinned to exact versions and grouped by stack (`catalog:` for zod, prettier, tsx, and dotenv, plus `catalog:<group>` such as `node26`, `typescript6`, `bun1`, `elysia1`, `prisma7`, `postgres8`, `next16`, `react19`, `tanstack5`, `tailwind4`, `ui`, `eslint`, `i18n`). A group holds only packages that move together (same version or tied majors); name it after its stack plus major (`next16`) or, for a mix of libraries, by role (`ui`, `eslint`). An `overrides` entry keeps `@types/node` on a single version across the monorepo. In each `package.json`, dependencies are ordered by value: plain versions first, then `workspace:`, then `catalog:`, then named catalogs by group name, alphabetical within each group. `pnpm add`/`pnpm update` re-sort them alphabetically; lint-staged restores the order of staged `package.json` files with `scripts/sort-package-deps.mjs`, and `pnpm lint:deps` / `pnpm lint:deps:fix` check or sort every `package.json`.

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

Env setup: copy `packages/api-db/.env.example`, `apps/server/api/.env.example`, and `apps/web/client/.env.example` to `.env`. `INTERNAL_API_SECRET` must match between the API server and the web client.

There is no test runner configured. Bruno request collections live in `apps/server/api/bruno`.

ESLint: each workspace has its own `eslint.config.mjs` assembled from `@packages/eslint-config` (`base` for every workspace, `react` for the web client and `packages/ui`, `next` + `fsd` for the web client, `server` + `ddd` for the Bun API). `import-x/order` enforces the block order external → `@packages/*` → layer aliases → relative (`./` → `../`) → type imports; `fsd` and `ddd` supply the layer order through `src/import-order.mjs`. ESLint resolves the config nearest to each file, so `pnpm lint:fix` and lint-staged still run from the root.

Git hooks (Husky): `pre-commit` runs `pnpm -r typecheck` + lint-staged (eslint, then prettier); `commit-msg` runs commitlint. Never bypass hooks (`--no-verify`, `HUSKY=0`).

## Commit convention

Conventional commits per `commitlint.config.mjs`. Allowed types: `build chore ci docs feat fix perf refactor revert style test wip`. Scope is free-form (e.g. `organization`, `sidebar`, `web-client`, `packages/ui`). Subject and bullet body are in Korean:

```text
feat(organization): 받은 초대 목록 페이지네이션 적용

- 변경사항 1
- 변경사항 2
```

Never start the subject with an uppercase Latin letter. `@commitlint/config-conventional`'s `subject-case` rule rejects it even when the rest is Korean (`Prisma 클라이언트 교체`, `API 응답 타입 수정`, `CLAUDE.md 규칙 추가` all fail). Reorder so a Korean word or a lowercase identifier comes first: `클라이언트를 Prisma로 교체`, `slug 충돌 판별 수정`. Don't change `commitlint.config.mjs` to work around it.

Branch names are `<type>/<kebab-case summary>` using the commitlint types above (e.g. `refactor/organization`). Worktrees are fine, but rename an auto-generated branch (e.g. `claude/...`) to `<type>/<summary>` before committing.

Commit workflow: by default commit only unstaged + untracked changes (preserve the existing staged state, never `git add -A`/`.`); when asked for staged only, commit exactly what is staged without extra `git add`. Read every changed file before drafting, always include a scope, and show the message and get explicit approval before committing. Leftover issues spotted along the way (debug code, TODO, mismatched contracts) are shown to the user separately and never go into the commit message. `.claude/settings.json` puts `git commit` under `permissions.ask`, so every commit also needs the user's approval in the permission prompt; this applies even when another session asks you to commit.

Where to put a new Claude rule: team-wide rules go in this `CLAUDE.md` (or the skill/hook of the workflow they belong to), and team-wide settings or permissions in `.claude/settings.json`. Personal preferences go in your own Claude memory or `.claude/settings.local.json` (gitignored), e.g. reply language `"language": "korean"`. Keep each rule in one place only, so it isn't loaded twice.

Task tracking lives in a Notion kanban database, managed through the `/kanban` skill (`.claude/skills/kanban/SKILL.md`: init / add / start / check / pr / move / edit). Each user keeps their Notion connection in `.claude/skills/kanban/config.local.json` (gitignored; copy `config.example.json`).

Card to-dos are committed one item per commit. When asking for commit approval on a branch that has a kanban card (config present, card's `브랜치` matches), also show which to-do item(s) the commit will check, following the "커밋 승인과 함께 체크" section of the kanban `SKILL.md`. A PostToolUse hook (`.claude/hooks/kanban-hook.sh`) reminds Claude after each successful `git commit` (apply the approved check without asking again) and after `gh pr create` (record the PR URL on the card). When creating a PR on such a branch, pass the card's `기준 브랜치` (from its `참고` section, default `main`) as `--base`.

## API contract pipeline

The backend is the source of truth for types shared with the web client:

1. Server routes declare Zod schemas → Elysia exposes OpenAPI at `http://localhost:4000/openapi/json` (`zodToOpenApiSchema` in `$shared/responses`).
2. `pnpm -C packages/api-client generate` (Orval, `orval.config.ts`) writes `src/api/index.ts` (fetch client + response types) and `src/schema/**` (Zod, per tag). Zod params go through `src/lib/zod-params.ts`, which embeds validation-key metadata. Generated request functions carry no base URL: they call `src/lib/custom-fetch.ts` (Orval mutator), which reads `REST_API_BASE_URL` from env at request time, so call them only from server code.
3. `pnpm -C packages/i18n generate:validation` scans the generated schemas for `zodParams({...})` calls and writes validation message keys into `packages/i18n/src/validation`.

Never hand-edit `packages/api-client/src/api` or `src/schema`; change the server and regenerate. Schema change flow: edit Prisma schema → migrate → generate client → typecheck API → regenerate packages.

## Server architecture (`apps/server/api`)

Path aliases: `$modules/*`, `$shared/*`. Server docs are split by scope — follow them for new code and when renaming:

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
- **BFF**: the browser never calls the backend directly. `app/api/[...path]/route.ts` → `src/app/bff` forwards to the backend with the access token from cookies, and on an access-token-expired error code refreshes the session, retries, and resets the auth cookies. Backend connection failures return 502, a rejected refresh (`SessionRefreshRejectedError`) returns 401, and a backend URL that resolves to another origin returns 404. Client code uses `clientFetcher` from `$shared/api/bff` and server code (server components, server actions) uses `serverFetcher` from `$shared/api/bff/server`. Response types are imported from `@packages/api-client/api`.
- **Middleware**: root `proxy.ts` (Next 16's middleware) delegates to `src/app/middleware` (route scope resolution, locale redirect, session/sign-in redirect). Auth cookies are cleared only when the refresh is rejected; if the API is unreachable the session is `unavailable` and cookies are kept.
- **i18n**: i18next / react-i18next (the README mentions next-intl, but the code uses i18next). Each slice can own an `i18n/` folder with `ko.json` + `en.json` and an `index.ts` that types keys from `ko.json` (`en satisfies I18nKey`) and exports a namespace constant like `'entities/session'`.

Conventions (from `apps/web/docs/convention.md`):

- Directories and file names are `kebab-case`; component/function names carry full context (`CreateOrganizationForm` in `ui/form.tsx`, `createOrganizationServerAction` in `api/action.server.ts`).
- Slice segments: `ui/`, `api/`, `model/` (types in `types.ts`), `config/`, `lib/`, `i18n/`.
- Server-only files use the `*.server.ts` suffix, and server-only components (async RSC, or ones using `getT`/server query options/cookies) use `*.server.tsx` — e.g. `pages/<page>/ui/page.server.tsx`, `app/layouts/*.server.tsx`; no `server/` dir. Each slice exposes client/shared code via `index.ts` and server-only code via `server.ts`. Exception: Server Actions live in the feature's `api/action.server.ts`, are named `<verb><Domain>ServerAction`, are imported by that slice's client components via a relative path, and are not exposed outside the slice.
- Within a slice use relative imports; across slices/layers use the alias and import only from the slice's `index.ts` / `server.ts`, never deep paths.
- Slices on the same layer don't import each other. When one must (e.g. entity relations), the referenced slice exposes only what's needed via `@x/<consumer>.ts` and the consumer imports from that path (`$entities/organization-member/@x/organization`).
- Generic UI goes in `@packages/ui` (imported as `@packages/ui/components/<name>`); domain UI stays in the app's entities/features/widgets.
- Root `app/` route files only read `params`/`searchParams` and delegate to a `$pages/<page>/server` component (page slices expose their RSC via `server.ts`; Route Handlers re-export from `$app/<segment>/server.ts`); no UI, copy, or data fetching in them.
- Query naming: `<DOMAIN>_QUERY_KEY` / `<DOMAIN>_BASE_QUERY_KEY` (prefix used for invalidation), `<domain>QueryOptions` (client) and `server<Domain>QueryOptions` (`*.server.ts`) sharing the same key; prefetch in RSC and pass down via `HydrationBoundary`.
- i18n namespace constants are named `<LAYER>_<SLICE_PATH>_I18N_NAMESPACE` with plural layer names (`PAGES_ORGANIZATION_HOME_I18N_NAMESPACE`); the value is the slice path.
- Private layout `<main>` spaces its direct children with `gap-page`; don't add `mb-*`/`my-*` to page-level blocks.
