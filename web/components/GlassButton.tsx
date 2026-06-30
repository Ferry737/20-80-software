"use client";

import Link, { LinkProps } from "next/link";
import { ButtonHTMLAttributes, ReactNode, AnchorHTMLAttributes } from "react";

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
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: "link";
    href: string;
  };

type GlassButtonProps = ButtonAsButton | ButtonAsLink;

export default function GlassButton({
  children,
  className = "",
  variant = "primary",
  as = "button",
  ...props
}: GlassButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#233137]/30 cursor-pointer";
  
  const styles: Record<string, string> = {
    primary: "bg-white text-[#233137] border border-[#e8e8e8] hover:bg-[#fafafa] active:scale-[0.99]",
    secondary: "bg-[#121212] text-white hover:bg-[#333e47] active:scale-[0.99]",
    ghost: "text-[#515255] hover:text-[#233137] hover:bg-[#f2f5f5]",
  };

  // If href is provided, render as a Next.js Link
  if (as === "link") {
    const href = (props as ButtonAsLink).href;
    if (href) {
      return (
        <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
          {children}
        </Link>
      );
    }
  }

  // Otherwise, render as a standard HTML button
  return (
    <button
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
