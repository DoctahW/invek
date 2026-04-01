"use client";

import React, {useState} from 'react';
import { Investimento } from '@/types/investimento';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PLACEHOLDERS: Partial<Investimento>[] = [
    {codigo:'BTC', nome: 'Bitcoin', tipo: 'Cripto' },
    {codigo: 'VALE3', nome: 'Vale S.A.', tipo: 'Ação'},
    {codigo: 'BCFF11', nome: 'BTG Pactual', tipo: 'Fundo'}
]


export default function MenuPage(){
    const [meusInvestimentos, novoInvestimento] = useState<Investimento[]>([]);

    const adicionarInvestimento = (template: Partial<Investimento>) => {
        // Criamos um histórico fictício para fins de visualização do gráfico
        const historicoFicticio = [
            { data: 'Jan', preco: Math.random() * 100 },
            { data: 'Fev', preco: Math.random() * 100 },
            { data: 'Mar', preco: Math.random() * 100 },
            { data: 'Abr', preco: 100 },
        ];

        const novo: Investimento = {
            id: Math.random().toString(),
            codigo: template.codigo!,
            nome: template.nome!,
            quantidade: 0,
            precocompra: 0,
            precoatual: 100,
            tipo: template.tipo as any,
            histprecos: historicoFicticio
        };
        novoInvestimento([...meusInvestimentos, novo]);
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white p-8 w-full">
            <h1 className="text-3xl font-black mb-8">Meus Investimentos</h1>

            {/* Seção de Adicionar (Placeholders) */}
            <div className="mb-12">
                <h2 className="text-sm font-medium opacity-60 mb-4 uppercase tracking-widest">Disponíveis para adicionar</h2>
                <div className="flex gap-4">
                    {PLACEHOLDERS.map((item) => (
                        <button
                            key={item.codigo}
                            onClick={() => adicionarInvestimento(item)}
                            className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all backdrop-blur-md"
                        >
                            + {item.codigo} ({item.tipo})
                        </button>
                    ))}
                </div>
            </div>

            {/* Lista de Investimentos Adicionados */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meusInvestimentos.length === 0 ? (
                    <p className="opacity-40">Nenhum investimento na sua carteira.</p>
                ) : (
                    meusInvestimentos.map((inv) => (
                        <div 
                            key={inv.id} 
                            className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-lg"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold">{inv.codigo}</h3>
                                    <p className="text-sm opacity-60">{inv.nome}</p>
                                </div>
                                <span className="px-2 py-1 bg-white/10 rounded-lg text-[10px] font-bold uppercase">
                                    {inv.tipo}
                                </span>
                            </div>
                            <div className="text-2xl font-black text-green-400">
                                R$ {inv.precoatual.toFixed(2)}
                            </div>

                            {/* Container do Gráfico */}
                            <div className="h-32 w-full mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={inv.histprecos}>
                                        {/* A linha que representa o preço */}
                                        <Line 
                                            type="monotone" 
                                            dataKey="preco" 
                                            stroke="#4ade80" 
                                            strokeWidth={2} 
                                            dot={false} 
                                        />
                                        {/* Tooltip mostra o valor ao passar o mouse */}
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                                            itemStyle={{ color: '#4ade80' }}
                                        />
                                        {/* Eixos ocultos para um visual mais limpo (estilo Sparkline) */}
                                        <XAxis dataKey="data" hide />
                                        <YAxis hide domain={['auto', 'auto']} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
