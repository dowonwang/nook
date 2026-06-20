import type { ActionStateZodError } from '$shared/api/action/type';
import type { ZodError } from 'zod';

export function createActionStateError(error: ZodError): ActionStateZodError {
  return error.issues.map((issue) => ({
    field: issue.path,
    message: issue.message,
  }));
}
