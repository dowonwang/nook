'use client';

import { cn } from '@packages/ui/lib/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useT } from 'next-i18next/client';
import { useEffect } from 'react';

import { WIDGET_SIDEBAR_I18N_NAMESPACE } from '$widgets/sidebar/i18n';
import { useSidebarContext } from '$widgets/sidebar/model/context';

import type { MenuData } from '../../model/types';

export function SubMenuGroup({ href, title, sub = [] }: MenuData) {
  const { t } = useT(WIDGET_SIDEBAR_I18N_NAMESPACE);
  const pathname = usePathname();
  const { setIsOpen } = useSidebarContext();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <Link
        href={href}
        className={cn('flex items-center gap-2 rounded-lg p-2', {
          'bg-secondary': pathname?.startsWith(href),
        })}
      >
        {t(title)}
      </Link>

      <div className='-mt-3 ml-4 space-y-2 py-2'>
        {sub.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn('block rounded-lg px-3 py-2', {
              'bg-primary text-primary-foreground font-semibold':
                pathname === item.href,
              'hover:bg-secondary': pathname !== item.href,
            })}
          >
            {t(item.title)}
          </Link>
        ))}
      </div>
    </>
  );
}
