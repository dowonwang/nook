import { cn } from '../lib/cn';

const tw = String.raw;

export function Card({
  children,
  className,
  disabled = false,
  focus = false,
  ...rest
}: {
  children: React.ReactNode;
  disabled?: boolean;
  focus?: boolean;
  className?: string;
} & React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <section
      {...rest}
      aria-disabled={disabled}
      className={cn(
        'bg-card border-border shadow-soft group transition-ring rounded-xl border duration-200',
        { 'ring-primary ring-2': focus },
        className,
      )}
    >
      {children}
    </section>
  );
}

export function CardHeader({
  children,
  action,
  className,
  ...rest
}: {
  children?: React.ReactNode;
  action?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const style = tw`border-border border-b px-5 py-4`;

  if (action) {
    return (
      <div {...rest} className={cn(style, 'flex items-center', className)}>
        {cn(style, 'flex items-center', className)}
        <div className='flex-1'>{children}</div>
        {action}
      </div>
    );
  }
  return <div className={cn(style, className)}>{children}</div>;
}

export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className='p-5 group-aria-disabled:opacity-50'>{children}</div>;
}

export function CardTitle({
  children,
  level: Component = 'h2',
  srOnly = false,
}: {
  children: React.ReactNode;
  level?: 'h1' | 'h2' | 'h3' | 'h4';
  srOnly?: boolean;
}) {
  return (
    <Component
      className={cn('font-semibold', {
        'sr-only': srOnly,
      })}
    >
      {children}
    </Component>
  );
}

export function CardDescription({ children }: { children: string }) {
  return (
    <p className='text-secondary-foreground mt-1 text-sm whitespace-pre-line'>
      {children}
    </p>
  );
}
