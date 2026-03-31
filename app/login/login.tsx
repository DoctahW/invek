// app/login/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(data.message || 'Erro ao fazer login');
      }
    } catch (error) {
      setError('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-[#121212] flex overflow-hidden">
      {!isSignUp ? (
        // LOGIN FORM
        <>
          {/* Login Form - Left Side */}
          <div className="flex-1 flex items-center justify-center lg:p-12">
            <div className="w-full max-w-[480px]">
              {/* Logo */}
              <div className="mb-12">
                <h1 className="font-black text-[48px] text-white tracking-tight">INVEK</h1>
              </div>

              {/* Welcome Text */}
              <div className="mb-10">
                <h2 className="font-extrabold text-[32px] text-white mb-3">Bem-vindo de volta</h2>
                <p className="text-[#e0e0e0] text-[16px] opacity-70">
                  Entre na sua conta para acessar seus investimentos
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[14px] font-medium text-[#e0e0e0]">
                    Email
                  </label>
                  <div className="relative">
                    <div className="backdrop-blur-[4px] bg-[rgba(0,0,0,0.4)] rounded-[16px] overflow-hidden">
                      <div className="absolute border-[0.6px] border-[rgba(255,255,255,0.8)] border-solid inset-0 pointer-events-none rounded-[16px]" />
                      <div className="flex items-center px-5 py-4">
                        <Mail className="w-5 h-5 text-[rgba(255,255,255,0.6)] mr-3 flex-shrink-0" />
                        <input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-[rgba(255,255,255,0.4)] text-[16px]"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-[14px] font-medium text-[#e0e0e0]">
                      Senha
                    </label>
                    <button
                      type="button"
                      className="text-[14px] text-white hover:opacity-80 transition-opacity"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="backdrop-blur-[4px] bg-[rgba(0,0,0,0.4)] rounded-[16px] overflow-hidden">
                      <div className="absolute border-[0.6px] border-[rgba(255,255,255,0.8)] border-solid inset-0 pointer-events-none rounded-[16px]" />
                      <div className="flex items-center px-5 py-4">
                        <Lock className="w-5 h-5 text-[rgba(255,255,255,0.6)] mr-3 flex-shrink-0" />
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-[rgba(255,255,255,0.4)] text-[16px]"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-[rgba(255,255,255,0.6)] hover:text-white transition-colors ml-3 flex-shrink-0"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-[52px] backdrop-blur-[3px] rounded-[999px] relative overflow-hidden mt-8"
                  style={{ 
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.6) 0%, rgb(255, 255, 255) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)" 
                  }}
                >
                  <div className="absolute border border-[rgba(255,255,255,0.8)] border-solid inset-0 pointer-events-none rounded-[999px]" />
                  <span className="font-normal text-[#121212] text-[16px]">Entrar</span>
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center mt-8">
                <p className="text-[14px] text-[#e0e0e0]">
                  Não tem uma conta?{" "}
                  <button 
                    onClick={() => setIsSignUp(true)}
                    className="text-white hover:opacity-80 font-medium transition-opacity"
                  >
                    Criar conta
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="hidden lg:flex flex-1 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1767424196045-030bbde122a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGludmVzdG1lbnQlMjBmaW5hbmNpYWwlMjBjaGFydHxlbnwxfHx8fDE3NzQ4NzA5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Investment Background"
                className="w-full h-full object-cover"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#121212]/90 via-[#121212]/70 to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col justify-center px-16 text-white">
              <div className="max-w-xl">
                <h2 className="font-black text-[42px] leading-tight mb-6">
                  Invista com inteligência e segurança
                </h2>
                <p className="text-[18px] text-[#e0e0e0] mb-12 leading-relaxed">
                  Acesse sua carteira de investimentos, acompanhe seus ativos em tempo real e tome decisões inteligentes para o seu futuro financeiro.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <div className="font-black text-[36px] mb-1">R$ 2.5B+</div>
                    <div className="text-[14px] text-[#e0e0e0] opacity-70">Volume Investido</div>
                  </div>
                  <div>
                    <div className="font-black text-[36px] mb-1">150K+</div>
                    <div className="text-[14px] text-[#e0e0e0] opacity-70">Investidores Ativos</div>
                  </div>
                  <div>
                    <div className="font-black text-[36px] mb-1">24/7</div>
                    <div className="text-[14px] text-[#e0e0e0] opacity-70">Suporte</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // SIGN UP FORM
        <>
          {/* Image - Left Side (Sign Up) */}
          <div className="hidden lg:flex flex-1 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1767424196045-030bbde122a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGludmVzdG1lbnQlMjBmaW5hbmNpYWwlMjBjaGFydHxlbnwxfHx8fDE3NzQ4NzA5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Investment Background"
                className="w-full h-full object-cover"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-bl from-[#121212]/90 via-[#121212]/70 to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col justify-center px-16 text-white">
              <div className="max-w-xl">
                <h2 className="font-black text-[42px] leading-tight mb-6">
                  Comece sua jornada de investimentos
                </h2>
                <p className="text-[18px] text-[#e0e0e0] mb-12 leading-relaxed">
                  Cadastre-se gratuitamente e tenha acesso a ferramentas profissionais de investimento e análise de mercado.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <div className="font-black text-[36px] mb-1">100%</div>
                    <div className="text-[14px] text-[#e0e0e0] opacity-70">Gratuito</div>
                  </div>
                  <div>
                    <div className="font-black text-[36px] mb-1">5 min</div>
                    <div className="text-[14px] text-[#e0e0e0] opacity-70">Para Começar</div>
                  </div>
                  <div>
                    <div className="font-black text-[36px] mb-1">Seguro</div>
                    <div className="text-[14px] text-[#e0e0e0] opacity-70">e Protegido</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sign Up Form - Right Side */}
          <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-[480px]">
              {/* Logo */}
              <div className="mb-12">
                <h1 className="font-black text-[48px] text-white tracking-tight">INVEK</h1>
              </div>

              {/* Welcome Text */}
              <div className="mb-10">
                <h2 className="font-extrabold text-[32px] text-white mb-3">Criar conta</h2>
                <p className="text-[#e0e0e0] text-[16px] opacity-70">
                  Cadastre-se gratuitamente e comece a investir
                </p>
              </div>

              {/* Form */}
              <form className="space-y-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-[14px] font-medium text-[#e0e0e0]">
                    Nome completo
                  </label>
                  <div className="relative">
                    <div className="backdrop-blur-[4px] bg-[rgba(0,0,0,0.4)] rounded-[16px] overflow-hidden">
                      <div className="absolute border-[0.6px] border-[rgba(255,255,255,0.8)] border-solid inset-0 pointer-events-none rounded-[16px]" />
                      <div className="flex items-center px-5 py-4">
                        <div className="w-5 h-5 text-[rgba(255,255,255,0.6)] mr-3 flex-shrink-0" ></div>
                        <input
                          id="name"
                          type="text"
                          placeholder="Seu nome"
                          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-[rgba(255,255,255,0.4)] text-[16px]"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="signup-email" className="block text-[14px] font-medium text-[#e0e0e0]">
                    Email
                  </label>
                  <div className="relative">
                    <div className="backdrop-blur-[4px] bg-[rgba(0,0,0,0.4)] rounded-[16px] overflow-hidden">
                      <div className="absolute border-[0.6px] border-[rgba(255,255,255,0.8)] border-solid inset-0 pointer-events-none rounded-[16px]" />
                      <div className="flex items-center px-5 py-4">
                        <Mail className="w-5 h-5 text-[rgba(255,255,255,0.6)] mr-3 flex-shrink-0" />
                        <input
                          id="signup-email"
                          type="email"
                          placeholder="seu@email.com"
                          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-[rgba(255,255,255,0.4)] text-[16px]"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label htmlFor="signup-password" className="block text-[14px] font-medium text-[#e0e0e0]">
                    Senha
                  </label>
                  <div className="relative">
                    <div className="backdrop-blur-[4px] bg-[rgba(0,0,0,0.4)] rounded-[16px] overflow-hidden">
                      <div className="absolute border-[0.6px] border-[rgba(255,255,255,0.8)] border-solid inset-0 pointer-events-none rounded-[16px]" />
                      <div className="flex items-center px-5 py-4">
                        <Lock className="w-5 h-5 text-[rgba(255,255,255,0.6)] mr-3 flex-shrink-0" />
                        <input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-[rgba(255,255,255,0.4)] text-[16px]"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-[52px] backdrop-blur-[3px] rounded-[999px] relative overflow-hidden mt-8"
                  style={{ 
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.6) 0%, rgb(255, 255, 255) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)" 
                  }}
                >
                  <div className="absolute border border-[rgba(255,255,255,0.8)] border-solid inset-0 pointer-events-none rounded-[999px]" />
                  <span className="font-normal text-[#121212] text-[16px]">Criar conta</span>
                </button>
              </form>

              {/* Sign In Link */}
              <div className="text-center mt-8">
                <p className="text-[14px] text-[#e0e0e0]">
                  Já tem uma conta?{" "}
                  <button 
                    onClick={() => setIsSignUp(false)}
                    className="text-white hover:opacity-80 font-medium transition-opacity"
                  >
                    Fazer login
                  </button>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}