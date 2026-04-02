"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassPanel } from "@/app/components/glass/GlassPanel";
import { GlassButton } from "@/app/components/glass/GlassButton";
import { GlassInput } from "@/app/components/glass/GlassInput";
import { authClient } from "@/lib/auth-client";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getInitials(name: string, email: string) {
  const src = name?.trim() || email;
  return src.charAt(0).toUpperCase();
}

function IconUser() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconLogOut() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2FBD04"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function FeedbackMsg({
  type,
  msg,
}: {
  type: "success" | "error";
  msg: string;
}) {
  const isSuccess = type === "success";
  return (
    <div
      className={`flex items-center gap-2 text-[13px] px-3 py-2 rounded-lg border ${
        isSuccess
          ? "text-[#2FBD04] bg-[#2FBD04]/10 border-[#2FBD04]/20"
          : "text-[#CF0003] bg-[#CF0003]/10 border-[#CF0003]/20"
      }`}
    >
      {isSuccess && <IconCheck />}
      {msg}
    </div>
  );
}

function PersonalSection({
  initialName,
  email,
}: {
  initialName: string;
  email: string;
}) {
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  async function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) {
      setFeedback({ type: "error", msg: "Nome não pode ser vazio." });
      return;
    }
    if (trimmed === initialName) {
      setFeedback({ type: "error", msg: "Nenhuma alteração detectada." });
      return;
    }

    setSaving(true);
    setFeedback(null);
    const { error } = await authClient.updateUser({ name: trimmed });
    setSaving(false);

    if (error) {
      const msgs: Record<string, string> = {
        "User not found": "Usuário não encontrado.",
        Unauthorized: "Sessão expirada. Faça login novamente.",
      };
      const msg = msgs[error.message ?? ""] ?? "Erro ao atualizar nome.";
      setFeedback({ type: "error", msg });
    } else {
      setFeedback({ type: "success", msg: "Nome atualizado com sucesso." });
    }
  }

  return (
    <GlassPanel className="w-full rounded-[10px] overflow-hidden">
      <div className="p-6 bg-[#0B0B0B] border border-white/10 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="text-white/60">
            <IconUser />
          </span>
          <h2 className="text-[17px] font-semibold text-white">
            Dados Pessoais
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-end">
            <GlassInput
              label="Nome"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setFeedback(null);
              }}
              disabled={saving}
              className="flex-1"
            />
            <GlassButton
              variant="primary"
              size="md"
              onClick={handleSave}
              loading={saving}
              disabled={saving}
              className="shrink-0"
            >
              Salvar
            </GlassButton>
          </div>

          <GlassInput label="E-mail" value={email} disabled />
        </div>

        {feedback && <FeedbackMsg type={feedback.type} msg={feedback.msg} />}
      </div>
    </GlassPanel>
  );
}

function SecuritySection() {
  const [fields, setFields] = useState({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState<Partial<typeof fields>>({});
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [showPasswords, setShowPasswords] = useState(false);

  function change(key: keyof typeof fields, val: string) {
    setFields((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    setFeedback(null);
  }

  function validate() {
    const e: Partial<typeof fields> = {};
    if (!fields.current) e.current = "Senha atual obrigatória.";
    if (!fields.next) {
      e.next = "Nova senha obrigatória.";
    } else if (fields.next.length < 8) {
      e.next = "Mínimo 8 caracteres.";
    }
    if (!fields.confirm) {
      e.confirm = "Confirmação obrigatória.";
    } else if (fields.next !== fields.confirm) {
      e.confirm = "As senhas não coincidem.";
    }
    return e;
  }

  async function handleSave() {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setSaving(true);
    setFeedback(null);
    const { error } = await authClient.changePassword({
      currentPassword: fields.current,
      newPassword: fields.next,
      revokeOtherSessions: false,
    });
    setSaving(false);

    if (error) {
      const msgs: Record<string, string> = {
        "Invalid password": "Senha atual incorreta.",
        "Password is too short": "A senha deve ter no mínimo 8 caracteres.",
        "Password is too long": "A senha é longa demais.",
      };
      const msg = msgs[error.message ?? ""] ?? "Erro ao alterar senha.";
      setFeedback({ type: "error", msg });
    } else {
      setFeedback({ type: "success", msg: "Senha alterada com sucesso." });
      setFields({ current: "", next: "", confirm: "" });
    }
  }

  const inputType = showPasswords ? "text" : "password";

  const EyeToggle = (
    <button
      type="button"
      onClick={() => setShowPasswords((v) => !v)}
      className="text-white/30 hover:text-white/70 transition-colors text-xs font-medium tracking-wide"
    >
      {showPasswords ? "ocultar" : "mostrar"}
    </button>
  );

  return (
    <GlassPanel className="w-full rounded-[10px] overflow-hidden">
      <div className="p-6 bg-[#0B0B0B] border border-white/10 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="text-white/60">
            <IconLock />
          </span>
          <h2 className="text-[17px] font-semibold text-white">Segurança</h2>
        </div>

        <div className="flex flex-col gap-4">
          <GlassInput
            label="Senha atual"
            placeholder="••••••••"
            type={inputType}
            value={fields.current}
            onChange={(e) => change("current", e.target.value)}
            error={errors.current}
            suffix={EyeToggle}
            disabled={saving}
          />
          <GlassInput
            label="Nova senha"
            placeholder="••••••••"
            type={inputType}
            value={fields.next}
            onChange={(e) => change("next", e.target.value)}
            error={errors.next}
            disabled={saving}
          />
          <GlassInput
            label="Confirmar nova senha"
            placeholder="••••••••"
            type={inputType}
            value={fields.confirm}
            onChange={(e) => change("confirm", e.target.value)}
            error={errors.confirm}
            disabled={saving}
          />
        </div>

        {feedback && <FeedbackMsg type={feedback.type} msg={feedback.msg} />}

        <div className="flex justify-end">
          <GlassButton
            variant="primary"
            size="md"
            onClick={handleSave}
            loading={saving}
            disabled={saving}
          >
            Alterar senha
          </GlassButton>
        </div>
      </div>
    </GlassPanel>
  );
}

export default function ProfileClient({
  initialName,
  email,
  createdAt,
}: {
  initialName: string;
  email: string;
  createdAt: string;
}) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const initial = getInitials(initialName, email);

  async function handleSignOut() {
    setSigningOut(true);
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="bg-[#121212] text-white min-h-screen">
      <div className="px-6 pt-6 pb-16 md:px-16">
        <div className="max-w-xl mx-auto md:max-w-none flex flex-col gap-5">
          <h1 className="text-[28px] font-bold mb-1">Perfil</h1>

          <div className="flex flex-col md:grid md:grid-cols-2 md:items-start gap-5">
            <div className="flex flex-col gap-5">
              <GlassPanel className="w-full rounded-[10px] overflow-hidden">
                <div className="p-6 bg-[#0B0B0B] border border-white/10 flex items-center gap-5">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-[28px] font-black text-white select-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(71,166,99,0.35) 0%, rgba(71,166,99,0.08) 100%)",
                      border: "1px solid rgba(71,166,99,0.3)",
                      boxShadow: "0 0 24px rgba(71,166,99,0.15)",
                    }}
                  >
                    {initial}
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="text-[20px] font-bold text-white leading-tight truncate">
                      {initialName || "—"}
                    </p>
                    <p className="text-[13px] text-white/40 truncate">
                      {email}
                    </p>
                    <p className="text-[12px] text-white/25 mt-0.5">
                      Membro desde {formatDate(createdAt)}
                    </p>
                  </div>
                </div>
              </GlassPanel>

              <PersonalSection initialName={initialName} email={email} />

              <GlassPanel className="w-full rounded-[10px] overflow-hidden">
                <div className="p-6 bg-[#0B0B0B] border border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[15px] font-semibold text-white">
                      Sair da conta
                    </p>
                    <p className="text-[12px] text-white/35 mt-0.5">
                      Encerra a sessão atual no dispositivo.
                    </p>
                  </div>
                  <GlassButton
                    variant="danger"
                    size="md"
                    onClick={handleSignOut}
                    loading={signingOut}
                    disabled={signingOut}
                    className="shrink-0 flex items-center gap-2"
                  >
                    <IconLogOut />
                    Sair
                  </GlassButton>
                </div>
              </GlassPanel>
            </div>

            <div className="flex flex-col gap-5">
              <SecuritySection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
