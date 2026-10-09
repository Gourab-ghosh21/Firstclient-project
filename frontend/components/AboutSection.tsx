import React from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, MapPin, Tag, Clock } from 'lucide-react';
import { businessProfile } from '@/lib/data';

export function AboutSection() {
  return (
    <section className="bg-[#FAF7F0] py-16 md:py-24 border-b border-[#EAE3D5]" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
            ABOUT JYOTI ENTERPRISE
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight">
            Supplying Garments for Retailers &amp; Growing Clothing Businesses
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            {businessProfile.supportingMessage}
          </p>
        </div>

        {/* Story & Focus Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D5] shadow-soft space-y-4">
              <h3 className="text-lg font-bold text-brand-dark">
                Our Wholesale Mission
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Jyoti Enterprise is established to provide honest, predictable, and retailer-first wholesale garment supply. We recognize that retail shops, boutiques, and emerging digital sellers need more than just bulk cloth—they need reliable sizing, tested fabric quality, and dependable replenishment.
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                By maintaining accessible minimum order quantities and transparent communication, we empower retailers across India to run sustainable, high-margin clothing businesses.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-[#E8E2D5] shadow-soft">
                <Tag className="w-5 h-5 text-brand-dark mb-1" />
                <span className="text-xs text-neutral-500 block uppercase font-semibold">Product Focus</span>
                <span className="text-sm font-bold text-brand-dark">Women’s Wear, Kurtis &amp; Festive</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#E8E2D5] shadow-soft">
                <MapPin className="w-5 h-5 text-brand-dark mb-1" />
                <span className="text-xs text-neutral-500 block uppercase font-semibold">Location</span>
                <span className="text-sm font-bold text-brand-dark">{businessProfile.displayAddress}</span>
              </div>
            </div>
          </div>

          {/* Placeholders for Client Facility / Operations (clearly defined without fabrication) */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100 border border-dashed border-[#C5BBAA] flex flex-col items-center justify-center p-6 text-center group">
              <Building2 className="w-10 h-10 text-neutral-400 mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                [Client Facility &amp; Dispatch Hub Placeholder]
              </span>
              <p className="text-xs text-neutral-500 max-w-xs mt-1">
                Client photography will be updated upon final verification. Wholesale orders dispatched directly from our verified inventory hub.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#E8E2D5] shadow-soft flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-neutral-500" />
                <span className="text-xs font-semibold text-neutral-700">
                  Business Hours: {businessProfile.businessHours}
                </span>
              </div>
              <Link
                href="/about"
                className="text-xs font-bold text-brand-dark hover:text-black flex items-center gap-1"
              >
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
