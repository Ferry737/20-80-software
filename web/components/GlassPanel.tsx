"use client";

import { ReactNode } from "react";

export default function GlassPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={[
        "relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.03] p-6 shadow-2xl shadow-black/0",
        "backdrop-blur-md",
        className,
      ].join(" ")}
    >
      {/* soft inner glow near top */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.04] to-transparent"
      />
      {children}
    </section>
  );
}
