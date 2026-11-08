'use client';

import { useBreakPoint } from '$shared/lib/break-point';

import { DefaultSidebar } from './default-sidebar';
import { MobileSidebar } from './mobile-sidebar';

export function Sidebar() {
  const { breakPoint } = useBreakPoint();
  const isMobile = breakPoint === 'sm' || breakPoint === 'md';

  return isMobile ? <MobileSidebar /> : <DefaultSidebar />;
}
