import eslintNextPlugin from '@next/eslint-plugin-next';

// CJS 모듈이라 named import(configs)가 런타임에 동작하지 않음
// eslint-disable-next-line import-x/no-named-as-default-member
const nextConfigs = eslintNextPlugin.configs;

/**
 * Next.js 앱 전용 규칙
 *
 * @param {object} options
 * @param {string} options.rootDir Next 앱 경로 (보통 import.meta.dirname)
 */
export function createNextConfig({ rootDir }) {
  return [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: {
        '@next/next': eslintNextPlugin,
      },
      settings: {
        next: {
          rootDir,
        },
      },
      rules: {
        ...nextConfigs.recommended.rules,
        ...nextConfigs['core-web-vitals'].rules,
        '@next/next/no-html-link-for-pages': 'off',
      },
    },
  ];
}
