import { Button } from '@packages/ui/components/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@packages/ui/components/field';
import { Input } from '@packages/ui/components/input';
import { Separator } from '@packages/ui/components/separator';
import Link from 'next/link';

export function SignInForm() {
  return (
    <form action=''>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input id='email' type='email' name='email' />
          <FieldDescription></FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor='password'>Password</FieldLabel>
          <Input id='password' type='password' name='password' />
          <FieldDescription></FieldDescription>
        </Field>

        <Button type='submit' className='w-full'>
          Log In
        </Button>

        <Separator content={"Don't have an account?"} />

        <Button variant='secondary' className='w-full' asChild>
          <Link href={'/sign-up'}>Sign Up</Link>
        </Button>
      </FieldGroup>
    </form>
  );
}
