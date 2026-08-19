# @web/client

Classroom의 Web Client 애플리케이션입니다.

Next.js App Router를 기반으로 구성되어 있으며, 기능과 도메인의 책임을 분리하기 위해 Feature-Sliced Design 기반의 디렉터리 구조를 사용합니다.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- TanStack Query
- Tailwind CSS
- next-intl
- Zod
- Lucide React
- dayjs

## Structure

```text
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

의존성은 가능한 한 아래 방향을 따릅니다.

```text
app
 ↓
pages
 ↓
widgets
 ↓
features
 ↓
entities
 ↓
shared
```

하위 layer가 상위 layer에 의존하지 않도록 유지합니다.

## Layers

### `app`

애플리케이션 전역 설정과 Next.js App Router entry를 관리합니다.

예:

- routing
- layout
- global providers
- global styles

### `pages`

하나의 화면을 구성하는 page-level UI를 관리합니다.

Next.js route 자체와 화면의 구현 책임을 분리하기 위해 사용합니다.

### `widgets`

여러 feature와 entity를 조합하여 만들어지는 독립적인 UI block을 관리합니다.

예:

- Header
- Sidebar
- Navigation
- Dashboard section

### `features`

사용자의 행동과 직접적으로 연결된 기능을 관리합니다.

예:

- 로그인
- 회원가입
- 조직 생성
- 조직 참여

### `entities`

비즈니스 도메인을 표현합니다.

예:

- User
- Organization
- Classroom

### `shared`

특정 비즈니스 도메인에 의존하지 않는 공용 코드를 관리합니다.

예:

- UI primitives
- API utilities
- hooks
- constants
- utilities

범용 UI는 가능하면 `@packages/ui`를 우선 사용합니다.

## Workspace Dependencies

### `@packages/api-client`

Backend OpenAPI schema로부터 생성된 API Client와 Zod schema를 사용합니다.

### `@packages/i18n`

공용 다국어 리소스를 사용합니다.

### `@packages/ui`

애플리케이션 전반에서 재사용되는 공용 UI component와 style을 사용합니다.

## Development

Repository root에서:

```bash
pnpm web/client:dev
```

또는 이 workspace에서:

```bash
pnpm dev
```

기본 Next.js development server가 시작됩니다.

## Build

```bash
pnpm build
```

## Production

```bash
pnpm start
```

## Type Check

```bash
pnpm typecheck
```

## API Client

API 관련 코드를 직접 수작업으로 중복 정의하기보다는 `@packages/api-client`에서 생성된 client와 schema를 우선 사용합니다.

API specification이 변경된 경우 repository root에서 다음 명령을 실행합니다.

```bash
pnpm generate:packages
```
