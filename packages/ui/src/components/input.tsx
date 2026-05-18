import { cn } from '../lib/cn';

const tw = String.raw;

export function Input({
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const style = tw`ring-border block w-full rounded-xl px-2 py-2 ring-2`;

  return <input {...rest} className={cn(style, className)} />;
}
