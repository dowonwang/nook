import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';

import { SignUpForm } from '$features/auth/sign-up';
import { AppLogo } from '$shared/ui';

export function SignUpPage() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <Card className='mx-auto w-full max-w-md'>
        <CardHeader className='flex items-center gap-4'>
          <AppLogo height={50} width={50} />
          <div>
            <CardTitle level='h1'>Sign up</CardTitle>
            <CardDescription>Sign up to your account</CardDescription>
          </div>
        </CardHeader>

        <CardBody>
          <SignUpForm />
        </CardBody>
      </Card>
    </div>
  );
}
