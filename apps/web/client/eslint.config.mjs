// @packages/eslint-config는 타입 선언 없는 .mjs라 에디터의 선언 파일 누락 경고(TS7016)를 끔
// @ts-nocheck
import { createBaseConfig } from '@packages/eslint-config/base';
import { createFsdConfig } from '@packages/eslint-config/fsd';
import { createNextConfig } from '@packages/eslint-config/next';
import { createReactConfig } from '@packages/eslint-config/react';
import { defineConfig } from 'eslint/config';

const rootDir = import.meta.dirname;

export default defineConfig(
  createBaseConfig({ rootDir }),
  createReactConfig(),
  createNextConfig({ rootDir }),
  createFsdConfig(),
);
