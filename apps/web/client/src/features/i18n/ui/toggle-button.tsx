'use client';

import { Button } from '@packages/ui/components/button';
import { usePathname, useRouter } from 'next/navigation';
import { useChangeLanguage } from 'next-i18next/client';

import { I18N_COOKIE_NAME } from '$shared/config';
import {
  createLocalizedPathname,
  removeLocaleFromPathname,
} from '$shared/i18n';

import type { I18nLanguagesType } from '$shared/config';

export function I18nToggleButton() {
  const changeLanguage = useChangeLanguage(I18N_COOKIE_NAME);
  const pathname = usePathname() || '/';
  const router = useRouter();

  const handleChange = async (locale: I18nLanguagesType) => {
    await changeLanguage(locale);

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
        onClick={() => void handleChange('en')}
      >
        en
      </Button>

      <Button
        variant='secondary'
        size='icon'
        type='button'
        onClick={() => void handleChange('ko')}
      >
        ko
      </Button>
    </>
  );
}
