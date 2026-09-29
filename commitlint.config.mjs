export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'wip',
      ],
    ],
  },
  prompt: {
    settings: {},
    messages: {
      skip: ':건너뛰려면 엔터',
      max: '최대 %d자까지 가능합니다',
      min: '최소 %d자 이상 입력해야 합니다',
      emptyWarning: '내용을 입력해 주세요',
      upperLimitWarning: '글자 수 제한을 초과했습니다',
      lowerLimitWarning: '최소 글자 수보다 부족합니다',
    },
    questions: {
      type: {
        description: '커밋할 변경 사항의 유형을 선택하세요:',
        enum: {
          feat: {
            description: '새로운 기능 추가',
            title: '기능 추가 (Features)',
            emoji: '✨',
          },
          fix: {
            description: '버그 수정',
            title: '버그 수정 (Bug Fixes)',
            emoji: '🐛',
          },
          docs: {
            description: '문서 수정 (README 등)',
            title: '문서 (Documentation)',
            emoji: '📚',
          },
          style: {
            description:
              '코드 의미에 영향을 주지 않는 변경 (공백, 포맷팅, 세미콜론 누락 등)',
            title: '스타일 (Styles)',
            emoji: '💎',
          },
          refactor: {
            description: '버그 수정이나 기능 추가가 아닌 코드 구조 개선',
            title: '리팩토링 (Code Refactoring)',
            emoji: '📦',
          },
          perf: {
            description: '성능을 향상시키는 코드 변경',
            title: '성능 개선 (Performance Improvements)',
            emoji: '🚀',
          },
          test: {
            description: '테스트 추가 또는 기존 테스트 수정',
            title: '테스트 (Tests)',
            emoji: '🚨',
          },
          build: {
            description:
              '빌드 시스템 또는 외부 의존성 관련 변경 (gulp, npm 등)',
            title: '빌드 (Builds)',
            emoji: '🛠',
          },
          ci: {
            description:
              'CI 설정 파일 및 스크립트 변경 (GitHub Actions, Jenkins 등)',
            title: '지속적 통합 (Continuous Integrations)',
            emoji: '⚙️',
          },
          chore: {
            description:
              '소스 코드나 테스트 파일을 수정하지 않는 기타 변경사항',
            title: '기타 작업 (Chores)',
            emoji: '♻️',
          },
          revert: {
            description: '이전 커밋 되돌리기',
            title: '되돌리기 (Reverts)',
            emoji: '🗑',
          },
          wip: {
            description: '작업 중인 사항 (미완성)',
            title: '작업 중 (WIP)',
            emoji: '🚧',
          },
        },
      },
      scope: {
        description:
          '이 변경 사항이 영향을 미치는 범위는 어디인가요? (예: 컴포넌트명 또는 파일명)',
      },
      subject: {
        description:
          '변경 사항에 대한 짧고 명확한 설명을 작성하세요 (명령조 권장)',
      },
      body: {
        description: '변경 사항에 대한 상세한 설명을 작성하세요',
      },
      isBreaking: {
        description:
          '이 커밋에 하위 호환성을 깨뜨리는 변경(Breaking changes)이 포함되어 있나요?',
      },
      breakingBody: {
        description:
          '중대한 변경(BREAKING CHANGE) 커밋은 반드시 본문(body)이 필요합니다. 상세 설명을 입력해 주세요',
      },
      breaking: {
        description: '어떤 중대한 변경 사항이 있는지 설명해 주세요',
      },
      isIssueAffected: {
        description: '이 변경 사항이 관련 이슈(Issue) 해결과 연결되어 있나요?',
      },
      issuesBody: {
        description:
          '이슈를 닫으려면 커밋 본문이 필요합니다. 상세 설명을 입력해 주세요',
      },
      issues: {
        description:
          '참조할 이슈 번호를 추가하세요 (예: "fix #123", "re #123")',
      },
    },
  },
};
