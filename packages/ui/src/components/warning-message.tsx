import { cn } from '../lib/cn';

export function WarningMessage({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  const style = cn(
    'text-warning rounded-xl px-1.5 py-2 text-center text-sm font-semibold',
    className,
  );

  return (
    <div role='alert' className={style} {...rest}>
      {children}
    </div>
  );
}
