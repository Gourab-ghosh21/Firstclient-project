import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { MobileStickyCTA } from '@/components/MobileStickyCTA';

export const metadata: Metadata = {
  title: 'Jyoti Enterprise — Wholesale Garments Partner for Growing Businesses',
  description:
    'Quality garments at wholesale prices for retailers, resellers and new clothing businesses. Sourcing kurtis, tops, and kids wear with reliable supply and low MOQs across India.',
  keywords: [
    'wholesale garments',
    'garment wholesale supplier',
    'wholesale clothing supplier',
    'garment supplier for retailers',
    'wholesale garments for resellers',
    'start garment business',
    'wholesale kurtis',
    'wholesale tops',
    'Jyoti Enterprise',
  ],
  authors: [{ name: 'Jyoti Enterprise' }, { name: 'RAGOX' }],
  metadataBase: new URL('https://jyotienterprise.com'),
  openGraph: {
    title: 'Jyoti Enterprise — Wholesale Garments Partner for Growing Businesses',
    description:
      'Quality garments at wholesale prices for retailers, resellers and new clothing businesses.',
    url: 'https://jyotienterprise.com',
    siteName: 'Jyoti Enterprise',
    images: [
      {
        url: '/images/hero-shelf.jpg',
        width: 1200,
        height: 630,
        alt: 'Jyoti Enterprise Wholesale Garments Stock',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jyoti Enterprise — Wholesale Garment Partner',
    description: 'Wholesale garments at bulk rates for retailers and resellers.',
    images: ['/images/hero-shelf.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WholesaleStore',
    name: 'Jyoti Enterprise',
    description: 'Quality garments at wholesale prices for retailers, resellers and new clothing businesses.',
    url: 'https://jyotienterprise.com',
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Bank Transfer, UPI, Cash on Delivery (Advance Freight)',
    areaServed: 'India',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Wholesale Garments Catalog',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: "Women's Printed Kurti",
            category: 'Kurtis',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Rayon Casual Tops',
            category: 'Tops & Dresses',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Kids Festive Wear',
            category: 'Kids Wear',
          },
        },
      ],
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF7F0] text-brand-dark antialiased">
        {/* Accessible skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 z-50 px-4 py-2 bg-brand-charcoal text-white rounded-md text-xs font-semibold"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="flex-1 pb-16 md:pb-0">
          {children}
        </main>

        <Footer />
        <FloatingWhatsApp />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
