import { SignOutButton } from '$features/auth/sign-out';
import { I18nToggleLink } from '$features/i18n/change-locale';
import { ThemeToggleButton } from '$features/theme/toggle';

import { DashboardNavigate } from '../navigation/dashboard';

export function AuthenticatedButtonGroup() {
  return (
    <div className='flex items-center gap-2'>
      <I18nToggleLink />
      <ThemeToggleButton />
      <SignOutButton />
      <DashboardNavigate />
    </div>
  );
}
