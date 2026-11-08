// 생성된 fetch 클라이언트가 사용하는 요청 함수 (orval mutator)
// API 주소는 생성 시점에 고정하지 않고 요청할 때 env(REST_API_BASE_URL)에서 읽음

const NO_BODY_STATUS = [204, 205, 304];

function getApiBaseUrl(): string {
  const baseUrl = process.env.REST_API_BASE_URL;

  if (!baseUrl) {
    throw new Error('REST_API_BASE_URL is required');
  }

  return baseUrl;
}

export async function customFetch<T>(
  url: string,
  options: RequestInit,
): Promise<T> {
  const response = await fetch(new URL(url, getApiBaseUrl()), options);

  const body = NO_BODY_STATUS.includes(response.status)
    ? null
    : await response.text();

  const data: unknown = body ? JSON.parse(body) : {};

  return {
    data,
    status: response.status,
    headers: response.headers,
  } as T;
}
