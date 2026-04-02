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
import type { InvestmentRow, PortfolioSummary } from "@/app/data/portfolio-db";
import { addInvestment, removeInvestment } from "./actions";
import styles from "./wallet.module.css";

const TIPOS = ["Ação", "Fundo", "Cripto", "Renda Fixa"] as const;

const CATEGORY_LABEL: Record<string, string> = {
  renda_fixa: "Renda Fixa",
  renda_variavel: "Renda Variável",
  cripto: "Cripto",
};

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

function AllocBar({ alloc }: { alloc: PortfolioSummary["alloc"] }) {
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

function DonutChart({ alloc, summary }: { alloc: PortfolioSummary["alloc"]; summary: PortfolioSummary }) {
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
            {summary.pct}
          </span>
          <span className="text-[15px] text-[#2FBD04]/60">
            {summary.return}
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

function formatValue(value: number | null): string {
  if (value === null) return "—";
  return (
    "R$ " +
    value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function formatPct(pctNum: number): string {
  const sign = pctNum >= 0 ? "+" : "−";
  const abs = Math.abs(pctNum).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${sign}${abs}%`;
}

function InvestmentRow({
  item,
  selectMode,
  selected,
  onToggle,
}: {
  item: InvestmentRow;
  selectMode: boolean;
  selected: boolean;
  onToggle: (id: string) => void;
}) {
  const { id, ticker, name, qty, currentValue, pctNum, positive, points } = item;
  const pct = formatPct(pctNum);
  const value = formatValue(currentValue);

  const rowContent = (
    <>
      {/* Mobile layout */}
      <div className="flex md:hidden items-center gap-3 px-3 h-16 w-full">
        {selectMode && (
          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? "bg-[#CF0003] border-[#CF0003]" : "border-white/30"}`}>
            {selected && <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[15px] text-white">{ticker}</p>
          <p className="text-[11px] text-white/50 truncate">{name}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[13px] font-semibold text-white">{value}</p>
          <div className="flex items-center gap-0.5 justify-end">
            {positive ? <ArrowUp /> : <ArrowDown />}
            <span className={`text-[12px] font-semibold whitespace-nowrap ${positive ? "text-[#2FBD04]" : "text-[#CF0003]"}`}>
              {pct}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div
        className="hidden md:grid items-center gap-4 px-4 h-17 w-full"
        style={{ gridTemplateColumns: selectMode ? "24px 140px 1fr auto auto" : "140px 1fr auto auto" }}
      >
        {selectMode && (
          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? "bg-[#CF0003] border-[#CF0003]" : "border-white/30"}`}>
            {selected && <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
        )}
        <div>
          <p className="font-bold text-[17px] text-white">{ticker}</p>
          <p className="text-[12px] text-white/50 truncate">{name}</p>
        </div>
        <div className="flex justify-center">
          <Sparkline points={points} positive={positive} />
        </div>
        <div className="text-right">
          <p className="text-[15px] font-semibold text-white">{value}</p>
          <p className="text-[12px] text-white/40">{qty ?? "—"}</p>
        </div>
        <div className="flex items-center gap-1 justify-end w-20">
          {positive ? <ArrowUp /> : <ArrowDown />}
          <span className={`text-[15px] font-semibold whitespace-nowrap ${positive ? "text-[#2FBD04]" : "text-[#CF0003]"}`}>
            {pct}
          </span>
        </div>
      </div>
    </>
  );

  if (selectMode) {
    return (
      <button
        onClick={() => onToggle(id)}
        className={`w-full rounded-xl p-2 text-left transition-colors ${selected ? "!bg-[#CF0003]/10 ring-1 ring-[#CF0003]/40" : "bg-[#121212] hover:bg-[#1a1a1a]"}`}
      >
        {rowContent}
      </button>
    );
  }

  return (
    <GlassPanel depth="deep" className="rounded-xl p-2 !bg-[#121212] hover:!bg-[#1a1a1a] transition-colors">
      {rowContent}
    </GlassPanel>
  );
}

type FormFields = {
  ticker: string;
  name: string;
  quantidade: string;
  preco: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

function validateFields(fields: FormFields, tipo: string): FormErrors {
  const errors: FormErrors = {};

  const ticker = fields.ticker.trim();
  if (!ticker) {
    errors.ticker = "Ticker obrigatório.";
  } else if (ticker.length > 10) {
    errors.ticker = "Ticker deve ter no máximo 10 caracteres.";
  } else if (!/^[A-Za-z0-9\s]+$/.test(ticker)) {
    errors.ticker = "Apenas letras e números.";
  }

  if (!fields.name.trim()) {
    errors.name = "Nome obrigatório.";
  } else if (fields.name.trim().length > 60) {
    errors.name = "Nome deve ter no máximo 60 caracteres.";
  }

  if (tipo === "Renda Fixa") {
    const val = parseFloat(fields.quantidade.replace(",", "."));
    if (!fields.quantidade.trim()) {
      errors.quantidade = "Valor aplicado obrigatório.";
    } else if (isNaN(val) || val <= 0) {
      errors.quantidade = "Informe um valor positivo.";
    }
  } else {
    const qty = parseFloat(fields.quantidade.replace(",", "."));
    if (!fields.quantidade.trim()) {
      errors.quantidade = "Quantidade obrigatória.";
    } else if (isNaN(qty) || qty <= 0) {
      errors.quantidade = "Informe uma quantidade positiva.";
    }

    const price = parseFloat(fields.preco.replace(",", "."));
    if (!fields.preco.trim()) {
      errors.preco = "Preço obrigatório.";
    } else if (isNaN(price) || price <= 0) {
      errors.preco = "Informe um preço positivo.";
    }
  }

  return errors;
}

function AddModal({ onClose }: { onClose: () => void }) {
  const [tipo, setTipo] = useState<string>("Ação");
  const [fields, setFields] = useState<FormFields>({
    ticker: "",
    name: "",
    quantidade: "",
    preco: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const isRendaFixa = tipo === "Renda Fixa";

  function handleChange(field: keyof FormFields, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
    if (touched[field]) {
      const newErrors = validateFields({ ...fields, [field]: value }, tipo);
      setErrors((e) => ({ ...e, [field]: newErrors[field] }));
    }
  }

  function handleBlur(field: keyof FormFields) {
    setTouched((t) => ({ ...t, [field]: true }));
    const newErrors = validateFields(fields, tipo);
    setErrors((e) => ({ ...e, [field]: newErrors[field] }));
  }

  function handleTipoChange(t: string) {
    setTipo(t);
    // Revalidar campos já tocados com o novo tipo
    if (Object.keys(touched).length > 0) {
      setErrors(validateFields(fields, t));
    }
  }

  async function handleSubmit() {
    const allTouched = { ticker: true, name: true, quantidade: true, preco: true };
    setTouched(allTouched);
    const newErrors = validateFields(fields, tipo);
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setSubmitting(true);
    setServerError(null);

    const quantidade = parseFloat(fields.quantidade.replace(",", "."));
    const preco = isRendaFixa ? 1 : parseFloat(fields.preco.replace(",", "."));

    const result = await addInvestment({
      ticker: fields.ticker,
      name: fields.name,
      tipo,
      quantidade,
      preco,
    });

    setSubmitting(false);

    if (result.success) {
      onClose();
    } else {
      setServerError(result.error);
    }
  }

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
                disabled={submitting}
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <GlassInput
                label="Código / Ticker"
                placeholder="ex: BPAC11"
                value={fields.ticker}
                onChange={(e) => handleChange("ticker", e.target.value)}
                onBlur={() => handleBlur("ticker")}
                error={errors.ticker}
                maxLength={10}
                disabled={submitting}
              />
              <GlassInput
                label="Nome"
                placeholder="ex: BTG Pactual"
                value={fields.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                error={errors.name}
                maxLength={60}
                disabled={submitting}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-white/60 uppercase tracking-wider">
                Tipo
              </label>
              <div className="flex gap-2 flex-wrap">
                {TIPOS.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTipoChange(t)}
                    disabled={submitting}
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

            {isRendaFixa ? (
              <GlassInput
                label="Valor Aplicado"
                placeholder="ex: 5000,00"
                suffix={<span className="text-white/40 text-sm">R$</span>}
                value={fields.quantidade}
                onChange={(e) => handleChange("quantidade", e.target.value)}
                onBlur={() => handleBlur("quantidade")}
                error={errors.quantidade}
                inputMode="decimal"
                disabled={submitting}
              />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <GlassInput
                  label="Quantidade"
                  placeholder="ex: 10"
                  value={fields.quantidade}
                  onChange={(e) => handleChange("quantidade", e.target.value)}
                  onBlur={() => handleBlur("quantidade")}
                  error={errors.quantidade}
                  inputMode="decimal"
                  disabled={submitting}
                />
                <GlassInput
                  label="Preço de Compra"
                  placeholder="ex: 33,20"
                  suffix={<span className="text-white/40 text-sm">R$</span>}
                  value={fields.preco}
                  onChange={(e) => handleChange("preco", e.target.value)}
                  onBlur={() => handleBlur("preco")}
                  error={errors.preco}
                  inputMode="decimal"
                  disabled={submitting}
                />
              </div>
            )}

            {serverError && (
              <p className="text-[13px] text-[#CF0003] bg-[#CF0003]/10 border border-[#CF0003]/20 rounded-lg px-3 py-2">
                {serverError}
              </p>
            )}

            <div className="flex gap-3 pt-1">
              <GlassButton
                variant="ghost"
                className="flex-1"
                onClick={onClose}
                disabled={submitting}
              >
                Cancelar
              </GlassButton>
              <GlassButton
                variant="primary"
                className="flex-1"
                onClick={handleSubmit}
                loading={submitting}
                disabled={submitting}
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

// ─── Agrupamento por categoria ────────────────────────────────────────────────

function groupByCategory(items: InvestmentRow[]) {
  const order = ["renda_fixa", "renda_variavel", "cripto"];
  const map = new Map<string, InvestmentRow[]>();
  for (const item of items) {
    if (!map.has(item.category)) map.set(item.category, []);
    map.get(item.category)!.push(item);
  }
  return order
    .filter((k) => map.has(k))
    .map((k) => ({ group: CATEGORY_LABEL[k] ?? k, items: map.get(k)! }));
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function WalletClient({
  investments,
  summary,
}: {
  investments: InvestmentRow[];
  summary: PortfolioSummary;
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showConfirm, setShowConfirm] = useState(false);
  const [removing, setRemoving] = useState(false);

  const groups = groupByCategory(investments);

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function exitSelectMode() {
    setSelectMode(false);
    setSelectedIds(new Set());
  }

  async function handleConfirmRemove() {
    setRemoving(true);
    await Promise.all([...selectedIds].map((id) => removeInvestment(id)));
    setRemoving(false);
    setShowConfirm(false);
    exitSelectMode();
  }

  const selectedItems = investments.filter((i) => selectedIds.has(i.id));

  return (
    <div className="bg-[#121212] text-white min-h-screen">
      <div className="px-6 pt-6 pb-16 md:px-16">
        <div className="flex items-center justify-between mb-6 max-w-175 mx-auto md:max-w-none">
          <h1 className="text-[28px] font-bold">Minha Carteira</h1>
          <div className="flex gap-2">
            {selectMode ? (
              <>
                <GlassButton variant="ghost" size="md" onClick={exitSelectMode} disabled={removing}>
                  Cancelar
                </GlassButton>
                <GlassButton
                  variant="danger"
                  size="md"
                  onClick={() => selectedIds.size > 0 && setShowConfirm(true)}
                  disabled={selectedIds.size === 0 || removing}
                >
                  Remover{selectedIds.size > 0 ? ` (${selectedIds.size})` : ""}
                </GlassButton>
              </>
            ) : (
              <>
                <GlassButton variant="ghost" size="md" onClick={() => setSelectMode(true)}>
                  Remover
                </GlassButton>
                <GlassButton variant="primary" size="md" onClick={() => setShowAddModal(true)}>
                  + Adicionar
                </GlassButton>
              </>
            )}
          </div>
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
                    {summary.total}
                  </p>
                </div>
                <div className="md:hidden flex flex-col gap-4">
                  <div className="flex items-center gap-1.5">
                    <ArrowUp />
                    <span className="text-[22px] font-bold text-[#2FBD04]">
                      {summary.pct}
                    </span>
                    <span className="text-[13px] text-[#2FBD04]/70 ml-1">
                      {summary.return}
                    </span>
                  </div>
                  <p className="text-[13px] text-white/40 -mt-2">
                    Investido: {summary.invested}
                  </p>
                  <div className="border-t border-white/10 pt-4">
                    <AllocBar alloc={summary.alloc} />
                  </div>
                </div>
                <div className="hidden md:flex flex-col flex-1">
                  <p className="text-[13px] text-white/40">
                    Investido: {summary.invested}
                  </p>
                  <div className="border-t border-white/10 mt-1" />
                  <div className="flex flex-col flex-1 justify-center">
                    <DonutChart alloc={summary.alloc} summary={summary} />
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>
          <div className="flex flex-col gap-6">
            {groups.map((group) => (
              <GlassPanel
                key={group.group}
                className="w-full rounded-[10px] overflow-hidden"
              >
                <div className="w-full p-6 bg-[#0B0B0B] border border-white/10 flex flex-col gap-3">
                  <h3 className="text-[22px] text-[#545454] font-semibold mb-1">
                    {group.group}
                  </h3>
                  {group.items.map((item) => (
                    <InvestmentRow
                      key={item.id}
                      item={item}
                      selectMode={selectMode}
                      selected={selectedIds.has(item.id)}
                      onToggle={toggleSelect}
                    />
                  ))}
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>

      {showAddModal && <AddModal onClose={() => setShowAddModal(false)} />}

      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => !removing && setShowConfirm(false)}
        >
          <div
            className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 w-full max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="text-[18px] font-bold text-white mb-1">
                Remover {selectedItems.length === 1 ? "investimento" : `${selectedItems.length} investimentos`}
              </h3>
              <p className="text-[14px] text-white/50 mb-3">
                Esta ação não pode ser desfeita.
              </p>
              <div className="flex flex-col gap-1.5">
                {selectedItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 text-[14px]">
                    <span className="font-semibold text-white">{item.ticker}</span>
                    <span className="text-white/40">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <GlassButton
                variant="ghost"
                className="flex-1"
                onClick={() => setShowConfirm(false)}
                disabled={removing}
              >
                Cancelar
              </GlassButton>
              <GlassButton
                variant="danger"
                className="flex-1"
                onClick={handleConfirmRemove}
                loading={removing}
                disabled={removing}
              >
                Remover
              </GlassButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
