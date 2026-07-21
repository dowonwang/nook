export const SERVER_ENV_CONFIG = {
  REST_API_BASE_URL: process.env.REST_API_BASE_URL as string,
  APP_BASE_URL: process.env.APP_BASE_URL as string,
  AUTH_COOKIE_SECRET: process.env.AUTH_COOKIE_SECRET as string,
} as const;

if (!SERVER_ENV_CONFIG.REST_API_BASE_URL) {
  throw new Error('REST_API_BASE_URL is required');
}

if (!SERVER_ENV_CONFIG.APP_BASE_URL) {
  throw new Error('APP_BASE_URL is required');
}

if (!SERVER_ENV_CONFIG.AUTH_COOKIE_SECRET) {
  throw new Error('AUTH_COOKIE_SECRET is required');
}
