'use client';

import React from 'react';
import Link from 'next/link';
import { ContactSection } from '@/components/ContactSection';
import { MapPin, Phone, MessageSquare, Mail, Clock, HelpCircle } from 'lucide-react';
import { businessProfile } from '@/lib/data';

export default function ContactPage() {
  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl space-y-3">
          <nav className="text-xs text-neutral-500 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-dark">Home</Link>
            <span>/</span>
            <span className="font-semibold text-brand-dark">Contact Wholesale Desk</span>
          </nav>

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500 block">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight">
            Wholesale Customer Support &amp; Order Desk
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed">
            Reach out directly for wholesale catalogs, sample packs, bulk order pricing, or business guidance for your retail clothing venture.
          </p>
        </div>

        {/* Embedded Contact Section */}
        <ContactSection />

        {/* Map & Visiting Guidance (with transparent placeholder) */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D5] shadow-soft space-y-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-brand-dark" />
            <div>
              <h2 className="text-xl font-bold text-brand-dark">
                Wholesale Hub Location &amp; In-Person Visits
              </h2>
              <p className="text-xs text-neutral-500">
                Prior appointment recommended for wholesale buyers visiting our inventory center.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E2D5] space-y-1">
              <span className="text-xs font-bold text-neutral-500 uppercase block">Registered Address</span>
              <p className="text-sm font-bold text-brand-dark">{businessProfile.displayAddress}</p>
              <p className="text-xs text-neutral-500">Primary wholesale logistics hub.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E2D5] space-y-1">
              <span className="text-xs font-bold text-neutral-500 uppercase block">Appointments</span>
              <p className="text-sm font-bold text-brand-dark">Monday to Saturday</p>
              <p className="text-xs text-neutral-500">{businessProfile.businessHours}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E2D5] space-y-1">
              <span className="text-xs font-bold text-neutral-500 uppercase block">Express Transport</span>
              <p className="text-sm font-bold text-brand-dark">Direct Parcel Booking</p>
              <p className="text-xs text-neutral-500">Same-day packaging for confirmed orders.</p>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="rounded-2xl border border-dashed border-[#D5CBB8] bg-[#F7F3EB] p-8 text-center space-y-2">
            <MapPin className="w-8 h-8 text-neutral-400 mx-auto" />
            <p className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
              [Google Maps Location Integration Placeholder]
            </p>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              Interactive map embed will be connected with client coordinates upon final launch verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
