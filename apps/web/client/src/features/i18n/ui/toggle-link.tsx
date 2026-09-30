'use client';

import { Button } from '@packages/ui/components/button';
import { usePathname, useRouter } from 'next/navigation';

import {
  createLocalizedPathname,
  removeLocaleFromPathname,
  useLocale,
} from '$shared/i18n';

export function I18nToggleLink() {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const currentLocale = useLocale();
  const nextLocale = currentLocale === 'ko' ? 'en' : 'ko';

  const handleChange = () => {
    document.documentElement.lang = nextLocale;

    const cleanPathname = removeLocaleFromPathname(pathname);
    const nextPathname = createLocalizedPathname(cleanPathname, nextLocale);

    router.replace(nextPathname);
  };

  return (
    <Button
      variant='secondary'
      size='icon'
      type='button'
      onClick={handleChange}
      className='font-black'
      role='link'
      aria-label={`Change language to ${nextLocale.toUpperCase()}`}
    >
      {currentLocale.toUpperCase()}
    </Button>
  );
}
