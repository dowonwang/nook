'use client';

import { Menu, X } from 'lucide-react';

import { Button } from '@packages/ui/components/button';

import { useSidebarContext } from '../model/context';

interface Props {
  type: 'OPEN' | 'CLOSE';
  className?: string;
}

export function SidebarToggleButton({ className, type }: Props) {
  const { toggle } = useSidebarContext();

  return (
    <Button
      size='icon'
      variant={type === 'CLOSE' ? 'secondary' : 'primary'}
      onClick={toggle}
      className={className ?? ''}
    >
      {type === 'CLOSE' && <X />}
      {type === 'OPEN' && <Menu />}
    </Button>
  );
}
