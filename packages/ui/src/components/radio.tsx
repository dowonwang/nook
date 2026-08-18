import { cn } from '../lib/cn';

const tw = String.raw;

export function RadioButton({
  className,
  children,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const inputStyle = tw`peer accent-primary hidden`;
  const labelStyle = tw`border-primary/50 bg-secondary peer-checked:text-primary-foreground peer-checked:bg-primary text-secondary-foreground inline-block min-w-fit rounded-xl border-2 px-3 py-2 text-sm font-semibold transition-colors duration-250`;

  return (
    <div>
      <input {...rest} type='radio' className={cn(inputStyle)} />
      <label htmlFor={rest.id} className={cn(labelStyle, className)}>
        {children}
      </label>
    </div>
  );
}
