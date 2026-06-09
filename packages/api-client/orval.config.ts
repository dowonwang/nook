import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:4000/openapi/json',
    },
    output: {
      mode: 'single',
      target: './src/api/index.ts',
      client: 'fetch',
      clean: true,
      formatter: 'prettier',
      indexFiles: true,
    },
  },

  schema: {
    input: {
      target: 'http://localhost:4000/openapi/json',
    },
    output: {
      mode: 'single',
      target: './src/schema/index.ts',
      client: 'zod',
      clean: true,
      formatter: 'prettier',
      indexFiles: true,
      override: {
        zod: {
          params: {
            path: './src/lib/zod-params.ts',
            name: 'zodParams',
          },
        },
      },
    },
    hooks: {
      afterAllFilesWrite: {
        command:
          'pnpm tsx --tsconfig ./tsconfig.json ./src/lib/generate-validation-i18n.ts',
        injectGeneratedDirsAndFiles: false,
      },
    },
  },
});
