import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:4000/openapi/json',
    },
    output: {
      mode: 'tags-split',
      target: './src/generated/api.ts',
      client: 'react-query',
      httpClient: 'fetch',
      clean: true,
      formatter: 'prettier',
    },
  },
});
