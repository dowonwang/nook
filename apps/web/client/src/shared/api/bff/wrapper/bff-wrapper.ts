import {
  refreshAuthCookie,
  type BffHeaders,
  type CookieEffect,
} from '$shared/api/bff';
import { createBffHeaders } from '$shared/api/bff/headers/create-headers';

interface BffResponse<TData = unknown> {
  data: TData;
  status: number;
  headers: Headers;
}

interface BffRequestParams<TResponse extends BffResponse> {
  request: Request;
  authenticated?: boolean;
  call: (headers: BffHeaders) => Promise<TResponse>;
}

interface BffRequestResult<TResponse extends BffResponse> {
  result: TResponse;
  cookieEffect?: CookieEffect;
  refreshed: boolean;
}

export async function bffWrapper<TResponse extends BffResponse>({
  request,
  authenticated = false,
  call,
}: BffRequestParams<TResponse>): Promise<BffRequestResult<TResponse>> {
  const headers = await createBffHeaders(request, {
    authenticated,
  });

  const firstResult = await call(headers);

  if (!authenticated) {
    return {
      result: firstResult,
      refreshed: false,
    };
  }

  if (firstResult.status !== 401) {
    return {
      result: firstResult,
      refreshed: false,
    };
  }

  const refreshResult = await refreshAuthCookie(request);

  if (!refreshResult.refreshed) {
    return {
      refreshed: false,
      result: firstResult,
      cookieEffect: refreshResult.cookieEffect,
    };
  }

  const retryHeaders = await createBffHeaders(request, {
    authenticated: true,
  });

  const retryResult = await call(retryHeaders);

  return {
    result: retryResult,
    cookieEffect: refreshResult.cookieEffect,
    refreshed: true,
  };
}
