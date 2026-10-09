'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageSquare, PhoneCall } from 'lucide-react';
import { Logo } from './Logo';
import { WholesaleQuoteModal } from './WholesaleQuoteModal';
import { buildWhatsAppUrl } from '@/lib/store';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Wholesale Solutions', href: '/wholesale' },
    { name: 'Start Your Business', href: '/start-business' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleWhatsAppClick = () => {
    const message = 'Hello Jyoti Enterprise, I am looking for wholesale garments supply for my business.';
    window.open(buildWhatsAppUrl(message), '_blank');
  };

  return (
    <>
      <header className="w-full z-40 sticky top-0 transition-all duration-200">
        {/* Top Announcement Strip */}
        <div className="bg-[#18191C] text-neutral-200 text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8 text-center font-medium tracking-wide border-b border-neutral-800">
          <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-brand-gold font-semibold tracking-wider uppercase text-[10px] sm:text-xs">+ Wholesale Only</span>
            <span className="text-neutral-500">•</span>
            <span>Bulk Orders</span>
            <span className="text-neutral-500">•</span>
            <span>Reliable Supply for Retailers &amp; Resellers</span>
          </div>
        </div>

        {/* Main 3-Zone Navbar */}
        <nav
          className={`w-full transition-all duration-300 border-b ${
            isScrolled
              ? 'bg-[#FAF7F0]/95 backdrop-blur-md shadow-sm border-[#E8E2D5] h-18 lg:h-20'
              : 'bg-[#FAF7F0] border-[#EAE4D7] h-20 lg:h-[84px]'
          }`}
          aria-label="Main Navigation"
        >
          <div className="max-w-[1440px] mx-auto h-full px-6 sm:px-8 lg:px-10 xl:px-12 2xl:px-14 flex items-center justify-between">
            {/* ZONE 1: LEFT - LOGO */}
            <div className="flex-shrink-0 flex items-center pr-6 xl:pr-8 2xl:pr-10">
              <Logo variant="dark" />
            </div>

            {/* ZONE 2: CENTER - NAVIGATION LINKS (7 items) */}
            <div className="hidden xl:flex items-center justify-center flex-1 px-4 2xl:px-8">
              <ul className="flex items-center gap-6 xl:gap-7 2xl:gap-8 list-none m-0 p-0">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={`text-[14px] 2xl:text-[15px] font-medium tracking-normal transition-colors py-1 relative block whitespace-nowrap ${
                          isActive
                            ? 'text-brand-dark font-semibold after:content-[""] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[2px] after:bg-brand-gold after:rounded-full'
                            : 'text-neutral-700 hover:text-brand-dark'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* ZONE 3: RIGHT - PRIMARY CTA BUTTON */}
            <div className="hidden xl:flex items-center flex-shrink-0 pl-6 xl:pl-8 2xl:pl-10">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="inline-flex items-center justify-center h-11 xl:h-12 px-6 xl:px-7 text-[13px] xl:text-[14px] font-bold uppercase tracking-wider bg-brand-gold hover:bg-brand-gold-hover text-brand-dark rounded-xl shadow-sm hover:shadow transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer"
              >
                Get Wholesale Quote
              </button>
            </div>

            {/* TABLET & MOBILE CONTROLS (< xl) */}
            <div className="flex items-center gap-3 xl:hidden">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="px-3.5 py-2 text-xs font-semibold bg-brand-gold text-brand-dark rounded-lg shadow-sm hover:bg-brand-gold-hover transition-colors whitespace-nowrap"
              >
                Get Quote
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="p-2 text-brand-dark hover:text-black rounded-lg focus-visible:outline-brand-gold"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#FAF7F0] border-b border-[#E8E2D5] px-6 py-6 shadow-card animate-fade-in">
            <div className="max-w-[1440px] mx-auto flex flex-col space-y-3.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-2 transition-colors border-b border-[#E8E2D5]/50 last:border-b-0 ${
                    pathname === link.href ? 'text-brand-dark font-bold' : 'text-neutral-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-[#E8E2D5] flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setQuoteModalOpen(true);
                  }}
                  className="w-full py-3 bg-brand-gold text-brand-dark font-bold rounded-xl text-center shadow-sm uppercase tracking-wider text-sm"
                >
                  Get Wholesale Quote
                </button>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full py-3 bg-[#25D366] text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-center shadow-sm text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Direct Enquiry
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Wholesale Quote Modal */}
      <WholesaleQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </>
  );
}
