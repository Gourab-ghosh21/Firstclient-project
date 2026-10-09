import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Home, Package } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#FAF7F0] min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#E8E2D5] shadow-card text-center space-y-5">
        <span className="text-4xl sm:text-5xl font-black text-brand-gold font-mono block">
          404
        </span>

        <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">
          Page Not Found
        </h1>

        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          The wholesale page or garment design you were looking for is unavailable or has moved to a new catalog section.
        </p>

        <div className="pt-2 flex flex-col gap-2.5">
          <Link
            href="/products"
            className="w-full py-3 bg-brand-gold text-brand-dark font-bold text-xs rounded-xl shadow-sm hover:bg-brand-gold-hover transition-all flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Browse Wholesale Garments</span>
          </Link>

          <Link
            href="/"
            className="w-full py-3 bg-[#FAF7F0] hover:bg-[#EFE8DC] text-brand-dark font-semibold text-xs rounded-xl border border-[#DCD5C8] transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
