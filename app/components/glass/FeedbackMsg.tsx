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
      role="img"
      aria-label="Sucesso"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconAlert() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#CF0003"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Erro"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}


export function FeedbackMsg({
  type,
  msg,
}: {
  type: "success" | "error";
  msg: string;
}) {
  const isSuccess = type === "success";
  return (
    <div
      role={isSuccess ? "status" : "alert"}
      aria-live={isSuccess ? "polite" : "assertive"}
      className={`flex items-center gap-2 text-[13px] px-3 py-2 rounded-lg border ${
        isSuccess
          ? "text-[#3DD80E] bg-[#2FBD04]/10 border-[#2FBD04]/30"
          : "text-[#FF5A5F] bg-[#CF0003]/10 border-[#CF0003]/30"
      }`}
    >
      {isSuccess ? <IconCheck /> : <IconAlert />}
      <span>{msg}</span>
    </div>
  );
}
