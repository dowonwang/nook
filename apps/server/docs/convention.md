# Server Architecture & Naming Convention

본 문서는 `apps/server/*` 아래의 모든 서버 애플리케이션(`@server/api` 등)에 공통으로 적용되는 아키텍처(DDD · 헥사고날 · CQRS), 명명 규칙, 모듈 간 의존 규칙을 정의합니다.

- 웹 클라이언트 컨벤션([Web FSD Architecture & Naming Convention](../../web/docs/convention.md))과 공통으로 적용할 수 있는 규칙은 그대로 따릅니다.
- 프레임워크·DB 등 특정 기술에 묶인 규칙은 각 앱의 문서에서 정의합니다.
  - `@server/api`: [API Server Convention](../api/docs/convention.md)

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

## 2. 모듈 구조

서버 앱의 `src/`는 도메인 단위의 `modules/`와 도메인에 종속되지 않는 `shared/`로 구성합니다.

```text
src/
├── index.ts                 # 앱 조립, 모듈 등록
├── modules/
│   └── <module>/            # 도메인 모듈 (kebab-case, 단수형)
│       ├── domain/          # 애그리거트, 엔티티, VO, 이벤트, 레포지토리·도메인 서비스 인터페이스
│       ├── application/     # 유스케이스(command/query), DTO, 포트
│       ├── infrastructure/  # 레포지토리·포트 구현체 (DB, 외부 서비스)
│       ├── presentation/    # 진입점 (HTTP 라우트, 소켓 핸들러 등, 앱별로 정의)
│       ├── error/           # 모듈 에러와 로그 상수
│       └── index.ts         # 의존성 조립(DI)과 모듈 공개 API
└── shared/                  # 특정 도메인에 종속되지 않는 공용 코드
```

- `presentation/`의 구성(컨트롤러, 라우트, 요청·응답 스키마 등)은 앱의 진입점 방식에 따라 다르므로 각 앱 문서에서 정의합니다.
- 특정 도메인에 종속되는 코드는 `shared/`에 두지 않습니다.

### 2.1 하위 디렉터리 단수/복수 규칙

여러 파일을 모으는 분류 디렉터리는 **복수형**을 사용합니다.

| Good                                                         | Bad                               |
| ------------------------------------------------------------ | --------------------------------- |
| `mappers/`, `constants/`, `plugins/`, `routes/`, `adapters/` | `mapper/`, `constant/`, `plugin/` |

예외: `dto/`, `error/`, `lib/`처럼 관용적으로 단수형을 쓰는 디렉터리와 계층 이름(`domain/`, `application/` 등)은 그대로 둡니다.

### 2.2 역할 폴더

파일의 역할은 접미사가 아니라 **폴더**로 구분합니다. 따라서 역할이 다른 파일은 반드시 해당 역할 폴더에 둡니다.

| 계층             | 역할 폴더                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `domain`         | `aggregates/`, `entities/`, `value-objects/`, `events/`, `repositories/`, `services/`, `policies/` |
| `application`    | `commands/<use-case>/`, `queries/<use-case>/`, `dto/`, `mappers/`, `ports/`, `services/`           |
| `infrastructure` | `repositories/`, `mappers/`, `adapters/`, `services/`                                              |
| `presentation`   | 앱 문서에서 정의                                                                                   |
| `error`          | `constants/` (+ 에러 클래스 파일)                                                                  |

---

## 3. 파일 명명 규칙

파일명은 **폴더 경로로 알 수 없는 정보만** 남깁니다.

1. **역할 접미사를 붙이지 않습니다.** 역할은 폴더로 구분합니다. (`.command`, `.handler`, `.dto`, `.vo`, `.error`, `.repository`, `.abstract` 등 사용 금지)
2. **경로에 이미 있는 단어는 뺍니다.** 모듈명, 유스케이스 폴더명, 역할 폴더명이 여기에 해당합니다.
3. **폴더에 하나뿐인 역할 파일은 역할 이름을 파일명으로 씁니다.** (`command.ts`, `query.ts`, `handler.ts`, `types.ts`, `index.ts` 등)
4. **더 이상 줄일 수 없으면 그대로 둡니다.** 2번 규칙으로 단어를 빼고 나서 아무것도 남지 않으면 대상 이름을 남깁니다. (`dto/organization.ts`, `aggregates/organization.ts`, `entities/user.ts`)
5. **기술 이름은 구분에 필요할 때만 남깁니다.** 폴더 안에서 모두 같은 기술이면 생략하고(`infrastructure/repositories/command.ts`), 기술 자체가 구분자면 남깁니다(`adapters/jwt-token-issuer.ts`, `adapters/bcrypt-password-hasher.ts`).

```text
Bad                                                                    Good
commands/change-invitation-status/change-invitation-status.command.ts → commands/change-invitation-status/command.ts
dto/organization-invitation.dto.ts                                    → dto/invitation.ts
dto/organization.dto.ts                                               → dto/organization.ts
error/organization-not-found.error.ts                                 → error/not-found.ts
error/constants/organization-log-event.ts                             → error/constants/log-event.ts
infrastructure/repositories/prisma-organization-command.repository.ts → infrastructure/repositories/command.ts
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

| 분류                  | 폴더                           | 대표 심볼                     | 예시                                |
| --------------------- | ------------------------------ | ----------------------------- | ----------------------------------- |
| Repository 구현체     | `infrastructure/repositories/` | `class <기술><인터페이스명>`  | `command.ts`, `invitation-query.ts` |
| 영속성 Mapper         | `infrastructure/mappers/`      | `const <Name><기술>Mapper`    | `organization.ts`                   |
| Port 구현체 (Adapter) | `infrastructure/adapters/`     | `class <기술><포트명>Adapter` | `jwt-token-issuer.ts` (auth)        |
| Domain Service 구현체 | `infrastructure/services/`     | `class <기술><인터페이스명>`  | `policy.ts`                         |

### 3.4 Error

| 분류             | 위치               | 대표 심볼                       | 예시                                    |
| ---------------- | ------------------ | ------------------------------- | --------------------------------------- |
| 도메인 에러      | `error/`           | `class <모듈><대상><상황>Error` | `not-found.ts`, `invitation-expired.ts` |
| 로그 이벤트 상수 | `error/constants/` | `const <MODULE>_LOG_EVENT`      | `log-event.ts`                          |
| 로그 메시지 상수 | `error/constants/` | `const <MODULE>_LOG_MESSAGE`    | `log-message.ts`                        |
| 타입 전용 파일   | -                  | -                               | `types.ts`                              |

---

## 4. 심볼 명명 규칙

### 4.1 역할 접미사

파일명에서 뺀 역할은 **심볼 이름의 접미사로 반드시 표기**합니다. 심볼 이름만 보고도 대상(모듈·도메인 개념)과 역할을 모두 알 수 있어야 합니다.

형식: `<모듈><대상><역할>`

| 역할                  | 접미사                       | 예시                                                          |
| --------------------- | ---------------------------- | ------------------------------------------------------------- |
| Aggregate Root        | `Aggregate`                  | `OrganizationAggregate`, `OrganizationInvitationAggregate`    |
| Entity                | `Entity`                     | `OrganizationMemberEntity`, `UserEntity`, `AuthSessionEntity` |
| Value Object          | `Vo`                         | `OrganizationUuidVo`, `UserEmailVo`                           |
| Domain Event          | `Event`                      | `OrganizationCreatedEvent`                                    |
| Repository            | `Repository`                 | `OrganizationCommandRepository`, `PrismaUserQueryRepository`  |
| Domain Service        | `Service`                    | `OrganizationPolicyService`                                   |
| Policy                | `Policy`                     | `RefreshSessionPolicy`                                        |
| Command / Query       | `Command` / `Query`          | `CreateOrganizationCommand`, `FindSentInvitationsQuery`       |
| Command / Query 입력  | `Input`                      | `CreateOrganizationInput`                                     |
| Handler 결과          | `Result`                     | `CreateOrganizationResult`                                    |
| Handler               | `Handler`                    | `CreateOrganizationHandler`                                   |
| DTO                   | `Dto`                        | `OrganizationDto`, `AuthUserDto`                              |
| Mapper                | `DtoMapper` / `<기술>Mapper` | `OrganizationDtoMapper`, `OrganizationPrismaMapper`           |
| Port                  | `Port`                       | `TokenIssuerPort`, `OrganizationReaderPort`                   |
| Application Service   | `Service`                    | `AuthTokenIssuerService`, `CredentialAuthenticatorService`    |
| Adapter (Port 구현체) | `Adapter`                    | `JwtTokenIssuerAdapter`, `BcryptPasswordHasherAdapter`        |
| Error                 | `Error`                      | `OrganizationNotFoundError`                                   |

- 구현체 클래스는 `<기술> + <인터페이스명>`으로 작성합니다. (`PrismaOrganizationCommandRepository`, `PrismaUserQueryRepository`)
- `shared/ddd`의 베이스 클래스(`Entity`, `AggregateRoot`, `PrimitiveValueObject` 등)는 그 자체가 역할 이름이므로 예외로 둡니다.
- presentation 진입점(컨트롤러, 라우트, 플러그인 등)의 심볼 규칙은 각 앱 문서에서 정의합니다.

### 4.2 유스케이스 이름

하나의 유스케이스는 **commands/queries 폴더, presentation 진입점 파일, 클래스·함수**에서 같은 이름을 사용합니다. 이름만으로 진입점부터 핸들러까지 추적할 수 있게 하기 위함입니다.

- 형식: `동사-대상` (kebab-case). 같은 모듈 안에서도 대상을 생략하지 않습니다.
- Command 동사: `create`, `update`, `delete`, `change-*`, `sign-in` 등 상태를 바꾸는 동작
- Query 동사: `find` (목록 또는 없을 수 있는 단건 조회)

```text
유스케이스: create-organization

application/commands/create-organization/command.ts → CreateOrganizationInput, CreateOrganizationCommand
application/commands/create-organization/handler.ts → CreateOrganizationHandler
presentation/routes/create-organization.ts          → createCreateOrganizationRoutes (api 기준)
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
- 핸들러는 `execute(input: <UseCase>Input)`으로 입력을 받아 내부에서 Command/Query 객체를 생성합니다.
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

| 대상                                       | 규칙                       | 예시                                             |
| ------------------------------------------ | -------------------------- | ------------------------------------------------ |
| 메서드 묶음 객체 (Mapper, Policy, Builder) | `PascalCase` + 역할 접미사 | `OrganizationPrismaMapper`, `ApiResponseBuilder` |
| 팩토리 함수                                | `create` + 대상            | `createOrganizationController`, `createLogger`   |
| 변환 함수                                  | `map` / `to` + 대상        | `mapPrismaError`, `toOrganizationDomain`         |
| Zod 단일 스키마                            | `camelCase` + `Schema`     | `offsetPaginationQuerySchema`                    |

### 4.5 에러

- 도메인 에러 클래스는 `<모듈><대상><상황>Error` 형식으로 작성하고, 앱의 공통 에러 베이스(`shared/error`)를 상속합니다.
- 클래스명에는 모듈 이름을 포함합니다. (`OrganizationInvitationExpiredError`, `UserNotFoundError`)
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

웹은 "슬라이스"를 경계로 삼지만, 서버는 **모듈**과 **계층**을 경계로 삼습니다. 각 앱은 `$modules/*`, `$shared/*`, `$/*` alias를 사용합니다.

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

// Good
import { AppError } from '$shared/error';
```

계층 의존 방향은 아래를 따르며, 역방향 의존은 금지합니다.

```text
presentation → application → domain
infrastructure → application, domain
모듈 index.ts(DI) → 모든 계층
```

- `domain`은 다른 계층과 프레임워크·ORM에 의존하지 않습니다.
- 다른 모듈의 `infrastructure`는 모듈 `index.ts`(DI 조립)에서만 참조합니다.

---

## 6. 모듈 조립 (DI)

- 각 모듈의 `index.ts`에서 생성자 주입으로 의존성을 조립합니다.
- 조립 순서는 `// repository` → `// service` → `// handler` → `// module` 주석으로 구분합니다.
- 다른 모듈이 사용해야 하는 인스턴스(예: `authGuard`)는 모듈 `index.ts`에서 named export합니다.
- 앱별 등록 방식(진입점 등록, 공용 클라이언트 주입 등)은 각 앱 문서에서 정의합니다.

---

## 7. 모듈 간 참조와 CQRS

모듈은 하나의 바운디드 컨텍스트로 봅니다. 모듈 안에서는 강하게 결합해도 되지만, 모듈 사이는 **ID로만** 연결합니다.

### 7.1 DB 관계

| 범위                                                 | 규칙                                | 예시                                                     |
| ---------------------------------------------------- | ----------------------------------- | -------------------------------------------------------- |
| 같은 모듈 안 (애그리거트 내부·모듈 내 애그리거트 간) | FK(관계) 허용                       | `organization_member.organizationId → organization.id`   |
| 다른 모듈 사이                                       | **FK 없이 ID 컬럼 + 인덱스만** 사용 | `organization_invitation.inviteeUserId` (user 모듈 참조) |

- 다른 모듈의 데이터가 존재하는지는 애플리케이션 계층에서 확인합니다. (예: 초대 생성 시 user 모듈로 대상 사용자 조회)
- 다른 모듈의 데이터가 삭제될 때의 정리(DB `onDelete: Cascade` 등이 하던 일)는 도메인 이벤트로 처리합니다. (예: `UserDeletedEvent`를 받은 모듈이 자기 데이터를 정리)
- 참조 대상이 이미 사라졌을 수 있으므로, 조회 결과를 조합할 때 대상이 없는 경우를 처리합니다.

### 7.2 Command와 Query

| 구분    | 규칙                                                                                                                                                                             |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Command | 애그리거트와 레포지토리는 다른 모듈을 **ID로만** 참조합니다. 다른 모듈 테이블과 JOIN하지 않습니다.                                                                               |
| Query   | 기본은 애플리케이션 조합(목록 조회 후 다른 모듈의 조회 기능으로 일괄 조회해 합침)입니다.                                                                                         |
| Query   | 다른 모듈 데이터 기준의 필터·정렬이 필요한 경우에만, 조회 전용 레포지토리에서 다른 모듈 테이블과 JOIN할 수 있습니다. 이때 결과는 DTO로만 반환하고 도메인 객체로 만들지 않습니다. |

### 7.3 모듈 간 코드 의존

- 현재는 다른 모듈의 `domain` 배럴(ID VO, 조회 레포지토리 인터페이스 등)을 직접 import하는 것을 허용합니다.
- **새로 추가하는 모듈 간 조회**는 사용하는 쪽 모듈의 `application/ports/`에 필요한 기능만 담은 포트를 정의하고, `infrastructure/adapters/`에서 다른 모듈을 호출하는 방식(Anti-Corruption Layer)으로 작성합니다.

### 7.4 집합 기반 불변식

"다른 행과 겹치면 안 된다"처럼 여러 애그리거트에 걸친 규칙은 애그리거트 하나로 보장할 수 없습니다.

1. 가능하면 규칙을 **애그리거트 자신의 속성 + DB unique 제약**으로 표현되도록 정의합니다. (예: 조직 `slug`의 전역 유일성)
2. 사전 검사로 일반적인 경우를 걸러내고, 동시 요청은 DB 제약이 막습니다. unique 위반은 레포지토리에서 도메인 에러로 변환합니다.
3. DB 제약으로 표현할 수 없다면 잠금을 사용하되, 잠금·검사·저장을 **하나의 레포지토리 메서드 안에** 두어 호출하는 쪽에서 빠뜨릴 수 없게 합니다.
