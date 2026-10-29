# Organization Domain Rules

본 문서는 `organization` 모듈의 도메인 규칙(불변식, 식별자, 권한)을 정의합니다.

명명 규칙과 구조는 [Server Architecture & Naming Convention](../../docs/convention.md)(서버 공통)과 [API Server Convention](./convention.md)(api 전용)을 따릅니다.

---

## 1. 식별자

조직은 두 가지 식별자를 가집니다.

| 식별자 | 용도                                           | 규칙                                    |
| ------ | ---------------------------------------------- | --------------------------------------- |
| `id`   | API 경로, 모듈 간 참조, DB 관계                | UUIDv7, 앱에서 생성                     |
| `slug` | 공유용 짧은 주소, 웹 URL(`/org/detail/{slug}`) | 시스템이 생성, 전체에서 유일, 변경 불가 |

- API 경로와 다른 모듈의 참조는 `id`(UUID)를 사용합니다. `slug`는 웹 주소를 짧게 만들기 위한 값입니다.
- 웹은 상세 페이지 진입 시 `slug`로 조직을 조회한 뒤, 이후 요청은 `id`로 보냅니다.

---

## 2. 제목 (`title`)

- 화면에 표시하는 이름입니다.
- **중복을 허용합니다.** 제목에는 유일성 검사를 하지 않습니다.
- 앞뒤 공백을 제거했을 때 비어 있으면 안 됩니다. (`OrganizationTitleEmptyError`)

---

## 3. 슬러그 (`slug`)

조직의 공유용 짧은 주소입니다. 사용자가 입력하지 않고 **시스템이 생성**합니다. 이름 선점 문제가 없고, 한 번 만든 주소는 바뀌지 않습니다.

### 3.1 형식

| 항목      | 규칙                                                                               |
| --------- | ---------------------------------------------------------------------------------- |
| 허용 문자 | 영어 소문자(`a-z`), 숫자(`0-9`)                                                    |
| 길이      | 정확히 10자 (36¹⁰ ≈ 3.6조 가지)                                                    |
| 정규화    | 외부 입력(URL 등)은 `trim().toLowerCase()` 후 검증                                 |
| 예약어    | 없음 (웹 URL이 `/org/detail/{slug}`로 접두 경로를 가지므로 라우트와 충돌하지 않음) |

```text
정규식: ^[a-z0-9]{10}$

예시: 0ths893ybl, k3x9a7qm2p
```

### 3.2 생성

- `OrganizationSlugVo.generate()`가 `crypto.getRandomValues` 기반 무작위 값으로 생성합니다. 모듈로 편향을 막기 위해 문자 수의 배수를 넘는 바이트는 버립니다.
- UUIDv7 `id`를 잘라 쓰지 않습니다. UUIDv7은 앞부분이 생성 시각이라, 잘라 쓰면 비슷한 시각에 만든 조직끼리 겹치고 순서를 추측할 수 있기 때문입니다.

### 3.3 유일성

- 모든 조직에서 유일합니다. DB `organization.slug`에 `@unique` 제약을 둡니다.
- unique 위반(Prisma `P2002`)은 레포지토리에서 `DuplicateOrganizationSlugError`로 변환합니다.
- 조직 생성 핸들러는 slug 충돌 시 새 slug로 **최대 3번** 시도하고, 그래도 실패하면 `DuplicateOrganizationSlugError`(409)를 반환합니다.

### 3.4 변경과 조회

- `slug`는 변경할 수 없습니다.
- slug로 조회할 때 형식에 맞지 않는 값이면 존재할 수 없는 조직이므로 `OrganizationNotFoundError`(404)로 응답합니다.
- 소속되지 않은 조직도 존재 여부를 드러내지 않도록 같은 404로 응답합니다.

---

## 4. 권한과 멤버

### 4.1 역할

| 역할         | 순위 | 초대 가능 | 부여 가능한 역할          |
| ------------ | ---- | --------- | ------------------------- |
| `ADMIN`      | 3    | O         | ADMIN, MAINTAINER, MEMBER |
| `MAINTAINER` | 2    | O         | MAINTAINER, MEMBER        |
| `MEMBER`     | 1    | X         | -                         |

- 자신보다 높은 역할은 부여할 수 없습니다. (`OrganizationMemberRoleVo.canGrant`)

### 4.2 불변식

- 조직에는 **ADMIN이 최소 1명** 있어야 합니다. (`OrganizationAdminRequirementError`)
- 조직에는 멤버가 최소 1명 있어야 합니다. (`OrganizationMinMemberConstraintError`)
- 같은 사용자는 한 조직에 한 번만 소속됩니다. (`DuplicateOrganizationMemberError`, DB `@@unique([organizationId, userId])`)
- 역할 변경·강등·탈퇴·권한 이전 기능은 반드시 `OrganizationAggregate`의 메서드를 거쳐 위 불변식을 검사해야 합니다. 마지막 ADMIN은 다른 멤버를 ADMIN으로 만든 뒤에만 강등되거나 탈퇴할 수 있습니다.

---

## 5. 초대

- 초대는 7일 후 만료됩니다.
- 같은 조직·같은 사용자에게 **대기 중이면서 만료되지 않은** 초대가 있으면 새 초대를 만들 수 없습니다. (`existsActiveInvitation`)
- 초대 상태 변경(수락·취소·거절)은 저장소의 초대가 아직 `PENDING`일 때만 반영됩니다. 동시 요청 중 하나만 성공하고, 나머지는 `InvalidOrganizationInvitationStatusError`를 받습니다.
- 수락 시 상태 변경과 멤버 추가는 하나의 트랜잭션으로 처리합니다.

---

## 6. API 개요

| 메서드 | 경로                        | 설명                                                        |
| ------ | --------------------------- | ----------------------------------------------------------- |
| `POST` | `/organization`             | 조직 생성. 요청은 `title`만 받고, 응답에 생성된 `slug` 포함 |
| `GET`  | `/organization`             | 내 조직 목록. 각 항목에 `slug` 포함                         |
| `GET`  | `/organization/slug/{slug}` | slug로 조직 조회 (웹 상세 페이지 진입용, 멤버만)            |

- 그 외 조직 관련 API는 `organizationId`(UUID)를 경로에 사용합니다.
- 요청·응답 형식을 바꾸면 `pnpm generate:packages`로 api-client를 재생성합니다.
