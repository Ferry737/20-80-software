"use client";

import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import Shell from "@/components/Shell";
import GlassPanel from "@/components/GlassPanel";
import GlassButton from "@/components/GlassButton";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function Home() {
  return (
    <Shell>
      <main className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center py-16 text-center md:py-24">
          <span className="mb-4 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs tracking-widest text-accent/90">
            نسخه آزمایشی
          </span>

          <h1
            className={`${playfair.className} text-5xl font-bold md:text-7xl`}
          >
            <span className="block bg-gradient-to-br from-accent via-accent-2 to-white bg-clip-text text-transparent">
              ۲۰/۸۰
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-slate-400 md:text-xl">
            پلتفرم بهره‌وری پزشکی‌محور: تمرکز روی آنچه مهم است، حذف ضربات
            اغراق‌آمیز، و ساخت یک سیستم کاری آرام و پایدار.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <GlassButton href="/auth" variant="primary">
              ورود به پنل
            </GlassButton>
            <GlassButton href="/focus" variant="secondary">
              شروع جلسه فوکوس
            </GlassButton>
            <GlassButton href="/tutor" variant="ghost">
              coach هوشمند
            </GlassButton>
          </div>

          <div className="mt-14 w-full">
            <GlassPanel className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  title: "تمرکز درمان‌محور",
                  desc: "جلسات فوکوس با تایمرهای درمان و محدودیت‌های هوشمند.",
                },
                {
                  title: "پیگیری هوشمند",
                  desc: "اهداف، پیشرفت و یادگیری را از یک جایگاه مدیریت کنید.",
                },
                {
                  title: "اتوماسیون کار",
                  desc: "قوانین هوشمند برای تبدیل عادت‌ها به جریان کاری.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-5"
                >
                  <h3 className="font-serif text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-slate-400">{item.desc}</p>
                </div>
              ))}
            </GlassPanel>
          </div>
        </div>
      </main>
    </Shell>
  );
}
