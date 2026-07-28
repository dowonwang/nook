import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';
import { getTranslations } from 'next-intl/server';

import { SignInForm } from '$features/auth/sign-in';
import { getFlashCookie } from '$shared/api/bff/server';
import { AppLogo } from '$shared/ui';

export async function SignInPage() {
  const t = await getTranslations('response');
  const flash = await getFlashCookie();

  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <Card className='mx-auto w-full max-w-md'>
        <CardHeader className='flex items-center gap-4'>
          <AppLogo height={50} width={50} />
          <div>
            <CardTitle level='h1'>Sign in</CardTitle>
            <CardDescription>
              {flash ? t(flash) : 'Sign in to your account'}
            </CardDescription>
          </div>
        </CardHeader>

        <CardBody>
          <SignInForm />
        </CardBody>
      </Card>
    </div>
  );
}
