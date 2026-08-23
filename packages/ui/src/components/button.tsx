import { cn } from '../lib/cn';
import { renderSlot } from '../lib/renderSlot';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'default' | 'icon' | 'small';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
};

const tw = String.raw;

const variants: Record<ButtonVariant, string> = {
  primary: tw`bg-primary text-primary-foreground hover:bg-primary-hover`,
  secondary: tw`bg-secondary text-secondary-foreground hover:bg-secondary-hover ring-border ring`,
  ghost: tw`hover:ring-border bg-transparent text-inherit hover:ring`,
};

const sizeVariants: Record<ButtonSize, string> = {
  default: tw`h-10 rounded-xl px-4`,
  icon: tw`h-10 w-10 rounded-xl px-2.5`,
  small: tw`h-9 rounded-xl px-3`,
};

export function Button({
  className,
  variant = 'primary',
  size = 'default',
  asChild = false,
  ...props
}: ButtonProps) {
  const style = cn(
    'inline-flex items-center justify-center text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizeVariants[size],
    className,
  );

  if (asChild) {
    return renderSlot({
      ...props,
      children: props.children,
      className: style,
    });
  }

  return <button className={style} {...props} />;
}
