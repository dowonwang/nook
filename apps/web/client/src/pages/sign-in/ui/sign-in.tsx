import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';
import { getTranslations } from 'next-intl/server';

import { SESSION_REQUIRED_SIGN_IN } from '$entities/session';
import { SignInForm } from '$features/auth/sign-in';
import { getFlashCookie } from '$shared/lib/cookie/server';
import { AppLogo } from '$shared/ui';

interface Props {
  redirectTo: string | string[] | undefined;
}

export async function SignInPage({ redirectTo }: Props) {
  const t = await getTranslations('response');
  const flashCookie = await getFlashCookie();
  const i18nKey = flashCookie || (redirectTo ? SESSION_REQUIRED_SIGN_IN : null);

  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <Card className='mx-auto w-full max-w-md'>
        <CardHeader className='flex items-center gap-4'>
          <AppLogo height={50} width={50} />
          <div>
            <CardTitle level='h1'>Sign in</CardTitle>
            <CardDescription>
              {i18nKey ? t(i18nKey) : 'Sign in to your account'}
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
