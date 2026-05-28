export type SupportedRequestContentType = 'json' | 'multipart' | 'none';

export function resolveRequestContentType(
  header: Headers,
): SupportedRequestContentType | null {
  const contentType = header.get('content-type');

  if (!contentType) return 'none';

  const normalized = contentType.toLowerCase();

  if (normalized.includes('application/json')) return 'json';
  if (normalized.includes('multipart/form-data')) return 'multipart';

  return null;
}
