import { PRIVATE_ROUTE_PREFIXES } from '../config/route-scope';

import type { RouteScope } from '../model/type';

export function resolveRouteScope(pathname: string): RouteScope {
  const isPrivate = PRIVATE_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  return isPrivate ? 'private' : 'public';
}
