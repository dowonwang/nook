import { I18nToggleLink } from '$features/i18n/change-locale';
import { ThemeToggleButton } from '$features/theme/toggle';

import { SignInNavigate } from '../navigation/sign-in';

export function UnauthenticatedButtonGroup() {
  return (
    <div className='flex items-center gap-2'>
      <I18nToggleLink />
      <ThemeToggleButton />
      <SignInNavigate />
    </div>
  );
}
