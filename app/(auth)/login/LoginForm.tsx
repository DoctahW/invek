"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { GlassInput } from "@/app/components/glass/GlassInput";
import { GlassButton } from "@/app/components/glass/GlassButton";
import { authClient } from "@/lib/auth-client";

interface LoginFormProps {
  onToggleToSignUp: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Fields = { email: string; password: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.email.trim()) {
    errors.email = "Informe seu e-mail.";
  } else if (!EMAIL_RE.test(fields.email.trim())) {
    errors.email = "Digite um e-mail válido (ex: nome@email.com).";
  }
  if (!fields.password) {
    errors.password = "Informe sua senha.";
  }
  return errors;
}

export function LoginForm({ onToggleToSignUp }: LoginFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Fields>({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormEmpty = !formData.email || !formData.password;

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

  const getErrorMessage = (code?: string) => {
    switch (code) {
      case "INVALID_EMAIL_OR_PASSWORD":
        return "Email ou senha incorretos";
      case "EMAIL_NOT_VERIFIED":
        return "Confirme seu email antes de entrar";
      case "USER_NOT_FOUND":
        return "Nenhuma conta encontrada com este email";
      case "TOO_MANY_REQUESTS":
        return "Muitas tentativas. Aguarde alguns minutos e tente novamente";
      case "ACCOUNT_NOT_FOUND":
        return "Nenhuma conta encontrada com este email";
      default:
        return "Erro ao fazer login. Tente novamente";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setTouched({ email: true, password: true });
    setErrors(validationErrors);
    if (Object.values(validationErrors).some(Boolean)) return;

    setError("");
    setLoading(true);

 try {
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setError(getErrorMessage(error.code));
        setLoading(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Falha de conexão. Verifique sua internet e tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto">
      <div className="mb-12">
        <h1 className="font-black text-[48px] text-white tracking-tight">INVEK</h1>
      </div>

      <div className="mb-10">
        <h2 className="font-extrabold text-[32px] text-white mb-3">Bem-vindo de volta</h2>
        <p className="text-[#e0e0e0] text-[16px] opacity-70">
          Entre na sua conta para acessar seus investimentos
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <GlassInput
          id="email"
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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span id="senha-label" className="text-[14px] font-medium text-[#e0e0e0]">Senha</span>
            <button type="button" className="text-[14px] text-white hover:opacity-80 transition-opacity">
              Esqueceu a senha?
            </button>
          </div>
          <GlassInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            icon={<Lock size={20} />}
            aria-labelledby="senha-label"
            autoComplete="current-password"
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
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-[16px] p-3" role="alert">
            <p className="text-red-300 text-[14px] text-center">{error}</p>
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
            onClick={onToggleToSignUp}
            className="text-white hover:opacity-80 font-medium transition-opacity"
          >
            Criar conta
          </button>
        </p>
      </div>
    </div>
  );
}
