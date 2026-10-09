'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/store';

export function FloatingWhatsApp() {
  const handleClick = () => {
    const message = 'Hello Jyoti Enterprise, I am looking for wholesale garments supply for my business.';
    window.open(buildWhatsAppUrl(message), '_blank');
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 z-40">
      <button
        onClick={handleClick}
        aria-label="Direct WhatsApp Wholesale Enquiry"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-elevated hover:bg-[#20ba5a] transition-all transform hover:scale-105 active:scale-95"
      >
        <MessageSquare className="w-7 h-7" />

        {/* Pulse ring animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping -z-10" />

        {/* Desktop Tooltip */}
        <span className="hidden md:group-hover:block absolute right-16 top-1/2 -translate-y-1/2 bg-[#18191C] text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md border border-neutral-700 pointer-events-none">
          Wholesale WhatsApp Desk
        </span>
      </button>
    </div>
  );
}
