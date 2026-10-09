'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Store, ShoppingBag, Sparkles, Smartphone, Lightbulb, ArrowRight } from 'lucide-react';
import { WholesaleQuoteModal } from './WholesaleQuoteModal';

export function WholesaleSolutions() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>('Retailers');

  const solutions = [
    {
      id: 'retailers',
      title: 'Retail Clothing Shops',
      category: 'Physical Stores',
      icon: Store,
      image: '/images/hero-shelf.jpg',
      headline: 'Consistent stock replenishment & high-turnover apparel designs.',
      points: [
        'Curated fast-moving designs updated weekly',
        'Standard master bundle packaging with balanced size ratios',
        'Transparent wholesale billing with GST support',
        'Reliable courier and transport agency parcel dispatch',
      ],
      idealFor: 'Small and medium garment shop owners across towns and cities',
      cta: 'Request Retailer Pricing Card',
    },
    {
      id: 'resellers',
      title: 'Resellers & Home Sellers',
      category: 'Social Selling',
      icon: ShoppingBag,
      image: '/images/cat-1-ref.jpg',
      headline: 'Low MOQ trial orders with high-margin fast-selling garments.',
      points: [
        'Accessible minimum order quantities (12–18 pieces)',
        'Clear product specifications to share with your customers',
        'Direct door delivery to support home-based operations',
        'High markup potential (40% to 70% retail gross margins)',
      ],
      idealFor: 'Entrepreneurs selling via WhatsApp groups, exhibitions, and home boutiques',
      cta: 'Explore Reseller Bundles',
    },
    {
      id: 'boutiques',
      title: 'Fashion Boutiques',
      category: 'Premium Curation',
      icon: Sparkles,
      image: '/images/cat-2-ref.jpg',
      headline: 'Quality fabrics, refined silhouettes, and festive ethnic curation.',
      points: [
        'Premium 140+ GSM rayons, chanderi silks, and fine cottons',
        'Neat finishing with interlocked seams and delicate placket embroidery',
        'Selective styles to maintain your boutique’s unique assortment',
        'Seasonal festive collections ready ahead of peak calendar dates',
      ],
      idealFor: 'Stand-alone designer boutiques and ethnic studio owners',
      cta: 'Get Boutique Rate Card',
    },
    {
      id: 'online-sellers',
      title: 'Online & Instagram Brands',
      category: 'E-Commerce',
      icon: Smartphone,
      image: '/images/cat-3-ref.jpg',
      headline: 'Photogenic garments with dependable inventory continuity.',
      points: [
        'Vibrant colorways that photograph cleanly for Instagram Reels & catalogs',
        'Continuous production runs for your viral bestselling styles',
        'Standardized size grading (S through XXL) to minimize customer returns',
        'Compact polybag packaging ready for secondary shipping parcels',
      ],
      idealFor: 'D2C apparel brands, Instagram store creators, and marketplace sellers',
      cta: 'Request E-Commerce Wholesale Plan',
    },
    {
      id: 'entrepreneurs',
      title: 'New Entrepreneurs',
      category: 'New Ventures',
      icon: Lightbulb,
      image: '/images/cat-4-ref.jpg',
      headline: 'Practical wholesale guidance to start your first garment venture.',
      points: [
        'Transparent advice on initial SKU selection and budget allocation',
        'No pressure for unrealistic bulk quantities on your first purchase',
        'Step-by-step guidance on understanding wholesale size bundles',
        'Dedicated team assistance to help you place your first order',
      ],
      idealFor: 'Individuals launching their first garment venture with ₹25,000–₹1 Lakh budget',
      cta: 'Start Your Garment Journey',
    },
  ];

  const activeSolution = solutions.find((s) => s.title.includes(selectedTier)) || solutions[0];

  return (
    <>
      <section className="bg-white py-16 md:py-24 border-b border-[#EAE3D5]" id="wholesale-solutions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-2 mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
              CUSTOMIZED BUSINESS SUPPLY
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight">
              Wholesale Solutions for Growing Businesses
            </h2>
            <p className="text-sm text-neutral-600 max-w-2xl mx-auto">
              Different garment businesses have different requirements. We tailor wholesale order sizes, assortments, and replenishment cycles for your exact business model.
            </p>
          </div>

          {/* Interactive Tier Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {solutions.map((item) => {
              const Icon = item.icon;
              const isSelected = activeSolution.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedTier(item.title)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? 'bg-brand-charcoal text-white shadow-card scale-105'
                      : 'bg-[#FAF7F0] text-neutral-700 hover:bg-[#F3ECE1] border border-[#E8E1D3]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-gold' : 'text-neutral-500'}`} />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Featured Solution Showcase Card */}
          <div className="bg-[#FAF7F0] rounded-3xl border border-[#E8E2D5] p-6 sm:p-8 lg:p-10 shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/20 text-brand-dark text-xs font-bold rounded-md">
                  <span>{activeSolution.category}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                  {activeSolution.title}
                </h3>

                <p className="text-base text-neutral-700 font-medium">
                  {activeSolution.headline}
                </p>

                <div className="space-y-3 pt-2">
                  {activeSolution.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-brand-charcoal text-brand-gold flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </span>
                      <span className="text-sm text-neutral-700 leading-snug">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-xs text-neutral-500">
                  <span className="font-semibold text-neutral-700">Recommended For: </span>
                  {activeSolution.idealFor}
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => setQuoteModalOpen(true)}
                    className="px-6 py-3 bg-brand-charcoal text-white font-bold text-xs sm:text-sm rounded-lg hover:bg-black transition-all shadow-sm"
                  >
                    {activeSolution.cta}
                  </button>
                  <Link
                    href="/start-business"
                    className="inline-flex items-center gap-1.5 px-6 py-3 bg-white text-brand-dark font-semibold text-xs sm:text-sm rounded-lg border border-[#DCD5C8] hover:bg-[#F3ECE1] transition-all"
                  >
                    <span>View Sourcing Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Media */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3.8] rounded-2xl overflow-hidden shadow-card border border-[#E5DECF] bg-white group">
                  <img
                    src={activeSolution.image}
                    alt={activeSolution.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-brand-gold">
                      Wholesale Advantage
                    </span>
                    <p className="text-sm font-semibold truncate">
                      {activeSolution.title} Supply Pipeline
                    </p>
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
