import type { Metadata } from "next";

export const metadata: Metadata = { title: "Notificações" };

function BellOffIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      <path d="M18.63 13A17.9 17.9 0 0 1 18 8" />
      <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14" />
      <path d="M18 8a6 6 0 0 0-9.33-5" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

export default function NotificationsPage() {
  return (
    <div className="bg-[#121212] text-white min-h-screen">
      <div className="px-6 pt-6 pb-16 md:px-16">
        <div className="max-w-xl mx-auto md:max-w-none">

          <h1 className="text-[28px] font-bold mb-8">Alertas</h1>

          <div className="flex flex-col items-center gap-4 pt-16 text-center">
            <span className="text-white/20">
              <BellOffIcon />
            </span>
            <p className="text-[16px] font-medium text-white/40">
              Nenhum alerta por enquanto
            </p>
            <p className="text-[13px] text-white/25 max-w-[260px]">
              Os alertas vão aparecer aqui em breve.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
