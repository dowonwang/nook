import { Button } from '@packages/ui/components/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@packages/ui/components/card';
import Link from 'next/link';

import { AppLogo } from '$shared/ui';

export function SignInPage() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <Card className='mx-auto w-full max-w-md'>
        <CardHeader className='flex items-center gap-4'>
          <AppLogo height={50} width={50} />
          <div>
            <CardTitle level='h1'>Login</CardTitle>
            <CardDescription>Login in to your account</CardDescription>
          </div>
        </CardHeader>

        <CardBody>
          <form className='space-y-6'>
            <div className='space-y-2'>
              <label
                htmlFor='email'
                className='text-secondary-foreground block px-2 text-sm font-semibold'
              >
                Email
              </label>
              <input
                id='email'
                type='email'
                placeholder='example@example.com'
                className='ring-border block w-full px-2 py-1 ring'
              />
            </div>

            <div className='space-y-2'>
              <label
                htmlFor='password'
                className='text-secondary-foreground block px-2 text-sm font-semibold'
              >
                Password
              </label>
              <input
                id='password'
                type='password'
                placeholder='example@example.com'
                className='ring-border block w-full px-2 py-2 ring'
              />
            </div>

            <Button type='submit' className='w-full'>
              Log In
            </Button>

            <div className='flex items-center gap-2'>
              <div className='border-border flex-1 border-t-2'></div>
              <p className='text-secondary-foreground text-center text-xs'>
                Don't have an account?{' '}
              </p>
              <div className='border-border flex-1 border-t-2'></div>
            </div>

            <Button variant='secondary' className='w-full' asChild>
              <Link href={'/sign-up'}>Sign Up</Link>
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
