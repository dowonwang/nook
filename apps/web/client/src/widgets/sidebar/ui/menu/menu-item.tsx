'use client';

import { cn } from '@packages/ui/lib/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface MenuData {
  href: string;
  title: string;
}

export function MenuItem({ href, title }: MenuData) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn('block rounded-xl px-3 py-2.5', {
        'bg-primary/20 ring-primary/50 font-semibold ring': pathname === href,
        'hover:bg-secondary ring-border hover:ring': pathname !== href,
      })}
    >
      {title}
    </Link>
  );
}
