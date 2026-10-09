import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const isDark = variant === 'dark';

  return (
    <Link
      href="/"
      className={`inline-flex flex-col items-center select-none group text-left ${className}`}
      aria-label="Jyoti Enterprise - Wholesale Garments Home"
    >
      <span
        className={`text-lg md:text-xl font-bold tracking-[0.18em] transition-colors ${
          isDark
            ? 'text-brand-dark group-hover:text-brand-charcoal'
            : 'text-white group-hover:text-brand-gold'
        }`}
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        JYOTI ENTERPRISE
      </span>
      <div className="flex items-center gap-2 w-full justify-center mt-[-2px]">
        <span
          className={`h-[1px] w-6 md:w-8 ${
            isDark ? 'bg-brand-charcoal/40' : 'bg-white/40'
          }`}
        />
        <span
          className={`text-[9px] md:text-[10px] tracking-[0.28em] font-medium uppercase ${
            isDark ? 'text-brand-charcoal/80' : 'text-neutral-300'
          }`}
        >
          WHOLESALE GARMENTS
        </span>
        <span
          className={`h-[1px] w-6 md:w-8 ${
            isDark ? 'bg-brand-charcoal/40' : 'bg-white/40'
          }`}
        />
      </div>
    </Link>
  );
}
