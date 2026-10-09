'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Shield, Truck, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';
import { WholesaleSolutions } from '@/components/WholesaleSolutions';
import { WholesaleQuoteModal } from '@/components/WholesaleQuoteModal';

export default function WholesalePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const tiers = [
    {
      name: 'Trial / Reseller Tier',
      moq: '12 – 24 pcs',
      description: 'Ideal for home-based sellers, Instagram stores, and new boutiques testing customer interest.',
      features: [
        'Accessible low minimum order per design',
        'Assorted color and size bundles',
        'Clear product specs and size charts',
        'Standard parcel courier delivery',
      ],
      cta: 'Request Trial Pack Quote',
    },
    {
      name: 'Retail Shop Tier',
      moq: '50 – 150 pcs',
      description: 'Designed for active physical apparel stores requiring reliable weekly replenishment.',
      features: [
        'Dedicated wholesale trade pricing',
        'Balanced size ratios (S–XXL curves)',
        'Priority order preparation within 24–48h',
        'GST invoicing and transport booking',
      ],
      popular: true,
      cta: 'Get Retailer Rate Card',
    },
    {
      name: 'Bulk Commercial Tier',
      moq: '200+ pcs',
      description: 'For regional distributors, multi-outlet retailers, and private label bulk buyers.',
      features: [
        'Maximum volume bulk discounts',
        'Custom packaging & polybag bundle specs',
        'Pre-scheduled replenishment batches',
        'Direct road transport agency dispatch',
      ],
      cta: 'Contact Commercial Desk',
    },
  ];

  return (
    <>
      <div className="bg-[#FAF7F0] min-h-screen py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Hero Section */}
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500 block">
              B2B WHOLESALE GARMENT SUPPLY
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight">
              Wholesale Garment Sourcing Built for Retailers
            </h1>
            <p className="text-base text-neutral-600 leading-relaxed">
              At Jyoti Enterprise, wholesale is not an afterthought—it is our core focus. We supply clothing retailers, boutiques, and online sellers with dependable sizing, quality fabrics, and predictable inventory replenishment.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setQuoteModalOpen(true)}
                className="px-7 py-3.5 bg-brand-charcoal text-white font-bold text-sm rounded-xl shadow-sm hover:bg-black transition-all"
              >
                REQUEST WHOLESALE QUOTE
              </button>
            </div>
          </div>

          {/* Wholesale Pricing Tiers */}
          <div>
            <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
                Wholesale Order Tiers
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                Transparent minimums and packaging tailored to your operating scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`bg-white rounded-3xl p-6 sm:p-8 border flex flex-col justify-between transition-all duration-300 ${
                    tier.popular
                      ? 'border-brand-gold shadow-card ring-1 ring-brand-gold/30 relative'
                      : 'border-[#E8E2D5] shadow-soft hover:shadow-card'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-dark text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Common
                    </span>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-brand-dark">{tier.name}</h3>
                      <div className="text-2xl font-black text-brand-dark mt-2 font-mono">
                        {tier.moq}
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">{tier.description}</p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-[#F0EAE0]">
                      {tier.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => setQuoteModalOpen(true)}
                      className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                        tier.popular
                          ? 'bg-brand-charcoal text-white hover:bg-black'
                          : 'bg-[#FAF7F0] text-brand-dark hover:bg-[#EFE8DC] border border-[#DDD5C7]'
                      }`}
                    >
                      {tier.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wholesale Solutions Component embedded */}
          <WholesaleSolutions />

          {/* Sourcing FAQs */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D5] shadow-soft space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-brand-dark">
              Frequently Asked Wholesale Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-1.5">
                <h3 className="font-bold text-brand-dark">How do size assortments work?</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  Our master packs are bundled in standard size curves (e.g. M, L, XL, XXL) with assorted colors so your retail racks have complete sizing variety.
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-brand-dark">How are parcels dispatched?</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  We use trusted commercial road transport agencies and express couriers across India. Tracking details are shared via WhatsApp immediately upon dispatch.
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-brand-dark">Can I request fabric swatches?</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  Yes, for verified retail shops planning bulk orders, we offer sample trial bundles at wholesale value.
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-brand-dark">What are the payment terms?</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  Orders are processed via standard NEFT/RTGS bank transfers or UPI with official GST wholesale invoices.
                </p>
              </div>
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
