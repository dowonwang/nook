'use client';

import { Button } from '@packages/ui/components/button';
import { useChangeLanguage } from 'next-i18next/client';

import { useLocale } from '$shared/i18n';
import { I18N_COOKIE_NAME } from '$shared/lib/cookie';

export function I18nToggleButton() {
  const changeLocale = useChangeLanguage(I18N_COOKIE_NAME);
  const currentLocale = useLocale();
  const nextLocale = currentLocale === 'ko' ? 'en' : 'ko';

  const handleChange = async () => {
    await changeLocale(nextLocale);
  };

  return (
    <Button
      variant='secondary'
      size='icon'
      type='button'
      onClick={() => void handleChange()}
      className='font-black'
    >
      {currentLocale.toUpperCase()}
    </Button>
  );
}
