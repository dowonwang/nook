#!/usr/bin/env bash
# Claude Code PostToolUse 훅: Claude가 실행한 git commit / gh pr create가 끝나면
# kanban 스킬 절차로 노션 카드에 반영하라고 Claude에게 알린다.
# 노션은 직접 건드리지 않고, 조건이 맞지 않으면 아무것도 출력하지 않는다.
set -euo pipefail

input="$(cat)"
command="$(printf '%s' "$input" | jq -r '.tool_input.command // empty')"

if printf '%s' "$command" | grep -Eq '(^|[;&|[:space:]])git[[:space:]]+commit'; then
  event='commit'
elif printf '%s' "$command" | grep -Eq '(^|[;&|[:space:]])gh[[:space:]]+pr[[:space:]]+create'; then
  event='pr'
else
  exit 0
fi

project_dir="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$project_dir"

# 노션 연결 설정이 없는 사용자는 대상이 아님
[ -f .claude/skills/kanban/config.local.json ] || exit 0

branch="$(git branch --show-current 2>/dev/null || true)"
case "$branch" in
  '' | main | master) exit 0 ;;
esac

skill='.claude/skills/kanban/SKILL.md'

if [ "$event" = 'commit' ]; then
  # 방금 만들어진 커밋인지 확인 (커밋이 실패했거나 아무 커밋도 없으면 종료)
  committed_at="$(git log -1 --format=%ct 2>/dev/null || echo 0)"
  now="$(date +%s)"
  [ $((now - committed_at)) -le 120 ] || exit 0

  hash="$(git log -1 --format=%h)"
  subject="$(git log -1 --format=%s)"

  amend_note=''
  if printf '%s' "$command" | grep -Eq -- '--amend'; then
    amend_note=' 이 커밋은 --amend로 만들어졌으므로, 카드에 이전 해시로 체크된 항목이 있으면 그 해시를 새 해시로 바꾼다.'
  fi

  context="[kanban] 브랜치 ${branch}에서 커밋 ${hash} \"${subject}\"이(가) 완료됐다. ${skill}의 check 절차로 이 커밋을 연결된 카드의 할 일에 반영한다. 커밋 승인 때 체크할 할 일을 함께 보여주고 승인받았다면 추가 승인 없이 그대로 반영하고 결과만 보고한다. 승인 때 보여주지 않았거나 짝이 달라졌다면 미리보기 후 승인받는다. 브랜치에 연결된 카드가 없으면 아무것도 하지 않는다.${amend_note}"
else
  context="[kanban] 브랜치 ${branch}에서 gh pr create가 실행됐다. ${skill}의 pr 절 \"PR 생성과 함께 기록\" 절차로 gh pr view로 PR URL을 확인해 연결된 카드의 PR 속성에 기록하고 결과만 보고한다. PR이 만들어지지 않았거나 브랜치에 연결된 카드가 없으면 아무것도 하지 않는다."
fi

jq -n --arg ctx "$context" '{hookSpecificOutput: {hookEventName: "PostToolUse", additionalContext: $ctx}}'
