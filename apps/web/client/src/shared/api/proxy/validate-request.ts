import { resolveRequestContentType } from './content-type';
import { isAllowedOrigin } from './cors';
import { vaildateCsrfToken } from './csrf';
import {
  canHaveRequestBody,
  isSupportedProxyMethod,
  shouldValidateCsrf,
} from './methods';

interface Success {
  ok: true;
  method: string;
  contentType: 'json' | 'multipart' | 'none';
}

interface Fail {
  ok: false;
  status: 403 | 405 | 415;
  message: string;
}

export type RequestValidationResult = Success | Fail;

export function vaildateRequest(request: Request): RequestValidationResult {
  const { method, headers } = request;
  const origin = headers.get('origin');

  if (!isAllowedOrigin(origin)) {
    return {
      ok: false,
      status: 403,
      message: 'CORS origin not allowed',
    };
  }

  if (!isSupportedProxyMethod(method)) {
    return {
      ok: false,
      status: 405,
      message: 'Method not allowed',
    };
  }

  if (method === 'OPTIONS') {
    return {
      ok: true,
      method,
      contentType: 'none',
    };
  }

  if (shouldValidateCsrf(method) && !vaildateCsrfToken(headers)) {
    return {
      ok: false,
      status: 403,
      message: 'Invalid CSRF token',
    };
  }

  if (!canHaveRequestBody(method)) {
    return {
      ok: true,
      method,
      contentType: 'none',
    };
  }

  const contentType = resolveRequestContentType(headers);

  if (contentType === null || contentType === 'none') {
    return {
      ok: false,
      status: 415,
      message: 'Unsupported media type',
    };
  }

  return {
    ok: true,
    method,
    contentType,
  };
}
