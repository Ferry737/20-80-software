"use client";

import { useState } from "react";
import Shell from "@/components/Shell";
import GlassPanel from "@/components/GlassPanel";
import GlassButton from "@/components/GlassButton";
import SectionHeader from "@/components/SectionHeader";

export default function Focus() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  return (
    <Shell>
      <div className="space-y-6">
        <SectionHeader eyebrow="ساعت کار" title="جلسه فوکوس" description="یک پروسه فوکوس بدون حواس‌پرتی شروع کنید." />

        <GlassPanel className="flex flex-col items-center gap-8 py-10 text-center">
          <div className="text-6xl font-bold tracking-tight text-accent">
            {`${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <GlassButton variant="primary" onClick={() => setRunning((v) => !v)}>{running ? "توقف" : "شروع"}</GlassButton>
            <GlassButton variant="secondary" onClick={() => { setRunning(false); setSeconds(25 * 60); }}>بازنشانی</GlassButton>
          </div>
          <p className="text-slate-400">پیشنهاد محدودیت: حداکثر ۲ پوشه فعال و ۳ سایت در هر ۴۵ دقیقه.</p>
        </GlassPanel>
      </div>
    </Shell>
  );
}
