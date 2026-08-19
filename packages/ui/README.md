# @packages/ui

Classroom 애플리케이션에서 공통으로 사용하는 UI components와 styles를 관리하는 패키지입니다.

특정 비즈니스 도메인에 종속되지 않는 재사용 가능한 UI primitive를 제공하는 것을 목적으로 합니다.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- class-variance-authority
- clsx
- tailwind-merge

## Structure

```text
src/
├── components/    # Shared React components
├── lib/           # UI utilities
└── styles.css     # Shared styles
```

## Usage

### Components

```tsx
import { Button } from '@packages/ui/components/button';
```

### Utilities

```ts
import { ... } from '@packages/ui/lib/...';
```

### Styles

```ts
import '@packages/ui/styles.css';
```

## Component Scope

이 패키지에는 여러 애플리케이션 또는 여러 기능에서 재사용 가능한 UI를 배치합니다.

적합한 예:

- Button
- Input
- Dialog
- Select
- Badge
- Form primitives
- Layout primitives

다음과 같이 특정 비즈니스 도메인에 종속된 component는 application의 `entities`, `features`, `widgets` 등에 배치하는 것을 권장합니다.

```text
OrganizationCreateForm
ClassroomMemberList
UserProfileCard
```

즉,

```text
generic UI → @packages/ui
domain UI  → application
```

원칙을 따릅니다.

## Peer Dependencies

이 패키지는 다음 runtime을 consumer application에서 제공받습니다.

- Next.js
- React
- React DOM

## Type Check

```bash
pnpm typecheck
```
