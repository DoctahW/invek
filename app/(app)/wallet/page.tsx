//'use client' - rota: /wallet
"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { GlassPanel } from "@/app/components/glass/GlassPanel";
import { GlassButton } from "@/app/components/glass/GlassButton";
import { GlassInput } from "@/app/components/glass/GlassInput";
import { PORTFOLIO_SUMMARY } from "@/app/data/portfolio";
import styles from "./wallet.module.css";

const PORTFOLIO = [
  {
    group: "Renda Fixa",
    items: [
      {
        ticker: "CDB XP",
        name: "CDB Banco XP S.A.",
        qty: "R$ 5.000",
        value: "R$ 5.410,00",
        pct: "+8,20%",
        positive: true,
        points: [5, 6, 5, 7, 6, 8, 7, 9, 8, 9, 9, 10, 10, 11, 11],
      },
      {
        ticker: "CRI",
        name: "Dasa IPCA",
        qty: "R$ 3.000",
        value: "R$ 3.317,40",
        pct: "+10,58%",
        positive: true,
        points: [5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12],
      },
    ],
  },
  {
    group: "Renda Variável",
    items: [
      {
        ticker: "BPAC11",
        name: "Banco BTG Pactual",
        qty: "15 cotas",
        value: "R$ 498,00",
        pct: "+10,67%",
        positive: true,
        points: [4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11],
      },
      {
        ticker: "NATU3",
        name: "Natura &Co",
        qty: "50 ações",
        value: "R$ 796,00",
        pct: "+12,11%",
        positive: true,
        points: [5, 7, 4, 8, 6, 9, 7, 8, 6, 9, 8, 10, 8, 9, 10],
      },
      {
        ticker: "AZUL4",
        name: "Azul Linhas Aéreas",
        qty: "30 ações",
        value: "R$ 108,60",
        pct: "−83,9%",
        positive: false,
        points: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 2, 1, 1, 1],
      },
    ],
  },
  {
    group: "Cripto",
    items: [
      {
        ticker: "BTC",
        name: "Bitcoin",
        qty: "0,05 BTC",
        value: "R$ 17.695,49",
        pct: "+10,60%",
        positive: true,
        points: [5, 7, 4, 8, 6, 9, 7, 8, 6, 9, 8, 10, 8, 9, 10],
      },
      {
        ticker: "ETH",
        name: "Ethereum",
        qty: "0,30 ETH",
        value: "R$ 3.301,26",
        pct: "+15,83%",
        positive: true,
        points: [4, 5, 5, 6, 7, 7, 8, 9, 9, 10, 11, 11, 12, 13, 13],
      },
      {
        ticker: "SOL",
        name: "Solana",
        qty: "5 SOL",
        value: "R$ 2.148,05",
        pct: "−4,82%",
        positive: false,
        points: [10, 9, 8, 9, 8, 7, 8, 6, 7, 5, 6, 4, 5, 3, 4],
      },
    ],
  },
];

const SUMMARY = PORTFOLIO_SUMMARY;

const TIPOS = ["Ação", "Fundo", "Cripto", "Renda Fixa"] as const;

// ─── Sub-componentes ─────────────────────────────────────────────────────────

function ArrowUp() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 17 17"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.7844 0C16.455 8.2506e-06 16.9982 0.544244 16.9982 1.21484V10.9287C16.998 11.5991 16.4646 12.1426 15.7941 12.1426C15.1236 12.1426 14.5707 11.5991 14.5705 10.9287V4.14648L2.07244 16.6445C1.59837 17.1184 0.829804 17.1183 0.355642 16.6445C-0.118547 16.1703 -0.118547 15.4009 0.355642 14.9268L12.8537 2.42871H6.07049C5.40001 2.42868 4.85679 1.88528 4.85662 1.21484C4.85663 0.544257 5.3999 1.27214e-05 6.07049 0H15.7844Z"
        fill="#2FBD04"
      />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 17 17"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 15.7853C17 16.4559 16.4568 17.0002 15.7861 17.0002H6.07129C5.40069 17.0001 4.85741 16.4657 4.85742 15.7951C4.85747 15.1246 5.40071 14.5715 6.07129 14.5715L12.8555 14.5715L0.355469 2.07245C-0.11833 1.59828 -0.118439 0.829751 0.355469 0.355653C0.829695 -0.118551 1.59902 -0.118551 2.07324 0.355653L14.5713 12.8537V6.07147C14.5713 5.40085 15.1155 4.85662 15.7861 4.85663C16.4568 4.85665 17 5.40086 17 6.07147V15.7853Z"
        fill="#CF0003"
      />
    </svg>
  );
}

function Sparkline({
  points,
  positive,
  width = 160,
  height = 48,
}: {
  points: number[];
  positive: boolean;
  width?: number;
  height?: number;
}) {
  const data = points.map((v, i) => ({ i, v }));
  const color = positive ? "#2FBD04" : "#CF0003";
  const gradId = positive ? "sg-pos" : "sg-neg";

  return (
    <div style={{ width, height, flexShrink: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.8}
            fill={`url(#${gradId})`}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function AllocBar({ alloc }: { alloc: typeof SUMMARY.alloc }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex h-2 w-full rounded-full overflow-hidden gap-0.5">
        {alloc.map((a) => (
          <div
            key={a.label}
            style={{ width: `${a.pct}%`, background: a.color }}
          />
        ))}
      </div>
      <div className="flex gap-4">
        {alloc.map((a) => (
          <div key={a.label} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: a.color }}
            />
            <span className="text-xs text-white/50">{a.label}</span>
            <span className="text-xs text-white/70 font-semibold">
              {a.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutChart({ alloc }: { alloc: typeof SUMMARY.alloc }) {
  const data = alloc.map((a) => ({
    name: a.label,
    value: a.pct,
    color: a.color,
  }));
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="relative w-full h-210">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={245}
              outerRadius={320}
              dataKey="value"
              stroke="none"
              paddingAngle={3}
              shape={(props: any) => (
                <Sector {...props} fill={data[props.index].color} />
              )}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Label central */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[14px] text-white/40 uppercase tracking-wider">
            retorno
          </span>
          <span className="text-[42px] font-black text-[#2FBD04] leading-tight">
            {SUMMARY.pct}
          </span>
          <span className="text-[15px] text-[#2FBD04]/60">
            {SUMMARY.return}
          </span>
        </div>
      </div>
      {/* Legenda */}
      <div className="flex flex-col gap-2 w-full">
        {alloc.map((a) => (
          <div key={a.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: a.color }}
              />
              <span className="text-sm text-white/50">{a.label}</span>
            </div>
            <span className="text-sm text-white/70 font-semibold">
              {a.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvestmentRow({
  ticker,
  name,
  qty,
  value,
  pct,
  positive,
  points,
}: {
  ticker: string;
  name: string;
  qty: string;
  value: string;
  pct: string;
  positive: boolean;
  points: number[];
}) {
  return (
    <GlassPanel
      depth="deep"
      className="rounded-xl p-2 !bg-[#121212] hover:!bg-[#1a1a1a] transition-colors"
    >
      {/* Mobile layout */}
      <div className="flex md:hidden items-center gap-3 px-3 h-16 w-full">
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[15px] text-white">{ticker}</p>
          <p className="text-[11px] text-white/50 truncate">{name}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[13px] font-semibold text-white">{value}</p>
          <div className="flex items-center gap-0.5 justify-end">
            {positive ? <ArrowUp /> : <ArrowDown />}
            <span
              className={`text-[12px] font-semibold whitespace-nowrap ${positive ? "text-[#2FBD04]" : "text-[#CF0003]"}`}
            >
              {pct}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div
        className="hidden md:grid items-center gap-4 px-4 h-17 w-full"
        style={{ gridTemplateColumns: "140px 1fr auto auto" }}
      >
        <div>
          <p className="font-bold text-[17px] text-white">{ticker}</p>
          <p className="text-[12px] text-white/50 truncate">{name}</p>
        </div>
        <div className="flex justify-center">
          <Sparkline points={points} positive={positive} />
        </div>
        <div className="text-right">
          <p className="text-[15px] font-semibold text-white">{value}</p>
          <p className="text-[12px] text-white/40">{qty}</p>
        </div>
        <div className="flex items-center gap-1 justify-end w-20">
          {positive ? <ArrowUp /> : <ArrowDown />}
          <span
            className={`text-[15px] font-semibold whitespace-nowrap ${positive ? "text-[#2FBD04]" : "text-[#CF0003]"}`}
          >
            {pct}
          </span>
        </div>
      </div>
    </GlassPanel>
  );
}

function AddModal({ onClose }: { onClose: () => void }) {
  const [tipo, setTipo] = useState<string>("Ação");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <GlassPanel className="w-full max-w-120 mx-4 rounded-2xl overflow-hidden">
          <div className="p-6 bg-[#0d0d0d] border border-white/10 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-bold text-white">
                Adicionar Investimento
              </h2>
              <button
                onClick={onClose}
                className="text-white/40 hover:text-white/80 transition-colors text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <GlassInput label="Código / Ticker" placeholder="ex: BPAC11" />
              <GlassInput label="Nome" placeholder="ex: BTG Pactual" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-white/60 uppercase tracking-wider">
                Tipo
              </label>
              <div className="flex gap-2 flex-wrap">
                {TIPOS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipo(t)}
                    className={`px-4 py-1.5 rounded-xl text-sm font-semibold border transition-all ${
                      tipo === t
                        ? "bg-white/15 border-white/30 text-white"
                        : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <GlassInput
                label="Quantidade"
                placeholder="ex: 10"
                type="number"
              />
              <GlassInput
                label="Preço de Compra"
                placeholder="ex: 33,20"
                suffix={<span className="text-white/40 text-sm">R$</span>}
                type="number"
              />
            </div>

            <div className="flex gap-3 pt-1">
              <GlassButton variant="ghost" className="flex-1" onClick={onClose}>
                Cancelar
              </GlassButton>
              <GlassButton
                variant="primary"
                className="flex-1"
                onClick={onClose}
              >
                Adicionar
              </GlassButton>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}

export default function WalletPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-[#121212] text-white min-h-screen">
      <div className="px-6 pt-6 pb-16 md:px-16">
        <div className="flex items-center justify-between mb-6 max-w-175 mx-auto md:max-w-none">
          <h1 className="text-[28px] font-bold">Minha Carteira</h1>
          <GlassButton
            variant="primary"
            size="md"
            onClick={() => setShowModal(true)}
          >
            + Adicionar
          </GlassButton>
        </div>
        <div
          className="flex flex-col gap-6 max-w-175 mx-auto md:max-w-none md:grid md:items-stretch"
          style={{ gridTemplateColumns: "minmax(0,2fr) minmax(0,3fr)" }}
        >
          <div className="md:h-full">
            <GlassPanel className="w-full rounded-[10px] overflow-hidden md:h-full">
              <div className="w-full h-full p-6 bg-[#0B0B0B] border border-white/10 flex flex-col gap-5">
                <div>
                  <p className="text-[13px] text-white/40 uppercase tracking-wider mb-1">
                    Patrimônio total
                  </p>
                  <p className="text-[38px] font-black text-white leading-none">
                    {SUMMARY.total}
                  </p>
                </div>
                <div className="md:hidden flex flex-col gap-4">
                  <div className="flex items-center gap-1.5">
                    <ArrowUp />
                    <span className="text-[22px] font-bold text-[#2FBD04]">
                      {SUMMARY.pct}
                    </span>
                    <span className="text-[13px] text-[#2FBD04]/70 ml-1">
                      {SUMMARY.return}
                    </span>
                  </div>
                  <p className="text-[13px] text-white/40 -mt-2">
                    Investido: {SUMMARY.invested}
                  </p>
                  <div className="border-t border-white/10 pt-4">
                    <AllocBar alloc={SUMMARY.alloc} />
                  </div>
                </div>
                <div className="hidden md:flex flex-col flex-1">
                  <p className="text-[13px] text-white/40">
                    Investido: {SUMMARY.invested}
                  </p>
                  <div className="border-t border-white/10 mt-1" />
                  <div className="flex flex-col flex-1 justify-center">
                    <DonutChart alloc={SUMMARY.alloc} />
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>
          <div className="flex flex-col gap-6">
            {PORTFOLIO.map((group) => (
              <GlassPanel
                key={group.group}
                className="w-full rounded-[10px] overflow-hidden"
              >
                <div className="w-full p-6 bg-[#0B0B0B] border border-white/10 flex flex-col gap-3">
                  <h3 className="text-[22px] text-[#545454] font-semibold mb-1">
                    {group.group}
                  </h3>
                  {group.items.map((item) => (
                    <InvestmentRow key={item.ticker} {...item} />
                  ))}
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>

      {showModal && <AddModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
