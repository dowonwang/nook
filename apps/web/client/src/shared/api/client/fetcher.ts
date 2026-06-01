import {
  isApiValidationErrorResponse,
  ApiValidationError,
} from '$shared/api/client';

interface Options {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: Record<string, unknown>;
  headers?: HeadersInit;
}

export async function clientFetcher<T>(options: Options): Promise<T> {
  const headers = new Headers();

  if (options.body !== undefined) {
    headers.set('content-type', 'application/json');
  }

  const response = await fetch(options.path, {
    method: options.method ?? 'GET',
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    credentials: 'same-origin',
  });

  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');

  const payload: unknown = isJson
    ? await response.json()
    : await response.text();

  if (isApiValidationErrorResponse(payload)) {
    throw new ApiValidationError({
      status: response.status,
      details: payload.error.details,
    });
  }

  throw new Error(`Unhandled API error: ${response.status.toString()}`);
}
