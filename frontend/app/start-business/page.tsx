'use client';

import React from 'react';
import Link from 'next/link';
import { StartYourGarmentBusiness } from '@/components/StartYourGarmentBusiness';
import { Store, Smartphone, ShoppingBag, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function StartBusinessPage() {
  const models = [
    {
      title: 'Physical Clothing Retail Shop',
      budget: '₹50,000 – ₹1.5 Lakh+',
      icon: Store,
      summary: 'Ideal for neighborhood retail stores or market counters wanting diverse ethnic & daily apparel.',
      steps: [
        'Curate 4-6 designs per category to display variety',
        'Balanced size ratios (M, L, XL, XXL) in standard master bundles',
        'Target 50% to 80% retail gross margins',
        'Direct road transport parcel dispatch to your market',
      ],
    },
    {
      title: 'Instagram & Online Boutique',
      budget: '₹25,000 – ₹60,000',
      icon: Smartphone,
      summary: 'For social commerce sellers sharing video reels, photos, and taking orders on WhatsApp & DMs.',
      steps: [
        'Select photogenic printed kurtis and contemporary casual tops',
        'Start with 2-3 trial wholesale bundles (12-18 pcs each)',
        'Create styling reels highlighting drape and fabric texture',
        'Fast courier dispatch straight to your door',
      ],
    },
    {
      title: 'Home-Based Reselling',
      budget: '₹10,000 – ₹25,000',
      icon: ShoppingBag,
      summary: 'Start from home with friends, family, and local community circles with minimal financial risk.',
      steps: [
        'Accessible trial packs with low minimum investment',
        'Assorted colorways so customers have immediate choices',
        'Zero shop rental overhead = pure profit per piece sold',
        'Reorder bestsellers weekly as your customer base expands',
      ],
    },
  ];

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero */}
        <div className="max-w-3xl space-y-4">
          <nav className="text-xs text-neutral-500 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-dark">Home</Link>
            <span>/</span>
            <span className="font-semibold text-brand-dark">Start a Garment Business</span>
          </nav>

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500 block">
            ENTREPRENEUR SOURCING BLUEPRINT
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight">
            Start Your Clothing Business With the Right Wholesale Partner
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed">
            Starting a clothing business is one of the most rewarding retail ventures when backed by reliable wholesale supply. Jyoti Enterprise helps you navigate minimum order quantities, fabric selections, and size assortments so you launch with confidence.
          </p>
        </div>

        {/* 3 Proven Business Pathways */}
        <div>
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
              Choose Your Business Pathway
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              Select the business model that matches your current budget and setup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {models.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.title}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-soft flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5] flex items-center justify-center text-brand-dark">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-brand-dark">{mod.title}</h3>
                      <span className="text-xs font-bold text-neutral-500 block mt-1 font-mono">
                        Starting Capital: {mod.budget}
                      </span>
                      <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                        {mod.summary}
                      </p>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-[#F0EAE0]">
                      {mod.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <a
                      href="#interactive-questionnaire"
                      className="inline-flex items-center justify-center w-full py-2.5 bg-[#FAF7F0] hover:bg-brand-charcoal hover:text-white text-brand-dark text-xs font-bold rounded-xl border border-[#DCD5C8] transition-all"
                    >
                      <span>Get Plan for this Model</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Embedded Interactive Questionnaire Component */}
        <StartYourGarmentBusiness />

        {/* 4 Golden Rules for Beginners */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D5] shadow-soft space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              ESSENTIAL ADVICE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark mt-1">
              4 Wholesale Rules for New Garment Retailers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
            <div className="space-y-2">
              <h3 className="font-bold text-base text-brand-dark flex items-center gap-2">
                <span className="text-brand-gold font-mono font-black text-lg">01.</span>
                Focus on Depth of Variety, Not Single Style Volume
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                When starting, buy 12 to 18 pieces across 4 to 6 different designs rather than 100 pieces of one design. Variety lets your initial customers choose and reveals your local bestsellers.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-base text-brand-dark flex items-center gap-2">
                <span className="text-brand-gold font-mono font-black text-lg">02.</span>
                Reserve 30% of Your Capital for Reorders
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Do not spend 100% of your starting funds on your first purchase. Keep 30% liquid so you can immediately reorder the exact styles and sizes that sell out within your first two weeks.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-base text-brand-dark flex items-center gap-2">
                <span className="text-brand-gold font-mono font-black text-lg">03.</span>
                Inspect Fabric GSM and Seam Durability
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Repeat customers buy clothes for fit and comfort. Sourcing garments with pre-washed rayon and reinforced stitching prevents shrinkage complaints and returns.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-base text-brand-dark flex items-center gap-2">
                <span className="text-brand-gold font-mono font-black text-lg">04.</span>
                Calculate Your Real Landed Cost
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                Always add per-piece transport parcel charges and polybag packaging to the invoice rate before setting your retail markup. Aim for at least 50% gross margin on retail items.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
