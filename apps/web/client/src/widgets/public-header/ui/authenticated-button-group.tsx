import { SignOutButton } from '$features/auth/sign-out';
import { ThemeToggleButton } from '$features/theme';

import { DashboardNavigate } from './navigation/dashboard';

export function AuthenticatedButtonGroup() {
  return (
    <div className='flex items-center gap-2'>
      <ThemeToggleButton />
      <SignOutButton />
      <DashboardNavigate />
    </div>
  );
}
