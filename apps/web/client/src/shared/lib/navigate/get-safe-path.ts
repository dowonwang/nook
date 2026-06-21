const FALLBACK_PATH = '/' as const;

export function getSafePath(
  value: string | null | undefined,
  fallback: string = FALLBACK_PATH,
): string {
  if (!value) {
    return fallback;
  }

  if (!value.startsWith('/')) {
    return fallback;
  }

  if (value.startsWith('//')) {
    return fallback;
  }

  return value;
}
