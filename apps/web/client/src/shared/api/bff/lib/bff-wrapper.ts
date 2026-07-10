import { createBffHeaders } from '$shared/api/bff/headers/create-headers';
import {
  refreshAuthCookie,
  type BffHeaders,
  type CookieEffect,
} from '$shared/api/bff/index.server';

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

  const { refreshed, cookieEffect, accessToken } =
    await refreshAuthCookie(request);

  if (!refreshed) {
    return {
      refreshed: false,
      result: firstResult,
      cookieEffect,
    };
  }

  const retryHeaders = await createBffHeaders(request, {
    authenticated: true,
    accessToken,
  });

  const retryResult = await call(retryHeaders);

  return {
    result: retryResult,
    refreshed: true,
    cookieEffect,
  };
}
