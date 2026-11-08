import eslint from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { importX } from 'eslint-plugin-import-x';
import { configs as tseslintConfigs } from 'typescript-eslint';

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
        'import-x/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              ['parent', 'sibling', 'index'],
              'object',
              'type',
            ],

            pathGroups: [
              {
                pattern: '@*/**/*.css',
                group: 'builtin',
                position: 'before',
              },
              {
                pattern: '$*/**/*.css',
                group: 'builtin',
                position: 'before',
              },
              {
                pattern: '**/*.css',
                group: 'builtin',
                position: 'before',
              },
              {
                pattern: '*.css',
                group: 'builtin',
                position: 'before',
              },
              {
                pattern: './*.css',
                group: 'builtin',
                position: 'before',
              },
              {
                pattern: '../*.css',
                group: 'builtin',
                position: 'before',
              },
            ],

            pathGroupsExcludedImportTypes: [],

            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
            sortTypesGroup: false,
            warnOnUnassignedImports: true,
          },
        ],
      },
    },
    // tsconfig에 포함되지 않는 JS 파일은 타입 기반 규칙 없이 검사
    {
      files: ['**/*.{js,mjs,cjs}'],
      extends: [tseslintConfigs.disableTypeChecked],
    },

    globalIgnores([
      '**/.next/**',
      '**/out/**',
      '**/build/**',
      '**/dist/**',
      '**/next-env.d.ts',
      '**/*.config.mjs',
    ]),
  ];
}
