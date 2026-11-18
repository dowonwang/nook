import { BadRequestError } from '$shared/error';

import type { ValidationError } from 'elysia';

interface ValidationErrorDetailItem {
  path: string;
  message: string;
}

// elysia 1.4.31부터 detail()이 unknown을 반환하므로 필요한 형태인지 직접 확인
function isValidationErrorDetailItem(
  value: unknown,
): value is ValidationErrorDetailItem {
  return (
    typeof value === 'object' &&
    value !== null &&
    'path' in value &&
    typeof value.path === 'string' &&
    'message' in value &&
    typeof value.message === 'string'
  );
}

export function mapValidationError(error: ValidationError): BadRequestError {
  const detail = error.detail('Validation', false);

  if (
    typeof detail === 'object' &&
    detail !== null &&
    'errors' in detail &&
    Array.isArray(detail.errors)
  ) {
    const errors: unknown[] = detail.errors;

    return new BadRequestError({
      detail: errors
        .filter(isValidationErrorDetailItem)
        .map(({ path, message }) => ({ path, message })),
    });
  }

  return new BadRequestError();
}
