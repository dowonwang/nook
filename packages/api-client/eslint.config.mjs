import { createBaseConfig } from '@packages/eslint-config/base';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
  createBaseConfig({ rootDir: import.meta.dirname }),
  // Orval 생성 코드
  globalIgnores(['src/**']),
);
