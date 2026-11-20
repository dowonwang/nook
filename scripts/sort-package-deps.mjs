// package.json 의존성 순서 정렬 (CLAUDE.md 규칙)
// 일반 버전 → workspace: → catalog: → 이름 붙은 카탈로그(그룹 이름순), 같은 묶음 안은 패키지 이름 알파벳순
// pnpm add / pnpm update가 알파벳순으로 다시 정렬하므로 lint-staged가 커밋할 때 이 스크립트로 되돌림
//
// node scripts/sort-package-deps.mjs [파일...]          정렬해서 다시 씀 (파일이 없으면 저장소의 모든 package.json)
// node scripts/sort-package-deps.mjs --check [파일...]  쓰지 않고 규칙과 다른 곳을 출력, 있으면 exit code 1

import { execFileSync } from 'node:child_process';
import console from 'node:console';
import { readFileSync, writeFileSync } from 'node:fs';
import { relative } from 'node:path';
import process from 'node:process';

const DEPENDENCY_FIELDS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
];

function getRank(version) {
  if (version.startsWith('workspace:')) return [1, ''];
  if (version === 'catalog:') return [2, ''];
  if (version.startsWith('catalog:'))
    return [3, version.slice('catalog:'.length)];

  return [0, ''];
}

function compareDependency([nameA, versionA], [nameB, versionB]) {
  const [rankA, groupA] = getRank(versionA);
  const [rankB, groupB] = getRank(versionB);

  return (
    rankA - rankB || groupA.localeCompare(groupB) || nameA.localeCompare(nameB)
  );
}

function findPackageJsonFiles() {
  return execFileSync('git', ['ls-files', '*package.json'], {
    encoding: 'utf8',
  })
    .split('\n')
    .filter((file) => file.endsWith('package.json'));
}

const args = process.argv.slice(2);
const isCheck = args.includes('--check');
const fileArgs = args.filter((arg) => arg !== '--check');
const files = fileArgs.length > 0 ? fileArgs : findPackageJsonFiles();

let unsortedCount = 0;

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const json = JSON.parse(source);
  const unsortedFields = [];

  for (const field of DEPENDENCY_FIELDS) {
    const dependencies = json[field];

    if (!dependencies) continue;

    const entries = Object.entries(dependencies);
    const sortedEntries = [...entries].sort(compareDependency);

    if (entries.some(([name], index) => name !== sortedEntries[index][0])) {
      unsortedFields.push(field);
      json[field] = Object.fromEntries(sortedEntries);
    }
  }

  if (unsortedFields.length === 0) continue;

  unsortedCount += 1;
  const displayPath = relative(process.cwd(), file) || file;

  if (isCheck) {
    console.error(`${displayPath}: ${unsortedFields.join(', ')}`);
  } else {
    writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
    console.log(`정렬: ${displayPath} (${unsortedFields.join(', ')})`);
  }
}

if (isCheck && unsortedCount > 0) {
  console.error(
    `의존성 순서가 규칙과 다른 package.json이 ${String(unsortedCount)}개 있습니다. pnpm lint:deps:fix로 정렬하세요.`,
  );
  process.exitCode = 1;
}
