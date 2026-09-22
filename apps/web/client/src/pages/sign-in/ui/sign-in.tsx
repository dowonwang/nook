import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';
import { getT } from 'next-i18next/server';

import {
  ENTITY_SESSION_I18N_NAMESPACE,
  SESSION_REQUIRED_SIGN_IN,
} from '$entities/session';
import { SignInForm } from '$features/auth/sign-in';
import { getFlashCookie } from '$shared/lib/cookie/server';
import { AppLogo } from '$shared/ui';

import { PAGE_SIGN_IN_I18N_NAMESPACE } from '../i18n';

interface Props {
  redirectTo: string | string[] | undefined;
}

export async function SignInPage({ redirectTo }: Props) {
  const { t } = await getT([
    ENTITY_SESSION_I18N_NAMESPACE,
    PAGE_SIGN_IN_I18N_NAMESPACE,
  ]);
  const flashCookie = await getFlashCookie();
  const i18nKey = flashCookie || (redirectTo ? SESSION_REQUIRED_SIGN_IN : null);

  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <Card className='mx-auto w-full max-w-md'>
        <CardHeader className='flex items-center gap-4'>
          <AppLogo height={50} width={50} />
          <div>
            <CardTitle level='h1'>
              {t(`${PAGE_SIGN_IN_I18N_NAMESPACE}:title`)}
            </CardTitle>
            <CardDescription>
              {i18nKey
                ? t(`${ENTITY_SESSION_I18N_NAMESPACE}:${i18nKey}`)
                : t(`${PAGE_SIGN_IN_I18N_NAMESPACE}:description`)}
            </CardDescription>
          </div>
        </CardHeader>

        <CardBody>
          <SignInForm redirectTo={redirectTo} />
        </CardBody>
      </Card>
    </div>
  );
}
