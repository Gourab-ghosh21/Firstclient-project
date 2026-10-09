'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { initialProducts } from '@/lib/data';
import { Product } from '@/lib/types';
import { MessageSquare, FileText, Check, ArrowRight, ShieldCheck, Truck, PackageCheck } from 'lucide-react';
import { WholesaleQuoteModal } from '@/components/WholesaleQuoteModal';
import { buildWhatsAppUrl } from '@/lib/store';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.id as string;

  const product = initialProducts.find((p) => p.slug === slug || p.id === slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-brand-dark">Product Not Found</h1>
        <p className="text-sm text-neutral-600">The requested wholesale garment style could not be located.</p>
        <Link
          href="/products"
          className="inline-block px-6 py-2.5 bg-brand-charcoal text-white text-xs font-bold rounded-lg"
        >
          Return to Wholesale Catalog
        </Link>
      </div>
    );
  }

  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const relatedProducts = initialProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleWhatsAppEnquiry = () => {
    const text = `Hello Jyoti Enterprise,\nI am interested in *${product.name}*.\nPlease share the wholesale price, MOQ and availability.`;
    window.open(buildWhatsAppUrl(text), '_blank');
  };

  return (
    <>
      <div className="bg-[#FAF7F0] min-h-screen py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="text-xs text-neutral-500 mb-6 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-brand-dark">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-brand-dark">Products</Link>
            <span>/</span>
            <Link href={`/products?category=${product.categorySlug}`} className="hover:text-brand-dark">
              {product.category}
            </Link>
            <span>/</span>
            <span className="font-semibold text-brand-dark truncate max-w-[200px]">{product.name}</span>
          </nav>

          {/* Product Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E8E2D5] shadow-soft">
            {/* Left: Gallery Column */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Display */}
              <div className="relative aspect-[3/3.8] rounded-2xl overflow-hidden bg-neutral-100 border border-[#EAE3D5] shadow-sm">
                <img
                  src={gallery[activeImageIndex] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-all duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-white/95 text-brand-dark rounded-full shadow-sm backdrop-blur-sm">
                    {product.availability}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImageIndex === idx ? 'border-brand-gold shadow-sm scale-105' : 'border-neutral-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Garment Specifications & Wholesale CTAs */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 block">
                    {product.category} • Wholesale Catalog
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight mt-1">
                    {product.name}
                  </h1>
                </div>

                {/* Wholesale Pricing Banner */}
                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E2D5] flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="text-xs text-neutral-500 uppercase font-semibold block">Wholesale Pricing</span>
                    <span className="text-lg font-bold text-brand-dark">Wholesale Rate on Request</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-neutral-500 uppercase font-semibold block">Minimum Order</span>
                    <span className="text-sm font-bold text-brand-gold bg-brand-charcoal px-3 py-1 rounded-full">
                      MOQ: {product.moq} {product.unit}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Specifications List */}
                <div className="space-y-2.5 pt-2 border-t border-[#F0EAE0]">
                  <div className="flex items-center text-xs sm:text-sm">
                    <span className="w-32 text-neutral-500 font-semibold">Fabric Quality:</span>
                    <span className="font-bold text-brand-dark">{product.fabric}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm">
                    <span className="w-32 text-neutral-500 font-semibold">Available Sizes:</span>
                    <span className="font-bold text-brand-dark">{product.sizes.join('  •  ')}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm">
                    <span className="w-32 text-neutral-500 font-semibold">Color Assortment:</span>
                    <span className="font-bold text-brand-dark">{product.colours.join(', ')}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm">
                    <span className="w-32 text-neutral-500 font-semibold">Packaging Unit:</span>
                    <span className="font-bold text-brand-dark">{product.unit}</span>
                  </div>
                </div>

                {/* Extra Technical Specs if present */}
                {product.specifications && (
                  <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#E8E2D5] text-xs space-y-1.5">
                    <span className="font-bold text-brand-dark block uppercase tracking-wider text-[11px]">
                      Garment Technical Specs:
                    </span>
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-0.5 border-b border-[#EAE3D5] last:border-0">
                        <span className="text-neutral-500">{key}:</span>
                        <span className="font-semibold text-brand-dark">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Wholesale Inquiry CTAs */}
              <div className="space-y-3 pt-4 border-t border-[#F0EAE0]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setQuoteModalOpen(true)}
                    className="py-3.5 px-6 bg-brand-charcoal text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <FileText className="w-4 h-4 text-brand-gold" />
                    <span>REQUEST WHOLESALE QUOTE</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppEnquiry}
                    className="py-3.5 px-6 bg-[#25D366] text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WHATSAPP ENQUIRY</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-neutral-600">
                  <div className="p-2 bg-[#FAF7F0] rounded-lg border border-[#E8E2D5]">
                    <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-brand-dark" />
                    <span>Quality Inspected</span>
                  </div>
                  <div className="p-2 bg-[#FAF7F0] rounded-lg border border-[#E8E2D5]">
                    <PackageCheck className="w-4 h-4 mx-auto mb-1 text-brand-dark" />
                    <span>Assorted Bundles</span>
                  </div>
                  <div className="p-2 bg-[#FAF7F0] rounded-lg border border-[#E8E2D5]">
                    <Truck className="w-4 h-4 mx-auto mb-1 text-brand-dark" />
                    <span>All-India Parcel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Wholesale Garments */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight mb-6">
                Related Wholesale Garments
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProducts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/products/${rel.slug}`}
                    className="bg-white rounded-2xl border border-[#E8E2D5] overflow-hidden shadow-soft hover:shadow-card transition-all group p-4 flex gap-4 items-center"
                  >
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-20 h-24 object-cover rounded-xl group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-brand-dark group-hover:text-black">
                        {rel.name}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1">
                        MOQ: {rel.moq} pcs
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-gold mt-2">
                        <span>View Garment</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <WholesaleQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialProduct={product.name}
      />
    </>
  );
}
