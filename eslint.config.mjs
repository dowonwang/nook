import { createBaseConfig } from '@packages/eslint-config/base';
import { defineConfig } from 'eslint/config';

// 루트 파일 전용. 각 워크스페이스는 자기 eslint.config.mjs를 사용 (ESLint는 파일과 가장 가까운 설정을 찾음)
export default defineConfig(createBaseConfig({ rootDir: import.meta.dirname }));
