'use client';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { GlassPanel } from '@/app/components/glass/GlassPanel';
import { PORTFOLIO_ITEMS } from '@/app/data/portfolio';
import styles from './dashboard.module.css';

function ArrowUp() {
  return (
    <svg width="12" height="12" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0 }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.7844 0C16.455 8.2506e-06 16.9982 0.544244 16.9982 1.21484V10.9287C16.998 11.5991 16.4646 12.1426 15.7941 12.1426C15.1236 12.1426 14.5707 11.5991 14.5705 10.9287V4.14648L2.07244 16.6445C1.59837 17.1184 0.829804 17.1183 0.355642 16.6445C-0.118547 16.1703 -0.118547 15.4009 0.355642 14.9268L12.8537 2.42871H6.07049C5.40001 2.42868 4.85679 1.88528 4.85662 1.21484C4.85663 0.544257 5.3999 1.27214e-05 6.07049 0H15.7844Z" fill="#2FBD04" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0 }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M17 15.7853C17 16.4559 16.4568 17.0002 15.7861 17.0002H6.07129C5.40069 17.0001 4.85741 16.4657 4.85742 15.7951C4.85747 15.1246 5.40071 14.5715 6.07129 14.5715L12.8555 14.5715L0.355469 2.07245C-0.11833 1.59828 -0.118439 0.829751 0.355469 0.355653C0.829695 -0.118551 1.59902 -0.118551 2.07324 0.355653L14.5713 12.8537V6.07147C14.5713 5.40085 15.1155 4.85662 15.7861 4.85663C16.4568 4.85665 17 5.40086 17 6.07147V15.7853Z" fill="#CF0003" />
    </svg>
  );
}

function Sparkline({ points, positive, id }: { points: number[]; positive: boolean; id: string }) {
  const data = points.map((v, i) => ({ i, v }));
  const color = positive ? '#2FBD04' : '#CF0003';

  return (
    <div style={{ width: 120, height: 40, flexShrink: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.6} fill={`url(#${id})`} dot={false} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function PerformerRow({ ticker, name, pct, positive, points, index, variant }: {
  ticker: string; name: string; pct: string; positive: boolean; points: number[]; index: number; variant: 'best' | 'worst';
}) {
  const gradId = `perf-${variant}-${index}`;
  return (
    <div className={styles.performerRow}>
      <div className={styles.performerRank} data-variant={variant}>
        {index + 1}
      </div>
      <div className={styles.performerInfo}>
        <span className={styles.performerTicker}>{ticker}</span>
        <span className={styles.performerName}>{name}</span>
      </div>
      <Sparkline points={points} positive={positive} id={gradId} />
      <div className={styles.performerPct}>
        {positive ? <ArrowUp /> : <ArrowDown />}
        <span style={{ color: positive ? '#2FBD04' : '#CF0003' }}>{pct}</span>
      </div>
    </div>
  );
}

const sorted = [...PORTFOLIO_ITEMS].sort((a, b) => b.pctNum - a.pctNum);
const TOP = sorted.slice(0, 4);
const WORST = [...sorted].reverse().slice(0, 4);

export function BestPerformersPanel() {
  return (
    <GlassPanel className={styles.bottomPanel}>
      <div className={styles.performerPanel}>
        <p className={styles.performerLabel}>Melhores rendimentos</p>
        <div className={styles.performerList}>
          {TOP.map((item, i) => (
            <PerformerRow key={item.ticker} {...item} index={i} variant="best" />
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}

export function WorstPerformersPanel() {
  return (
    <GlassPanel className={styles.bottomPanel}>
      <div className={styles.performerPanel}>
        <p className={styles.performerLabel}>Piores rendimentos</p>
        <div className={styles.performerList}>
          {WORST.map((item, i) => (
            <PerformerRow key={item.ticker} {...item} index={i} variant="worst" />
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}
