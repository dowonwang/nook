export async function bffFetcher<T>(
  url: string | URL | Request,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = (await response.json().catch(() => null)) as T;

  if (!response.ok) {
    throw new Error('요청에 실패했습니다.');
  }

  return data;
}
