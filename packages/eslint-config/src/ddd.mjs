// DDD 모듈 구조 import 규칙 (apps/server/docs/convention.md 5장)

import { createImportOrderRule } from './import-order.mjs';

// import 순서의 레이어 블록: 모듈 → shared → error (블록 사이는 빈 줄)

// 상위 레이어 → 하위 레이어. 모듈 배럴(DI 조립)은 모든 계층을 참조하므로 맨 앞
const DDD_MODULE_IMPORT_ORDER = [
  '$modules/*',
  '$modules/*/presentation{,/**}',
  '$modules/*/infrastructure{,/**}',
  '$modules/*/application{,/**}',
  '$modules/*/domain{,/**}',
];

const DDD_SHARED_IMPORT_ORDER = ['$shared/**'];

// 모듈 error와 $shared/error를 한 블록으로 모음
const DDD_ERROR_IMPORT_ORDER = [
  '$modules/*/error{,/**}',
  '$shared/error{,/**}',
];

/**
 * $modules/<module>/<layer> 구조를 쓰는 서버 앱 전용 규칙
 */
export function createDddConfig() {
  return [
    {
      rules: {
        'import-x/order': createImportOrderRule([
          DDD_MODULE_IMPORT_ORDER,
          DDD_SHARED_IMPORT_ORDER,
          DDD_ERROR_IMPORT_ORDER,
        ]),
      },
    },
  ];
}
