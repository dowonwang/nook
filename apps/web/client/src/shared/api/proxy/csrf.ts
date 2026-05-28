const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HADER_NAME = 'x-csrf-token';

function parseCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';');

  for (const cookie of cookies) {
    const [rawKey, ...rawValue] = cookie.trim().split('=');

    if (rawKey === name) {
      return decodeURIComponent(rawValue.join('='));
    }
  }

  return null;
}

export function vaildateCsrfToken(headers: Headers) {
  const csrfCooke = parseCookieValue(headers.get('cookie'), CSRF_COOKIE_NAME);
  const csrfHeader = headers.get(CSRF_HADER_NAME);

  if (!csrfCooke || !csrfHeader) {
    return false;
  }

  return csrfCooke === csrfHeader;
}
