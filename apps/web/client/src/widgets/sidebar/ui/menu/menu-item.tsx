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
      className={cn('block rounded-xl p-3', {
        'bg-primary/20 ring-primary/50 font-semibold ring':
          pathname?.startsWith(href),
        'hover:bg-secondary ring-border hover:ring':
          !pathname?.startsWith(href),
      })}
    >
      {t(title)}
    </Link>
  );
}
