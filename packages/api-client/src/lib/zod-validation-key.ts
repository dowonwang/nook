export interface ValidationKeyContext {
  schemaName: string;
  fieldPath: readonly (string | number)[];
  validator: string;
}

export function createValidationKey(context: ValidationKeyContext): string {
  const field =
    context.fieldPath.length > 0 ? context.fieldPath.join('_') : 'root';

  return [context.schemaName, field, context.validator].join('_');
}
