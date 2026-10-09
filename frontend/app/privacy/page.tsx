import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — Jyoti Enterprise',
  description: 'Privacy policy and data protection standards for Jyoti Enterprise wholesale platform.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav className="text-xs text-neutral-500 flex items-center gap-1.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-dark">Home</Link>
          <span>/</span>
          <span className="font-semibold text-brand-dark">Privacy Policy</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D5] shadow-soft space-y-6 text-sm text-neutral-700 leading-relaxed">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
            Privacy Policy
          </h1>
          <p className="text-xs text-neutral-500">
            Last updated: October 2026 • Jyoti Enterprise Wholesale Garments
          </p>

          <div className="space-y-4 pt-4 border-t border-[#F0EAE0]">
            <h2 className="text-lg font-bold text-brand-dark">1. Overview</h2>
            <p>
              Jyoti Enterprise respects the privacy of retail business owners, entrepreneurs, and partners who submit business inquiries, wholesale quotation requests, or questionnaire details through this website. This Privacy Policy details how business contact details and order inquiries are managed.
            </p>

            <h2 className="text-lg font-bold text-brand-dark">2. Information Collected</h2>
            <p>
              When requesting wholesale pricing or using our business starter questionnaire, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contact details: Name, phone number, WhatsApp number, city/state.</li>
              <li>Business information: Shop name, retail model (physical store, boutique, online store, reselling).</li>
              <li>Garment sourcing preferences: Product categories of interest, approximate order volume, and budget tiers.</li>
            </ul>

            <h2 className="text-lg font-bold text-brand-dark">3. Purpose of Collection</h2>
            <p>
              Information collected is solely used to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Prepare and share accurate wholesale rate cards and master bundle quotations.</li>
              <li>Coordinate order confirmations, dispatch tracking, and sample pack delivery via WhatsApp or telephone.</li>
              <li>Provide dedicated account support for ongoing wholesale replenishments.</li>
            </ul>

            <h2 className="text-lg font-bold text-brand-dark">4. Zero Third-Party Sale Policy</h2>
            <p>
              We do NOT sell, rent, or trade client phone numbers, business identities, or order histories to third-party telemarketers or advertisers. Client data is strictly used for direct business communications between Jyoti Enterprise and the inquiring business owner.
            </p>

            <h2 className="text-lg font-bold text-brand-dark">5. Contact &amp; Corrections</h2>
            <p>
              To update or remove your business contact details from our active wholesale follow-up lists, contact our wholesale desk directly via WhatsApp or phone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
