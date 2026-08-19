import type { I18N_VALIDATION_KEY } from '../../validation';

export const i18ValidationKo = {
  GetUserQueryParams_email_regex: '올바른 이메일 주소를 입력해주세요.',
  GetUserQueryParams_email_string: '올바른 이메일 주소를 입력해주세요.',

  PostAuthSignInBody_email_regex: '올바른 이메일 주소를 입력해주세요.',
  PostAuthSignInBody_email_string: '이메일을 입력해주세요.',
  PostAuthSignInBody_password_string: '비밀번호를 입력해주세요.',

  PostAuthSignUpBody_email_regex: '올바른 이메일 주소를 입력해주세요.',
  PostAuthSignUpBody_email_string: '이메일을 입력해주세요.',
  PostAuthSignUpBody_name_max: '이름은 2자 이상 20자 이하로 입력해주세요.',
  PostAuthSignUpBody_name_min: '이름은 2자 이상 20자 이하로 입력해주세요.',
  PostAuthSignUpBody_name_string: '이름을 입력해주세요.',
  PostAuthSignUpBody_password_string: '비밀번호를 입력해주세요.',
  PostAuthSignUpBody_confirmPassword_mismatch: '비밀번호가 일치하지 않습니다.',

  PostOrganizationBody_title_string: '조직명을 입력해주세요.',
  PostOrganizationBody_title_max: '조직명은 20자 미만으로 입력해주세요.',
  PostOrganizationBody_title_min: '조직명을 입력해주세요.',

  PostOrganizationByOrganizationIdInvitationsBody_role_enum:
    '유효하지 않은 조직원 권한입니다.',
  PostOrganizationByOrganizationIdInvitationsBody_email_regex:
    '올바른 이메일 주소를 입력해주세요.',
  PostOrganizationByOrganizationIdInvitationsBody_email_string:
    '올바른 이메일 주소를 입력해주세요.',
  PostOrganizationByOrganizationIdInvitationsBody_required_organization_id:
    '존재하지 않거나 유효하지 않은 조직입니다. 조직 정보를 확인해 주세요.',
} satisfies Record<I18N_VALIDATION_KEY, string>;
