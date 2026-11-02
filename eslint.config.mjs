// @packages/eslint-config는 타입 선언 없는 .mjs라 에디터의 선언 파일 누락 경고(TS7016)를 끔
// @ts-nocheck
import { createBaseConfig } from '@packages/eslint-config/base';
import { defineConfig } from 'eslint/config';

// 루트 파일 전용. 각 워크스페이스는 자기 eslint.config.mjs를 사용 (ESLint는 파일과 가장 가까운 설정을 찾음)
export default defineConfig(createBaseConfig({ rootDir: import.meta.dirname }));
