import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/lib/data';

export function ShopByCategory() {
  return (
    <section className="bg-white py-16 md:py-20 border-b border-[#EAE3D5]" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
            PRODUCT CATEGORIES
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight">
            Explore Our Garments
          </h2>
          <p className="text-sm text-neutral-600 max-w-lg mx-auto">
            High sell-through garments designed for retail shops, boutiques, and digital resellers.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4.2] bg-neutral-900 shadow-soft border border-[#E8E2D5] flex flex-col justify-end p-4 transition-all duration-300 hover:shadow-card hover:-translate-y-1"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Scrim for readable contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

              {/* Foreground Content */}
              <div className="relative z-10 space-y-2.5">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow-sm">
                  {category.name}
                </h3>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F0] text-brand-dark text-xs font-semibold rounded-lg shadow-sm transition-transform group-hover:bg-white group-hover:translate-x-1">
                  <span>View Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
