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
      baseUrl: 'http://localhost:4000',
      override: {
        mutator: {
          path: './src/lib/bff-fetcher.ts',
          name: 'bffFetcher',
        },
      },
    },
  },

  schema: {
    input: {
      target: 'http://localhost:4000/openapi/json',
    },
    output: {
      mode: 'tags',
      target: './src/schema',
      client: 'zod',
      clean: true,
      formatter: 'prettier',
      indexFiles: true,

      schemas: {
        path: './src/schema/models',
        type: 'zod',
      },

      operationSchemas: './src/schema/operations',

      override: {
        zod: {
          params: {
            path: './src/lib/zod-params.ts',
            name: 'zodParams',
          },
        },
      },
    },
  },
});
