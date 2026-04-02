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
