import type { I18N_RESPONSE_KEY } from '../../response';

export const i18nResponseKo = {
  // common
  common_error_BadRequestError: '잘못된 요청입니다.',
  common_error_UnauthorizedError: '사용자 인증이 필요한 서비스입니다.',
  common_error_ForbiddenError: '접근 권한이 없습니다.',
  common_error_NotFoundError: '요청한 리소를 찾을 수 없습니다.',
  common_error_ConflictError: '이미 존재하는 데이터입니다.',
  common_error_UnprocessableContent: '입력한 정보가 올바르지 않습니다.',
  common_error_InternalServerError: '일시적인 오류가 발생했습니다.',

  // auth
  auth_error_token_expired: '로그인 세션이 만료되었습니다.',
  auth_signup_success_signin_required:
    '회원가입이 완료되었습니다.\n로그인 후 서비스를 이용해 주세요.',
  auth_required_signin: '로그인 후 다시 시도해 주세요.',
  auth_error_InvaildCredentials: '로그인 정보가 올바르지 않습니다.',
  auth_error_EmailAlreadyExists:
    '이미 가입된 계정이거나 사용할 수 없는 이메일입니다.',

  // user
  user_error_UserNotFound: '존재하지 않는 사용자입니다.',

  user_error_InvalidUserEmail: '잘못된 이메일 형식입니다.',
  user_error_InvalidUserName: '이름은 2글자 이상 20글자 이하로 입력해주세요.',

  // organization
  organization_error_OrganizationAccessDenied:
    '해당 조직에 대한 접근 권한이 없습니다.',
  organization_error_DuplicateOrganizationMember:
    '이미 조직에 등록된 멤버입니다.',
  organization_error_DuplicateOrganizationTitle:
    '이미 사용 중인 조직 이름입니다.',
  organization_error_MinMemberConstraint: '사용할 수 없는 조직 이름입니다.',
  organization_error_OrganizationAdminLimitExceeded:
    '조직 관리자 최대 지정 인원을 초과했습니다.',
  organization_error_OrganizationAdminRequirement:
    '조직에는 최소 한 명의 관리자가 있어야 합니다.',
  organization_error_OrganizationNotFound:
    '조직을 찾을 수 없거나 접근 권한이 없습니다.',
  organization_error_UnaffiliatedMember:
    '해당 조직의 멤버가 아니거나 접근 권한이 없습니다.',
} satisfies Record<I18N_RESPONSE_KEY, string>;
