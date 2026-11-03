import { SERVER_ENV_CONFIG } from '$shared/config/server';

const APP_ORIGIN = new URL(SERVER_ENV_CONFIG.APP_BASE_URL).origin;

// 제어 문자와 역슬래시는 브라우저마다 경로 해석이 달라 외부 주소로 바뀔 수 있음
// eslint-disable-next-line no-control-regex
const UNSAFE_CHARACTER_PATTERN = /[\u0000-\u001f\u007f\\]/;

// 사용자 입력으로 받은 이동 경로를 앱 내부 경로로만 제한 (오픈 리다이렉트 방지)
export function getSafeRedirectPath(value: unknown, fallback = '/') {
  if (typeof value !== 'string' || !value.startsWith('/')) {
    return fallback;
  }

  if (UNSAFE_CHARACTER_PATTERN.test(value)) {
    return fallback;
  }

  // '//evil.com'처럼 다른 origin으로 해석되는 경로 차단
  const url = new URL(value, APP_ORIGIN);

  if (url.origin !== APP_ORIGIN) {
    return fallback;
  }

  return `${url.pathname}${url.search}${url.hash}`;
}
