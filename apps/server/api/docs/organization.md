# Organization Domain Rules

본 문서는 `organization` 모듈의 도메인 규칙(불변식, 식별자, 권한)을 정의합니다.

명명 규칙과 구조는 [Server Architecture & Naming Convention](../../docs/convention.md)(서버 공통)과 [API Server Convention](./convention.md)(api 전용)을 따릅니다.

---

## 1. 식별자

조직은 두 가지 식별자를 가집니다.

| 식별자 | 용도                                                  | 규칙                     |
| ------ | ----------------------------------------------------- | ------------------------ |
| `id`   | API 경로, 모듈 간 참조, DB 관계                       | UUIDv7, 앱에서 생성      |
| `slug` | 사람이 읽는 고유 식별자, 웹 URL(`/org/detail/{slug}`) | 전체에서 유일, 변경 가능 |

- API 경로와 다른 모듈의 참조는 `id`(UUID)만 사용합니다. `slug`는 바뀔 수 있으므로 참조 키로 사용하지 않습니다.
- 웹은 상세 페이지 진입 시 `slug`로 조직을 조회한 뒤, 이후 요청은 `id`로 보냅니다.

---

## 2. 제목 (`title`)

- 화면에 표시하는 이름입니다.
- **중복을 허용합니다.** 제목에는 유일성 검사를 하지 않습니다.
- 앞뒤 공백을 제거했을 때 비어 있으면 안 됩니다. (`OrganizationTitleEmptyError`)

---

## 3. 슬러그 (`slug`)

### 3.1 형식

| 항목      | 규칙                                                                                    |
| --------- | --------------------------------------------------------------------------------------- |
| 정규화    | 항상 소문자로 저장 (`OrganizationSlugVo` 생성 시 `trim().toLowerCase()`)                |
| 허용 문자 | 영어 소문자(`a-z`), 숫자(`0-9`), 하이픈(`-`), 언더바(`_`)                               |
| 길이      | 3~39자                                                                                  |
| 앞뒤 문자 | `-`, `_`로 시작하거나 끝날 수 없음 (중간 연속 사용은 허용)                              |
| 예약어    | 두지 않음 (웹 URL이 `/org/detail/{slug}`로 접두 경로를 가지므로 라우트와 충돌하지 않음) |

```text
정규식: ^[a-z0-9](?:[a-z0-9_-]{1,37})[a-z0-9]$

Good: acme, team-2026, class_3a, my--org
Bad : ab (짧음), -acme, acme_, Acme(대문자는 소문자로 정규화 후 검증), 한글팀
```

### 3.2 유일성

- 모든 조직에서 유일합니다. DB `organization.slug`에 `@unique` 제약을 둡니다.
- 생성·변경 시 사전 중복 검사로 일반적인 경우를 걸러내고, 동시 요청은 DB unique 제약이 막습니다.
- unique 위반(Prisma `P2002`)은 레포지토리에서 `DuplicateOrganizationSlugError`(409)로 변환합니다.

### 3.3 입력과 자동 생성

- 서버는 클라이언트가 보낸 `slug`를 검증만 하고, 임의로 다른 값으로 바꾸지 않습니다.
- 웹 생성 폼에서 **slug 입력란에 포커스가 들어오면** 서버에 추천 slug와 사용 가능 여부를 조회해 안내합니다.
  - 제목이 영어(또는 slug로 변환 가능한 문자)로 되어 있으면 제목을 변환한 추천 slug를 제안합니다.
    - 소문자 변환 → 허용 문자 외에는 `-`로 치환 → 연속된 `-` 정리 → 앞뒤 `-`, `_` 제거 → 39자로 자르기
  - 변환 결과가 형식에 맞지 않으면(예: 한글 제목) 추천 없이 직접 입력을 유도합니다.
  - 추천 slug가 이미 사용 중이면 사용 중임을 알리고 사용자가 수정하도록 합니다.
- 사용 가능 여부 조회는 안내용입니다. 최종 유일성은 저장 시점의 DB 제약으로 보장합니다.

### 3.4 변경

- 조직 생성 이후에도 `slug`를 변경할 수 있습니다.
- 변경은 반드시 `OrganizationAggregate.changeSlug()`를 거치며, 형식 검증과 유일성 규칙(3.1, 3.2)을 동일하게 적용합니다.
- 이전 slug로의 리다이렉트는 제공하지 않습니다. (`id` 기반 참조만 유지되면 데이터 정합성에는 영향이 없음)

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

| 메서드  | 경로                                  | 설명                                     | 비고 |
| ------- | ------------------------------------- | ---------------------------------------- | ---- |
| `POST`  | `/organization`                       | 조직 생성 (`title`, `slug`)              | 변경 |
| `GET`   | `/organization/slug/{slug}`           | slug로 조직 조회 (웹 상세 페이지 진입용) | 추가 |
| `GET`   | `/organization/slug-suggestion`       | 제목 기반 추천 slug와 사용 가능 여부     | 추가 |
| `PATCH` | `/organization/{organizationId}/slug` | slug 변경                                | 추가 |

- 그 외 조직 관련 API는 기존처럼 `organizationId`(UUID)를 경로에 사용합니다.
- 경로와 요청·응답 형식은 구현 시 OpenAPI 스키마로 확정하고, `pnpm generate:packages`로 api-client를 재생성합니다.

---

## 7. 반영 시 정리할 항목

- 제목 중복 검사 제거: `assertCreatableTitleByUser`, `PrismaOrganizationPolicyService`, `findOrganizationIdByUserIdAndTitle`, `DuplicateOrganizationTitleError` 및 관련 i18n 키
- 기존 조직 데이터는 slug 없이 생성되었으므로 개발 DB에서 삭제 후 새로 생성 (멤버 → 초대 → 조직 순서)
