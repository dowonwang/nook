import { createBaseConfig } from '@packages/eslint-config/base';
import { defineConfig } from 'eslint/config';

export default defineConfig(createBaseConfig({ rootDir: import.meta.dirname }));
