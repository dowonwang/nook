export const ROUTE_LOG_SCOPE = {
  '/users': 'UserController',
  '/auth': 'AuthController',
  '/organization': 'OrganizationConroller',
} as const satisfies Record<string, string>;

const sortedRouteLogScope = Object.entries(ROUTE_LOG_SCOPE).sort(
  ([a], [b]) => b.length - a.length,
);

export function getRouteLogScope(path: string): string {
  for (const [routePrefix, scope] of sortedRouteLogScope) {
    if (path.startsWith(routePrefix)) {
      return scope;
    }
  }

  return 'HTTP';
}
