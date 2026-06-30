"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import GlassPanel from "@/components/GlassPanel";
import SectionHeader from "@/components/SectionHeader";

export default function Tutor() {
  return (
    <Shell>
      <div className="space-y-6">
        <SectionHeader title="مربی هوشمند" eyebrow="یادگیری" />

        <GlassPanel>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-semibold">نقشه یادگیری شخصی‌سازی‌شده</h3>
              <p className="text-slate-400">بر اساس اهداف شما، مسیر آموزشی به طور پویا تنظیم می‌شود.</p>
              <button className="rounded-2xl bg-accent px-4 py-2 text-sm font-semibold text-white">شروع یادگیری</button>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-slate-400">پیشنهاد بعدی: بازنویسی یافته‌های هفتگی در یک فرمول متمرکز و به‌روز.</p>
            </div>
          </div>
        </GlassPanel>
      </div>
    </Shell>
  );
}
