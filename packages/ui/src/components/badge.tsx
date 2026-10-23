import { cn } from '../lib/cn';

import type { ComponentPropsWithRef } from 'react';

const tw = String.raw;

type BadgeVariant = 'primary' | 'secondary';

const variants: Record<BadgeVariant, string> = {
  primary: tw`bg-primary text-primary-foreground`,
  secondary: tw`bg-secondary text-secondary-foreground`,
};

export function Badge({
  children,
  className,
  variant = 'primary',
  ...rest
}: ComponentPropsWithRef<'span'> & {
  variant?: BadgeVariant;
}) {
  return (
    <span
      {...rest}
      className={cn(
        'rounded-full px-2 py-1 text-xs shadow',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
