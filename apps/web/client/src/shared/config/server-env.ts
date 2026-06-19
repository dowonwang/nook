export const SERVER_ENV_CONFIG = {
  API_BASE_URL: process.env.API_BASE_URL as string,
  AUTH_COOKIE_SECRET: process.env.AUTH_COOKIE_SECRET as string,
} as const;

if (!SERVER_ENV_CONFIG.API_BASE_URL) {
  throw new Error('API_BASE_URL is required');
}

if (!SERVER_ENV_CONFIG.AUTH_COOKIE_SECRET) {
  throw new Error('AUTH_COOKIE_SECRET is required');
}
