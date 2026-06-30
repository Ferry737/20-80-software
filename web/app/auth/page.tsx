"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Shell from "@/components/Shell";
import GlassPanel from "@/components/GlassPanel";
import SectionHeader from "@/components/SectionHeader";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("ایمیل نامعتبر است");
      return;
    }
    if (!password || password.length < 8) {
      setError("رمز عبور حداقل ۸ کاراکتر است");
      return;
    }
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_API_BASE ?? "http://172.16.1.2:8000";
      if (mode === "register") {
        await fetch(`${base}/auth/register`, {
          method: "POST",
          headers: {"content-type":"application/json"},
          body: JSON.stringify({ email, password, full_name: fullName }),
        });
      }
      const res = await fetch(`${base}/auth/login`, {
        method: "POST",
        headers: {"content-type":"application/json"},
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({ access_token: "" }));
      if (!res.ok || !data?.access_token) {
        setError("خطا در ورود یا ثبت‌نام");
        return;
      }
      localStorage.setItem("token", data.access_token);
      router.push("/dashboard");
    } catch (e) {
      const message = e instanceof Error ? e.message : "خطا در ارتباط";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Shell>
      <div className="mx-auto max-w-5xl">
        <SectionHeader title="احراز هویت" eyebrow="احراز" />
        <GlassPanel className="mx-auto max-w-lg">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white/[0.04] p-1">
              <button type="button" onClick={() => setMode("login")} className={mode === "login" ? "rounded-2xl bg-white/[0.08] py-2 text-sm font-medium" : "py-2 text-sm text-slate-400"}>ورود</button>
              <button type="button" onClick={() => setMode("register")} className={mode === "register" ? "rounded-2xl bg-white/[0.08] py-2 text-sm font-medium" : "py-2 text-sm text-slate-400"}>ثبت‌نام</button>
            </div>
            <form className="grid gap-3" onSubmit={onSubmit}>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-slate-400">ایمیل</span>
                <input className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-accent/40" placeholder="example@domain.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-slate-400">رمز عبور</span>
                <input type="password" className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-accent/40" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
              {mode === "register" && (
                <label className="flex flex-col gap-2 text-sm">
                  <span className="text-slate-400">نام و نام خانوادگی</span>
                  <input className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-accent/40" placeholder="علی رضایی" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </label>
              )}
              {error && <p className="text-sm text-rose-300/90">{error}</p>}
            </form>
            <button type="submit" className="mt-2 w-full rounded-2xl bg-accent py-3 text-sm font-semibold text-white" disabled={loading}>
              {loading ? "در حال ارسال..." : mode === "login" ? "ورود" : "ساخت اکانت جدید"}
            </button>
          </div>
        </GlassPanel>
      </div>
    </Shell>
  );
}
