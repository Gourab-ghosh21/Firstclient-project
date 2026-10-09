'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, MessageSquare, ArrowRight, RotateCcw } from 'lucide-react';
import { initialProducts, categories } from '@/lib/data';
import { Product } from '@/lib/types';
import { WholesaleQuoteModal } from '@/components/WholesaleQuoteModal';
import { buildWhatsAppUrl } from '@/lib/store';

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedMoq, setSelectedMoq] = useState<string>('all');
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === 'all' ||
        product.categorySlug === selectedCategory ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      // MOQ filter
      let matchesMoq = true;
      if (selectedMoq === '12') matchesMoq = product.moq <= 12;
      else if (selectedMoq === '18') matchesMoq = product.moq <= 18;
      else if (selectedMoq === '24') matchesMoq = product.moq >= 20;

      return matchesSearch && matchesCategory && matchesMoq;
    });
  }, [searchQuery, selectedCategory, selectedMoq]);

  const handleOpenQuote = (productName: string) => {
    setSelectedProductForQuote(productName);
    setIsQuoteModalOpen(true);
  };

  const handleWhatsApp = (product: Product) => {
    const text = `Hello Jyoti Enterprise,\nI am interested in wholesale supply for *${product.name}* (MOQ: ${product.moq} pcs).\nPlease share price list and color assortment.`;
    window.open(buildWhatsAppUrl(text), '_blank');
  };

  return (
    <>
      <div className="bg-[#FAF7F0] min-h-screen py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs text-neutral-500 mb-4 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-dark">Home</Link>
            <span>/</span>
            <span className="font-semibold text-brand-dark">Wholesale Garments Catalog</span>
          </nav>

          {/* Page Heading */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
              Wholesale Garments Collection
            </h1>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
              Reliable bulk garment supply for clothing retailers, boutiques, and online sellers. Filter by category or minimum order quantity.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E2D5] shadow-soft mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by garment name, fabric, or style..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#FAF7F0] border border-[#DDD5C7] rounded-xl text-xs sm:text-sm text-brand-dark focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              {/* MOQ Filter Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-neutral-600 whitespace-nowrap">Filter MOQ:</span>
                <select
                  value={selectedMoq}
                  onChange={(e) => setSelectedMoq(e.target.value)}
                  className="px-3 py-2 bg-[#FAF7F0] border border-[#DDD5C7] rounded-xl text-xs text-brand-dark font-medium focus:bg-white focus:border-brand-gold"
                >
                  <option value="all">All Quantities</option>
                  <option value="12">Low MOQ (≤ 12 pcs)</option>
                  <option value="18">Mid MOQ (≤ 18 pcs)</option>
                  <option value="24">Bulk Batches (20+ pcs)</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#F2ECE0]">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-brand-charcoal text-white shadow-sm'
                    : 'bg-[#FAF7F0] text-neutral-700 hover:bg-[#EFE7DA] border border-[#E4DC CE]'
                }`}
              >
                All Garments ({initialProducts.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-brand-charcoal text-white shadow-sm'
                      : 'bg-[#FAF7F0] text-neutral-700 hover:bg-[#EFE7DA] border border-[#E4DCCE]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-6">
            <span>
              Showing <strong className="text-brand-dark">{filteredProducts.length}</strong> wholesale designs
            </span>
            {(searchQuery || selectedCategory !== 'all' || selectedMoq !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedMoq('all');
                }}
                className="inline-flex items-center gap-1 text-xs text-brand-dark hover:underline font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#E8E2D5] shadow-soft space-y-3">
              <p className="text-base font-bold text-brand-dark">No garments matched your filter.</p>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                Try adjusting your search query or selecting &quot;All Garments&quot; to browse our complete collection.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedMoq('all');
                }}
                className="px-5 py-2.5 bg-brand-charcoal text-white text-xs font-bold rounded-lg hover:bg-black mt-2"
              >
                View Full Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-[#E8E2D5] overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 flex flex-col group"
                >
                  <div className="relative aspect-[3/3.8] bg-neutral-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/95 text-brand-dark shadow-sm">
                        {product.availability}
                      </span>
                    </div>

                    <Link
                      href={`/products/${product.slug}`}
                      className="absolute inset-0"
                      aria-label={`View ${product.name}`}
                    />

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#141518]/90 text-white text-xs font-semibold rounded-lg shadow-sm">
                        <span className="truncate max-w-[150px]">{product.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <Link href={`/products/${product.slug}`} className="block">
                        <h3 className="font-bold text-brand-dark text-base leading-snug">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
                        Fabric: {product.fabric}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Sizes: {product.sizes.join(', ')} • <span className="font-semibold text-brand-dark">MOQ: {product.moq} pcs</span>
                      </p>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenQuote(product.name)}
                        className="flex-1 py-2 px-3 bg-brand-gold text-brand-dark text-xs font-bold rounded-lg hover:bg-brand-gold-hover transition-colors shadow-sm text-center"
                      >
                        Get Wholesale Price
                      </button>

                      <button
                        type="button"
                        onClick={() => handleWhatsApp(product)}
                        aria-label={`Enquire about ${product.name} on WhatsApp`}
                        className="p-2 bg-neutral-100 hover:bg-[#25D366] hover:text-white text-neutral-700 rounded-lg transition-colors border border-neutral-200"
                        title="WhatsApp Enquiry"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <WholesaleQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialProduct={selectedProductForQuote || undefined}
      />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-neutral-500">Loading Garments Catalog...</div>}>
      <ProductsCatalogContent />
    </Suspense>
  );
}
