import { createBaseConfig } from '@packages/eslint-config/base';
import { createFsdConfig } from '@packages/eslint-config/fsd';
import { createNextConfig } from '@packages/eslint-config/next';
import { defineConfig } from 'eslint/config';

const rootDir = import.meta.dirname;

export default defineConfig(
  createBaseConfig({ rootDir }),
  createNextConfig({ rootDir }),
  createFsdConfig(),
);
