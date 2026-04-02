// Fonte de dados compartilhada entre Dashboard e Carteira

export const PORTFOLIO_SUMMARY = {
  total:    'R$ 33.274,80',
  totalNum: 33274.80,
  invested: 'R$ 29.830,00',
  return:   '+R$ 3.444,80',
  pct:      '+11,55%',
  alloc: [
    { label: 'Renda Fixa',     pct: 26, color: '#6366f1' },
    { label: 'Renda Variável', pct: 42, color: '#2FBD04' },
    { label: 'Cripto',         pct: 32, color: '#f59e0b' },
  ],
};

// Todos os investimentos da carteira (compartilhado entre Dashboard e Carteira)
export const PORTFOLIO_ITEMS = [
  { ticker: 'ETH',    name: 'Ethereum',          pct: '+15,83%', pctNum: 15.83,  positive: true,  points: [4,5,5,6,7,7,8,9,9,10,11,11,12,13,13] },
  { ticker: 'NATU3',  name: 'Natura &Co',         pct: '+12,11%', pctNum: 12.11,  positive: true,  points: [5,7,4,8,6,9,7,8,6,9,8,10,8,9,10] },
  { ticker: 'BPAC11', name: 'Banco BTG Pactual',  pct: '+10,67%', pctNum: 10.67,  positive: true,  points: [4,6,5,7,6,8,7,9,8,10,9,11,10,12,11] },
  { ticker: 'BTC',    name: 'Bitcoin',             pct: '+10,60%', pctNum: 10.60,  positive: true,  points: [5,7,4,8,6,9,7,8,6,9,8,10,8,9,10] },
  { ticker: 'CRI',    name: 'Dasa IPCA',           pct: '+10,58%', pctNum: 10.58,  positive: true,  points: [5,6,6,7,7,8,8,9,9,10,10,11,11,12,12] },
  { ticker: 'CDB XP', name: 'CDB Banco XP S.A.',  pct: '+8,20%',  pctNum: 8.20,   positive: true,  points: [5,6,5,7,6,8,7,9,8,9,9,10,10,11,11] },
  { ticker: 'SOL',    name: 'Solana',              pct: '−4,82%',  pctNum: -4.82,  positive: false, points: [10,9,8,9,8,7,8,6,7,5,6,4,5,3,4] },
  { ticker: 'AZUL4',  name: 'Azul Linhas Aéreas', pct: '−83,9%',  pctNum: -83.9,  positive: false, points: [12,11,10,9,8,7,6,5,4,3,2,2,1,1,1] },
];

// Histórico semanal do patrimônio (últimos 7 dias)
export const PORTFOLIO_CHART_DATA = [
  { date: 'MAR 25', value: 29830 },
  { date: 'MAR 26', value: 30410 },
  { date: 'MAR 27', value: 31250 },
  { date: 'MAR 28', value: 30780 },
  { date: 'MAR 29', value: 31900 },
  { date: 'MAR 30', value: 32560 },
  { date: 'MAR 31', value: 33274 },
];
