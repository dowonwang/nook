import eslint from '@eslint/js';
import eslintNextPlugin from '@next/eslint-plugin-next';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { importX } from 'eslint-plugin-import-x';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          bun: true,
          project: ['apps/**/*/tsconfig.json', 'packages/**/*/tsconfig.json'],
          noWarnOnMultipleProjects: true,
        }),
      ],
    },
    rules: {
      'no-duplicate-imports': [
        'error',
        {
          allowSeparateTypeImports: true,
        },
      ],
      'import-x/no-relative-parent-imports': 'off',
      'no-restricted-imports': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: ['../**'],
        },
      ],
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
  // 공통 jsx, tsx
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {},
    settings: {},
    rules: {},
  },
  // nextjs 앱
  {
    files: ['apps/web/client/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': eslintNextPlugin,
    },
    settings: {
      next: {
        rootDir: 'web/client/',
      },
    },
    rules: {
      ...eslintNextPlugin.configs.recommended.rules,
      ...eslintNextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
  {
    files: ['packages/**/*.{js,jsx,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-restricted-imports': 'off',
    },
  },

  globalIgnores([
    '**/.next/**',
    '**/out/**',
    '**/build/**',
    '**/dist/**',
    '**/next-env.d.ts',
    '**/*.config.mjs',
  ]),
);
