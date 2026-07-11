import { Button } from '@packages/ui/components/button';
import { Field, FieldGroup, FieldLabel } from '@packages/ui/components/field';
import { Input } from '@packages/ui/components/input';
import { Separator } from '@packages/ui/components/separator';

export function SignUpForm() {
  return (
    <form noValidate>
      <FieldGroup>
        <Field>
          <FieldLabel>name</FieldLabel>
          <Input />
        </Field>

        <Field>
          <FieldLabel>email</FieldLabel>
          <Input />
        </Field>

        <Field>
          <FieldLabel>password</FieldLabel>
          <Input />
        </Field>

        <Field>
          <FieldLabel>password confirm</FieldLabel>
          <Input />
        </Field>

        <Separator />

        <Button className='w-full' type='submit'>
          Sign Up
        </Button>
      </FieldGroup>
    </form>
  );
}
