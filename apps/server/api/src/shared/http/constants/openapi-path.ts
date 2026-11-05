// OpenAPI 문서 경로. 서버 등록과 내부 요청 검사 제외에 같은 값을 사용
export const OPEN_API_PATH = {
  ui: process.env.OPEN_API_PATH ?? '/openapi',
  spec: process.env.OPEN_API_SPEC_PATH ?? '/openapi/json',
} as const;
