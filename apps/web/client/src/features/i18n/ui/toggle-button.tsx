'use client';

import { Button } from '@packages/ui/components/button';
import { usePathname, useRouter } from 'next/navigation';
import { useT } from 'next-i18next/client';

export function I18nToggleButton() {
  const pathname = usePathname();
  const router = useRouter();
  const { i18n } = useT();

  console.log(i18n.language);

  const switchLocale = (locale: string) => {
    if (pathname) {
      const segments = pathname.split('/');
      segments[1] = locale;
      router.push(segments.join('/'));
    }
  };

  return (
    <>
      <Button
        variant='secondary'
        size='icon'
        type='button'
        onClick={() => {
          switchLocale('en');
        }}
      >
        en
      </Button>

      <Button
        variant='secondary'
        size='icon'
        type='button'
        onClick={() => {
          switchLocale('ko');
        }}
      >
        ko
      </Button>
    </>
  );
}
