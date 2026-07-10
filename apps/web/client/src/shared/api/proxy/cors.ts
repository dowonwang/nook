const ALLOWED_ORIGINS = ['http://localhost:3000'] as const;

const ALLOWED_METHODS = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS',
] as const;

const ALLOWED_HEADERS = [
  'content-type',
  'authorization',
  'x-csrf-token',
  'x-forwarded-for',
  'x-real-ip',
] as const;

export function isAllowedOrigin(
  origin: string | null,
): origin is (typeof ALLOWED_ORIGINS)[number] {
  if (!origin) return true;

  return ALLOWED_ORIGINS.includes(origin as (typeof ALLOWED_ORIGINS)[number]);
}

export function createCorsHeaders(origin: string | null) {
  const headers = new Headers();

  if (origin && isAllowedOrigin(origin)) {
    headers.set('access-control-allow-origin', origin);
    headers.set('vary', 'Origin');
  }

  headers.set('access-control-allow-methods', ALLOWED_METHODS.join(', '));
  headers.set('access-control-allow-headers', ALLOWED_HEADERS.join(', '));
  headers.set('access-control-allow-credentials', 'true');
  headers.set('access-control-max-age', '86400');

  return headers;
}
