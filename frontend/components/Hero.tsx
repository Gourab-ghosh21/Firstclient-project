'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { WholesaleQuoteModal } from './WholesaleQuoteModal';

export function Hero() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const trustPoints = [
    'Wholesale Pricing',
    'Retailer Friendly',
    'Bulk Orders',
    'Reliable Supply',
  ];

  return (
    <>
      <section className="relative bg-[#FAF7F0] pt-8 pb-14 md:pt-14 md:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-6 space-y-6 md:space-y-8">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2">
                <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-neutral-600 bg-[#EFE8DA] px-3 py-1 rounded-full border border-[#DFD6C4]">
                  WHOLESALE GARMENTS • RETAILER SUPPLY
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-brand-dark tracking-tight leading-[1.15]">
                Your Wholesale Garment Partner for Growing Businesses
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
                Quality garments at wholesale prices for retailers, resellers and new clothing businesses.
              </p>

              {/* Trust Indicators 2x2 Grid */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 pt-1 max-w-md">
                {trustPoints.map((point) => (
                  <div key={point} className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-transparent text-brand-dark">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </span>
                    <span className="text-sm font-semibold text-brand-dark">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-brand-gold text-brand-dark font-bold text-sm rounded-lg shadow-sm hover:bg-brand-gold-hover transition-all duration-150 transform hover:-translate-y-0.5"
                >
                  Explore Products
                </Link>

                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(true)}
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-brand-charcoal text-white font-bold text-sm rounded-lg shadow-sm hover:bg-black transition-all duration-150 transform hover:-translate-y-0.5"
                >
                  Get Wholesale Quote
                </button>
              </div>
            </div>

            {/* Right Editorial Garment Image Composition */}
            <div className="lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[540px] aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-card border border-[#E5DECF] bg-white group">
                <img
                  src="/images/hero-shelf.jpg"
                  alt="Neatly stacked wholesale garment textiles on warehouse shelving at Jyoti Enterprise"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                {/* Floating pill badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#18191C]/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-white shadow-elevated">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold">Bulk Stock Ready</span>
                    <span className="text-neutral-400 text-xs">•</span>
                    <span className="text-xs text-neutral-300">Fast Dispatch Across India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <WholesaleQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </>
  );
}
