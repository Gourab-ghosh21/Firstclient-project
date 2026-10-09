'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileSearch, Calculator, Box, Truck, Repeat, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { WholesaleQuoteModal } from '@/components/WholesaleQuoteModal';

export default function HowItWorksPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const steps = [
    {
      num: '01',
      title: 'Explore & Enquire',
      subtitle: 'Browse collection & request wholesale rates',
      description: 'Review our current wholesale catalog across Women’s Kurtis, Casual Tops, Dresses, and Kids Wear. Click "Get Wholesale Price" or "WhatsApp Enquiry" on any style.',
      icon: FileSearch,
    },
    {
      num: '02',
      title: 'Receive Wholesale Rate Card',
      subtitle: 'Clear pricing, MOQs & size ratios',
      description: 'Our wholesale desk shares official trade pricing, master pack bundle configurations, available colorways, and estimated transit duration to your destination city.',
      icon: Calculator,
    },
    {
      num: '03',
      title: 'Confirm Your Order / Trial Pack',
      subtitle: 'Low MOQ starting options',
      description: 'Confirm your bundle selection. For new retailers, we support trial bundles (12–18 pcs) so you can verify fabric touch, stitching finish, and fit without heavy commitments.',
      icon: Box,
    },
    {
      num: '04',
      title: 'Packaging & Express Dispatch',
      subtitle: 'All-India transport & tracking',
      description: 'Each piece is individually polybagged, packed into sturdy master wholesale parcels, and handed over to trusted commercial transport agencies with WhatsApp tracking.',
      icon: Truck,
    },
    {
      num: '05',
      title: 'Retail Display & Weekly Reorders',
      subtitle: 'Dependable repeat supply',
      description: 'Display garments in your retail store or photograph for your online customers. When a design sells out, reorder directly via WhatsApp for rapid replenishment.',
      icon: Repeat,
    },
  ];

  return (
    <>
      <div className="bg-[#FAF7F0] min-h-screen py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <nav className="text-xs text-neutral-500 flex items-center gap-1.5" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-brand-dark">Home</Link>
              <span>/</span>
              <span className="font-semibold text-brand-dark">How It Works</span>
            </nav>

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500 block">
              TRANSPARENT PROCUREMENT PROCESS
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight">
              How Wholesale Sourcing Works at Jyoti Enterprise
            </h1>
            <p className="text-base text-neutral-600 leading-relaxed">
              We eliminate ambiguity from wholesale garment purchasing. Here is our straightforward 5-step process from your initial inquiry to regular repeat replenishments.
            </p>
          </div>

          {/* 5-Step Process Timeline */}
          <div className="space-y-6">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.num}
                  className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E8E2D5] shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-card transition-all"
                >
                  <div className="flex items-start sm:items-center gap-5">
                    <div className="text-3xl sm:text-4xl font-black text-brand-gold font-mono flex-shrink-0 w-12 sm:w-16">
                      {st.num}
                    </div>

                    <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5] text-brand-dark flex-shrink-0 hidden sm:block">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                        {st.subtitle}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-brand-dark">
                        {st.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
                        {st.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex-shrink-0 self-end md:self-center">
                    <button
                      onClick={() => setQuoteModalOpen(true)}
                      className="px-5 py-2.5 bg-[#FAF7F0] hover:bg-brand-charcoal hover:text-white text-brand-dark font-semibold text-xs rounded-xl border border-[#DCD5C8] transition-all"
                    >
                      Step Inquire
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quality & Packing Assurance */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D5] shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                  RELIABILITY STANDARDS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
                  Quality Checking Before Parcel Sealing
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Every wholesale consignment undergoes inspection for uniform seam interlock, button attachment, color fastness, and size labeling accuracy before dispatch.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Shrinkage tested fabrics</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Clean thread trimming</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Moisture-resistant master packaging</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Official GST trade invoice included</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#E8E2D5] bg-neutral-900 shadow-card">
                  <img
                    src="/images/hero-shelf.jpg"
                    alt="Jyoti Enterprise quality inspection"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Final Call to Action */}
          <div className="bg-[#181A1D] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 border border-neutral-800">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Place Your First Wholesale Order?
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl mx-auto">
              Tell us your retail requirements and our team will prepare a customized wholesale quote.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="px-8 py-3.5 bg-brand-gold text-brand-dark font-bold text-sm rounded-xl shadow-sm hover:bg-brand-gold-hover transition-all"
              >
                REQUEST WHOLESALE QUOTE
              </button>
            </div>
          </div>
        </div>
      </div>

      <WholesaleQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </>
  );
}
