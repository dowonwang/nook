import { cn } from '../lib/cn';

export function Separator({
  content,
  className,
  ...rest
}: React.HTMLAttributes<HTMLHRElement> & {
  content?: string;
}) {
  const style = 'border-border border-t-2';

  if (content && content.length > 0) {
    return (
      <div className='flex items-center gap-3'>
        <hr className={cn(style, 'flex-1', className)} />
        <p className='text-secondary-foreground text-sm font-thin'>{content}</p>
        <hr className={cn(style, 'flex-1', className)} />
      </div>
    );
  }

  return <hr {...rest} className={cn(style, className)} />;
}
