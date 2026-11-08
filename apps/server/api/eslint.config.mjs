// @packages/eslint-config는 타입 선언 없는 .mjs라 에디터의 선언 파일 누락 경고(TS7016)를 끔
// @ts-nocheck
import { createServerConfig } from '@packages/eslint-config/server';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  createServerConfig({ rootDir: import.meta.dirname }),
);
