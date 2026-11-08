import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'orval';

// API 서버 env(APP_URL, OPEN_API_SPEC_PATH)를 읽어 OpenAPI 주소를 만듦. 이미 설정된 환경 변수가 우선
const API_SERVER_ENV_PATH = fileURLToPath(
  new URL('../../apps/server/api/.env', import.meta.url),
);

if (existsSync(API_SERVER_ENV_PATH)) {
  process.loadEnvFile(API_SERVER_ENV_PATH);
}

const appUrl = process.env.APP_URL;
const openApiSpecPath = process.env.OPEN_API_SPEC_PATH;

if (!appUrl || !openApiSpecPath) {
  throw new Error('Check @server/api env file');
}

const OPENAPI_URL = `${appUrl}${openApiSpecPath}`;

export default defineConfig({
  api: {
    input: {
      target: OPENAPI_URL,
    },
    output: {
      mode: 'single',
      target: './src/api/index.ts',
      client: 'fetch',
      httpClient: 'fetch',
      clean: true,
      formatter: 'prettier',
      indexFiles: true,

      // API 주소는 customFetch가 요청할 때 env(REST_API_BASE_URL)에서 읽음
      override: {
        mutator: {
          path: './src/lib/custom-fetch.ts',
          name: 'customFetch',
        },
      },
    },
  },

  schema: {
    input: {
      target: OPENAPI_URL,
    },
    output: {
      mode: 'tags',
      target: './src/schema',
      client: 'zod',
      clean: true,
      formatter: 'prettier',
      indexFiles: true,

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
