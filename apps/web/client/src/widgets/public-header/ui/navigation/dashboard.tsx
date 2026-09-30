import { Button } from '@packages/ui/components/button';
import Link from 'next/link';
import { useT } from 'next-i18next/client';

import { WIDGETS_PUBLIC_HEADER_NAMESPACE } from '$widgets/public-header/i18n';

export function DashboardNavigate() {
  const { t } = useT(WIDGETS_PUBLIC_HEADER_NAMESPACE);

  return (
    <Button asChild>
      <Link href={'/dashboard'}>{t('navigation.dashboard')}</Link>
    </Button>
  );
}
