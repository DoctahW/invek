import { AppHeader } from '@/app/components/header/Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#121212]">
      <AppHeader />
      <main className="pt-0 md:pt-29 pb-28 md:pb-0">{children}</main>
    </div>
  );
}
