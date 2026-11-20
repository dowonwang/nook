import { existsSync } from 'node:fs';
import path from 'node:path';

import eslint from '@eslint/js';
import { globalIgnores, includeIgnoreFile } from 'eslint/config';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { importX } from 'eslint-plugin-import-x';
import { configs as tseslintConfigs } from 'typescript-eslint';

import { createImportOrderRule } from './import-order.mjs';

/**
 * rootDir부터 저장소 루트(.git이 있는 디렉터리)까지 올라가며 .gitignore 경로를 모음
 * worktree에서는 .git이 파일이지만 existsSync로 똑같이 찾음
 *
 * @param {string} rootDir
 * @returns {string[]}
 */
function findGitignoreFiles(rootDir) {
  const files = [];

  for (let dir = rootDir; ; dir = path.dirname(dir)) {
    const gitignore = path.join(dir, '.gitignore');
    if (existsSync(gitignore)) {
      files.push(gitignore);
    }
    if (existsSync(path.join(dir, '.git')) || path.dirname(dir) === dir) {
      return files;
    }
  }
}

/**
 * 모든 워크스페이스가 공유하는 TypeScript / import 규칙
 *
 * @param {object} options
 * @param {string} options.rootDir 설정 파일이 있는 워크스페이스 경로 (보통 import.meta.dirname)
 * @param {object} [options.resolver] eslint-import-resolver-typescript 추가 옵션
 */
export function createBaseConfig({ rootDir, resolver = {} }) {
  return [
    eslint.configs.recommended,
    tseslintConfigs.strictTypeChecked,
    importX.flatConfigs.recommended,
    importX.flatConfigs.typescript,

    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: rootDir,
        },
      },
      settings: {
        'import-x/resolver-next': [
          createTypeScriptImportResolver({
            project: rootDir,
            ...resolver,
          }),
        ],
      },
      rules: {
        'import-x/no-cycle': [
          'error',
          {
            ignoreExternal: true,
          },
        ],
        'no-duplicate-imports': [
          'error',
          {
            allowSeparateTypeImports: true,
          },
        ],
        'import-x/no-relative-parent-imports': 'off',
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            fixStyle: 'separate-type-imports',
            prefer: 'type-imports',
          },
        ],
        '@typescript-eslint/consistent-type-exports': 'error',
        // 레이어 순서는 fsd, ddd 설정이 덮어씀
        'import-x/order': createImportOrderRule(),
      },
    },
    // tsconfig에 포함되지 않는 JS 파일은 타입 기반 규칙 없이 검사
    {
      files: ['**/*.{js,mjs,cjs}'],
      extends: [tseslintConfigs.disableTypeChecked],
    },

    // git이 무시하는 파일(빌드 결과물, 생성 코드 등)은 검사하지 않음. 패턴은 각 .gitignore 위치 기준으로 해석
    ...includeIgnoreFile(findGitignoreFiles(rootDir), {
      gitignoreResolution: true,
    }),
    // .gitignore에 없는 ESLint 전용 제외 항목
    globalIgnores(['**/*.config.mjs']),
  ];
}
