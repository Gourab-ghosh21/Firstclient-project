import React from 'react';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Garment Business Guide — Jyoti Enterprise Wholesale Knowledge Base',
  description:
    'Practical sourcing, budgeting, and inventory turnover guides for clothing retailers, boutique owners, and digital garment resellers.',
};

export default function GuideIndexPage() {
  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <nav className="text-xs text-neutral-500 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-dark">Home</Link>
            <span>/</span>
            <span className="font-semibold text-brand-dark">Garment Business Guide</span>
          </nav>

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500 block">
            KNOWLEDGE BASE FOR CLOTHING ENTREPRENEURS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight">
            Garment Business Guide
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed">
            Starting and scaling a retail clothing store requires practical knowledge: calculating real landed costs, choosing the right size curves, managing working capital, and partnering with dependable wholesale sources.
          </p>
        </div>

        {/* 8 Full Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/guide/${post.slug}`}
              className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
                  <span className="bg-[#FAF7F0] text-brand-dark border border-[#E8E2D5] px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-brand-dark group-hover:text-black transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#F2ECE0] flex items-center justify-between text-xs font-bold text-brand-dark">
                <span>Read Full Blueprint</span>
                <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#181A1D] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 border border-neutral-800">
          <h3 className="text-2xl font-bold">Have Questions About Your Business Setup?</h3>
          <p className="text-sm text-neutral-400 max-w-lg mx-auto">
            Our wholesale desk helps new clothing shop owners and resellers choose the right initial styles.
          </p>
          <div className="pt-2">
            <Link
              href="/start-business"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-gold text-brand-dark font-bold text-xs sm:text-sm rounded-xl shadow-sm hover:bg-brand-gold-hover transition-all"
            >
              <span>Get Wholesale Starter Plan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
