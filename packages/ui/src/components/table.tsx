import { cn } from '../lib/cn';

import type { HTMLAttributes } from 'react';

const tw = String.raw;

export function Table({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLTableElement>) {
  const style = tw`shadow-soft border-border w-full table-auto border-collapse overflow-hidden rounded-xl border`;

  return (
    <table {...rest} className={cn(style, className)}>
      {children}
    </table>
  );
}

export function TableRow({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<'tr'>) {
  return (
    <tr {...rest} className='border-border border-b last:border-b-0'>
      {children}
    </tr>
  );
}

export function TableCell({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'td'>) {
  const style = tw`px-2 py-3 text-center`;

  return (
    <td {...rest} className={cn(style, className)}>
      {children}
    </td>
  );
}

export function TableHeader({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  const style = tw`bg-primary/30`;

  return (
    <thead {...rest} className={cn(style, className)}>
      {children}
    </thead>
  );
}

export function TableHeaderCell({
  className,
  children,
  ...rest
}: React.ComponentPropsWithoutRef<'th'>) {
  const style = tw`p-2`;

  return (
    <th {...rest} className={cn(style, className)}>
      {children}
    </th>
  );
}

export function TableBody({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLTableSectionElement>) {
  const style = tw`bg-card`;

  return (
    <tbody {...rest} className={cn(style, className)}>
      {children}
    </tbody>
  );
}
