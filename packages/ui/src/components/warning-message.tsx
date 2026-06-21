import { cn } from '../lib/cn';

export function WarningMessage({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  const style = cn(
    'ring-warning bg-warning/20 rounded-xl px-1.5 py-2 text-center text-sm ring-2',
    className,
  );

  return (
    <div role='alert' className={style} {...rest}>
      {children}
    </div>
  );
}
