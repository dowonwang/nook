import reactHooks from 'eslint-plugin-react-hooks';

/**
 * React 코드 공통 규칙 (hooks 규칙 + React Compiler 기반 검사)
 */
export function createReactConfig() {
  return [
    {
      files: ['**/*.{jsx,tsx,ts}'],
      ...reactHooks.configs.flat.recommended,
    },
  ];
}
