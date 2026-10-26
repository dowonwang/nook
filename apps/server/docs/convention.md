# Server Architecture & Naming Convention

본 문서는 API 서버(`@server/api`)의 디렉터리 구조, 파일 및 심볼 명명 규칙, 모듈 간 의존 규칙을 정의합니다.

웹 클라이언트 컨벤션([Web FSD Architecture & Naming Convention](../../web/docs/convention.md))과 공통으로 적용할 수 있는 규칙은 그대로 따르고, 서버 아키텍처(DDD · 헥사고날 · CQRS)에 필요한 규칙을 추가로 정의합니다.

---

## 1. 기본 원칙 (Core Rules)

웹 컨벤션과 동일하게 적용하는 규칙입니다.

- **디렉터리 명명**: 모든 디렉터리명은 소문자 `kebab-case`를 사용합니다.
- **파일 명명**: 모든 파일명은 `kebab-case`를 사용하며, **폴더 맥락에 기대어 최대한 짧게** 작성합니다. 자세한 규칙은 [3. 파일 명명 규칙](#3-파일-명명-규칙)을 따릅니다.
- **심볼 명명**: 파일명은 짧게 쓰지만, 클래스·함수·타입 이름은 **모듈 밖에서도 대상과 역할을 모두 알 수 있도록** 작성합니다. 자세한 규칙은 [4. 심볼 명명 규칙](#4-심볼-명명-규칙)을 따릅니다.
  - 클래스, 인터페이스, 타입: `PascalCase`
  - 함수, 변수, 인스턴스: `camelCase` (`동사 + 명사`)
  - 상수 맵: `UPPER_SNAKE_CASE`
- **진입점 (Barrel Export)**: 외부에 공개하는 모듈은 `index.ts`를 통해서만 내보냅니다. 타입만 내보내는 파일은 `export type *`을 사용합니다.
- **Import 바운더리**: 같은 단위 내부는 상대 경로, 다른 단위는 alias + 진입점(`index.ts`)으로만 참조합니다. 서버에서의 "단위"는 [5. Import 규칙](#5-import-규칙)에서 정의합니다.

```typescript
// modules/organization/domain/entities/member.ts
// 파일명은 짧게, 클래스명은 대상(OrganizationMember) + 역할(Entity)
export class OrganizationMemberEntity {}
```

### 1.1 약어 표기

약어도 하나의 단어로 취급해 `PascalCase` / `camelCase` 규칙을 적용합니다.

| Good                | Bad                 |
| ------------------- | ------------------- |
| `UserUuidVo`        | `UserUUIDVO`        |
| `JwtTokenIssuer...` | `JWTTokenIssuer...` |
| `requestMetadata`   | `requestMetaData`   |
| `UserTimestamps...` | `UserTimeStamps...` |

---

## 2. 디렉터리 구조

```text
src/
├── index.ts                              # Elysia 앱 조립, 모듈 등록
├── modules/
│   └── organization/                     # 도메인 모듈 (kebab-case, 단수형)
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
│       │   ├── repositories/             # 레포지토리 인터페이스
│       │   │   └── command.ts            # interface OrganizationCommandRepository
│       │   ├── services/                 # 도메인 서비스 인터페이스
│       │   ├── policies/                 # 순수 도메인 정책
│       │   └── index.ts
│       ├── application/
│       │   ├── commands/
│       │   │   └── create-organization/  # 유스케이스 이름 (동사-대상)
│       │   │       ├── command.ts        # CreateOrganizationInput, CreateOrganizationCommand
│       │   │       └── handler.ts        # CreateOrganizationHandler
│       │   ├── queries/
│       │   │   └── find-user-organizations/
│       │   │       ├── query.ts
│       │   │       └── handler.ts
│       │   ├── dto/
│       │   │   └── organization.ts       # interface OrganizationDto
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
└── shared/                               # 특정 도메인에 종속되지 않는 공용 코드
    ├── database/
    ├── ddd/
    ├── error/
    ├── http/
    ├── logger/
    ├── pagination/
    └── responses/
```

### 2.1 하위 디렉터리 단수/복수 규칙

여러 파일을 모으는 분류 디렉터리는 **복수형**을 사용합니다.

| Good                                                                    | Bad                                         |
| ----------------------------------------------------------------------- | ------------------------------------------- |
| `mappers/`, `constants/`, `plugins/`, `guards/`, `routes/`, `adapters/` | `mapper/`, `constant/`, `plugin/`, `guard/` |

예외: `dto/`, `error/`, `lib/`처럼 관용적으로 단수형을 쓰는 디렉터리와 계층 이름(`domain/`, `application/` 등)은 그대로 둡니다.

### 2.2 역할 폴더

파일의 역할은 접미사가 아니라 **폴더**로 구분합니다. 따라서 역할이 다른 파일은 반드시 해당 역할 폴더에 둡니다.

| 계층             | 역할 폴더                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| `domain`         | `aggregates/`, `entities/`, `value-objects/`, `events/`, `repositories/`, `services/`, `policies/`   |
| `application`    | `commands/<use-case>/`, `queries/<use-case>/`, `dto/`, `mappers/`, `ports/`, `services/`             |
| `infrastructure` | `repositories/`, `mappers/`, `adapters/`, `services/`                                                |
| `presentation`   | `routes/`, `guards/`, `plugins/` (+ 모듈당 하나뿐인 `controller.ts`, `http-model.ts`, `response.ts`) |
| `error`          | `constants/` (+ 에러 클래스 파일)                                                                    |

---

## 3. 파일 명명 규칙

파일명은 **폴더 경로로 알 수 없는 정보만** 남깁니다.

1. **역할 접미사를 붙이지 않습니다.** 역할은 폴더로 구분합니다. (`.command`, `.handler`, `.dto`, `.vo`, `.error`, `.routes`, `.repository`, `.abstract` 등 사용 금지)
2. **경로에 이미 있는 단어는 뺍니다.** 모듈명, 유스케이스 폴더명, 역할 폴더명이 여기에 해당합니다.
3. **폴더에 하나뿐인 역할 파일은 역할 이름을 파일명으로 씁니다.** (`command.ts`, `query.ts`, `handler.ts`, `controller.ts`, `http-model.ts`, `response.ts`, `types.ts`, `index.ts`)
4. **더 이상 줄일 수 없으면 그대로 둡니다.** 2번 규칙으로 단어를 빼고 나서 아무것도 남지 않으면 대상 이름을 남깁니다. (`dto/organization.ts`, `aggregates/organization.ts`, `entities/user.ts`)
5. **기술 이름은 구분에 필요할 때만 남깁니다.** `infrastructure/repositories/`의 Prisma처럼 폴더 안에서 모두 같은 기술이면 생략하고, `adapters/`처럼 기술 자체가 구분자면 남깁니다. (`jwt-token-issuer.ts`, `bcrypt-password-hasher.ts`)

```text
Bad                                                                    Good
commands/change-invitation-status/change-invitation-status.command.ts → commands/change-invitation-status/command.ts
dto/organization-invitation.dto.ts                                    → dto/invitation.ts
dto/organization.dto.ts                                               → dto/organization.ts
error/organization-not-found.error.ts                                 → error/not-found.ts
error/duplicate-organization-title.error.ts                           → error/duplicate-title.ts
error/constants/organization-log-event.ts                             → error/constants/log-event.ts
infrastructure/repositories/prisma-organization-command.repository.ts → infrastructure/repositories/command.ts
presentation/organization.controller.ts                               → presentation/controller.ts
presentation/routes/create-organization.routes.ts                     → presentation/routes/create-organization.ts
```

> 같은 이름의 파일(`handler.ts`, `command.ts`, `not-found.ts` 등)이 여러 폴더에 생기므로, 에디터에서는 파일명 대신 경로(`create-organization/handler`)로 검색합니다.

### 3.1 Domain

| 분류                       | 폴더                    | 대표 심볼                                 | 예시 (organization 모듈 기준) |
| -------------------------- | ----------------------- | ----------------------------------------- | ----------------------------- |
| Aggregate Root             | `domain/aggregates/`    | `class OrganizationAggregate`             | `organization.ts`             |
| Entity                     | `domain/entities/`      | `class OrganizationMemberEntity`          | `member.ts`                   |
| Value Object               | `domain/value-objects/` | `class OrganizationMemberRoleVo`          | `member-role.ts`              |
| Domain Event               | `domain/events/`        | `class OrganizationCreatedEvent`          | `created.ts`                  |
| Repository (interface)     | `domain/repositories/`  | `interface OrganizationCommandRepository` | `command.ts`                  |
| Domain Service (interface) | `domain/services/`      | `interface OrganizationPolicyService`     | `policy.ts`                   |
| Policy (순수 함수 묶음)    | `domain/policies/`      | `const RefreshSessionPolicy`              | `refresh-session.ts` (auth)   |
| 추상 클래스                | 구현체와 같은 역할 폴더 | `abstract class TokenClaimsVo`            | `token-claims.ts` (auth)      |

### 3.2 Application

| 분류                  | 폴더                               | 대표 심볼                                            | 예시                               |
| --------------------- | ---------------------------------- | ---------------------------------------------------- | ---------------------------------- |
| Command               | `application/commands/<use-case>/` | `interface <UseCase>Input`, `class <UseCase>Command` | `create-organization/command.ts`   |
| Query                 | `application/queries/<use-case>/`  | `interface <UseCase>Input`, `class <UseCase>Query`   | `find-sent-invitations/query.ts`   |
| Handler               | 위와 같음                          | `class <UseCase>Handler`                             | `create-organization/handler.ts`   |
| DTO                   | `application/dto/`                 | `interface OrganizationDto`                          | `organization.ts`, `invitation.ts` |
| Mapper (도메인 → DTO) | `application/mappers/`             | `const OrganizationDtoMapper`                        | `organization.ts`                  |
| Port (interface)      | `application/ports/`               | `interface TokenIssuerPort`                          | `token-issuer.ts` (auth)           |
| Application Service   | `application/services/`            | `class AuthTokenIssuerService`                       | `token-issuer.ts` (auth)           |

### 3.3 Infrastructure

| 분류                  | 폴더                           | 대표 심볼                                   | 예시                                |
| --------------------- | ------------------------------ | ------------------------------------------- | ----------------------------------- |
| Repository 구현체     | `infrastructure/repositories/` | `class PrismaOrganizationCommandRepository` | `command.ts`, `invitation-query.ts` |
| Prisma Mapper         | `infrastructure/mappers/`      | `const OrganizationPrismaMapper`            | `organization.ts`                   |
| Port 구현체 (Adapter) | `infrastructure/adapters/`     | `class JwtTokenIssuerAdapter`               | `jwt-token-issuer.ts` (auth)        |
| Domain Service 구현체 | `infrastructure/services/`     | `class PrismaOrganizationPolicyService`     | `policy.ts`                         |

### 3.4 Presentation

| 분류            | 위치                    | 대표 심볼                                         | 예시                     |
| --------------- | ----------------------- | ------------------------------------------------- | ------------------------ |
| Controller      | `presentation/`         | `function create<Module>Controller`               | `controller.ts`          |
| Request Schema  | `presentation/`         | `const <Module>HttpModel` + 동명 타입             | `http-model.ts`          |
| Response Schema | `presentation/`         | `const <Module>ResponseSchemas`                   | `response.ts`            |
| Route           | `presentation/routes/`  | `function create<UseCase>Routes`                  | `create-organization.ts` |
| Guard           | `presentation/guards/`  | `function create<Name>Guard`, `const <name>Guard` | `auth.ts` (auth)         |
| Elysia Plugin   | `presentation/plugins/` | `const <name>Plugin`                              | `refresh-token.ts`       |

### 3.5 Error · Shared

| 분류             | 위치                     | 대표 심볼                       | 예시                                    |
| ---------------- | ------------------------ | ------------------------------- | --------------------------------------- |
| 도메인 에러      | `error/`                 | `class <모듈><대상><상황>Error` | `not-found.ts`, `invitation-expired.ts` |
| 로그 이벤트 상수 | `error/constants/`       | `const <MODULE>_LOG_EVENT`      | `log-event.ts`                          |
| 로그 메시지 상수 | `error/constants/`       | `const <MODULE>_LOG_MESSAGE`    | `log-message.ts`                        |
| 공용 매퍼 함수   | `shared/<name>/mappers/` | `function map<Name>`            | `prisma-error.ts`                       |
| Elysia Plugin    | `shared/<name>/plugins/` | `const <name>Plugin`            | `error.ts`, `offset.ts`                 |
| 빌더             | `shared/<name>/lib/`     | `const <Name>Builder`           | `builder.ts`                            |
| 타입 전용 파일   | -                        | -                               | `types.ts`                              |

---

## 4. 심볼 명명 규칙

### 4.1 역할 접미사

파일명에서 뺀 역할은 **심볼 이름의 접미사로 반드시 표기**합니다. 심볼 이름만 보고도 대상(모듈·도메인 개념)과 역할을 모두 알 수 있어야 합니다.

형식: `<모듈><대상><역할>`

| 역할                  | 접미사                       | 예시                                                             |
| --------------------- | ---------------------------- | ---------------------------------------------------------------- |
| Aggregate Root        | `Aggregate`                  | `OrganizationAggregate`, `OrganizationInvitationAggregate`       |
| Entity                | `Entity`                     | `OrganizationMemberEntity`, `UserEntity`, `AuthSessionEntity`    |
| Value Object          | `Vo`                         | `OrganizationUuidVo`, `UserEmailVo`                              |
| Domain Event          | `Event`                      | `OrganizationCreatedEvent`                                       |
| Repository            | `Repository`                 | `OrganizationCommandRepository`, `PrismaUserQueryRepository`     |
| Domain Service        | `Service`                    | `OrganizationPolicyService`                                      |
| Policy                | `Policy`                     | `RefreshSessionPolicy`                                           |
| Command / Query       | `Command` / `Query`          | `CreateOrganizationCommand`, `FindSentInvitationsQuery`          |
| Command / Query 입력  | `Input`                      | `CreateOrganizationInput`                                        |
| Handler 결과          | `Result`                     | `CreateOrganizationResult`                                       |
| Handler               | `Handler`                    | `CreateOrganizationHandler`                                      |
| DTO                   | `Dto`                        | `OrganizationDto`, `AuthUserDto`                                 |
| Mapper                | `DtoMapper` / `PrismaMapper` | `OrganizationDtoMapper`, `OrganizationPrismaMapper`              |
| Port                  | `Port`                       | `TokenIssuerPort`, `OrganizationReaderPort`                      |
| Application Service   | `Service`                    | `AuthTokenIssuerService`, `CredentialAuthenticatorService`       |
| Adapter (Port 구현체) | `Adapter`                    | `JwtTokenIssuerAdapter`, `BcryptPasswordHasherAdapter`           |
| Error                 | `Error`                      | `OrganizationNotFoundError`                                      |
| Controller / Route    | `Controller` / `Routes`      | `createOrganizationController`, `createCreateOrganizationRoutes` |
| Guard / Plugin        | `Guard` / `Plugin`           | `authGuard`, `refreshTokenPlugin`                                |

- 구현체 클래스는 `<기술> + <인터페이스명>`으로 작성합니다. (`PrismaOrganizationCommandRepository`, `PrismaOrganizationPolicyService`)
- `shared/ddd`의 베이스 클래스(`Entity`, `AggregateRoot`, `PrimitiveValueObject`, `UuidValueObject`)는 그 자체가 역할 이름이므로 예외로 둡니다.

### 4.2 유스케이스 이름

하나의 유스케이스는 **commands/queries 폴더, 라우트 파일, 클래스·함수**에서 같은 이름을 사용합니다. 이름만으로 HTTP 라우트부터 핸들러까지 추적할 수 있게 하기 위함입니다.

- 형식: `동사-대상` (kebab-case). 같은 모듈 안에서도 대상을 생략하지 않습니다.
- Command 동사: `create`, `update`, `delete`, `change-*`, `sign-in` 등 상태를 바꾸는 동작
- Query 동사: `find` (목록 또는 없을 수 있는 단건 조회)

```text
유스케이스: create-organization

application/commands/create-organization/command.ts
  → CreateOrganizationInput, CreateOrganizationCommand
application/commands/create-organization/handler.ts
  → CreateOrganizationHandler
presentation/routes/create-organization.ts
  → createCreateOrganizationRoutes
```

```typescript
// Bad: 대상이 빠져 모듈 밖에서 의미를 알 수 없음
export class CreateHandler {}

// Good
export class CreateOrganizationHandler {}
```

- 상태를 바꾸지 않는 조회는 `commands/`가 아니라 `queries/`에 둡니다.

### 4.3 Command / Query 객체

- 외부 입력(원시 타입)은 `interface <UseCase>Input`으로 정의합니다.
- 핸들러가 받는 객체는 `class <UseCase>Command` / `class <UseCase>Query`로 정의하고, 생성자에서 Value Object로 변환·검증합니다.
- 핸들러 반환 타입이 DTO가 아닐 때는 `interface <UseCase>Result`로 정의합니다.

```typescript
export interface CreateInvitationInput {
  organizationId: string;
  inviterUserId: string;
}

export class CreateInvitationCommand {
  public readonly organizationId: OrganizationUuidVo;

  constructor(input: CreateInvitationInput) {
    this.organizationId = OrganizationUuidVo.create(input.organizationId);
  }
}
```

### 4.4 객체 · 함수

| 대상                                       | 규칙                                          | 예시                                             |
| ------------------------------------------ | --------------------------------------------- | ------------------------------------------------ |
| 메서드 묶음 객체 (Mapper, Policy, Builder) | `PascalCase` + 역할 접미사                    | `OrganizationPrismaMapper`, `ApiResponseBuilder` |
| Elysia 플러그인 인스턴스                   | `camelCase` + `Plugin`                        | `errorPlugin`, `offsetPaginationPlugin`          |
| 팩토리 함수                                | `create` + 대상                               | `createOrganizationController`, `createLogger`   |
| 변환 함수                                  | `map` / `to` + 대상                           | `mapPrismaError`, `toOrganizationDomain`         |
| Zod 단일 스키마                            | `camelCase` + `Schema`                        | `offsetPaginationQuerySchema`                    |
| Zod 스키마 맵 (모듈 단위)                  | `PascalCase` (`HttpModel`, `ResponseSchemas`) | `OrganizationHttpModel`, `UserResponseSchemas`   |

### 4.5 에러

- 도메인 에러 클래스는 `<모듈><대상><상황>Error` 형식으로 작성하고, `shared/error`의 HTTP 기반 에러(`NotFoundError`, `ConflictError` 등)를 상속합니다.
- 클래스명에는 모듈 이름을 접두사로 포함합니다. (`OrganizationInvitationExpiredError`, `UserNotFoundError`)
- 파일명은 클래스명에서 모듈명과 `Error`를 뺀 kebab-case로 작성합니다. (`OrganizationInvitationExpiredError` → `invitation-expired.ts`, `InvalidUserEmailError` → `invalid-email.ts`)
- 생성자는 `scope: string`(발생 위치, 보통 `<Class>.name`)만 받습니다.

### 4.6 로그 이벤트

- 상수 키: `UPPER_SNAKE_CASE`, 모듈 접두사 포함 (`ORG_NOT_FOUND`)
- 이벤트 값: 상수 키를 소문자로 바꾼 `snake_case` — 모듈과 이벤트 이름도 **언더스코어(`_`)** 로 구분합니다.

```typescript
// Good
ORG_INVITATION_EXPIRED: 'org_invitation_expired',
HTTP_REQUEST_RECEIVED: 'http_request_received',

// Bad
ORG_INVITATION_EXPIRED: 'org.invitation_expired',
HTTP_REQUEST_RECEIVED: 'http.request.received',
```

---

## 5. Import 규칙

웹은 "슬라이스"를 경계로 삼지만, 서버는 **모듈**과 **계층**을 경계로 삼습니다.

| 참조 범위                 | 규칙                                                      | 예시                                                                   |
| ------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------- |
| 같은 계층 내부            | 상대 경로                                                 | `import { OrganizationPrismaMapper } from '../mappers/organization'`   |
| 같은 모듈의 다른 계층     | `$modules/<self>/<layer>` 배럴                            | `import { OrganizationAggregate } from '$modules/organization/domain'` |
| 다른 모듈                 | `$modules/<module>` 또는 `$modules/<module>/<layer>` 배럴 | `import { authGuard } from '$modules/auth'`                            |
| shared                    | `$shared/<name>` 배럴                                     | `import { createLogger } from '$shared/logger'`                        |
| 같은 shared 디렉터리 내부 | 상대 경로                                                 | `import { getClient } from './als'`                                    |

```typescript
// Bad: 배럴을 거치지 않는 깊은 경로
import { AppError } from '$shared/error/app';
import { createAuthGuard } from '$modules/auth/presentation/guards/auth';

// Good
import { AppError } from '$shared/error';
import { createAuthGuard } from '$modules/auth/presentation';
```

계층 의존 방향은 아래를 따르며, 역방향 의존은 금지합니다.

```text
presentation → application → domain
infrastructure → application, domain
모듈 index.ts(DI) → 모든 계층
```

- `domain`은 다른 계층, Prisma, Elysia에 의존하지 않습니다.
- 다른 모듈의 `infrastructure`는 모듈 `index.ts`(DI 조립)에서만 참조합니다.

---

## 6. 모듈 조립 (DI)

- 각 모듈의 `index.ts`에서 생성자 주입으로 의존성을 조립하고, 컨트롤러 플러그인을 `default export`합니다.
- 조립 순서는 `// repository` → `// service` → `// handler` → `// module` 주석으로 구분합니다.
- 다른 모듈이 사용해야 하는 인스턴스(예: `authGuard`)는 모듈 `index.ts`에서 named export합니다.
- `src/index.ts`는 `errorPlugin`을 먼저 등록한 뒤 각 모듈을 `.use()`합니다.
- Prisma Client는 직접 생성하지 않고 `@packages/api-db`의 `prismaApiClient`를 주입합니다.

---

## 7. 트랜잭션

- 레포지토리 구현체는 `$shared/database`의 `PrismaRepository`를 상속하고, 쿼리는 반드시 `this.client`로 실행합니다. (`this.prisma` 직접 사용 금지)
- 애그리거트 하나의 저장이 여러 쿼리로 이루어지면 `this.transaction()`으로 감쌉니다. 앰비언트 트랜잭션이 있으면 참여하고, 없으면 새로 시작합니다.
- 여러 애그리거트를 하나의 단위로 커밋해야 하는 유스케이스는 핸들러에서 `TransactionManager.run()`으로 감쌉니다.

---

## 8. 현행 코드 정리 목록

현재 코드 중 본 컨벤션과 다른 부분입니다. 리팩터링 시 아래 순서대로 정리합니다.

### 8.1 파일명 일괄 변경 (기계적)

모든 모듈과 shared에 아래 규칙을 일괄 적용합니다.

| 대상                           | 현재 예시                                                             | 변경 예시                                      |
| ------------------------------ | --------------------------------------------------------------------- | ---------------------------------------------- |
| 유스케이스 폴더 내부 파일      | `commands/create-invitation/create-invitation.handler.ts`             | `commands/create-invitation/handler.ts`        |
| 역할 접미사 + 모듈명 제거      | `domain/value-objects/organization-member-role.vo.ts`                 | `domain/value-objects/member-role.ts`          |
| 더 줄일 수 없는 이름           | `domain/aggregates/organization.aggregate.ts`                         | `domain/aggregates/organization.ts`            |
| 레포지토리 (인터페이스·구현체) | `infrastructure/repositories/prisma-organization-query.repository.ts` | `infrastructure/repositories/query.ts`         |
| 에러                           | `error/organization-not-found.error.ts`                               | `error/not-found.ts`                           |
| 로그 상수                      | `error/constant/organization-log-event.ts`                            | `error/constants/log-event.ts`                 |
| presentation 단일 파일         | `presentation/organization.http-model.ts`                             | `presentation/http-model.ts`                   |
| 라우트                         | `presentation/routes/find-sent-invitations.routes.ts`                 | `presentation/routes/find-sent-invitations.ts` |
| shared                         | `shared/http/plugins/error.plugin.ts`                                 | `shared/http/plugins/error.ts`                 |
| shared 추상 클래스             | `shared/ddd/entity/aggregate-root.abstract.ts`                        | `shared/ddd/entity/aggregate-root.ts`          |

### 8.2 폴더 이동 · 개별 변경

| 현재                                                                    | 변경                                                           |
| ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| `shared/ddd/errors/InvalidUuid.error.ts`                                | `shared/ddd/errors/invalid-uuid.ts`                            |
| `organization/error/unaffiliated_member.error.ts`                       | `organization/error/unaffiliated-member.ts`                    |
| `*/error/constant/`                                                     | `*/error/constants/`                                           |
| `shared/logger/constant/`                                               | `shared/logger/constants/`                                     |
| `shared/pagination/plugin/`                                             | `shared/pagination/plugins/`                                   |
| `shared/http/mapper/prisma-error-mapper.ts`                             | `shared/http/mappers/prisma-error.ts`                          |
| `shared/http/mapper/validation-error.mapper.ts`                         | `shared/http/mappers/validation-error.ts`                      |
| `shared/responses/api-*.ts`                                             | `shared/responses/{openapi,builder,response}.ts`               |
| `auth/presentation/guard/auth.guard.ts`                                 | `auth/presentation/guards/auth.ts`                             |
| `auth/domain/value-objects/abstract/token-claims.base.ts`               | `auth/domain/value-objects/token-claims.ts`                    |
| `auth/infrastructure/repositories/mapper/auth-session-prisma.mapper.ts` | `auth/infrastructure/mappers/session.ts`                       |
| `auth/infrastructure/services/jwt/jwt-token-*.ts`                       | `auth/infrastructure/adapters/jwt-token-*.ts`                  |
| `auth/infrastructure/services/password/bcrypt-password-hasher.ts`       | `auth/infrastructure/adapters/bcrypt-password-hasher.ts`       |
| `user/application/mapper/user-dto.mapper.ts`                            | `user/application/mappers/user.ts`                             |
| `user/infrastructure/repositories/mappers/user-entity.mapper.ts`        | `user/infrastructure/mappers/user.ts`                          |
| `organization/domain/services/organization-policy.ts`                   | `organization/domain/services/policy.ts`                       |
| `organization/infrastructure/services/organization-policy-service.ts`   | `organization/infrastructure/services/policy.ts`               |
| `organization/presentation/routes/change-invitation-status.route.ts`    | `organization/presentation/routes/change-invitation-status.ts` |
| `organization/presentation/routes/find-user-organization.routes.ts`     | `organization/presentation/routes/find-user-organizations.ts`  |

### 8.3 역할 접미사 추가 (심볼명 일괄 변경)

| 대상                | 현재                                                                                                                  | 변경                                                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Aggregate           | `Organization`, `OrganizationInvitation`                                                                              | `OrganizationAggregate`, `OrganizationInvitationAggregate`                                                                                    |
| Entity              | `OrganizationMember`, `User`, `AuthSession`                                                                           | `OrganizationMemberEntity`, `UserEntity`, `AuthSessionEntity`                                                                                 |
| Value Object        | `OrganizationUuid`, `UserEmail`, `AccessTokenClaims`, `TokenClaims` 등 모든 VO                                        | `OrganizationUuidVo`, `UserEmailVo`, `AccessTokenClaimsVo`, `TokenClaimsVo`                                                                   |
| Domain Service      | `OrganizationPolicy`(interface) · `OrganizationPolicyService`(구현체)                                                 | `OrganizationPolicyService`(interface) · `PrismaOrganizationPolicyService`(구현체)                                                            |
| Port                | `PasswordHasher`, `TokenHasher`, `TokenIssuer`, `TokenVerifier`, `OrganizationReader`, `OrganizationInvitationReader` | `PasswordHasherPort`, `TokenHasherPort`, `TokenIssuerPort`, `TokenVerifierPort`, `OrganizationReaderPort`, `OrganizationInvitationReaderPort` |
| Application Service | `AuthTokenIssuer`, `CredentialAuthenticator`, `RefreshTokenValidator`                                                 | `AuthTokenIssuerService`, `CredentialAuthenticatorService`, `RefreshTokenValidatorService`                                                    |
| Adapter             | `JwtTokenIssuer`, `JwtTokenVerifier`, `JwtTokenHasher`, `BcryptPasswordHasher`                                        | `JwtTokenIssuerAdapter`, `JwtTokenVerifierAdapter`, `JwtTokenHasherAdapter`, `BcryptPasswordHasherAdapter`                                    |
| Error               | `OrganizationNotFound`, `UserNotFound`, `InvalidCredentials` 등 모든 도메인 에러                                      | `OrganizationNotFoundError`, `UserNotFoundError`, `AuthInvalidCredentialsError` 등 (`<모듈><대상><상황>Error`)                                |
| Error (`shared`)    | `InvalidUuid` (`shared/ddd`), `UnprocessableContent` (`shared/error`)                                                 | `InvalidUuidError`, `UnprocessableContentError`                                                                                               |

에러 클래스명은 `Error` 접미사를 붙이면서 모듈 접두사가 빠진 것도 함께 정리합니다. (`EmailAlreadyExists` → `AuthEmailAlreadyExistsError`, `SelfInvitation` → `OrganizationSelfInvitationError`, `MinMemberConstraint` → `OrganizationMinMemberConstraintError` 등)

### 8.4 유스케이스 · 개별 심볼명

| 현재                                                                                                        | 변경                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `organization/application/commands/create/` · `CreateHandler` · `CreateCommand`(interface) · `CreateResult` | `commands/create-organization/` · `CreateOrganizationHandler` · `CreateOrganizationInput` + `CreateOrganizationCommand` · `CreateOrganizationResult` |
| `organization/presentation/routes/create-organization.routes.ts`                                            | `routes/create-organization.ts` (유스케이스 폴더명과 일치)                                                                                           |
| `organization/presentation/routes/create-invitation.routes.ts`                                              | `routes/create-invitation.ts`                                                                                                                        |
| `user/application/commands/me/me.commands.ts` · `MeCommand` · `MeHandler`                                   | `queries/find-me/query.ts` · `FindMeInput` + `FindMeQuery` · `FindMeHandler`                                                                         |
| `user/application/queries/find-user/` · `FindByEmailUserQuery` · `FindByEmailUserHandler`                   | `queries/find-user-by-email/` · `FindUserByEmailQuery` · `FindUserByEmailHandler`                                                                    |
| `user/presentation/routes/get-user.routes.ts` · `createGetUserRoutes`                                       | `routes/find-user-by-email.ts` · `createFindUserByEmailRoutes`                                                                                       |
| `auth` `SignInCommand`(interface) 등 interface 형태 Command                                                 | `<UseCase>Input` + `<UseCase>Command` 클래스 형태로 통일                                                                                             |
| `SingInResult`                                                                                              | `SignInResult`                                                                                                                                       |
| `createFindReceivedInvitations`                                                                             | `createFindReceivedInvitationsRoutes`                                                                                                                |
| `createInvitationRoutes`                                                                                    | `createCreateInvitationRoutes`                                                                                                                       |
| `createOrganizationRoutes`                                                                                  | `createCreateOrganizationRoutes`                                                                                                                     |
| `InvalidUserUUID`                                                                                           | `InvalidUserUuidError`                                                                                                                               |
| `UserTimeStampsRequired`                                                                                    | `UserTimestampsRequiredError`                                                                                                                        |
| `requestMetaDataPlugin`                                                                                     | `requestMetadataPlugin`                                                                                                                              |
| `PrismaErrorMapper` · `ValidationErrorMapper` (함수)                                                        | `mapPrismaError` · `mapValidationError`                                                                                                              |
| `offsetPaginationBuilder`                                                                                   | `OffsetPaginationBuilder`                                                                                                                            |
| `UserResponseSchema`                                                                                        | `UserResponseSchemas`                                                                                                                                |
| `createUserController` (const 화살표 함수)                                                                  | `function createUserController`                                                                                                                      |

### 8.5 기타

- 로그 이벤트 값을 모두 `snake_case`(언더스코어 구분)로 통일합니다. `auth.*`, `user.*`, `org.*`, `http.*` 형식(점 구분) 값이 대상이며, 로그 검색 쿼리가 있다면 함께 변경합니다.
- `shared/http/plugins/error.plugin.ts`, `shared/http/mapper/prisma-error-mapper.ts`의 `$shared/*/...` 깊은 경로 import를 배럴 import 또는 상대 경로로 변경합니다.
- `user`, `auth` 모듈의 Prisma 레포지토리가 `PrismaRepository`를 상속하도록 변경합니다.
