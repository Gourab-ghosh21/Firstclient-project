import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { businessProfile } from '@/lib/data';

export function Footer() {
  return (
    <footer className="relative bg-[#141518] text-white pt-14 pb-8 overflow-hidden border-t border-neutral-800">
      {/* Subtle 4-point decorative star watermark on right matching reference design */}
      <div
        className="absolute right-6 sm:right-16 top-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 pointer-events-none opacity-10"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
          <path d="M50 0 C50 35 65 50 100 50 C65 50 50 65 50 100 C50 65 35 50 0 50 C35 50 50 35 50 0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              {businessProfile.supportingMessage}
            </p>
            <div className="pt-2 text-xs text-neutral-400 space-y-1">
              <p className="font-medium text-neutral-300">
                JYOTI ENTERPRISE — Wholesale Garment Partner
              </p>
              <p>{businessProfile.displayPhone}</p>
              <p>{businessProfile.displayWhatsapp}</p>
              <p>{businessProfile.displayEmail}</p>
              <p>{businessProfile.displayAddress}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Collections &amp; Products
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="hover:text-white transition-colors">
                  Wholesale Solutions
                </Link>
              </li>
              <li>
                <Link href="/start-business" className="hover:text-white transition-colors">
                  Start a Business
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Business & Sourcing */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold">
              Business
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/guide" className="hover:text-white transition-colors">
                  Garment Business Guide
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="hover:text-white transition-colors">
                  Wholesale Enquiry
                </Link>
              </li>
              <li>
                <Link href="/start-business" className="hover:text-white transition-colors">
                  Business Questionnaire
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-gold transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold">
              Legal &amp; Policies
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <span className="text-[11px] text-neutral-500 block pt-1">
                  B2B Trade Supply Terms Apply. Minimum Order Quantities enforced.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with subtle RAGOX credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-3">
          <p>© {new Date().getFullYear()} Jyoti Enterprise. All rights reserved.</p>
          <p className="text-neutral-400">
            Website by <span className="text-white font-medium">RAGOX</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
