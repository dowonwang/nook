'use client';

import { useTranslations } from 'next-intl';

type ErrorCode = {
  code: string;
};

function hasErrorCode(error: unknown): error is ErrorCode {
  return (
    !!error &&
    typeof error === 'object' &&
    'code' in error &&
    typeof error.code === 'string'
  );
}

export function useActionErrorMessage(error: unknown) {
  const t = useTranslations('response');

  if (!hasErrorCode(error)) {
    return null;
  }

  return t.has(error.code) ? t(error.code) : null;
}
