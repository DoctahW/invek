"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, User } from "lucide-react";
import { GlassButton } from "@/app/components/glass/GlassButton";
import { MobileNav } from "./MobileNav";
import styles from "./header.module.css";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Carteira", href: "/wallet" },
  { label: "Investimentos", href: "/investments" },
];

export function AppHeader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
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
            href="/notifications"
            variant={mounted && pathname === "/notifications" ? "primary" : "ghost"}
            size="sm"
            className={styles.iconButton}
            aria-label="Notificações"
          >
            <Bell size={20} color={mounted && pathname === "/notifications" ? "#000" : "currentColor"} />
          </GlassButton>
          <GlassButton
            href="/profile"
            variant={mounted && pathname === "/profile" ? "primary" : "ghost"}
            size="sm"
            className={styles.iconButton}
            aria-label="Perfil"
          >
            <User size={20} color={mounted && pathname === "/profile" ? "#000" : "currentColor"} />
          </GlassButton>
        </div>

        <div className={styles.divider} aria-hidden="true" />
      </header>

      <MobileNav />
    </>
  );
}
