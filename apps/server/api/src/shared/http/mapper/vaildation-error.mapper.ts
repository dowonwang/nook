import { BadRequestError } from '$shared/error/common.error';

import type { ValidationError } from 'elysia';

export function VaildationErrorMapper(error: ValidationError): BadRequestError {
  const detail = error.detail('Vaildation', false);

  if (typeof detail !== 'string') {
    const errors = detail.errors;

    if (errors && Array.isArray(errors)) {
      return new BadRequestError({
        detail: errors.map(({ path, message }) => ({
          path,
          message,
        })),
      });
    }
  }

  return new BadRequestError();
}
