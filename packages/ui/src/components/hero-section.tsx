import { cn } from '../lib/cn';

const tw = String.raw;

export function HeroSection({
  children,
  action,
  className,
}: {
  children?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  if (action) {
    return (
      <div className={cn('flex items-center', className)}>
        <div className='flex-1'>{children}</div>
        {action}
      </div>
    );
  }

  return <div className={cn(className)}>{children}</div>;
}

export function HeroSectionTitle({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLHeadElement>) {
  const style = tw`text-2xl font-semibold`;

  return (
    <h1 {...rest} className={cn(style, className)}>
      {children}
    </h1>
  );
}

export function HeroSectionDescription({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const style = tw`text-secondary-foreground mt-1 text-sm`;

  return (
    <p {...rest} className={cn(style, className)}>
      {children}
    </p>
  );
}
