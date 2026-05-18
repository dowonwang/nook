import { cn } from '../lib/cn';

const tw = String.raw;

export function FieldGroup({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLFieldSetElement> & {
  children: React.ReactNode;
}) {
  const style = tw`space-y-6`;

  return (
    <fieldset {...rest} className={cn(style, className)}>
      {children}
    </fieldset>
  );
}

export function Field({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
}) {
  const style = tw`space-y-2`;

  return (
    <div {...rest} className={cn(style, className)}>
      {children}
    </div>
  );
}

export function FieldLabel({
  children,
  className,
  ...rest
}: React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
}) {
  const style = tw`text-secondary-foreground block px-2 text-sm font-light`;

  return (
    <label {...rest} className={cn(style, className)}>
      {children}
    </label>
  );
}

export function FieldDescription({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const style = tw`text-secondary-foreground px-2 text-sm`;

  return (
    <p {...rest} className={cn(style, className)}>
      {children}
    </p>
  );
}
