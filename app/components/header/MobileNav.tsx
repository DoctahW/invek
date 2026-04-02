"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, User, LayoutDashboard, Wallet, TrendingUp } from "lucide-react";
import styles from "./mobileNav.module.css";

const ITEMS = [
  { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
  { label: "Carteira", href: "/wallet", Icon: Wallet },
  { label: "Investimentos", href: "/investments", Icon: TrendingUp },
  { label: "Alertas", href: "/notifications", Icon: Bell },
  { label: "Perfil", href: "/profile", Icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Navegação principal">
      <div className={styles.border} aria-hidden="true" />
      {ITEMS.map(({ label, href, Icon }) => {
        const isActive = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={label}
            href={href}
            className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
            aria-label={label}
          >
            <span className={styles.iconWrap}>
              {isActive && <span className={styles.glow} aria-hidden="true" />}
              <Icon size={22} />
            </span>
            <span className={styles.label}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
