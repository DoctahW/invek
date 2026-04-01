import styles from './glass.module.css';

interface GlassPanelProps {
  depth?: 'shallow' | 'medium' | 'deep';
  className?: string;
  children?: React.ReactNode;
}

export function GlassPanel({ depth, className, children }: GlassPanelProps) {
  return (
    <div className={`${styles.panel} ${className ?? ''}`} data-depth={depth}>
      <div className={styles.border} aria-hidden="true" />
      {children}
    </div>
  );
}
