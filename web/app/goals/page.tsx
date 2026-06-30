"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import GlassPanel from "@/components/GlassPanel";
import GlassButton from "@/components/GlassButton";
import SectionHeader from "@/components/SectionHeader";

type Goal = { id: number; title: string; progress: string; value: number };
const FALLBACK: Goal[] = [
  { id: 1, title: "خواندن دانشمندتی", progress: "70%", value: 7 },
  { id: 2, title: "تمرین آموزشی", progress: "45%", value: 18 },
  { id: 3, title: "دفترچه یادداشت", progress: "90%", value: 9 },
];

export default function Goals() {
  const [items, setItems] = useState<Goal[]>(FALLBACK);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const base = typeof window !== "undefined" ? (process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_API_BASE ?? "http://172.16.1.2:8000") : "http://172.16.1.2:8000";
    fetch(`${base}/goals/?user_id=1`)
      .then((r) => r.json().catch(() => null))
      .then((data) => {
        if (cancelled) return;
        if (!data) return;
        if (Array.isArray(data)) {
          setItems(data.map((g: Record<string, unknown>) => ({
            id: Number(g["id"] ?? 0),
            title: String(g["title"] ?? "هدف بدون نام"),
            progress: `${Math.round((Number(g["current_value"] ?? 0) / Number(g["target_value"] ?? 1)) * 100)}%`,
            value: Number(g["target_value"] ?? 0),
          })));
        }
      })
      .catch(() => void 0);
    return () => {
      cancelled = true;
    };
  }, []);

  async function addGoal(e: React.FormEvent) {
    e.preventDefault();
    const current = title.trim();
    if (!current) return;
    setLoading(true);
    try {
      const base = typeof window !== "undefined" ? (process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_API_BASE ?? "http://172.16.1.2:8000") : "http://172.16.1.2:8000";
      const res = await fetch(`${base}/goals/`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: current, category: "productivity", target_value: 10, unit: "minutes" }),
      });
      const payload = await res.json().catch(() => ({}));
      if (res.ok && payload?.id) {
        setItems((prev) => [...prev, { id: payload.id, title: current, progress: "0%", value: 10 }]);
        setTitle("");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Shell>
      <div className="space-y-6">
        <SectionHeader title="اهداف" eyebrow="هدف‌سازی" />

        <GlassPanel>
          <form className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]" onSubmit={addGoal}>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-slate-400">عنوان هدف</span>
              <input className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-accent/40" placeholder="مثال: خواندن ۴۰ صفحه در روز" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <div className="flex items-center">
              <GlassButton variant="primary" type="submit" disabled={loading || !title.trim()} className="whitespace-nowrap">
                افزودن هدف
              </GlassButton>
            </div>
          </form>
        </GlassPanel>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((goal) => (
            <GlassPanel key={goal.id} className="h-full">
              <div className="flex items-end justify-between gap-2">
                <h3 className="font-serif text-lg font-semibold">{goal.title}</h3>
                <span className="text-xs text-accent">{goal.progress}</span>
              </div>
              <p className="mt-3 text-sm text-slate-400">پیشرفت نسبت به هدف محاسبه شده.</p>
              <div className="mt-4 h-2 rounded-full bg-white/[0.06]">
                <div className="h-2 rounded-full bg-gradient-to-l from-accent to-accent-2" style={{ width: goal.progress }} />
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </Shell>
  );
}
