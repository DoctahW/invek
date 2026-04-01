"use client";

import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleScreen = (toSignUp: boolean) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setIsSignUp(toSignUp);
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeOutLeft {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-100px);
          }
        }
        .fade-out-left {
          animation: fadeOutLeft 0.8s ease-out forwards;
        }

        @keyframes fadeOutRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100px);
          }
        }
        .fade-out-right {
          animation: fadeOutRight 0.8s ease-out forwards;
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }
      `}</style>

      <div className="h-screen w-screen bg-[#121212] flex overflow-x-hidden overflow-y-auto">
        <div className="flex w-full flex-col lg:flex-row h-full max-w-full">
          {/* FORMULÁRIO DE LOGIN */}
          <div
            className={`
            flex-1 flex items-center justify-center lg:p-12 p-10 overflow-hidden h-full max-w-full
            ${!isSignUp && !isTransitioning ? "fade-in-left" : ""}
            ${isTransitioning && !isSignUp ? "fade-out-left" : ""}
            ${isSignUp ? "hidden" : ""}
          `}
          >
            <LoginForm onToggleToSignUp={() => toggleScreen(true)} />
          </div>

          {/* IMAGEM DO LOGIN */}
          <div
            className={`
            flex-1 relative flex overflow-hidden
            ${!isSignUp && !isTransitioning ? "fade-in-right" : ""}
            ${isTransitioning && !isSignUp ? "fade-out-right" : ""}
            ${isSignUp ? "hidden" : "hidden lg:flex"}
          `}
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1767424196045-030bbde122a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGludmVzdG1lbnQlMjBmaW5hbmNpYWwlMjBjaGFydHxlbnwxfHx8fDE3NzQ4NzA5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Investment Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#121212]/90 via-[#121212]/70 to-transparent" />
            </div>
            <div className="relative z-10 flex flex-col justify-center px-16 text-white">
              <div className="max-w-xl">
                <h2 className="font-black text-[42px] leading-tight mb-6">
                  Invista com inteligência e segurança
                </h2>
                <p className="text-[18px] text-[#e0e0e0] mb-12 leading-relaxed">
                  Acesse sua carteira de investimentos, acompanhe seus ativos em
                  tempo real e tome decisões inteligentes para o seu futuro
                  financeiro.
                </p>
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <div className="font-black text-[36px] mb-1">R$ 2.5B+</div>
                    <div className="text-[14px] text-[#e0e0e0] opacity-70">
                      Volume Investido
                    </div>
                  </div>
                  <div>
                    <div className="font-black text-[36px] mb-1">150K+</div>
                    <div className="text-[14px] text-[#e0e0e0] opacity-70">
                      Investidores Ativos
                    </div>
                  </div>
                  <div>
                    <div className="font-black text-[36px] mb-1">24/7</div>
                    <div className="text-[14px] text-[#e0e0e0] opacity-70">
                      Suporte
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* IMAGEM DO CADASTRO */}
          <div
            className={`
            flex-1 relative overflow-hidden
            ${isSignUp && !isTransitioning ? "fade-in-left" : ""}
            ${isTransitioning && isSignUp ? "fade-out-left" : ""}
            ${!isSignUp ? "hidden" : "hidden lg:flex"}
          `}
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1767424196045-030bbde122a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGludmVzdG1lbnQlMjBmaW5hbmNpYWwlMjBjaGFydHxlbnwxfHx8fDE3NzQ4NzA5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Investment Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-bl from-[#121212]/90 via-[#121212]/70 to-transparent" />
            </div>
            <div className="relative z-10 flex flex-col justify-center px-16 text-white">
              <div className="max-w-xl">
                <h2 className="font-black text-[42px] leading-tight mb-6">
                  Comece sua jornada de investimentos
                </h2>
                <p className="text-[18px] text-[#e0e0e0] mb-12 leading-relaxed">
                  Cadastre-se gratuitamente e tenha acesso a ferramentas
                  profissionais de investimento e análise de mercado.
                </p>
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <div className="font-black text-[36px] mb-1">100%</div>
                    <div className="text-[14px] text-[#e0e0e0] opacity-70">
                      Gratuito
                    </div>
                  </div>
                  <div>
                    <div className="font-black text-[36px] mb-1">5 min</div>
                    <div className="text-[14px] text-[#e0e0e0] opacity-70">
                      Para Começar
                    </div>
                  </div>
                  <div>
                    <div className="font-black text-[36px] mb-1">Seguro</div>
                    <div className="text-[14px] text-[#e0e0e0] opacity-70">
                      e Protegido
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FORMULÁRIO DE CADASTRO */}
          <div
            className={`
            flex-1 flex items-center justify-center lg:p-12 p-10 overflow-hidden
            ${isTransitioning && isSignUp ? "fade-out-right" : ""}
            ${!isSignUp ? "hidden" : ""}
          `}
          >
            <div
              className={isSignUp && !isTransitioning ? "fade-in-right" : ""}
            >
              <SignUpForm onToggleToLogin={() => toggleScreen(false)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
