"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import GlassPanel from "@/components/GlassPanel";
import GlassButton from "@/components/GlassButton";
import SectionHeader from "@/components/SectionHeader";

type Goal = { title: string; progress: string; value: number };
const FALLBACK: Goal[] = [
  { title: "خواندن دانشمندتی", progress: "70%", value: 7 },
  { title: "تمرین آموزشی", progress: "45%", value: 18 },
  { title: "دفترچه یادداشت", progress: "90%", value: 9 },
];

export default function Goals() {
  const [items, setItems] = useState<Goal[]>(FALLBACK);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGoals = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const encoded = token ? encodeURIComponent(token) : "";
    const base = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
    fetch(`${base}/goals/?user_id=1&token=${encoded}`)
      .then((r) => r.json().catch(() => null))
      .then((data) => {
        if (!data || data.error) throw new Error(data?.error ?? "empty");
        if (Array.isArray(data)) {
          setItems(
            data.map((g: Record<string, unknown>) => ({
              title: String(g.title ?? "هدف بدون نام"),
              progress: `${Math.round((Number(g.current_value ?? 0) / Number(g.target_value ?? 1)) * 100)}%`,
              value: Number(g.target_value ?? 0),
            }))
          );
        }
      })
      .catch(() => setItems(FALLBACK));
  };

  useEffect(() => {
    fetchGoals();
  }, []);
async function addGoal(e: React.FormEvent) {
    e.preventDefault();
    const current = title.trim();
    if (!current) return;
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
      await fetch(`${base}/goals/`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: current, category: "productivity", target_value: 10, unit: "minutes" }),
      });
      setTitle("");
      fetchGoals(); // Refresh the list immediately
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
          <form className="flex flex-wrap items-center justify-between gap-4" onSubmit={addGoal}>
            <p className="text-sm text-slate-400">هدف‌های قابل اندازه‌گیری با روند تکمیل محاسبه‌شده.</p>
            <GlassButton variant="primary" type="submit" disabled={loading} className="whitespace-nowrap">
              افزودن هدف
            </GlassButton>
          </form>
        </GlassPanel>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((goal) => (
            <GlassPanel key={goal.title} className="h-full">
              <div className="flex items-end justify-between gap-2">
                <h3 className="text-lg font-medium text-[#233137]">{goal.title}</h3>
                <span className="text-xs text-[#233137]">{goal.progress}</span>
              </div>
              <p className="mt-3 text-sm text-[#758084]">پیشرفت نسبت به هدف محاسبه شده.</p>
              <div className="mt-4 h-2 rounded-full bg-[#e8e8e8]">
                <div className="h-2 rounded-full bg-[#233137]" style={{ width: goal.progress }} />
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </Shell>
  );
}
