import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions — Jyoti Enterprise',
  description: 'Commercial wholesale supply terms and trade conditions for Jyoti Enterprise.',
};

export default function TermsPage() {
  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav className="text-xs text-neutral-500 flex items-center gap-1.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-dark">Home</Link>
          <span>/</span>
          <span className="font-semibold text-brand-dark">Terms &amp; Conditions</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D5] shadow-soft space-y-6 text-sm text-neutral-700 leading-relaxed">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
            Wholesale Trade Terms &amp; Conditions
          </h1>
          <p className="text-xs text-neutral-500">
            Applicable to B2B wholesale transactions • Jyoti Enterprise
          </p>

          <div className="space-y-4 pt-4 border-t border-[#F0EAE0]">
            <h2 className="text-lg font-bold text-brand-dark">1. B2B Wholesale Nature of Supply</h2>
            <p>
              Jyoti Enterprise operates strictly as a B2B wholesale supplier for retailers, boutique proprietors, and registered commercial resellers. Goods supplied are meant for commercial retail resale or business distribution. Single-piece retail end-consumer sales are not conducted through wholesale channels.
            </p>

            <h2 className="text-lg font-bold text-brand-dark">2. Minimum Order Quantities (MOQ)</h2>
            <p>
              All wholesale designs carry specified Minimum Order Quantities (typically 12, 18, or 24 pieces per bundle). Bundles are prepared in standard size curves (e.g. M–XXL) and assorted color ratios. Orders cannot be split below published bundle thresholds without prior written authorization from our sales desk.
            </p>

            <h2 className="text-lg font-bold text-brand-dark">3. Pricing &amp; GST</h2>
            <p>
              Wholesale quotations and rate cards are provided on request and are subject to yarn/fabric index movements until order confirmation. Official invoices include applicable GST in accordance with Indian textile regulations.
            </p>

            <h2 className="text-lg font-bold text-brand-dark">4. Dispatch, Freight &amp; Transit</h2>
            <p>
              Consignments are packed in protective polybag and master carton bundles. Freight charges from our logistics hub to the destination city/terminal are payable by the buyer or billed at actuals. Consignment tracking numbers (bilty/LR copy) are shared immediately upon handover to the transport agency.
            </p>

            <h2 className="text-lg font-bold text-brand-dark">5. Inspection &amp; Returns</h2>
            <p>
              Every master pack is quality-inspected before parcel dispatch. In the rare event of verified manufacturing defects (e.g. tear or structural stitching defect), claims must be notified within 48 hours of parcel receipt along with opening video documentation for credit or replacement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
