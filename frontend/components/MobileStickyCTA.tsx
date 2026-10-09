'use client';

import React, { useState } from 'react';
import { MessageSquare, FileText } from 'lucide-react';
import { WholesaleQuoteModal } from './WholesaleQuoteModal';
import { buildWhatsAppUrl } from '@/lib/store';

export function MobileStickyCTA() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const handleWhatsApp = () => {
    const text = 'Hello Jyoti Enterprise, I would like to get wholesale garment rates for my business.';
    window.open(buildWhatsAppUrl(text), '_blank');
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-[#18191C]/95 backdrop-blur-md border-t border-neutral-800 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-elevated">
        <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366] text-white text-xs font-bold rounded-lg shadow-sm active:bg-[#1fa952]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => setQuoteModalOpen(true)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-brand-gold text-brand-dark text-xs font-bold rounded-lg shadow-sm active:bg-brand-gold-hover"
          >
            <FileText className="w-4 h-4" />
            <span>Get Quote</span>
          </button>
        </div>
      </div>

      <WholesaleQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </>
  );
}
