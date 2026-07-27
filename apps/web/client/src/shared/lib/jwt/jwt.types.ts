export interface JwtPayload {
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

export interface IsTokenExpiredOptions {
  refreshBeforeSeconds?: number;
  now?: number;
}
