import type { I18N_VALIDATION_KEY } from '../../validation';

export const i18ValidationKo = {
  'validation.PostAuthSignInBody.email.regex':
    '올바른 이메일 주소를 입력해주세요.',
  'validation.PostAuthSignInBody.email.string': '이메일을 입력해주세요.',
  'validation.PostAuthSignInBody.password.string': '비밀번호를 입력해주세요.',

  'validation.PostAuthSignUpBody.email.regex':
    '올바른 이메일 주소를 입력해주세요.',
  'validation.PostAuthSignUpBody.email.string': '이메일을 입력해주세요.',
  'validation.PostAuthSignUpBody.name.max':
    '이름은 2자 이상 20자 이하로 입력해주세요.',
  'validation.PostAuthSignUpBody.name.min':
    '이름은 2자 이상 20자 이하로 입력해주세요.',
  'validation.PostAuthSignUpBody.name.string': '이름을 입력해주세요.',
  'validation.PostAuthSignUpBody.password.string': '비밀번호를 입력해주세요.',

  'validation.PostOrganizationAddMembersBody.members.role.enum':
    '올바른 멤버 역할을 선택해주세요.',
  'validation.PostOrganizationAddMembersBody.members.userId.regex':
    '올바른 사용자 ID를 입력해주세요.',
  'validation.PostOrganizationAddMembersBody.members.userId.uuid':
    '올바른 사용자 ID를 입력해주세요.',
  'validation.PostOrganizationAddMembersBody.organizationId.regex':
    '올바른 조직 ID를 입력해주세요.',
  'validation.PostOrganizationAddMembersBody.organizationId.uuid':
    '올바른 조직 ID를 입력해주세요.',

  'validation.PostOrganizationBody.title.string': '조직명을 입력해주세요.',
} satisfies Record<I18N_VALIDATION_KEY, string>;
