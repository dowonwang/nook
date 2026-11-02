import { createServerConfig } from '@packages/eslint-config/server';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  createServerConfig({ rootDir: import.meta.dirname }),
);
