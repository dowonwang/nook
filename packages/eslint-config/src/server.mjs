import { createBaseConfig } from './base.mjs';

/**
 * Bun 서버 앱 전용 규칙
 *
 * @param {object} options
 * @param {string} options.rootDir 서버 앱 경로 (보통 import.meta.dirname)
 */
export function createServerConfig({ rootDir }) {
  return createBaseConfig({ rootDir, resolver: { bun: true } });
}
