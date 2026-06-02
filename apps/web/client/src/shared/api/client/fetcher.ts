import {
  isApiValidationErrorResponse,
  ApiValidationError,
} from '$shared/api/client';

interface Options {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: Record<string, unknown> | FormData;
  headers?: HeadersInit;
}

export async function clientFetcher<T>(options: Options): Promise<T> {
  const headers = new Headers();
  let requestBody: BodyInit | undefined = undefined;

  if (options.body !== undefined) {
    if (options.body instanceof FormData) {
      requestBody = options.body;
    } else {
      headers.set('content-type', 'application/json');
      requestBody = JSON.stringify(options.body);
    }
  }

  const response = await fetch(options.path, {
    method: options.method ?? 'GET',
    headers,
    body: requestBody,
    credentials: 'same-origin',
  });

  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');

  const payload: unknown = isJson
    ? await response.json()
    : await response.text();

  if (response.ok) {
    return payload as T;
  }

  if (isApiValidationErrorResponse(payload)) {
    throw new ApiValidationError({
      status: response.status,
      details: payload.error.details,
    });
  }

  throw new Error(`Unhandled API error: ${response.status.toString()}`);
}
