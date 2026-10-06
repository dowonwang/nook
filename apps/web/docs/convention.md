# 📄 Web FSD Architecture & Naming Convention

본 문서는 웹 프로젝트의 디렉토리 구조, 파일 및 함수 명명 규칙, 그리고 FSD(Feature-Sliced Design) 아키텍처 내 서버/클라이언트 모듈 분리 규칙을 정의합니다.

---

## 1. 기본 원칙 (Core Rules)

- **디렉토리 명명**: 모든 디렉토리명은 소문자 `kebab-case`를 사용합니다.
- **진입점 (Barrel Export)**:
- **일반 / 클라이언트 모듈**: `index.ts`를 통해 외부로 내보냅니다.
- **서버 전용 모듈**: `server.js` (또는 필요시 `server.ts`)를 통해 외부로 내보냅니다.

- **Import / Export 바운더리 규칙**:
- **동일 슬라이스(Slice) 내부**: 상대 경로 (`./`, `../`) 참조를 허용합니다.
- **타 슬라이스 및 외부 참조**: 사전 정의된 Alias 경로(`$features/...`)로만 접근해야 하며, 반드시 해당 슬라이스의 진입점(`index.ts` 또는 `server.js`)을 통해서만 참조합니다.

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
│           └── server.js            # Server Barrel File (서버 전용)
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
| **Server Barrel Export**  | `server.js`      | `server.js`                        | 서버 전용 모듈 외부 노출용          |

---

### 3.2 함수 및 컴포넌트 명명 (Function & Component Naming)

파일명이 단순하더라도 코드 내부의 컴포넌트와 함수명은 **완전한 전체 맥락(Context)을 포함하도록 명확하게** 작성합니다.

- **컴포넌트**: `PascalCase` 사용
- **Custom Hook**: `camelCase` 사용 (`use` 접두사 필수)
- **일반 함수 / 서버 함수**: `camelCase` 사용 (`동사 + 명사` 형태)

```typescript
// features/organization/create/ui/form.tsx
// ✅ 컴포넌트: PascalCase (맥락을 포함한 완전한 이름)
export function OrganizationCreateForm() {
  // ...
}

// features/organization/create/api/use-create-org.ts
// ✅ Hook: camelCase (use 접두사)
export function useOrganizationCreate() {
  // ...
}

// features/organization/create/api/create-org.server.ts
// ✅ 서버 전용 함수: camelCase (동사 + 명사)
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

```javascript
// features/organization/create/server.js (서버 전용 노출)
export { createOrganizationServer } from './api/create-org.server';
```

---

### 4.2 Import 경로 규칙 예시

```typescript
// ✅ Good: 동일 슬라이스 내부 참조 (상대 경로 허용)
// features/organization/create/ui/form.tsx
import { OrganizationCreateRequest } from '../model/types';
import { useOrganizationCreate } from '../api/use-create-org';

// ✅ Good: 타 슬라이스 참조 - 클라이언트/공통 (index.ts 바운더리 참조)
// features/user/profile/ui/card.tsx
import { OrganizationCreateForm } from '$features/organization/create';

// ✅ Good: 타 슬라이스 참조 - 서버 전용 (server.js 바운더리 참조)
// app/api/org/route.ts
import { createOrganizationServer } from '$features/organization/create/server';

// ❌ Bad: 타 슬라이스를 상대 경로로 참조 금지
import { OrganizationCreateForm } from '../../../organization/create/ui/form';

// ❌ Bad: Barrel File을 거치지 않고 내부 파일 직접 참조 금지
import { createOrganizationServer } from '$features/organization/create/api/create-org.server';
```

---
