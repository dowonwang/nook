import type { AuthI18nKey } from '@packages/api-client/i18n';

export const authValidationKo = {
  'validation.PostAuthSignInBody.email.email': '올바른 이메일 형식이 아닙니다.',
  'validation.PostAuthSignInBody.email.regex': '올바른 이메일 형식이 아닙니다.',
  'validation.PostAuthSignInBody.password.string': '비밀번호를 입력해주세요.',

  'validation.PostAuthSignUpBody.email.email': '올바른 이메일 형식이 아닙니다.',
  'validation.PostAuthSignUpBody.email.regex': '올바른 이메일 형식이 아닙니다.',
  'validation.PostAuthSignUpBody.name.max': '이름이 너무 깁니다.',
  'validation.PostAuthSignUpBody.name.min': '이름이 너무 짧습니다.',
  'validation.PostAuthSignUpBody.name.string': '이름을 입력해주세요.',
  'validation.PostAuthSignUpBody.password.string': '비밀번호를 입력해주세요.',
} satisfies Record<AuthI18nKey, string>;
