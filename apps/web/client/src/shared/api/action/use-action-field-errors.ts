'use client';

import { useEffect, useMemo, useRef } from 'react';

import type { ActionStateZodError } from '$shared/api/action';

export function useActionFieldErrors(error: ActionStateZodError | null) {
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});

  const fieldErrors = useMemo(() => {
    if (!error) return {};

    return error.reduce<Record<string, string>>((acc, item) => {
      const fieldName = item.field[0] as string;

      if (!fieldName) return acc;

      acc[fieldName] = item.message;

      return acc;
    }, {});
  }, [error]);

  useEffect(() => {
    if (!error || error.length === 0) return;

    const firstErrorField = error[0].field[0] as string;

    if (!firstErrorField) return;

    fieldRefs.current[firstErrorField]?.focus();
  }, [error]);

  const register = (name: string) => {
    return (element: HTMLElement | null) => {
      fieldRefs.current[name] = element;
    };
  };

  const getFieldError = (name: string) => {
    return fieldErrors[name];
  };

  return {
    register,
    getFieldError,
    fieldErrors,
  };
}
