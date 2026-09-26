import { Button } from '@packages/ui/components/button';
import Link from 'next/link';
import { useT } from 'next-i18next/client';

import { WIDGETS_PUBLIC_HEADER_NAMESPACE } from '$widgets/public-header/i18n';

export function SignInNavigate() {
  const { t } = useT(WIDGETS_PUBLIC_HEADER_NAMESPACE);

  return (
    <Button variant='primary' asChild>
      <Link href={'/signin'}>{t('navigation.sign_in')}</Link>
    </Button>
  );
}
