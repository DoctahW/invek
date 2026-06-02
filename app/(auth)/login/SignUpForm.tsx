"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { GlassInput } from "@/app/components/glass/GlassInput";
import { GlassButton } from "@/app/components/glass/GlassButton";
import { FeedbackMsg } from "@/app/components/glass/FeedbackMsg";
import { authClient } from "@/lib/auth-client";

interface SignUpFormProps {
  onToggleToLogin: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Fields = { name: string; email: string; password: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) {
    errors.name = "Informe seu nome.";
  } else if (fields.name.trim().length < 2) {
    errors.name = "Nome muito curto.";
  }
  if (!fields.email.trim()) {
    errors.email = "Informe seu e-mail.";
  } else if (!EMAIL_RE.test(fields.email.trim())) {
    errors.email = "Digite um e-mail válido (ex: nome@email.com).";
  }
  if (!fields.password) {
    errors.password = "Crie uma senha.";
  } else if (fields.password.length < 8) {
    errors.password = "A senha deve ter no mínimo 8 caracteres.";
  }
  return errors;
}

export function SignUpForm({ onToggleToLogin }: SignUpFormProps) {
  const [formData, setFormData] = useState<Fields>({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isFormEmpty = !formData.name || !formData.email || !formData.password;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const next = { ...formData, [name]: value };
    setFormData(next);
    if (touched[name as keyof Fields]) {
      setErrors((prev) => ({ ...prev, [name]: validate(next)[name as keyof Fields] }));
    }
    setError("");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof Fields;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(formData)[name] }));
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
    const validationErrors = validate(formData);
    setTouched({ name: true, email: true, password: true });
    setErrors(validationErrors);
    if (Object.values(validationErrors).some(Boolean)) return;

    setLoading(true);
    setError("");

    try {
      const { error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setError(getErrorMessage(error.code, error.message));
        setLoading(false);
      } else {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => onToggleToLogin(), 1600);
      }
    } catch {
      setError("Falha de conexão. Verifique sua internet e tente novamente.");
      setLoading(false);
    }
  };

  const inputType = showPassword ? "text" : "password";

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

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <GlassInput
          id="name"
          name="name"
          type="text"
          label="Nome completo"
          placeholder="Seu nome"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name ? errors.name : undefined}
          required
        />

        <GlassInput
          id="signup-email"
          name="email"
          type="email"
          label="Email"
          placeholder="seu@email.com"
          icon={<Mail size={20} />}
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email ? errors.email : undefined}
          required
        />

        <GlassInput
          id="signup-password"
          name="password"
          type={inputType}
          label="Senha"
          placeholder="Mínimo 8 caracteres"
          icon={<Lock size={20} />}
          autoComplete="new-password"
          suffix={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password ? errors.password : undefined}
          required
        />

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-[16px] p-3" role="alert">
            <p className="text-red-300 text-[14px] text-center">{error}</p>
          </div>
        )}

        {success && (
          <FeedbackMsg type="success" msg="Conta criada com sucesso! Redirecionando para o login…" />
        )}

        <GlassButton
          type="submit"
          variant="primary"
          size="md"
          loading={loading}
          disabled={isFormEmpty || success}
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
