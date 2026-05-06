import { cn } from '../lib/cn';

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

export function HeroSectionTitle({ children }: { children: string }) {
  return <h1 className='text-2xl font-semibold'>{children}</h1>;
}

export function HeroSectionDescription({ children }: { children: string }) {
  return <p className='text-secondary-text mt-1 text-sm'>{children}</p>;
}
