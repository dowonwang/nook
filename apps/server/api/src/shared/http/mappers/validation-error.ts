import { BadRequestError } from '$shared/error';

import type { ValidationError } from 'elysia';

// detail()은 production에서 errors를 빼고 반환하므로 필드별 path, message는 all에서 직접 읽음
// all은 입력값(value)도 담고 있어 path, message만 골라 응답에 넣음
export function mapValidationError(error: ValidationError): BadRequestError {
  try {
    return new BadRequestError({
      detail: error.all.map(({ path, message }) => ({ path, message })),
    });
  } catch {
    // all은 검증기를 다시 실행하므로 실패하면 detail 없이 응답
    return new BadRequestError();
  }
}
