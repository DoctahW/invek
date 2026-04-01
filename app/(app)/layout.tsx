import { AppHeader } from '@/app/components/header/Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#121212]">
      <AppHeader />
      <main className="pt-[116px]">{children}</main>
    </div>
  );
}
