'use client';
import { GlassPanel } from '@/app/components/glass/GlassPanel';
import styles from './investments.module.css';

const LOW_RISK = [
  { name: 'CRI Dasa IPCA', value: '+ 10,58%', logo: '/logos/dasa.jpg' },
  { name: 'CDB Banco XP S.A.', value: '150% CDI', logo: '/logos/xp.jpg' },
  { name: 'LCA Banco Inter IPCA', value: '+ 6,51%', logo: '/logos/inter.jpg' },
  { name: 'CRI Hapvida CDI', value: '+ 1,50%', logo: '/logos/hapvida.jpg' },
];

const HIGH_RISK = [
  { name: 'NATU3', value: '+ 12,12', logo: '/logos/natura.jpg' },
  { name: 'MGLU3', value: '+ 9,63', logo: '/logos/magalu.jpg' },
  { name: 'ASAI3', value: '+ 7,72', logo: '/logos/assai.jpg' },
  { name: 'B3SA3', value: '+ 8,27', logo: '/logos/b3.jpg' },
];

const RENDA_FIXA = [
  { ticker: 'CRA', name: 'Jalles Machado CDI', pct: '0.25%', positive: true, points: [5,7,4,8,6,9,7,8,6,9,8,10,8,9,10] },
  { ticker: 'IPCA+', name: 'Tesouro Direto', pct: '-0,58%', positive: false, points: [10,9,8,9,8,7,8,6,7,5,6,4,5,3,4] },
  { ticker: 'CRI', name: 'Smartfit CDI', pct: '0.05%', positive: true, points: [5,6,5,7,6,8,5,6,7,6,8,7,6,8,7] },
];

const RENDA_VARIAVEL = [
  { ticker: 'BPAC11', name: 'BANCO BTG PAC', pct: '0.51%', positive: true, points: [4,6,5,7,6,8,7,9,8,10,9,11,10,12,11] },
  { ticker: 'AZUL4', name: 'Azul Linhas Aéreas', pct: '−83,9%', positive: false, points: [12,11,10,9,8,7,6,5,4,3,2,2,1,1,1] },
  { ticker: 'IFCM3', name: 'Infracommerce', pct: '−54,9%', positive: false, points: [10,9,8,9,7,6,5,6,4,5,3,4,2,3,2] },
];

function ArrowUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.7844 0C16.455 8.2506e-06 16.9982 0.544244 16.9982 1.21484V10.9287C16.998 11.5991 16.4646 12.1426 15.7941 12.1426C15.1236 12.1426 14.5707 11.5991 14.5705 10.9287V4.14648L2.07244 16.6445C1.59837 17.1184 0.829804 17.1183 0.355642 16.6445C-0.118547 16.1703 -0.118547 15.4009 0.355642 14.9268L12.8537 2.42871H6.07049C5.40001 2.42868 4.85679 1.88528 4.85662 1.21484C4.85663 0.544257 5.3999 1.27214e-05 6.07049 0H15.7844Z" fill="#2FBD04"/>
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M17 15.7853C17 16.4559 16.4568 17.0002 15.7861 17.0002H6.07129C5.40069 17.0001 4.85741 16.4657 4.85742 15.7951C4.85747 15.1246 5.40071 14.5715 6.07129 14.5715L12.8555 14.5715L0.355469 2.07245C-0.11833 1.59828 -0.118439 0.829751 0.355469 0.355653C0.829695 -0.118551 1.59902 -0.118551 2.07324 0.355653L14.5713 12.8537V6.07147C14.5713 5.40085 15.1155 4.85662 15.7861 4.85663C16.4568 4.85665 17 5.40086 17 6.07147V15.7853Z" fill="#CF0003"/>
    </svg>
  );
}

function Sparkline({ points, positive }: { points: number[]; positive: boolean }) {
  const w = 200, h = 48, pad = 3;
  const min = Math.min(...points), max = Math.max(...points), range = max - min || 1;
  const xs = points.map((_, i) => pad + (i / (points.length - 1)) * (w - pad * 2));
  const ys = points.map((p) => h - pad - ((p - min) / range) * (h - pad * 2));
  const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ flexShrink: 0 }}>
      <path d={d} fill="none" stroke={positive ? '#2FBD04' : '#CF0003'} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function AssetPill({ name, value, logo }: { name: string; value: string; logo: string }) {
  return (
    <GlassPanel className={styles.pill}>
      <img src={logo} alt={name} style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0 }} />
      <span style={{ flex: 1, color: 'white', fontSize: 20, fontWeight: 700 }}>{name}</span>
      <span style={{ color: '#00A63E', fontSize: 20, fontWeight: 700, whiteSpace: 'nowrap' }}>{value}</span>
    </GlassPanel>
  );
}

function InvestmentRow({ ticker, name, pct, positive, points }: {
  ticker: string; name: string; pct: string; positive: boolean; points: number[];
}) {
  return (
    <GlassPanel className={styles.row}>
      <div style={{ padding: '0 16px' }}>
        <p style={{ color: 'white', fontSize: 20, fontWeight: 900, margin: 0 }}>{ticker}</p>
        <p style={{ color: '#BDBDBD', fontSize: 14, fontWeight: 500, margin: '3px 0 0' }}>{name}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Sparkline points={points} positive={positive} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
        {positive ? <ArrowUp /> : <ArrowDown />}
        <span style={{ color: positive ? '#2FBD04' : '#CF0003', fontSize: 18, fontWeight: 600, whiteSpace: 'nowrap' }}>
          {pct}
        </span>
      </div>
    </GlassPanel>
  );
}

export default function InvestmentsPage() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#121212', padding: '28px 120px 60px', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}>

      <h1 style={{ color: 'white', fontSize: 48, fontWeight: 700, margin: '0 0 20px' }}>
        Outros Investimentos
      </h1>

      <GlassPanel className={styles.page}>
        <div style={{ paddingRight: 20 }}>
          <p style={{ color: 'rgba(255,255,255,0.30)', fontSize: 24, fontWeight: 700, margin: '0 0 12px' }}>
            Rendimento - Baixo risco
          </p>
          {LOW_RISK.map((a) => <AssetPill key={a.name} {...a} />)}
        </div>

        <div style={{ width: '1px', background: 'rgba(255,255,255,0.20)', alignSelf: 'stretch' }} />

        <div style={{ paddingLeft: 20 }}>
          <p style={{ color: 'rgba(255,255,255,0.30)', fontSize: 24, fontWeight: 700, margin: '0 0 12px' }}>
            Rendimento - Alto risco
          </p>
          {HIGH_RISK.map((a) => <AssetPill key={a.name} {...a} />)}
        </div>
      </GlassPanel>

      <GlassPanel className={styles.fixva}>
        <h2 style={{ color: 'rgba(255,255,255,0.30)', fontSize: 48, fontWeight: 700, margin: '0 0 14px' }}>
          Renda Fixas
        </h2>
        {RENDA_FIXA.map((inv) => <InvestmentRow key={inv.ticker} {...inv} />)}

        <h2 style={{ color: 'rgba(255,255,255,0.30)', fontSize: 48, fontWeight: 700, margin: '24px 0 14px' }}>
          Renda Variavel
        </h2>
        {RENDA_VARIAVEL.map((inv) => <InvestmentRow key={inv.ticker} {...inv} />)}
      </GlassPanel>

    </div>
  );
}
