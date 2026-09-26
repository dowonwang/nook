import { I18nToggleButton } from '$features/i18n';
import { ThemeToggleButton } from '$features/theme';

import { SignInNavigate } from './navigation/sign-in';

export function UnauthenticatedButtonGroup() {
  return (
    <div className='flex items-center gap-2'>
      <I18nToggleButton />
      <ThemeToggleButton />
      <SignInNavigate />
    </div>
  );
}
