"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { GlassInput } from "@/app/components/glass/GlassInput";
import { GlassButton } from "@/app/components/glass/GlassButton";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFormEmpty = isSignUp
    ? !signUpData.name || !signUpData.email || !signUpData.password
    : !formData.email || !formData.password;
  const toggleScreen = (toSignUp: boolean) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setIsSignUp(toSignUp);
      setIsTransitioning(false);
    }, 800);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUpChange = (e: any) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError(error.message || "Erro ao fazer login");
    } else {
      router.push("/dashboard");
      router.refresh();
    }

    setLoading(false);
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await authClient.signUp.email({
      name: signUpData.name,
      email: signUpData.email,
      password: signUpData.password,
    });

    if (error) {
      setError(error.message || "Erro ao criar conta");
    } else {
      toggleScreen(false);
    }

    setLoading(false);
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
        {/* CONTAINER PRINCIPAL */}
        <div className="flex w-full flex-col lg:flex-row h-full max-w-full">
          {/* ========== LADO ESQUERDO ========== */}
          {/* FORMULÁRIO DE LOGIN - aparece no lado esquerdo */}
          <div
            className={`
            flex-1 flex items-center justify-center lg:p-12 p-10 overflow-hidden h-full max-w-full
            ${!isSignUp && !isTransitioning ? "fade-in-left" : ""}
            ${isTransitioning && !isSignUp ? "fade-out-left" : ""}
            ${isSignUp ? "hidden" : ""}
          `}
          >
            <div className="w-full max-w-[480px] mx-auto">
              <div>
                {/* Logo */}
                <div className="mb-12">
                  <h1 className="font-black text-[48px] text-white tracking-tight">
                    INVEK
                  </h1>
                </div>

                <div className="mb-10">
                  <h2 className="font-extrabold text-[32px] text-white mb-3">
                    Bem-vindo de volta
                  </h2>
                  <p className="text-[#e0e0e0] text-[16px] opacity-70">
                    Entre na sua conta para acessar seus investimentos
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <GlassInput
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="seu@email.com"
                    icon={<Mail size={20} />}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-medium text-[#e0e0e0]">
                        Senha
                      </span>
                      <button
                        type="button"
                        className="text-[14px] text-white hover:opacity-80 transition-opacity"
                      >
                        Esqueceu a senha?
                      </button>
                    </div>
                    <GlassInput
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      icon={<Lock size={20} />}
                      suffix={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      }
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/50 rounded-[16px] p-3">
                      <p className="text-red-400 text-[14px] text-center">
                        {error}
                      </p>
                    </div>
                  )}

                  <GlassButton
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={loading}
                    disabled={isFormEmpty}
                    className="w-full"
                  >
                    {loading ? "Entrando..." : "Entrar"}
                  </GlassButton>
                </form>

                <div className="text-center mt-8">
                  <p className="text-[14px] text-[#e0e0e0]">
                    Não tem uma conta?{" "}
                    <button
                      onClick={() => toggleScreen(true)}
                      className="text-white hover:opacity-80 font-medium transition-opacity"
                    >
                      Criar conta
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ========== LADO DIREITO ========== */}
          {/* IMAGEM DO LOGIN - aparece no lado direito */}
          <div
            className={`
              flex-1 relative flex overflow-hidden
            ${!isSignUp && !isTransitioning ? "fade-in-right" : ""}
            ${isTransitioning && !isSignUp ? "fade-out-right" : ""}
            ${isSignUp ? "hidden " : "hidden lg:flex"}
          `}
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1767424196045-030bbde122a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGludmVzdG1lbnQlMjBmaW5hbmNpYWwlMjBjaGFydHxlbnwxfHx8fDE3NzQ4NzA5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Investment Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#121212]/90 via-[#121212]/70 to-transparent" />
            </div>

            <div
              className={`
              relative z-10 flex flex-col justify-center px-16 text-white

            `}
            >
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

          {/* ========== LADO ESQUERDO (CADASTRO) ========== */}
          {/* IMAGEM DO CADASTRO - aparece no lado esquerdo */}
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
                src="https://images.unsplash.com/photo-1767424196045-030bbde122a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGludmVzdG1lbnQlMjBmaW5hbmNpYWwlMjBjaGFydHxlbnwxfHx8fDE3NzQ4NzA5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Investment Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-bl from-[#121212]/90 via-[#121212]/70 to-transparent" />
            </div>

            <div
              className={`
              relative z-10 flex flex-col justify-center px-16 text-white

              `}
            >
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

          {/* ========== LADO DIREITO (CADASTRO) ========== */}
          {/* FORMULÁRIO DE CADASTRO - aparece no lado direito */}
          <div
            className={`
            flex-1 flex items-center justify-center lg:p-12 p-10 overflow-hidden
            ${isSignUp && !isTransitioning ? "" : ""}
            ${isTransitioning && isSignUp ? "fade-out-right" : ""}
            ${!isSignUp ? "hidden" : ""}
          `}
          >
            <div className="w-full max-w-[480px]">
              <div
                className={isSignUp && !isTransitioning ? "fade-in-right" : ""}
              >
                {/* Logo */}
                <div className="mb-12">
                  <h1 className="font-black text-[48px] text-white tracking-tight">
                    INVEK
                  </h1>
                </div>

                <div className="mb-10">
                  <h2 className="font-extrabold text-[32px] text-white mb-3">
                    Criar conta
                  </h2>
                  <p className="text-[#e0e0e0] text-[16px] opacity-70">
                    Cadastre-se gratuitamente e comece a investir
                  </p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-6">
                  <GlassInput
                    id="name"
                    name="name"
                    type="text"
                    label="Nome completo"
                    placeholder="Seu nome"
                    value={signUpData.name}
                    onChange={handleSignUpChange}
                    required
                  />

                  <GlassInput
                    id="signup-email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="seu@email.com"
                    icon={<Mail size={20} />}
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    required
                  />

                  <GlassInput
                    id="signup-password"
                    name="password"
                    type="password"
                    label="Senha"
                    placeholder="••••••••"
                    icon={<Lock size={20} />}
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    required
                  />

                  <GlassButton
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={loading}
                    disabled={isFormEmpty}
                    className="w-full"
                  >
                    {loading ? "Criando conta..." : "Criar conta"}
                  </GlassButton>
                </form>

                <div className="text-center mt-8">
                  <p className="text-[14px] text-[#e0e0e0]">
                    Já tem uma conta?{" "}
                    <button
                      onClick={() => toggleScreen(false)}
                      className="text-white hover:opacity-80 font-medium transition-opacity"
                    >
                      Fazer login
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
