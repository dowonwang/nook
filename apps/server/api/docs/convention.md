# API Server Convention

본 문서는 `@server/api`(Bun · Elysia · Prisma)에만 적용되는 구조와 규칙을 정의합니다.

- 모든 서버 앱에 공통으로 적용되는 아키텍처·명명·모듈 간 참조 규칙은 [Server Architecture & Naming Convention](../../docs/convention.md)을 따릅니다. 본 문서는 그 규칙을 이 앱의 기술 스택에 맞게 구체화한 내용입니다.
- 도메인별 규칙은 도메인 문서를 따릅니다.
  - [Organization Domain Rules](./organization.md)

---

## 1. 디렉터리 구조

```text
src/
├── index.ts                              # Elysia 앱 조립 (OpenAPI, errorPlugin, 모듈 등록)
├── modules/
│   └── organization/
│       ├── domain/
│       │   ├── aggregates/
│       │   │   ├── organization.ts       # class OrganizationAggregate
│       │   │   └── invitation.ts         # class OrganizationInvitationAggregate
│       │   ├── entities/
│       │   │   └── member.ts             # class OrganizationMemberEntity
│       │   ├── value-objects/
│       │   │   └── member-role.ts        # class OrganizationMemberRoleVo
│       │   ├── events/
│       │   │   └── created.ts            # class OrganizationCreatedEvent
│       │   ├── repositories/
│       │   │   └── command.ts            # interface OrganizationCommandRepository
│       │   ├── services/
│       │   ├── policies/
│       │   └── index.ts
│       ├── application/
│       │   ├── commands/
│       │   │   └── create-organization/
│       │   │       ├── command.ts        # CreateOrganizationInput, CreateOrganizationCommand
│       │   │       └── handler.ts        # CreateOrganizationHandler
│       │   ├── queries/
│       │   │   └── find-user-organizations/
│       │   │       ├── query.ts
│       │   │       └── handler.ts
│       │   ├── dto/
│       │   ├── mappers/
│       │   ├── ports/
│       │   ├── services/
│       │   └── index.ts
│       ├── infrastructure/
│       │   ├── repositories/
│       │   │   └── command.ts            # class PrismaOrganizationCommandRepository
│       │   ├── mappers/                  # Prisma record ↔ 도메인 매퍼
│       │   ├── adapters/                 # 포트 구현체 (jwt, bcrypt 등)
│       │   ├── services/                 # 도메인 서비스 구현체
│       │   └── index.ts
│       ├── presentation/
│       │   ├── routes/
│       │   │   └── create-organization.ts  # createCreateOrganizationRoutes
│       │   ├── guards/
│       │   ├── plugins/
│       │   ├── controller.ts             # createOrganizationController
│       │   ├── http-model.ts             # OrganizationHttpModel
│       │   ├── response.ts               # OrganizationResponseSchemas
│       │   └── index.ts
│       ├── error/
│       │   ├── constants/
│       │   │   ├── log-event.ts          # ORGANIZATION_LOG_EVENT
│       │   │   └── log-message.ts        # ORGANIZATION_LOG_MESSAGE
│       │   ├── not-found.ts              # class OrganizationNotFoundError
│       │   └── index.ts
│       └── index.ts                      # 의존성 조립(DI) + 컨트롤러 default export
└── shared/
    ├── database/      # PrismaRepository, TransactionManager, AsyncLocalStorage
    ├── ddd/           # Entity, AggregateRoot, Value Object 베이스
    ├── error/         # AppError와 HTTP 기반 공통 에러
    ├── http/          # 에러 플러그인, 요청 메타데이터 플러그인, 에러 매퍼
    ├── logger/        # pino 로거, 공통 로그 이벤트·메시지
    ├── pagination/    # offset·cursor 페이지네이션 플러그인과 빌더
    └── responses/     # 응답 빌더, 응답 스키마, OpenAPI 변환
```

---

## 2. Presentation (Elysia)

### 2.1 구성

| 분류            | 위치                    | 대표 심볼                                         | 예시                     |
| --------------- | ----------------------- | ------------------------------------------------- | ------------------------ |
| Controller      | `presentation/`         | `function create<Module>Controller`               | `controller.ts`          |
| Request Schema  | `presentation/`         | `const <Module>HttpModel` + 동명 타입             | `http-model.ts`          |
| Response Schema | `presentation/`         | `const <Module>ResponseSchemas`                   | `response.ts`            |
| Route           | `presentation/routes/`  | `function create<UseCase>Routes`                  | `create-organization.ts` |
| Guard           | `presentation/guards/`  | `function create<Name>Guard`, `const <name>Guard` | `auth.ts` (auth)         |
| Elysia Plugin   | `presentation/plugins/` | `const <name>Plugin`                              | `refresh-token.ts`       |

- 라우트 파일 이름은 유스케이스 이름과 같게 작성합니다. (공통 문서 4.2)
- 컨트롤러는 모듈의 라우트들을 `.use()`로 묶은 Elysia 인스턴스를 반환하며, 모듈 `index.ts`가 이를 `default export`합니다.

### 2.2 심볼 규칙

| 대상                      | 규칙                                                | 예시                                                             |
| ------------------------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| Elysia 플러그인 인스턴스  | `camelCase` + `Plugin`                              | `errorPlugin`, `offsetPaginationPlugin`                          |
| 컨트롤러·라우트 팩토리    | `create<Module>Controller`, `create<UseCase>Routes` | `createOrganizationController`, `createCreateOrganizationRoutes` |
| Zod 스키마 맵 (모듈 단위) | `PascalCase` (`HttpModel`, `ResponseSchemas`)       | `OrganizationHttpModel`, `UserResponseSchemas`                   |

### 2.3 API 계약

- 요청·응답 Zod 스키마는 OpenAPI(`/openapi/json`)로 노출되고, `@packages/api-client`가 이를 기반으로 생성됩니다.
- 요청·응답 스키마를 바꾸면 서버를 실행한 상태에서 `pnpm generate:packages`로 api-client를 재생성합니다.

---

## 3. Infrastructure (Prisma)

| 분류              | 위치                           | 대표 심볼                    | 예시                                |
| ----------------- | ------------------------------ | ---------------------------- | ----------------------------------- |
| Repository 구현체 | `infrastructure/repositories/` | `class Prisma<인터페이스명>` | `command.ts`, `invitation-query.ts` |
| Prisma Mapper     | `infrastructure/mappers/`      | `const <Name>PrismaMapper`   | `organization.ts`                   |

- Prisma Client는 직접 생성하지 않고 `@packages/api-db`의 `prismaApiClient`를 주입합니다.
- 레포지토리 구현체는 `$shared/database`의 `PrismaRepository`를 상속하고, 쿼리는 반드시 `this.client`로 실행합니다. (`this.prisma` 직접 사용 금지)
- Prisma `P2002`(unique 위반)처럼 도메인 의미가 있는 DB 에러는 레포지토리에서 해당 도메인 에러로 변환합니다. 그 외 Prisma 에러는 `shared/http`의 에러 플러그인이 처리합니다.
- 스키마 변경은 `packages/api-db`에서 Prisma 스키마 수정 → `db:push`(또는 migrate) → `db:generate` → 타입체크 순서로 진행합니다.
- 모듈 간 FK 규칙은 공통 문서 7.1을 따릅니다. 다른 모듈을 가리키는 컬럼에는 `@relation`을 두지 않고 `@@index`만 둡니다.

---

## 4. 모듈 조립 (DI)

- 모듈 `index.ts`에서 `prismaApiClient`를 레포지토리에 주입하고, 레포지토리 → 서비스 → 핸들러 → 컨트롤러 순으로 조립합니다.
- `src/index.ts`는 OpenAPI 플러그인과 `errorPlugin`을 먼저 등록한 뒤 각 모듈을 `.use()`합니다.
- 인증이 필요한 라우트는 auth 모듈이 공개하는 `authGuard`를 사용합니다.

---

## 5. 트랜잭션

- 애그리거트 하나의 저장이 여러 쿼리로 이루어지면 레포지토리에서 `this.transaction()`으로 감쌉니다. 앰비언트 트랜잭션이 있으면 참여하고, 없으면 새로 시작합니다.
- 여러 애그리거트를 하나의 단위로 커밋해야 하는 유스케이스는 핸들러에서 `TransactionManager.run()`으로 감쌉니다.
- 트랜잭션은 AsyncLocalStorage로 전파되므로, 트랜잭션 안에서 호출된 레포지토리의 `this.client`는 자동으로 같은 트랜잭션을 사용합니다.
- 동시 요청에서 상태 전이가 겹칠 수 있는 경우, 조회한 상태를 조건으로 거는 조건부 업데이트(`updateMany` + `where`)로 하나만 반영되게 합니다. (예: 초대 `updateStatusIfPending`)

---

## 6. Shared 명명

| 분류           | 위치                     | 대표 심볼             | 예시                    |
| -------------- | ------------------------ | --------------------- | ----------------------- |
| 공용 매퍼 함수 | `shared/<name>/mappers/` | `function map<Name>`  | `prisma-error.ts`       |
| Elysia Plugin  | `shared/<name>/plugins/` | `const <name>Plugin`  | `error.ts`, `offset.ts` |
| 빌더           | `shared/<name>/lib/`     | `const <Name>Builder` | `builder.ts`            |

---

## 7. 현재 기준과 다른 부분

| 항목                                                        | 기준                            | 정리 방향                                                                                 |
| ----------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------- |
| `OrganizationMember.user`, `AuthSession.user` (`@relation`) | 공통 문서 7.1 (모듈 간 FK 없음) | `@relation` 제거, 인덱스 유지. `AuthSession`의 사용자 삭제 시 정리는 도메인 이벤트로 대체 |
