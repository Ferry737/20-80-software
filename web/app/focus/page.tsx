"use client";

import { useState, useEffect } from "react";
import Shell from "@/components/Shell";
import GlassPanel from "@/components/GlassPanel";
import GlassButton from "@/components/GlassButton";
import SectionHeader from "@/components/SectionHeader";

export default function Focus() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  // The "engine" for the timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (running) {
      interval = setInterval(() => {
        setSeconds((s) => {
          if (s <= 0) {
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running]);

  return (
    <Shell>
      <div className="space-y-6">
        <SectionHeader eyebrow="ساعت کار" title="جلسه فوکوس" description="یک پروسه فوکوس بدون حواس‌پرتی شروع کنید." />

        <GlassPanel className="flex flex-col items-center gap-8 py-10 text-center">
          <div className="text-6xl font-normal tracking-tight text-[#233137]">
            {`${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <GlassButton variant="primary" onClick={() => setRunning((v) => !v)}>
              {running ? "توقف" : "شروع"}
            </GlassButton>
            <GlassButton variant="secondary" onClick={() => { setRunning(false); setSeconds(25 * 60); }}>
              بازنشانی
            </GlassButton>
          </div>
          <p className="text-sm text-[#758084]">پیشنهاد محدودیت: حداکثر ۲ پوشه فعال و ۳ سایت در هر ۴۵ دقیقه.</p>
        </GlassPanel>
      </div>
    </Shell>
  );
}
