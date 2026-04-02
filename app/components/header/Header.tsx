"use client";

import { usePathname } from "next/navigation";
import { Bell, User } from "lucide-react";
import { GlassButton } from "@/app/components/glass/GlassButton";
import styles from "./header.module.css";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Carteira", href: "/wallet" },
  { label: "Investimentos", href: "/investments" },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <span className="font-black text-[48px] text-white shrink-0">INVEK</span>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <GlassButton
              key={item.label}
              href={item.href}
              variant={isActive ? "primary" : "ghost"}
              size="md"
            >
              {item.label}
            </GlassButton>
          );
        })}
      </nav>

      <div className={styles.iconButtons}>
        <GlassButton
          variant="ghost"
          size="sm"
          className={styles.iconButton}
          aria-label="Notificações"
        >
          <Bell size={20} />
        </GlassButton>
        <GlassButton
          variant="ghost"
          size="sm"
          className={styles.iconButton}
          aria-label="Perfil"
        >
          <User size={20} />
        </GlassButton>
      </div>

      <div className={styles.divider} aria-hidden="true" />
    </header>
  );
}
