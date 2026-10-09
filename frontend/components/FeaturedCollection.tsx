'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, ArrowRight, Eye } from 'lucide-react';
import { initialProducts } from '@/lib/data';
import { Product } from '@/lib/types';
import { WholesaleQuoteModal } from './WholesaleQuoteModal';
import { buildWhatsAppUrl } from '@/lib/store';

export function FeaturedCollection() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Kurtis' | 'Tops & Dresses' | 'Kids Wear'>('All');

  const featured = initialProducts.filter((p) => p.featured);

  const displayedProducts = activeTab === 'All'
    ? featured
    : featured.filter((p) => p.category === activeTab);

  const handleQuoteClick = (productName: string) => {
    setSelectedProduct(productName);
    setIsQuoteModalOpen(true);
  };

  const handleWhatsAppClick = (product: Product) => {
    const message = `Hello Jyoti Enterprise,\nI am interested in *${product.name}*.\nPlease share the wholesale price, MOQ and availability.`;
    window.open(buildWhatsAppUrl(message), '_blank');
  };

  return (
    <>
      <section className="bg-[#FAF7F0] py-16 md:py-24 border-b border-[#EAE3D5]" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
                PRODUCT CATEGORIES
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight mt-1">
                Featured Wholesale Collection
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-xl">
                Selected garments for retailers, resellers and growing clothing businesses.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
              {(['All', 'Kurtis', 'Tops & Dresses', 'Kids Wear'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? 'bg-brand-charcoal text-white shadow-sm'
                      : 'bg-white text-neutral-700 hover:bg-[#EFE8DA] border border-[#E0D7C6]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#E8E2D5] overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 flex flex-col group"
              >
                {/* Product Image Container */}
                <div className="relative aspect-[3/3.8] bg-neutral-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Badge: Availability */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/95 text-brand-dark shadow-sm backdrop-blur-sm border border-neutral-200">
                      {product.availability}
                    </span>
                  </div>

                  {/* Direct Link to product detail page */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="absolute inset-0"
                    aria-label={`View details of ${product.name}`}
                  />

                  {/* Overlay Badge matching reference design */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#141518]/90 text-white text-xs font-semibold rounded-lg shadow-sm backdrop-blur-sm">
                      <span className="truncate max-w-[150px]">{product.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
                  <div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="block group-hover:text-brand-dark transition-colors"
                    >
                      <h3 className="font-bold text-brand-dark text-base leading-snug">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-neutral-500 mt-1">
                      Sizes: {product.sizes.join(', ')} • <span className="font-semibold text-neutral-700">MOQ: {product.moq} pcs</span>
                    </p>
                  </div>

                  {/* Action Buttons Row matching reference design */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuoteClick(product.name)}
                      className="flex-1 py-2.5 px-3 bg-brand-gold text-brand-dark text-xs font-bold rounded-lg hover:bg-brand-gold-hover transition-colors shadow-sm text-center"
                    >
                      Get Wholesale Price
                    </button>

                    <button
                      type="button"
                      onClick={() => handleWhatsAppClick(product)}
                      aria-label={`Inquire about ${product.name} on WhatsApp`}
                      className="p-2.5 bg-neutral-100 hover:bg-[#25D366] hover:text-white text-neutral-700 rounded-lg transition-colors border border-neutral-200 shadow-sm"
                      title="Enquire on WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action */}
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-charcoal text-white text-sm font-bold rounded-lg shadow-sm hover:bg-black transition-all transform hover:-translate-y-0.5"
            >
              <span>VIEW ALL PRODUCTS</span>
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <WholesaleQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialProduct={selectedProduct || undefined}
      />
    </>
  );
}
