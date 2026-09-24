import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';
import { getT } from 'next-i18next/server';

import { SignUpForm } from '$features/auth/sign-up';
import { AppLogo } from '$shared/ui';

import { PAGES_SIGN_UP_I18N_NAMESPACE } from '../i18n';

export async function SignUpPage() {
  const { t } = await getT(PAGES_SIGN_UP_I18N_NAMESPACE);
  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <Card className='mx-auto w-full max-w-md'>
        <CardHeader className='flex items-center gap-4'>
          <AppLogo height={50} width={50} />
          <div>
            <CardTitle level='h1'>{t('title')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </div>
        </CardHeader>

        <CardBody>
          <SignUpForm />
        </CardBody>
      </Card>
    </div>
  );
}
