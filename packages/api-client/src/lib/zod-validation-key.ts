export interface ValidationKeyContext {
  schemaName: string;
  fieldPath: readonly (string | number)[];
  validator: string;
}

export function createValidationKey(context: ValidationKeyContext): string {
  const field =
    context.fieldPath.length > 0 ? context.fieldPath.join('.') : 'root';

  return ['validation', context.schemaName, field, context.validator].join('.');
}
