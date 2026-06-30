"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import GlassPanel from "@/components/GlassPanel";
import GlassButton from "@/components/GlassButton";
import SectionHeader from "@/components/SectionHeader";

type Row = { label: string; value: string; color: string };
const FALLBACK: Row[] = [
  { label: "پیشرفت امروز", value: "۶۸٪", color: "text-accent" },
  { label: "جلسات فوکوس", value: "۰", color: "text-accent-2" },
  { label: "اهداف فعال", value: "۳", color: "text-white" },
];

export default function Dashboard() {
  const [rows, setRows] = useState<Row[]>(FALLBACK);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const encoded = token ? encodeURIComponent(token) : "";
    const base = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_API_BASE ?? "http://172.16.1.2:8000";
    fetch(`${base}/time/sessions?user_id=1&token=${encoded}`)
      .then((r) => r.json().catch(() => null))
      .then((data) => {
        if (Array.isArray(data)) {
          setRows([
            { label: "پیشرفت امروز", value: "۶۸٪", color: "text-accent" },
            { label: "جلسات فوکوس", value: String(data.length), color: "text-accent-2" },
            { label: "اهداف فعال", value: "۳", color: "text-white" },
          ]);
        }
      })
      .catch(() => setRows(FALLBACK));
  }, []);

  return (
    <Shell>
      <div className="space-y-6">
        <SectionHeader eyebrow="نما" title="داشبورد" description="خلاصه وضعیت تمرکز، اهداف و پیشرفت روزانه." />
        <div className="flex gap-3">
          <GlassButton variant="primary" href="/focus">شروع فوکوس</GlassButton>
          <GlassButton variant="secondary" href="/analytics">گزارشات</GlassButton>
        </div>
        <GlassPanel className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {rows.map((card) => (
            <div key={card.label} className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="text-slate-400">{card.label}</p>
              <p className={`mt-2 text-4xl font-bold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </GlassPanel>
        <GlassPanel>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-serif text-lg font-semibold">وضعیت سیستم</h3>
              <p className="mt-2 text-slate-400">زیرسیستم‌ها به‌صورت دمو فعال هستند و آماده بهره‌برداری از API هستند.</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>تایمر تمرکز: فعال</li>
              <li>پیگیری اهداف: فعال</li>
              <li>مربی هوشمند: آفلاین با خروجی پیش‌فرض</li>
              <li>اتوماسیون: آماده ایجاد قانون ساده</li>
            </ul>
          </div>
        </GlassPanel>
      </div>
    </Shell>
  );
}
