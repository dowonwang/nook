// import-x/order 공통 옵션 (패키지 내부용, exports에 공개하지 않음)
// flat config는 같은 규칙의 옵션을 병합하지 않고 덮어쓰므로, 레이어 순서가 다른 설정(fsd, ddd)도 이 함수로 옵션 전체를 다시 만듦

// pathGroups는 먼저 매칭되는 패턴이 적용되고, 같은 그룹 안에서는 배열에 나열한 순서대로 정렬됨

const CSS_PATTERNS = [
  '@*/**/*.css',
  '$*/**/*.css',
  '**/*.css',
  '*.css',
  './*.css',
  '../*.css',
];

// 가까운 경로부터. `**`는 `..` 경로 조각과 매칭되지 않아 깊이별로 나뉨
const RELATIVE_PATTERNS = [
  './**',
  '../**',
  '../../**',
  '../../../**',
  '../../../../**',
];

// 빈 줄은 기본 그룹이 바뀔 때만 들어가므로, 레이어 블록마다 기본 그룹을 하나씩 씀
// internal 외에는 실제 import가 들어오지 않는 그룹을 빌려 씀
// (object: `import x = foo.bar` 형식, index: `from '.'` 형식. 둘 다 저장소에서 쓰지 않음)
const LAYER_BLOCK_GROUPS = ['internal', 'object', 'index'];

function toPathGroups(group, patterns, position = 'after') {
  return patterns.map((pattern) => ({ pattern, group, position }));
}

/**
 * 블록 순서: CSS → 내장 모듈 → 외부 라이브러리 → @packages → 레이어 블록들 → 상대 경로 → type
 *
 * @param {string[][]} [layerBlocks] 레이어 alias 블록 목록(최대 3개). 블록 사이는 빈 줄로 나뉘고, 블록 안의 패턴은 상위 레이어부터 나열
 */
export function createImportOrderRule(layerBlocks = []) {
  if (layerBlocks.length > LAYER_BLOCK_GROUPS.length) {
    throw new Error(
      `import 순서 레이어 블록은 최대 ${String(LAYER_BLOCK_GROUPS.length)}개까지 지정할 수 있습니다.`,
    );
  }

  // 뒤 블록의 패턴을 먼저 두어, 넓은 패턴($shared/**)보다 뒤 블록의 좁은 패턴($shared/error)이 먼저 매칭되게 함
  const layerPathGroups = layerBlocks
    .map((patterns, index) => toPathGroups(LAYER_BLOCK_GROUPS[index], patterns))
    .reverse()
    .flat();

  return [
    'error',
    {
      // @packages를 외부 라이브러리와 빈 줄로 나누려고 비어 있는 unknown 그룹을 빌려 씀
      groups: [
        'builtin',
        'external',
        'unknown',
        ...LAYER_BLOCK_GROUPS,
        ['parent', 'sibling'],
        'type',
      ],

      // CSS 패턴이 먼저 매칭되도록 맨 앞에 둠
      pathGroups: [
        ...toPathGroups('builtin', CSS_PATTERNS, 'before'),
        ...toPathGroups('unknown', ['@packages/**']),
        ...layerPathGroups,
        ...toPathGroups('parent', RELATIVE_PATTERNS),
      ],

      pathGroupsExcludedImportTypes: [],
      // 같은 그룹 안의 pathGroup 사이(레이어끼리, ./와 ../ 사이)에는 빈 줄을 넣지 않음
      distinctGroup: false,

      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      // type import도 type 그룹 안에서 위와 같은 블록 순서로 정렬하고 빈 줄 없이 이어 씀
      sortTypesGroup: true,
      'newlines-between-types': 'never',
      warnOnUnassignedImports: true,
    },
  ];
}
