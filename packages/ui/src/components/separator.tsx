import { cn } from '../lib/cn';

export function Separator({
  content,
  className,
  ...rest
}: React.HTMLAttributes<HTMLHRElement> & {
  content?: string;
}) {
  const style = cn('border-border border-t-2', className);

  if (content && content.length > 0) {
    return (
      <div className='flex items-center gap-3'>
        <hr className={style + ' flex-1'} />
        <p className='text-secondary-foreground text-sm font-thin'>{content}</p>
        <hr className={style + ' flex-1'} />
      </div>
    );
  }

  return <hr {...rest} className={style} />;
}
