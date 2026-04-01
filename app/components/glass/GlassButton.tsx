import Link from 'next/link';
import styles from './button.module.css';

type Variant = 'primary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

type ButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type LinkProps = BaseProps & {
  href: string;
  disabled?: boolean;
};

type GlassButtonProps = ButtonProps | LinkProps;

export function GlassButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  ...rest
}: GlassButtonProps) {
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    className,
  ].join(' ');

  const content = (
    <>
      <div className={styles.border} aria-hidden="true" />
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </>
  );

  if ('href' in rest && rest.href !== undefined) {
    const { href, disabled, ...linkRest } = rest as LinkProps;
    return (
      <Link
        href={href}
        className={classes}
        aria-disabled={disabled || loading}
        {...(linkRest as object)}
      >
        {content}
      </Link>
    );
  }

  const { disabled, ...btnRest } = rest as ButtonProps;
  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading}
      {...btnRest}
    >
      {content}
    </button>
  );
}
