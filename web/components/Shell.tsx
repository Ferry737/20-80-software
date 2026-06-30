"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/dashboard", label: "داشبورد", icon: "◈" },
  { href: "/focus", label: "جلسه فوکوس", icon: "◎" },
  { href: "/goals", label: "اهداف", icon: "▣" },
  { href: "/analytics", label: "آمار", icon: "▤" },
  { href: "/tutor", label: "آموزش", icon: "⌘" },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-accent/20 selection:text-accent">
      <div className="relative">
        {/* Ornamental radial glow */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div
            className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-[140px] opacity-20"
            style={{
              background:
                "radial-gradient(circle at center, #6ee7b7 0%, #a5f3fc 45%, transparent 70%)",
            }}
          />
        </div>

        <header className="sticky top-0 z-30 border-b border-white/5 bg-surface/60 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="select-none text-xl font-bold tracking-wide text-gradient"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              ۲۰/۸۰
            </Link>

            <nav className="hidden md:flex items-center gap-2 text-sm">
              {NAV.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative rounded-2xl px-3 py-2 transition ${
                      active
                        ? "text-foreground"
                        : "text-slate-400 hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`absolute inset-0 -z-10 rounded-2xl transition ${
                        active
                          ? "bg-white/5 ring-1 ring-white/10"
                          : "bg-transparent"
                      }`}
                    />
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden="true" className="opacity-70">
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile state placeholder */}
            <div className="md:hidden text-xs text-slate-400">منو</div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>

        <footer className="mx-auto max-w-6xl px-6 pb-10 pt-2">
          <div className="flex flex-col gap-1 border-t border-white/5 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>۰۲۰۸۰ فقط یک چرخه تمرکز است، نه یک هدف نهایی.</p>
            <p>نسخه ۱.۰.۰</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
