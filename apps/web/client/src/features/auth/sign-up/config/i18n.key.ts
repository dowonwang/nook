import type { I18N_RESPONSE_KEY } from '@packages/i18n/response';
import type { I18N_VALIDATION_KEY } from '@packages/i18n/validation';

// 비밀번호 확인 폼 유효성 검사 에러 메세지
export const SIGN_UP_CONFIRM_PASSWORD_ERROR =
  'PostAuthSignUpBody_confirmPassword_mismatch' satisfies I18N_VALIDATION_KEY;

// 회원가입 성공 후 로그인 페이지 안내 메시지
export const SIGN_UP_SUCCESS_SIGNIN_REQUIRED =
  'auth_signup_success_signin_required' satisfies I18N_RESPONSE_KEY;
