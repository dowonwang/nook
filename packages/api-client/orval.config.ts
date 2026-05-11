import { defineConfig } from 'orval';

// function requiredEnv(key: string): string {
//   const value = process.env[key];

//   if (typeof value === 'string' && value.length > 0) {
//     return value;
//   } else {
//     throw new Error(`.env required ${key}`);
//   }
// }

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:3000/openapi/json',
    },
    output: {
      mode: 'tags-split',
      target: './src/generated/api.ts',
      client: 'fetch',
    },
  },
});
