import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/data';

export function BusinessResources() {
  // Show top 4 articles on the homepage
  const featuredArticles = blogPosts.slice(0, 4);

  return (
    <section className="bg-white py-16 md:py-24 border-b border-[#EAE3D5]" id="resources">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
              KNOWLEDGE BASE &amp; SOURCING INSIGHTS
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight mt-1">
              Garment Business Guide
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-xl">
              Practical guides and financial calculations to help retailers, resellers, and newcomers build profitable garment operations.
            </p>
          </div>

          <Link
            href="/guide"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-dark hover:text-black"
          >
            <span>View All 8 Guides</span>
            <ArrowRight className="w-4 h-4 text-brand-gold" />
          </Link>
        </div>

        {/* 4 Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/guide/${article.slug}`}
              className="group bg-[#FAF7F0] rounded-2xl border border-[#E8E2D5] p-5 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500">
                  <span className="text-neutral-700 bg-[#EDE5D8] px-2.5 py-0.5 rounded-full">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-base text-brand-dark group-hover:text-black transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-[#EAE3D5] flex items-center justify-between text-xs font-bold text-brand-dark">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
