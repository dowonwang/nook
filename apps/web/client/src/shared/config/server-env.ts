export const SERVER_ENV_CONFIG = {
  API_BASE_URL: process.env.API_BASE_URL as string,
} as const;

if (!SERVER_ENV_CONFIG.API_BASE_URL) {
  throw new Error('API_BASE_URL is required');
}
