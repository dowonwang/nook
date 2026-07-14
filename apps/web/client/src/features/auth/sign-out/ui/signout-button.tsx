import { Button } from '@packages/ui/components/button';

import { useSignOut } from '$features/auth/sign-out/lib/use-sign-out';

export function SignOutButton() {
  const { mutate, isPending } = useSignOut();

  return (
    <Button
      variant='secondary'
      onClick={() => {
        mutate();
      }}
      disabled={isPending}
    >
      Sign Out
    </Button>
  );
}
