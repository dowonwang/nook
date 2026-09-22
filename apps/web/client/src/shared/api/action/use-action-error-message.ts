'use client';

import { useT } from 'next-i18next/client';

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
  const { t, i18n } = useT();

  if (!hasErrorCode(error)) {
    return null;
  }

  return i18n.exists(error.code) ? t(error.code) : null;
}
