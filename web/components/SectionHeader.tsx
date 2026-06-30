"use client";

import { ReactNode } from "react";

export default function SectionHeader({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
}) {
  return (
    <div className="mb-8">
      {eyebrow ? (
        <p className="mb-2 text-xs font-medium tracking-widest text-accent/80">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className="text-3xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-xl text-slate-400">{description}</p>
      ) : null}
    </div>
  );
}
