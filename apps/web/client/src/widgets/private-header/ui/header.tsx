'use client';

import { useQuery } from '@tanstack/react-query';

import { sessionQueryOptions } from '$entities/session';
import { UserAvatar } from '$entities/user';
import { SignOutButton } from '$features/auth/sign-out';
import { I18nToggleButton } from '$features/i18n/change-locale';
import { ThemeToggleButton } from '$features/theme/toggle';
import { useLocale } from '$shared/i18n';
import { createDate } from '$shared/lib/date';

interface Props {
  // 모바일에서 사이드바를 여는 버튼. 사이드바 위젯과 직접 의존하지 않도록 상위 레이어에서 주입
  sidebarToggle?: React.ReactNode;
}

export function PrivateHeader({ sidebarToggle }: Props) {
  const locale = useLocale();
  const today = createDate(new Date(), locale).format('LL');
  const { data } = useQuery(sessionQueryOptions);

  if (!data?.authenticated) {
    return null;
  }

  return (
    <header className='bg-header/80 border-border h-header sticky top-0 z-50 flex items-center gap-4 border-b px-6 backdrop-blur-md'>
      <div className='hidden md:block'>
        <span className='text-secondary-foreground'>{today}</span>
      </div>

      {sidebarToggle}

      <div className='ml-auto flex items-center gap-2'>
        <I18nToggleButton />
        <ThemeToggleButton />
        <SignOutButton />
        <UserAvatar name={data.user.name} />
      </div>
    </header>
  );
}
