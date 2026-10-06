import type { ActionStateZodError } from './types';
import type { ZodError } from 'zod';

export function createActionStateError(error: ZodError): ActionStateZodError {
  return error.issues.map((issue) => ({
    field: issue.path,
    message: issue.message,
  }));
}
