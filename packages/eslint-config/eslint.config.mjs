import { defineConfig } from 'eslint/config';

import { createBaseConfig } from './src/base.mjs';

export default defineConfig(createBaseConfig({ rootDir: import.meta.dirname }));
