'use client';

import { Button } from '@packages/ui/components/button';
import { usePathname, useRouter } from 'next/navigation';

import {
  createLocalizedPathname,
  removeLocaleFromPathname,
} from '$shared/i18n';

import type { I18nLanguagesType } from '$shared/config';

export function I18nToggleButton() {
  const pathname = usePathname() || '/';
  const router = useRouter();

  const handleChange = (locale: I18nLanguagesType) => {
    document.documentElement.lang = locale;

    const cleanPathname = removeLocaleFromPathname(pathname);
    const nextPathname = createLocalizedPathname(cleanPathname, locale);

    router.replace(nextPathname);
  };

  return (
    <>
      <Button
        variant='secondary'
        size='icon'
        type='button'
        onClick={() => {
          handleChange('en');
        }}
      >
        en
      </Button>

      <Button
        variant='secondary'
        size='icon'
        type='button'
        onClick={() => {
          handleChange('ko');
        }}
      >
        ko
      </Button>
    </>
  );
}
