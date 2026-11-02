// FSD import 규칙 (apps/web/docs/convention.md 0장)
// files 패턴은 이 설정을 사용하는 eslint.config.mjs 위치 기준

// 슬라이스 내부 세그먼트를 직접 참조하지 못하게 막아 index.ts / server.ts 진입점만 허용
const FSD_PUBLIC_API_PATTERNS = [
  {
    regex:
      '^\\$(app|pages|widgets|features|entities)/.*/(ui|api|model|lib|config|i18n)(/|$)',
    message:
      '슬라이스 내부 파일 대신 진입점(index.ts 또는 server.ts)으로 import하세요.',
  },
  {
    regex: '^\\$shared/.*\\.server$',
    message: '*.server 파일 대신 해당 세그먼트의 server.ts로 import하세요.',
  },
];

// 레이어별로 참조하면 안 되는 alias. 슬라이스 내부는 상대 경로만 쓰므로 같은 레이어 alias는 곧 교차 참조
const FSD_LAYER_RESTRICTIONS = [
  {
    files: ['app/**', 'proxy.ts'],
    regex: '^\\$(widgets|features|entities)/',
    message: 'Next 라우트 파일은 $app, $pages, $shared만 참조합니다.',
  },
  {
    files: ['src/pages/**'],
    regex: '^\\$(pages|app)/',
    message:
      'pages는 다른 page 슬라이스나 app을 참조할 수 없습니다. 같은 슬라이스 안에서는 상대 경로를 쓰세요.',
  },
  {
    files: ['src/widgets/**'],
    regex: '^\\$(widgets|pages|app)/',
    message:
      'widgets는 다른 widget 슬라이스나 상위 레이어를 참조할 수 없습니다. 상위 레이어에서 조합하거나 같은 슬라이스 안에서는 상대 경로를 쓰세요.',
  },
  {
    files: ['src/features/**'],
    regex: '^\\$(features|widgets|pages|app)/',
    message:
      'features는 다른 feature 슬라이스나 상위 레이어를 참조할 수 없습니다. 공유할 것은 entities로 내리거나 상위 레이어에서 조합하세요.',
  },
  {
    files: ['src/entities/**'],
    regex: '^\\$entities/(?!.*/@x/)',
    message:
      '다른 entity는 @x 교차 참조 진입점으로만 참조합니다. 같은 슬라이스 안에서는 상대 경로를 쓰세요.',
  },
  {
    files: ['src/entities/**'],
    regex: '^\\$(features|widgets|pages|app)/',
    message: 'entities는 상위 레이어를 참조할 수 없습니다.',
  },
  {
    files: ['src/shared/**'],
    regex: '^\\$(entities|features|widgets|pages|app)/',
    message: 'shared는 상위 레이어를 참조할 수 없습니다.',
  },
];

// flat config는 같은 규칙의 옵션을 병합하지 않고 덮어쓰므로 파일 그룹마다 전체 패턴을 구성
export function createFsdConfig() {
  const fileGroups = [
    ...new Set(FSD_LAYER_RESTRICTIONS.flatMap(({ files }) => files)),
  ];

  return [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          { patterns: FSD_PUBLIC_API_PATTERNS },
        ],
      },
    },
    ...fileGroups.map((group) => ({
      files: [group],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              ...FSD_PUBLIC_API_PATTERNS,
              ...FSD_LAYER_RESTRICTIONS.filter(({ files }) =>
                files.includes(group),
              ).map(({ regex, message }) => ({ regex, message })),
            ],
          },
        ],
      },
    })),
  ];
}
