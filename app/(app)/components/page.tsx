"use client";

import { useState } from "react";
import { Bell, Download, Plus, Trash2, ArrowRight } from "lucide-react";
import { GlassButton } from "@/app/components/glass/GlassButton";

export default function ComponentsPage() {
  const [loading, setLoading] = useState(false);

  function simulateLoading() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  return (
    <div className="min-h-screen p-12 flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h2 className="text-white/40 text-sm font-medium tracking-widest uppercase">
          Variantes
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <GlassButton variant="primary">Primary</GlassButton>
          <GlassButton variant="ghost">Ghost</GlassButton>
          <GlassButton variant="danger">Danger</GlassButton>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-white/40 text-sm font-medium tracking-widest uppercase">
          Tamanhos
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <GlassButton size="sm">Small</GlassButton>
          <GlassButton size="md">Medium</GlassButton>
          <GlassButton size="lg">Large</GlassButton>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <GlassButton variant="ghost" size="sm">
            Small
          </GlassButton>
          <GlassButton variant="ghost" size="md">
            Medium
          </GlassButton>
          <GlassButton variant="ghost" size="lg">
            Large
          </GlassButton>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <GlassButton variant="danger" size="sm">
            Small
          </GlassButton>
          <GlassButton variant="danger" size="md">
            Medium
          </GlassButton>
          <GlassButton variant="danger" size="lg">
            Large
          </GlassButton>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-white/40 text-sm font-medium tracking-widest uppercase">
          Com ícones
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <GlassButton variant="primary">
            <Plus size={16} /> Novo aporte
          </GlassButton>
          <GlassButton variant="ghost">
            <Download size={16} /> Exportar
          </GlassButton>
          <GlassButton variant="danger">
            <Trash2 size={16} /> Remover posição
          </GlassButton>
          <GlassButton variant="ghost">
            Ver detalhes <ArrowRight size={16} />
          </GlassButton>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <GlassButton
            variant="primary"
            size="sm"
            aria-label="Notificações"
            className="w-[36px] !px-0"
          >
            <Bell size={16} />
          </GlassButton>
          <GlassButton
            variant="ghost"
            size="md"
            aria-label="Notificações"
            className="w-[52px] !px-0"
          >
            <Bell size={20} />
          </GlassButton>
          <GlassButton
            variant="ghost"
            size="lg"
            aria-label="Notificações"
            className="w-[60px] !px-0"
          >
            <Bell size={22} />
          </GlassButton>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-white/40 text-sm font-medium tracking-widest uppercase">
          Loading
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <GlassButton variant="primary" loading>
            Confirmando…
          </GlassButton>
          <GlassButton variant="ghost" loading>
            Carregando…
          </GlassButton>
          <GlassButton variant="danger" loading>
            Removendo…
          </GlassButton>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <GlassButton
            variant="primary"
            loading={loading}
            onClick={simulateLoading}
          >
            {loading ? "Processando…" : "Testar loading (2s)"}
          </GlassButton>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-white/40 text-sm font-medium tracking-widest uppercase">
          Disabled
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <GlassButton variant="primary" disabled>
            Primary
          </GlassButton>
          <GlassButton variant="ghost" disabled>
            Ghost
          </GlassButton>
          <GlassButton variant="danger" disabled>
            Danger
          </GlassButton>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-white/40 text-sm font-medium tracking-widest uppercase">
          Como link (Next.js Link)
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <GlassButton href="/dashboard" variant="primary">
            Ir para Dashboard
          </GlassButton>
          <GlassButton href="/dashboard" variant="ghost">
            Dashboard <ArrowRight size={16} />
          </GlassButton>
        </div>
      </section>
    </div>
  );
}
