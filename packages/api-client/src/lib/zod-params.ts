import type { ZodParamsContext } from 'orval';
import { createValidationKey } from './zod-validation-key';

export function zodParams(context: ZodParamsContext) {
  const key = createValidationKey({
    location: context.location,
    fieldPath: context.fieldPath,
    schemaName: context.schemaName,
    validator: context.validator,
  });

  return {
    error: key,
  };
}
