# Web FSD Architecture & Naming Convention

본 문서는 웹 프로젝트의 디렉토리 구조, 파일 및 함수 명명 규칙, 그리고 FSD(Feature-Sliced Design) 아키텍처 내 서버/클라이언트 모듈 분리 규칙을 정의합니다.

> 이 저장소의 문서, 스크립트, 개발 도구 설정(`.vscode` 스니펫 등)은 **macOS 개발 환경**을 기준으로 작성했습니다. Windows에서는 경로 구분자(`\`), 셸 명령, 일부 설정이 그대로 동작하지 않을 수 있습니다.

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

`apps/web/client/eslint.config.mjs`가 조립하는 `@packages/eslint-config/fsd`(`packages/eslint-config/src/fsd.mjs`)의 `no-restricted-imports` 규칙이 아래 import를 오류로 막습니다. 별도 플러그인은 쓰지 않습니다.

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

- **서버/클라이언트 분리**: 별도의 `server/` 디렉터리를 두지 않고, 서버 전용 파일명에 `*.server.ts`(컴포넌트는 `*.server.tsx`) 접미사를 붙여 구분합니다.
  - 서버 전용 로직: `next/headers`(`cookies()`, `headers()`), 서버 환경 변수(`SERVER_ENV_CONFIG`), `next-i18next/server`의 설정·리소스 로딩, Server Action(`'use server'`)처럼 브라우저 번들에 들어가면 안 되는 코드입니다.
  - Route Handler와 미들웨어의 처리 로직(`src/app/bff/api`, `src/app/api`, `src/app/middleware`)도 서버 전용입니다. 서버 함수를 가져다 쓰기만 해도 해당합니다. 단, 경로 문자열 판단처럼 서버 API와 무관한 순수 함수(`resolve-route-scope.ts` 등)는 접미사를 붙이지 않습니다.
  - 서버에서만 동작하는 서버 컴포넌트(RSC)도 `*.server.tsx`를 붙입니다. `async` 컴포넌트이거나 `getT`(`next-i18next/server`), 서버 쿼리 옵션, 쿠키 같은 서버 전용 코드를 쓰는 컴포넌트입니다. 예: `pages/<page>/ui/page.server.tsx`, `app/layouts/private.server.tsx`.
  - `'use client'`가 없더라도 서버 전용 코드를 쓰지 않아 서버와 클라이언트 양쪽에서 쓸 수 있는 컴포넌트(배지, 아이콘 등)는 접미사를 붙이지 않습니다.
  - 서버 전용 파일은 `server.ts`로만 공개합니다. `index.ts`로 공개하면 클라이언트 컴포넌트가 실수로 import할 수 있습니다.

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

FSD 특성상 폴더 깊이가 깊어지므로 **파일명은 `kebab-case`로 최대한 명확하고 간단하게** 작성합니다. 파일명 안의 점(`.`)은 `.server` 접미사에만 씁니다(`i18n.key.ts`가 아니라 `i18n-key.ts`).

| 분류                      | 파일명 규칙            | 예시                                        | 비고                                                                 |
| ------------------------- | ---------------------- | ------------------------------------------- | -------------------------------------------------------------------- |
| **UI 컴포넌트**           | `kebab-case.tsx`       | `form.tsx`, `button.tsx`                    | 상위 디렉터리 맥락으로 역할 구분                                     |
| **Custom Hook**           | `kebab-case.ts`        | `use-form.ts`, `use-create-org.ts`          | 파일명에 `use-` 접두사 필수                                          |
| **타입 정의**             | `types.ts`             | `types.ts`                                  | 해당 슬라이스 전용 타입 선언                                         |
| **설정·상수**             | `config/kebab-case.ts` | `query-key.ts`, `i18n-key.ts`, `refresh.ts` | 내용을 나타내는 이름. `config/config.ts`처럼 세그먼트 이름 반복 금지 |
| **서버 전용 로직**        | `*.server.ts`          | `create-org.server.ts`                      | `.server.ts` 접미사 필수                                             |
| **서버 컴포넌트**         | `*.server.tsx`         | `page.server.tsx`                           | `server.ts`로만 공개                                                 |
| **General Barrel Export** | `index.ts`             | `index.ts`                                  | 클라이언트 및 공통 모듈 외부 노출용                                  |
| **Server Barrel Export**  | `server.ts`            | `server.ts`                                 | 서버 전용 모듈 외부 노출용                                           |

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

---

## 5. Next.js 라우트와 서버 경계

### 5.1 라우트 파일 (`app/`)

라우트는 루트 `app/`에 두고, 화면 구성은 `src/pages`에 둡니다. 라우트 파일은 요청 값(`params`, `searchParams`)을 꺼내 page 컴포넌트에 넘기는 일만 합니다.

| 경로                     | 용도                                        | locale 접두사 |
| ------------------------ | ------------------------------------------- | ------------- |
| `app/[locale]/(public)/` | 로그인 없이 보는 페이지(홈, 로그인 등)      | 있음          |
| `app/(private)/`         | 로그인이 필요한 페이지(대시보드, 조직 등)   | 없음          |
| `app/api/[...path]/`     | BFF Route Handler                           | 없음          |
| `app/action/`            | 브라우저에서 호출하는 앱 전용 Route Handler | 없음          |

```tsx
// app/(private)/org/page.tsx
import { OrganizationHomePage } from '$pages/organization/home/server';

export default function Page({ searchParams }: Props) {
  return <OrganizationHomePage searchParams={searchParams} />;
}
```

- 라우트 파일에 UI, 문구, 데이터 조회를 직접 작성하지 않습니다. 임시 페이지라도 `src/pages`에 슬라이스를 만들고 위임합니다.
- Route Handler(`route.ts`)도 처리 로직은 `$app/<segment>/server.ts`에서 가져와 다시 내보내기만 합니다.

### 5.2 미들웨어 (`proxy.ts`)

루트 `proxy.ts`(Next 16의 middleware)는 `src/app/middleware`에 위임합니다. 경로 범위(public/private) 판단, locale redirect, 세션 갱신과 로그인 redirect를 처리합니다.

- `matcher`는 `api/`, `action/` 하위 경로와 정적 파일을 제외합니다. 이 경로의 Route Handler는 locale redirect와 세션 처리를 받지 않으므로, 필요한 검사를 핸들러 안에서 직접 합니다.
- 새 private 경로는 `src/app/middleware/config/route-scope.ts`의 `PRIVATE_ROUTE_PREFIXES`에 추가합니다.
- 세션 갱신이 거절되면(리프레시 토큰 없음, API가 갱신 거절, `SessionRefreshRejectedError`) 인증 쿠키를 지우고 private 경로는 로그인 페이지로 보냅니다. API 장애 등 그 외 이유로 갱신하지 못하면 세션 만료로 보지 않고 쿠키를 유지한 채 요청을 진행합니다(`unavailable`).

### 5.3 BFF와 요청 도구

브라우저는 백엔드를 직접 호출하지 않습니다. 모든 요청은 Next의 `/api/...`(BFF)를 거쳐 백엔드로 전달되고, BFF가 쿠키의 토큰을 붙이고 만료되면 갱신합니다.

| 호출 위치                                    | 도구            | 진입점                   |
| -------------------------------------------- | --------------- | ------------------------ |
| 클라이언트 컴포넌트, 클라이언트 쿼리         | `clientFetcher` | `$shared/api/bff`        |
| RSC, Server Action, 서버 쿼리(`*.server.ts`) | `serverFetcher` | `$shared/api/bff/server` |

- 두 도구 모두 `x-nook-request` 헤더를 붙입니다. BFF와 `app/action/` 핸들러는 `isBffRequest`로 이 헤더를 확인하고, 없거나 주소창으로 연 요청(`sec-fetch-mode: navigate`)이면 404를 반환합니다. 이 헤더 값은 비밀이 아니며, 주소창 접근과 다른 사이트의 요청(CSRF)을 막는 용도입니다.
- BFF가 백엔드로 보낼 때는 `createForwardedHeaders`가 허용 목록의 헤더와 `x-internal-secret`(서버 환경 변수 `INTERNAL_API_SECRET`)만 전달합니다. 이 값은 브라우저로 나가지 않으며, API 서버는 이 값이 맞는 요청만 처리합니다.
- `fetch('/api/...')`를 직접 쓰지 않습니다. 헤더가 빠져 404가 됩니다.
- 새 Route Handler를 `app/action/`에 추가하면 핸들러 첫 줄에서 `isBffRequest`를 검사합니다.
- BFF의 실패 응답 규칙
  - 백엔드에 연결하지 못하면 502(`common_error_InternalServerError`)를 반환합니다. 백엔드의 에러 응답은 그대로 전달하며, `error.code`는 JSON 응답일 때만 읽습니다.
  - 액세스 토큰 만료로 세션을 갱신할 때, 갱신이 거절되면 401(`auth_error_refresh_token_expired`), 그 외 실패는 502를 반환합니다.
  - 백엔드 주소는 `REST_API_BASE_URL`과 같은 origin일 때만 요청하고, 다른 origin으로 해석되면 404를 반환합니다.
- `@packages/api-client/api`의 request function은 서버 환경 변수 `REST_API_BASE_URL`로 주소를 만들므로 서버 코드(`*.server.ts`)에서만 호출합니다. 브라우저 요청은 `clientFetcher`를 씁니다.

---

## 6. 데이터 요청 패턴

### 6.1 조회: 쿼리 키와 쿼리 옵션

조회는 `api/`(요청 함수), `config/query-key.ts`(쿼리 키), `model/query.ts`·`model/query.server.ts`(쿼리 옵션)로 나눕니다.

| 대상                 | 이름 규칙                                    | 예시                                  |
| -------------------- | -------------------------------------------- | ------------------------------------- |
| 쿼리 키              | `<DOMAIN>_QUERY_KEY`                         | `SESSION_QUERY_KEY`                   |
| 목록 전체 무효화 키  | `<DOMAIN>_BASE_QUERY_KEY`                    | `MY_ORGANIZATION_LIST_BASE_QUERY_KEY` |
| 클라이언트 쿼리 옵션 | `<domain>QueryOptions`                       | `sessionQueryOptions`                 |
| 서버 쿼리 옵션       | `server<Domain>QueryOptions` (`*.server.ts`) | `serverSessionQueryOptions`           |

- `<domain>`은 조회 대상을 `수식어 + 엔티티 + List` 순서로 씁니다. 같은 조회의 쿼리 키, base 키, 쿼리 옵션은 이 단어를 그대로 공유합니다.

  | 조회           | 쿼리 키                                           | 클라이언트 / 서버 쿼리 옵션                                                                               |
  | -------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
  | 내 조직 목록   | `MY_ORGANIZATION_LIST_QUERY_KEY`                  | `myOrganizationListQueryOptions` / `serverMyOrganizationListQueryOptions`                                 |
  | 받은 초대 목록 | `RECEIVED_ORGANIZATION_INVITATION_LIST_QUERY_KEY` | `receivedOrganizationInvitationListQueryOptions` / `serverReceivedOrganizationInvitationListQueryOptions` |
  | 보낸 초대 목록 | `SENT_ORGANIZATION_INVITATION_LIST_QUERY_KEY`     | `sentOrganizationInvitationListQueryOptions`                                                              |

- 쿼리 옵션 이름에 `create`, `get` 같은 동사 접두사를 붙이지 않습니다. 서버 쿼리 옵션은 `server` 접두사만 붙입니다.
- `api/`의 조회 요청 함수도 같은 `<domain>`을 써서 `get<Domain>`(클라이언트) / `get<Domain>Server`(`*.server.ts`)로 짓습니다. 예: `getMyOrganizationList` / `getMyOrganizationListServer`, `getSession` / `getSessionServer`. `getServer...`처럼 `Server`를 앞에 두지 않습니다([3.2](#32-함수-및-컴포넌트-명명-function--component-naming)).
- 클라이언트와 서버 쿼리 옵션은 같은 쿼리 키를 씁니다. 그래야 서버에서 미리 받은 데이터를 클라이언트가 그대로 이어받습니다.
- 페이지네이션처럼 인자가 있는 키는 base 키를 펼친 뒤 인자를 붙입니다(`[...BASE, page, limit]`).
- 인자가 있는 쿼리 옵션은 같은 이름의 함수로 만듭니다(`receivedOrganizationInvitationListQueryOptions(pagination)`).

### 6.2 서버 prefetch와 hydration

RSC 페이지에서 서버 쿼리 옵션으로 미리 받고, `HydrationBoundary`로 클라이언트 컴포넌트에 넘깁니다.

```tsx
// pages/organization/receive-invitation/ui/page.server.tsx (RSC)
const queryClient = new QueryClient();
await queryClient.prefetchQuery(
  serverReceivedOrganizationInvitationListQueryOptions(pagination),
);

return (
  <HydrationBoundary state={dehydrate(queryClient)}>
    <ReceivedOrganizationInvitationList />{' '}
    {/* 클라이언트 쿼리 옵션으로 useQuery */}
  </HydrationBoundary>
);
```

### 6.3 변경: Server Action과 무효화

- 변경 요청은 해당 feature의 `api/action.server.ts`(`'use server'`)에 둡니다.
- 폼은 `useActionState`와 `$shared/api/action`의 도구를 씁니다. 상태 모양은 `ActionState<TState, TResponseError>`(`success`, `state`, `error`)입니다.
  - 입력 검증 실패: `createActionStateError(zodError)`로 필드별 에러를 만들고 `useActionFieldErrors`로 표시합니다.
  - 서버 응답 에러: 응답의 `error.code`를 그대로 담고 `useActionErrorMessage`가 i18n 키로 번역합니다.
- 클라이언트가 보낸 이전 상태(`previousState`)는 사용자가 조작할 수 있습니다. redirect 경로처럼 서버 동작에 쓰는 값은 서버에서 다시 검증합니다. 이동 경로는 `getSafeRedirectPath`(`$shared/lib/http/server`)로 앱 내부 경로만 허용합니다.
- 변경 후에는 영향을 받는 목록을 base 키로 무효화합니다. 다른 feature의 쿼리 키가 아니라 `entities`에서 공개한 키를 씁니다([0.4](#04-feature는-사용자-행동-단위)).

---

## 7. i18n

슬라이스마다 `i18n/` 폴더를 두고 그 슬라이스의 문구만 넣습니다.

**새 i18n 폴더는 스니펫으로 만듭니다.**

1. `i18n/` 폴더에 `ko.json`, `en.json`을 만들고 문구를 넣습니다(처음에는 `{}`도 됩니다).
2. `i18n/index.ts`를 만들어 **먼저 저장한 뒤**, 빈 파일에서 `i18nns`를 입력하고 스니펫을 선택합니다(`.vscode/i18n.code-snippets`).
3. 스니펫이 파일 경로로 네임스페이스 상수 이름과 값을 채웁니다. 아래 규칙대로 들어갔는지 확인합니다.
   - `src/pages/organization/home/i18n/index.ts` → `PAGES_ORGANIZATION_HOME_I18N_NAMESPACE = 'pages/organization/home'`

저장하지 않은 파일은 경로가 없어 이름이 채워지지 않으므로, 저장 후에 스니펫을 사용합니다. 스니펫 내용을 바꾸면 이 섹션의 예시도 함께 맞춥니다.

```text
pages/organization/home/i18n/
├── ko.json     # 기준 언어. 키 구조의 원본
├── en.json     # ko.json과 같은 키 구조
└── index.ts    # 키 타입 검사와 네임스페이스 상수
```

```typescript
// pages/organization/home/i18n/index.ts
import en from './en.json';

import type { DeepStringify } from '$shared/i18n';
import type ko from './ko.json';

type I18nKey = DeepStringify<typeof ko>;

en satisfies I18nKey; // en.json에 키가 빠지거나 남으면 typecheck 실패

export const PAGES_ORGANIZATION_HOME_I18N_NAMESPACE = 'pages/organization/home';
```

- 네임스페이스 값은 `src` 아래 슬라이스 경로와 같습니다. 리소스를 `<네임스페이스>/i18n/<locale>.json`에서 불러오기 때문입니다.
- 상수 이름은 `<레이어>_<슬라이스 경로>_I18N_NAMESPACE`입니다. 레이어는 폴더 이름 그대로 복수형 대문자(`ENTITIES`, `FEATURES`, `PAGES`, `WIDGETS`)를 쓰고, 경로의 `/`와 `-`는 `_`로 바꿉니다.
  - `features/organization-invitation/change-status` → `FEATURES_ORGANIZATION_INVITATION_CHANGE_STATUS_I18N_NAMESPACE`
- 서버 컴포넌트는 `getT(네임스페이스)`(`next-i18next/server`), 클라이언트 컴포넌트는 `useT(네임스페이스)`(`next-i18next/client`)를 씁니다.
- 화면에 보이는 문구는 컴포넌트에 하드코딩하지 않고 `ko.json`과 `en.json`에 함께 추가합니다.

---

## 8. UI 레이아웃 간격

- private 레이아웃의 `<main>`은 `flex-col gap-page`입니다. 페이지의 직접 자식(`HeroSection`, `Separator`, 목록, 페이지네이션) 사이 간격은 이 gap이 담당하므로, 직접 자식에 `mb-*`, `my-*`를 주지 않습니다.
- flex 컨테이너 안에서는 마진이 상쇄되지 않고 gap에 더해집니다. 페이지 컴포넌트가 Fragment를 반환하거나 `HydrationBoundary`로 감싸도 그 자식은 `<main>`의 직접 자식입니다.
- `CardBody`는 기본으로 자식 사이에 `space-y-6`을 줍니다. 다른 간격이 필요하면 `className`으로 덮어씁니다(`cn`이 tailwind-merge로 병합).
- 공통 간격 값은 `--spacing-page` 같은 토큰(`src/app/styles/global.css`)을 씁니다.
