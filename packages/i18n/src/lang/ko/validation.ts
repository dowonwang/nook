import type { I18N_VALIDATION_KEY } from '../../validation';

export const i18ValidationKo = {
  PostAuthSignInBody_email_regex: '올바른 이메일 주소를 입력해주세요.',
  PostAuthSignInBody_email_string: '이메일을 입력해주세요.',
  PostAuthSignInBody_password_string: '비밀번호를 입력해주세요.',

  PostAuthSignUpBody_email_regex: '올바른 이메일 주소를 입력해주세요.',
  PostAuthSignUpBody_email_string: '이메일을 입력해주세요.',
  PostAuthSignUpBody_name_max: '이름은 2자 이상 20자 이하로 입력해주세요.',
  PostAuthSignUpBody_name_min: '이름은 2자 이상 20자 이하로 입력해주세요.',
  PostAuthSignUpBody_name_string: '이름을 입력해주세요.',
  PostAuthSignUpBody_password_string: '비밀번호를 입력해주세요.',

  PostOrganizationAddMembersBody_members_role_enum:
    '올바른 멤버 역할을 선택해주세요.',
  PostOrganizationAddMembersBody_members_userId_regex:
    '올바른 사용자 ID를 입력해주세요.',
  PostOrganizationAddMembersBody_members_userId_uuid:
    '올바른 사용자 ID를 입력해주세요.',
  PostOrganizationAddMembersBody_organizationId_regex:
    '올바른 조직 ID를 입력해주세요.',
  PostOrganizationAddMembersBody_organizationId_uuid:
    '올바른 조직 ID를 입력해주세요.',

  PostOrganizationBody_title_string: '조직명을 입력해주세요.',
} satisfies Record<I18N_VALIDATION_KEY, string>;
