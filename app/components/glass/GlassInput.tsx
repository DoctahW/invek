import styles from './input.module.css';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
  label?: string;
  error?: string;
}

export function GlassInput({
  icon,
  suffix,
  label,
  error,
  id,
  className,
  ...rest
}: GlassInputProps) {
  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={`${styles.container} ${error ? styles.containerError : ''}`}>
        <div className={styles.border} aria-hidden="true" />
        <div className={styles.row}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <input id={id} className={styles.input} {...rest} />
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>
      </div>

      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );
}
