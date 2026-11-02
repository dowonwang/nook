# Web FSD Architecture & Naming Convention

본 문서는 웹 프로젝트의 디렉토리 구조, 파일 및 함수 명명 규칙, 그리고 FSD(Feature-Sliced Design) 아키텍처 내 서버/클라이언트 모듈 분리 규칙을 정의합니다.

이 프로젝트는 **FSD v2.1**을 따릅니다. 레이어 구성과 슬라이스 배치 기준은 [0. FSD v2.1 기준](#0-fsd-v21-기준)을 우선 참고합니다.

---

## 0. FSD v2.1 기준

### 0.1 레이어와 참조 방향

`app → pages → widgets → features → entities → shared` 순서이며, 각 레이어는 **자기보다 아래 레이어만** 참조합니다.

- `app`, `shared`는 슬라이스 없이 세그먼트(`api/`, `lib/`, `ui/`, `config/` 등)로만 나눕니다. 같은 레이어 안이라도 세그먼트끼리는 서로 참조할 수 있습니다.
- `pages`, `widgets`, `features`, `entities`는 슬라이스로 나누며, 같은 레이어의 다른 슬라이스를 참조하지 않습니다.
- 하위 레이어가 상위 레이어의 상태가 필요하면(예: feature가 app의 Provider 상태를 사용) 그 상태를 하위 레이어(`shared` 또는 해당 슬라이스)로 내립니다.

### 0.2 Pages first

새 코드는 **처음에는 그 코드를 쓰는 page 슬라이스 안에** 둡니다.

- 하나의 페이지에서만 쓰는 UI, 데이터 조회, 상태는 `pages/<page>/ui`, `pages/<page>/api`, `pages/<page>/model`에 둡니다.
- 두 곳 이상에서 재사용이 생기면 그때 쓰임새에 맞는 아래 레이어로 내립니다.
  - 여러 페이지에 걸친 큰 화면 블록 → `widgets`
  - 재사용되는 사용자 행동 → `features`
  - 재사용되는 도메인 데이터 형태, 조회, 표현 → `entities`
  - 도메인과 무관한 코드 → `shared` 또는 `@packages/ui`
- 미리 쪼개 두지 않습니다. 쓰는 곳이 하나뿐인 코드는 기본적으로 아래 레이어에 먼저 만들지 않습니다.

**예외: 역할이 뚜렷하면 쓰는 곳이 하나여도 아래 레이어에 둘 수 있습니다.**

| 레이어     | 허용 기준                                                   | 예시                                                                    |
| ---------- | ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| `features` | 이름만으로 드러나는 사용자 행동(생성, 상태 변경, 로그인 등) | `auth/sign-in`, `organization/create`, `organization-invitation/create` |
| `widgets`  | 여러 feature를 조합해 하나의 흐름을 이루는 독립된 화면 블록 | `create-organization-flow`                                              |
| `entities` | 서버 도메인 모델과 1:1로 대응하는 데이터 형태와 표현        | `user`                                                                  |

- 예외는 역할을 기준으로 판단합니다. 한 페이지에서만 쓰는 단순 표시 UI, 조회, 화면 상태는 예외가 아니며 page에 둡니다.
- 판단이 애매하면 page에 두고, 재사용이 생길 때 내립니다.

### 0.3 같은 레이어 교차 참조 금지와 `@x` 예외

같은 레이어 슬라이스끼리는 참조하지 않는 것이 원칙입니다. 필요해지면 다음 순서로 해결합니다.

1. **상위 레이어에서 조합**: 두 슬라이스를 함께 쓰는 쪽(page, widget)에서 조립하고, 하위 슬라이스는 `children`/슬롯 prop으로 받습니다.
2. **하위 레이어로 이동**: 두 슬라이스가 공유하는 것(타입, 쿼리 키 등)을 아래 레이어로 내립니다.
3. **슬라이스 합치기**: 늘 함께 바뀌는 슬라이스라면 하나로 합칩니다.
4. **`@x` 교차 참조**: 엔티티 간 관계처럼 위 방법이 맞지 않을 때에만 `entities` 레이어에서 사용합니다. ([4.3 교차 참조 예시](#43-같은-레이어-교차-참조-x))

### 0.4 Feature는 사용자 행동 단위

feature 슬라이스는 **사용자가 하는 행동 하나**(생성, 수정, 상태 변경, 로그인, 테마 전환 등)를 나타냅니다.

- 이름은 행동을 드러냅니다: `organization/create`, `organization-invitation/change-status`, `auth/sign-in`.
- 데이터를 보여주기만 하는 목록/상세 조회는 feature가 아닙니다. 조회는 `entities`(재사용될 때) 또는 `pages`(한 페이지에서만 쓸 때)에 둡니다.
- 행동 결과로 다른 데이터를 갱신해야 하면(쿼리 무효화) 그 데이터의 쿼리 키를 `entities`에서 가져옵니다. 다른 feature의 쿼리 키를 참조하지 않습니다.

### 0.5 API 요청을 두는 위치

| 위치                    | 두는 요청                                             | 예시                                                 |
| ----------------------- | ----------------------------------------------------- | ---------------------------------------------------- |
| `entities/<entity>/api` | 여러 곳에서 재사용하는 조회와 그 쿼리 키, 쿼리 옵션   | 세션 조회(`entities/session`)                        |
| `features/<action>/api` | 그 행동에 해당하는 변경 요청(Server Action, mutation) | 조직 생성, 초대 상태 변경                            |
| `pages/<page>/api`      | 그 페이지에서만 쓰는 조회                             | slug로 조직 조회(`pages/organization/detail`)        |
| `shared/api`            | 도메인과 무관한 요청 도구                             | `clientFetcher`, `serverFetcher`, Server Action 빌더 |

- 처음에는 `pages/<page>/api`에 두고, 다른 페이지나 feature에서도 필요해지면 `entities/<entity>/api`로 내립니다.
- 쿼리 키는 그 쿼리 옵션과 같은 슬라이스에 둡니다. 다른 슬라이스가 무효화에 쓰려면 해당 슬라이스 진입점에서 공개합니다.

### 0.6 자동 검사 (ESLint)

`apps/web/client/eslint.config.mjs`가 조립하는 `@packages/eslint-config/fsd`(`packages/eslint-config/fsd.mjs`)의 `no-restricted-imports` 규칙이 아래 import를 오류로 막습니다. 별도 플러그인은 쓰지 않습니다.

| 검사                     | 방식                                                                                                                             |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| 진입점 우회              | alias 경로에 세그먼트 이름(`ui`, `api`, `model`, `lib`, `config`, `i18n`)이 들어가면 차단, `$shared`의 `*.server` 직접 참조 차단 |
| 레이어 방향              | 레이어 폴더별로 상위 레이어 alias 차단                                                                                           |
| 같은 레이어 교차 참조    | 레이어 폴더별로 같은 레이어 alias 차단. `entities`만 `@x` 경로 허용                                                              |
| 자기 슬라이스 alias 참조 | 같은 레이어 alias 차단에 함께 걸림                                                                                               |
| Next 라우트 파일         | 루트 `app/`, `proxy.ts`는 `$app`, `$pages`, `$shared`만 참조                                                                     |

- 이 검사는 "슬라이스 안에서는 상대 경로만 쓴다"는 규칙을 전제로 합니다. 같은 레이어 alias는 곧 다른 슬라이스 참조이기 때문입니다.
- 검사하지 못하는 것: 상대 경로로 슬라이스 밖에 나가는 import(`../../other-slice`), `@x/<이름>`이 실제 참조하는 슬라이스와 맞는지 여부. 리뷰에서 확인합니다.

---

## 1. 기본 원칙 (Core Rules)

- **디렉토리 명명**: 모든 디렉토리명은 소문자 `kebab-case`를 사용합니다.
- **진입점 (Barrel Export)**:
- **일반 / 클라이언트 모듈**: `index.ts`를 통해 외부로 내보냅니다.
- **서버 전용 모듈**: `server.ts`를 통해 외부로 내보냅니다.

- **Import / Export 바운더리 규칙**:
- **동일 슬라이스(Slice) 내부**: 상대 경로 (`./`, `../`)로 참조합니다. 자기 슬라이스를 Alias(`$widgets/sidebar/...`)나 자기 진입점으로 참조하지 않습니다(순환 참조 위험).
- **타 슬라이스 및 외부 참조**: 사전 정의된 Alias 경로(`$features/...`)로만 접근해야 하며, 반드시 해당 슬라이스의 진입점(`index.ts` 또는 `server.ts`)을 통해서만 참조합니다.
- **같은 레이어 교차 참조**: 같은 레이어의 다른 슬라이스는 원칙적으로 참조하지 않습니다. 엔티티 간 관계처럼 꼭 필요한 경우에만, 참조되는 슬라이스에 `@x/<참조하는 슬라이스>.ts` 교차 참조 진입점을 만들어 필요한 것만 공개하고 그 진입점으로만 참조합니다. ([4.3 교차 참조 예시](#43-같은-레이어-교차-참조-x))

- **서버/클라이언트 분리**: 별도의 `server/` 디렉터리를 두지 않고, 서버 전용 로직 파일명에 `*.server.ts` 접미사를 붙여 구분합니다.

---

## 2. FSD 계층 및 디렉토리 구조

```text
src/
├── app/
├── pages/
├── widgets/
├── features/
│   └── organization/                # Feature 단위 (kebab-case)
│       └── create/                  # Sub-feature / Action (kebab-case)
│           ├── ui/
│           │   └── form.tsx         # 파일명은 단순하게 유지
│           ├── api/
│           │   ├── fetch-org.server.ts # 서버 전용 로직 (.server.ts)
│           │   └── use-create-org.ts   # 클라이언트 전용 Hook
│           ├── model/
│           │   └── types.ts         # 타입 전용 정의 파일
│           ├── index.ts             # General Barrel File (클라이언트/공통)
│           └── server.ts            # Server Barrel File (서버 전용)
└── shared/

```

---

## 3. 파일 및 코드 명명 규칙

### 3.1 파일 명명 (File Naming)

FSD 특성상 폴더 깊이가 깊어지므로 **파일명은 `kebab-case`로 최대한 명확하고 간단하게** 작성합니다.

| 분류                      | 파일명 규칙      | 예시                               | 비고                                |
| ------------------------- | ---------------- | ---------------------------------- | ----------------------------------- |
| **UI 컴포넌트**           | `kebab-case.tsx` | `form.tsx`, `button.tsx`           | 상위 디렉터리 맥락으로 역할 구분    |
| **Custom Hook**           | `kebab-case.ts`  | `use-form.ts`, `use-create-org.ts` | 파일명에 `use-` 접두사 필수         |
| **타입 정의**             | `types.ts`       | `types.ts`                         | 해당 슬라이스 전용 타입 선언        |
| **서버 전용 로직**        | `*.server.ts`    | `create-org.server.ts`             | `.server.ts` 접미사 필수            |
| **General Barrel Export** | `index.ts`       | `index.ts`                         | 클라이언트 및 공통 모듈 외부 노출용 |
| **Server Barrel Export**  | `server.ts`      | `server.ts`                        | 서버 전용 모듈 외부 노출용          |

---

### 3.2 함수 및 컴포넌트 명명 (Function & Component Naming)

파일명이 단순하더라도 코드 내부의 컴포넌트와 함수명은 **완전한 전체 맥락(Context)을 포함하도록 명확하게** 작성합니다.

- **컴포넌트**: `PascalCase` 사용
- **Custom Hook**: `camelCase` 사용 (`use` 접두사 필수)
- **일반 함수 / 서버 함수**: `camelCase` 사용 (`동사 + 명사` 형태)

```typescript
// features/organization/create/ui/form.tsx
// 컴포넌트: PascalCase (맥락을 포함한 완전한 이름)
export function OrganizationCreateForm() {
  // ...
}

// features/organization/create/api/use-create-org.ts
// Hook: camelCase (use 접두사)
export function useOrganizationCreate() {
  // ...
}

// features/organization/create/api/create-org.server.ts
// 서버 전용 함수: camelCase (동사 + 명사)
export async function createOrganizationServer(data: CreateOrgDto) {
  // ...
}
```

---

### 3.3 타입 정의 (`types.ts`)

해당 슬라이스의 타입 및 인터페이스는 `types.ts` 내에 선언하며 `PascalCase`를 사용합니다.

```typescript
// features/organization/create/model/types.ts

export interface OrganizationCreateRequest {
  name: string;
  code: string;
}

export type OrganizationCreateStatus = 'idle' | 'loading' | 'success' | 'error';
```

---

## 4. Barrel Export & Import 가이드

### 4.1 Barrel Export 작성 예시

```typescript
// features/organization/create/index.ts (클라이언트 / 공통 노출)
export { OrganizationCreateForm } from './ui/form';
export { useOrganizationCreate } from './api/use-create-org';
export type * from './model/types';
```

```typescript
// features/organization/create/server.ts (서버 전용 노출)
export { createOrganizationServer } from './api/create-org.server';
```

---

### 4.2 Import 경로 규칙 예시

```typescript
// Good: 동일 슬라이스 내부 참조 (상대 경로 허용)
// features/organization/create/ui/form.tsx
import { OrganizationCreateRequest } from '../model/types';
import { useOrganizationCreate } from '../api/use-create-org';

// Good: 상위 레이어에서 하위 레이어 참조 - 클라이언트/공통 (index.ts 바운더리 참조)
// widgets/create-organization-flow/ui/content.tsx
import { OrganizationCreateForm } from '$features/organization/create';

// Good: 타 슬라이스 참조 - 서버 전용 (server.ts 바운더리 참조)
// app/api/org/route.ts
import { createOrganizationServer } from '$features/organization/create/server';

// Bad: 타 슬라이스를 상대 경로로 참조 금지
import { OrganizationCreateForm } from '../../../organization/create/ui/form';

// Bad: Barrel File을 거치지 않고 내부 파일 직접 참조 금지
import { createOrganizationServer } from '$features/organization/create/api/create-org.server';
```

### 4.3 같은 레이어 교차 참조 (`@x`)

같은 레이어의 슬라이스끼리는 참조하지 않는 것이 원칙입니다. 엔티티 간 관계(예: 조직이 멤버 역할을 참조)처럼 꼭 필요한 경우에만, **참조되는 슬라이스**에 `@x/<참조하는 슬라이스>.ts` 파일을 만들어 그 슬라이스에 필요한 것만 공개합니다.

```text
entities/
├── organization/
│   └── model/types.ts              # organization-member의 @x 진입점으로만 참조
└── organization-member/
    ├── @x/
    │   └── organization.ts         # entities/organization 전용 교차 참조 진입점
    ├── model/types.ts
    └── index.ts
```

```typescript
// entities/organization-member/@x/organization.ts
export type { OrganizationMemberRole } from '../model/types';

// Good: entities/organization/model/types.ts
import type { OrganizationMemberRole } from '$entities/organization-member/@x/organization';

// Bad: 같은 레이어 슬라이스의 일반 진입점(index.ts)을 직접 참조
import type { OrganizationMemberRole } from '$entities/organization-member';
```

- `@x`는 `entities` 레이어에서만 사용합니다. `features`, `widgets`, `pages`에서는 [0.3](#03-같은-레이어-교차-참조-금지와-x-예외)의 다른 방법(상위 레이어 조합, 하위 레이어 이동, 슬라이스 합치기)으로 해결합니다.
- `@x` 진입점에는 해당 슬라이스가 실제로 쓰는 것만 공개합니다.
- 교차 참조가 많아지면 두 슬라이스를 하나로 합치는 것을 검토합니다.

---
