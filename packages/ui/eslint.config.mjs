import { createBaseConfig } from '@packages/eslint-config/base';
import { createReactConfig } from '@packages/eslint-config/react';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  createBaseConfig({ rootDir: import.meta.dirname }),
  createReactConfig(),
);
