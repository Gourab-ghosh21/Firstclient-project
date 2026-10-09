'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Users2, ShieldCheck, HeartHandshake, MapPin, Clock, Tag } from 'lucide-react';
import { businessProfile } from '@/lib/data';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl space-y-4">
          <nav className="text-xs text-neutral-500 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-dark">Home</Link>
            <span>/</span>
            <span className="font-semibold text-brand-dark">About Us</span>
          </nav>

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500 block">
            ABOUT JYOTI ENTERPRISE
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight">
            Supplying Garments for Retailers &amp; Growing Clothing Businesses
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed">
            {businessProfile.supportingMessage}
          </p>
        </div>

        {/* Company Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D5] shadow-soft space-y-6">
            <h2 className="text-2xl font-bold text-brand-dark">
              Our Business Story &amp; Approach
            </h2>
            <div className="space-y-4 text-sm text-neutral-600 leading-relaxed">
              <p>
                Jyoti Enterprise was formed to solve one of the most persistent bottlenecks faced by small and emerging clothing retailers: finding honest, consistent wholesale garment suppliers who respect smaller order volumes.
              </p>
              <p>
                Too often, independent retailers and boutique owners are forced between huge manufacturing minimums that tie up all their working capital, or sub-standard clearance lots with irregular sizing.
              </p>
              <p>
                We bridge this gap by offering carefully curated wholesale catalogs across Women&apos;s Kurtis, Contemporary Casual Tops, Tunics, and Children&apos;s Festive Apparel—supplied in accessible master bundles with disciplined quality standards.
              </p>
            </div>

            <div className="pt-4 border-t border-[#F0EAE0] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E2D5]">
                <Tag className="w-5 h-5 text-brand-dark mb-1.5" />
                <span className="text-xs text-neutral-500 font-semibold block uppercase">Core Product Focus</span>
                <span className="text-sm font-bold text-brand-dark">Women’s Ethnic Wear, Tops &amp; Kids Festive</span>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E2D5]">
                <MapPin className="w-5 h-5 text-brand-dark mb-1.5" />
                <span className="text-xs text-neutral-500 font-semibold block uppercase">Trading Location</span>
                <span className="text-sm font-bold text-brand-dark">{businessProfile.displayAddress}</span>
              </div>
            </div>
          </div>

          {/* Placeholders for Client Facility & Team (Clean & transparent without fake claims) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Facility placeholder */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-soft space-y-3">
              <div className="relative rounded-2xl aspect-[16/10] bg-neutral-100 border border-dashed border-[#CFC5B4] flex flex-col items-center justify-center p-6 text-center">
                <Building2 className="w-10 h-10 text-neutral-400 mb-2" />
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                  [Verified Sourcing &amp; Dispatch Facility]
                </span>
                <p className="text-[11px] text-neutral-500 max-w-xs mt-1">
                  Client facility photography pending final photoshoot. Master inventory packed &amp; dispatched from verified trade hubs.
                </p>
              </div>
              <h3 className="text-sm font-bold text-brand-dark">Direct Wholesale Dispatch</h3>
              <p className="text-xs text-neutral-600 leading-snug">
                Every consignment is inspected, polybag-sealed, and dispatched directly to minimize handling damage.
              </p>
            </div>

            {/* Wholesale Support Team placeholder */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-soft space-y-3">
              <div className="relative rounded-2xl aspect-[16/10] bg-neutral-100 border border-dashed border-[#CFC5B4] flex flex-col items-center justify-center p-6 text-center">
                <Users2 className="w-10 h-10 text-neutral-400 mb-2" />
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                  [Wholesale Support Team Placeholder]
                </span>
                <p className="text-[11px] text-neutral-500 max-w-xs mt-1">
                  Dedicated sales coordinators and parcel logistics handlers assigned to each retail account.
                </p>
              </div>
              <h3 className="text-sm font-bold text-brand-dark">Dedicated Account Support</h3>
              <p className="text-xs text-neutral-600 leading-snug">
                Hours: {businessProfile.businessHours}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Jyoti Enterprise */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D5] shadow-soft space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
              Our Wholesale Commitments
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              How we conduct business with retailers across the country.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2 p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5]">
              <ShieldCheck className="w-6 h-6 text-brand-dark" />
              <h3 className="font-bold text-base text-brand-dark">Consistent Sizing</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Standard Indian bust and hip gradation so your retail customers experience reliable fit across repeats.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5]">
              <HeartHandshake className="w-6 h-6 text-brand-dark" />
              <h3 className="font-bold text-base text-brand-dark">Retailer Respect</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                We support growing clothing entrepreneurs without demanding unrealistic order minimums.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5]">
              <Tag className="w-6 h-6 text-brand-dark" />
              <h3 className="font-bold text-base text-brand-dark">Transparent Rates</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                No hidden costs. Clear bundle pricing and transport estimates provided upfront.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5]">
              <Clock className="w-6 h-6 text-brand-dark" />
              <h3 className="font-bold text-base text-brand-dark">Fast Dispatch</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Standard orders packed and handed over to transport partners within 24 to 48 hours of confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
