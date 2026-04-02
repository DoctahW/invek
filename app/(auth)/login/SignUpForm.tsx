"use client";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { GlassInput } from "@/app/components/glass/GlassInput";
import { GlassButton } from "@/app/components/glass/GlassButton";
import { authClient } from "@/lib/auth-client";

interface SignUpFormProps {
  onToggleToLogin: () => void;
}

export function SignUpForm({ onToggleToLogin }: SignUpFormProps) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormEmpty = !formData.name || !formData.email || !formData.password;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getErrorMessage = (code?: string, fallback?: string) => {
    switch (code) {
      case "USER_ALREADY_EXISTS":
        return "Este email já está cadastrado";
      case "INVALID_EMAIL":
        return "Email inválido";
      case "PASSWORD_TOO_SHORT":
        return "A senha deve ter pelo menos 8 caracteres";
      case "PASSWORD_TOO_LONG":
        return "A senha é muito longa";
      case "FAILED_TO_CREATE_USER":
        return "Erro ao criar conta. Tente novamente";
      default:
        return fallback || "Erro ao criar conta. Tente novamente";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres");
      return;
    }

    setLoading(true);

    const { error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError(getErrorMessage(error.code, error.message));
    } else {
      onToggleToLogin();
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-[480px]">
      <div className="mb-12">
        <h1 className="font-black text-[48px] text-white tracking-tight">INVEK</h1>
      </div>

      <div className="mb-10">
        <h2 className="font-extrabold text-[32px] text-white mb-3">Criar conta</h2>
        <p className="text-[#e0e0e0] text-[16px] opacity-70">
          Cadastre-se gratuitamente e comece a investir
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <GlassInput
          id="name"
          name="name"
          type="text"
          label="Nome completo"
          placeholder="Seu nome"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <GlassInput
          id="signup-email"
          name="email"
          type="email"
          label="Email"
          placeholder="seu@email.com"
          icon={<Mail size={20} />}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <GlassInput
          id="signup-password"
          name="password"
          type="password"
          label="Senha"
          placeholder="••••••••"
          icon={<Lock size={20} />}
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-[16px] p-3">
            <p className="text-red-400 text-[14px] text-center">{error}</p>
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
          {loading ? "Criando conta..." : "Criar conta"}
        </GlassButton>
      </form>

      <div className="text-center mt-8">
        <p className="text-[14px] text-[#e0e0e0]">
          Já tem uma conta?{" "}
          <button
            onClick={onToggleToLogin}
            className="text-white hover:opacity-80 font-medium transition-opacity"
          >
            Fazer login
          </button>
        </p>
      </div>
    </div>
  );
}
