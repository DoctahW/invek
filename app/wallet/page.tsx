//rota para acessar a página: /wallet/
'use client';

import { useState, useEffect } from "react";

type Crypto = {
  name: string;
  symbol: string;
  value: string;
  positive: boolean;
};

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

    {/* CONTEÚDO */}
    <div className="px-10 py-10 flex flex-col items-center">

      <div className="w-full max-w-[700px]">
        <h2 className="text-[28px] font-bold mb-6">
          Carteira
        </h2>
      </div>

      <div className="w-full max-w-[700px] bg-[#0A0A0A] backdrop-blur-[6px] p-6 rounded-[20px] border border-white/10">
        <h3 className="text-[20px] font-semibold mb-4">
          Criptomoedas
        </h3>
      </div>

    </div>

  </div>
  );
}