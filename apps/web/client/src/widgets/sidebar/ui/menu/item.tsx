'use client';

import { cn } from '@packages/ui/lib/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useT } from 'next-i18next/client';
import { useEffect } from 'react';

import { WIDGET_SIDEBAR_I18N_NAMESPACE } from '$widgets/sidebar/i18n';
import { useSidebarContext } from '$widgets/sidebar/model/context';

import type { MenuData } from '../../model/types';

export function MenuItem({ href, title }: MenuData) {
  const pathname = usePathname();
  const { setIsOpen } = useSidebarContext();
  const { t } = useT(WIDGET_SIDEBAR_I18N_NAMESPACE);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Link
      href={href}
      className={cn('flex items-center gap-2 rounded-lg p-2', {
        'bg-primary text-primary-foreground font-semibold':
          pathname?.startsWith(href),
        'hover:bg-secondary': !pathname?.startsWith(href),
      })}
    >
      {t(title)}
    </Link>
  );
}
