import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// Lê a sessão do better-auth no servidor. As rotas já são protegidas pelo
// proxy/middleware, mas validamos de novo aqui para garantir o userId.
export async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");
  return session;
}
