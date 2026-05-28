export const SUPPORTED_PROXY_METHODS = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS',
] as const;

export const BODY_METHODS = ['POST', 'PUT', 'PATCH'] as const;

export const CSRF_PROTECTED_METHODS = [
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
] as const;

export type SupportedProxyMethod = (typeof SUPPORTED_PROXY_METHODS)[number];
export type BodyMethods = (typeof BODY_METHODS)[number];
export type CsrfProtectedMethods = (typeof CSRF_PROTECTED_METHODS)[number];

export function isSupportedProxyMethod(
  method: string,
): method is SupportedProxyMethod {
  return SUPPORTED_PROXY_METHODS.includes(method as SupportedProxyMethod);
}

export function canHaveRequestBody(method: string): method is BodyMethods {
  return BODY_METHODS.includes(method as BodyMethods);
}

export function shouldValidateCsrf(
  method: string,
): method is CsrfProtectedMethods {
  return CSRF_PROTECTED_METHODS.includes(method as CsrfProtectedMethods);
}
