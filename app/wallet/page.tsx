//rota para acessar a página: /wallet
'use client';

import { useState, useEffect } from "react";

const CRYPTOS = [
  {name: 'Bitcoin', symbol: 'BTC', value: 'R$ 353.909,74', change: '-0.15%', positive: false },
  {name: 'Ethereum', symbol: 'ETH', value: 'R$ 11.004,21', change: '+0.64%', positive: true },
  {name: 'Solana', symbol: 'SOL', value: 'R$ 429,61', change: '-0.48%', positive: false},
]

export default function Wallet() {
  useEffect(() => {
    // ainda não implementado
  }, []);

  return (
  <div className="min-h-screen bg-[#121212] text-white">

    {/* HEADER */}
    <div className="flex items-center px-10 py-6 border-b border-white/10">
      <h1 className="text-[28px] font-black tracking-tight">INVEK</h1>

      <div className="flex gap-8 text-[14px] text-white/70 ml-auto">
        <span className="hover:text-white cursor-pointer">Home</span>
        <span className="hover:text-white cursor-pointer">Criptomoedas</span>
        <span className="hover:text-white cursor-pointer">Tesouro Direto</span>
        <span className="hover:text-white cursor-pointer">FIIs</span>
      </div>

      <div className="w-10 h-10 rounded-full bg-white/20 ml-6" />
    </div>

    <div className="px-10 py-10 flex flex-col items-center">

      <div className="w-full max-w-[700px]">
        <h2 className="text-[28px] font-bold mb-6">
          Carteira
        </h2>
      </div>

      <div className="w-full max-w-[700px] bg-[#0A0A0A] p-6 rounded-[20px] h-[410px]">
        <h3 className="text-[27px] text-[#545454] font-semibold mb-4">
          Criptomoedas
        </h3>
        <div className="space-y-6">
          {CRYPTOS.map((crypto, index) => (
        <div 
          key={index}
          className="flex items-center justify-between p-4 rounded-xl bg-[#121212]"
        >
          {/* lado esquerdo */}
          <div className="flex items-center gap-4">

            <div>
              <p className="font-semibold">{crypto.symbol}</p>
              <p className="text-sm text-white/50">{crypto.name}</p>
            </div>
          </div>

          {/* lado direito */}
          <div className="text-right">
            <p className="font-semibold">{crypto.value}</p>
            <p className={`text-sm ${crypto.positive ? 'text-[#2FBD04]' : 'text-[#CF0003]'}`}>
              {crypto.change}
          </p>
          </div>
        </div>
      ))}
    </div>
      </div>

    </div>

  </div>
  );
}

