import { Button } from '@packages/ui/components/button';
import Link from 'next/link';

import { I18nToggleButton } from '$features/i18n';
import { ThemeToggleButton } from '$features/theme';

export function UnauthenticatedButtonGroup() {
  return (
    <div className='flex items-center gap-2'>
      <I18nToggleButton />
      <ThemeToggleButton />

      <Button variant='primary' asChild>
        <Link href={'/signin'}>Sign in</Link>
      </Button>
    </div>
  );
}
