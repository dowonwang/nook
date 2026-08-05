import { Children, cloneElement, isValidElement } from 'react';

import { cn } from './cn';

type Props = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

export function renderSlot({ children, className, ...rest }: Props) {
  const child = Children.only(children);

  if (!isValidElement<{ className?: string }>(child)) {
    return null;
  }

  return cloneElement(child, {
    ...rest,
    className: cn(className, child.props.className),
  });
}
