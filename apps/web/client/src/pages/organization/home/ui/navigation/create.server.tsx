import { Button } from '@packages/ui/components/button';
import Link from 'next/link';
import { getT } from 'next-i18next/server';

import { PAGES_ORGANIZATION_HOME_I18N_NAMESPACE } from '../../i18n';

export async function CreateOrganizationNavigation() {
  const { t } = await getT(PAGES_ORGANIZATION_HOME_I18N_NAMESPACE);

  return (
    <Button asChild>
      <Link href={'/org/create'}>{t('hero.button.create')}</Link>
    </Button>
  );
}
