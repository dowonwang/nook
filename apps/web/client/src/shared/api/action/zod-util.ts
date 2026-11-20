import type { ZodError } from 'zod';
import type { ActionStateZodError } from './types';

export function createActionStateError(error: ZodError): ActionStateZodError {
  return error.issues.map((issue) => ({
    field: issue.path,
    message: issue.message,
  }));
}
