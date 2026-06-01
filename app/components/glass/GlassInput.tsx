import { useId } from 'react';
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
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <div className={`${styles.container} ${error ? styles.containerError : ''}`}>
        <div className={styles.border} aria-hidden="true" />
        <div className={styles.row}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <input
            id={inputId}
            className={styles.input}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            {...rest}
          />
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>
      </div>

      {error && (
        <p id={errorId} className={styles.errorMsg} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
