export function findErrorCode(body: unknown): string | null {
  if (
    body &&
    typeof body === 'object' &&
    'error' in body &&
    typeof body.error === 'object' &&
    body.error &&
    'code' in body.error &&
    typeof body.error.code === 'string'
  ) {
    return body.error.code;
  }

  return null;
}
