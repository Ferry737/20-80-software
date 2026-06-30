"use client";

import Link, { LinkProps } from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type CommonButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type ButtonAsLink = CommonButtonProps &
  LinkProps & {
    as: "link";
    href: string;
  };

type GlassButtonProps = ButtonAsButton | ButtonAsLink;

export default function GlassButton({
  children,
  className = "",
  variant = "primary",
  ...props
}: GlassButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";
  const styles: Record<string, string> = {
    primary:
      "bg-gradient-to-b from-accent/90 to-accent-2/90 text-slate-900 hover:brightness-110 active:scale-[0.99] shadow-lg shadow-accent/10",
    secondary:
      "border border-white/10 bg-white/[0.06] text-foreground hover:bg-white/[0.09]",
    ghost: "text-slate-300 hover:text-white hover:bg-white/6",
  };

  const element = (
    <span className={`${base} ${styles[variant]} ${className}`}>{children}</span>
  );

  if (props.as === "link" && props.href) {
    return <Link href={props.href}>{element}</Link>;
  }

  return element;
}
