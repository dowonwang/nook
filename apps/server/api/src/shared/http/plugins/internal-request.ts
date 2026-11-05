import { timingSafeEqual } from 'node:crypto';

import { Elysia } from 'elysia';

import { ForbiddenError } from '$shared/error';
import { LOG_EVENT, LOG_MESSAGE } from '$shared/logger';

import { OPEN_API_PATH } from '../constants/openapi-path';

const SCOPE = 'internalRequestPlugin' as const;
const INTERNAL_SECRET_HEADER = 'x-internal-secret' as const;
// orval(pnpm generate:packages)이 헤더 없이 스펙을 가져가므로 OpenAPI 문서 경로는 제외
const EXCLUDED_PATH_PREFIXES = [OPEN_API_PATH.ui, OPEN_API_PATH.spec];

const internalApiSecret = process.env.INTERNAL_API_SECRET;

if (!internalApiSecret) {
  throw new Error('INTERNAL_API_SECRET is required');
}

const expectedSecret = Buffer.from(internalApiSecret);

function isValidSecret(value: string | null): boolean {
  if (!value) {
    return false;
  }

  const received = Buffer.from(value);

  return (
    received.length === expectedSecret.length &&
    timingSafeEqual(received, expectedSecret)
  );
}

// Next 서버(BFF)가 보낸 요청만 처리. 비밀값은 Next 서버와 API 서버만 알고 브라우저로는 전달되지 않음
export const internalRequestPlugin = new Elysia({
  name: 'internal-request-plugin',
}).onRequest(({ request }) => {
  const { pathname } = new URL(request.url);

  const isExcluded = EXCLUDED_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (isExcluded) {
    return;
  }

  if (!isValidSecret(request.headers.get(INTERNAL_SECRET_HEADER))) {
    throw new ForbiddenError({
      scope: SCOPE,
      event: LOG_EVENT.HTTP_INVALID_INTERNAL_SECRET,
      message: LOG_MESSAGE.HTTP_INVALID_INTERNAL_SECRET,
    });
  }
});
