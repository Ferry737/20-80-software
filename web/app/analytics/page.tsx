"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import GlassPanel from "@/components/GlassPanel";
import GlassButton from "@/components/GlassButton";
import SectionHeader from "@/components/SectionHeader";

type Session = { id: number; started_at: string; focus_minutes: number };

export default function Analytics() {
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const encoded = token ? encodeURIComponent(token) : "";
    const base = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_API_BASE ?? "http://172.16.1.2:8000";
    fetch(`${base}/time/sessions?user_id=1&token=${encoded}`)
      .then((r) => r.json().catch(() => null))
      .then((data) => {
        if (Array.isArray(data)) setSessions(data as Session[]);
      })
      .catch(() => setSessions([]));
  }, []);

  return (
    <Shell>
      <div className="space-y-6">
        <SectionHeader title="آمار و تحلیل" eyebrow="انجام‌شده" />

        <GlassPanel>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-slate-400">روند تمرکز هفتگی</p>
              <p className="text-2xl font-bold text-gradient">
                {Math.max(12, sessions.reduce((acc, s) => acc + (s.focus_minutes ?? 0), 0) / 60)} ساعت
              </p>
            </div>
            <GlassButton variant="ghost" href="#!">دانلود گزارش</GlassButton>
          </div>
          <div className="mt-6 h-40 rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
            {sessions.length ? (
              <ul className="pt-4 text-sm text-slate-300">
                {sessions.slice(0, 6).map((s) => (
                  <li key={s.id}>{new Date(s.started_at).toLocaleString("fa-IR")}: {s.focus_minutes} دقیقه</li>
                ))}
              </ul>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">هیچ داده‌ای یافت نشد.</div>
            )}
          </div>
        </GlassPanel>
      </div>
    </Shell>
  );
}
