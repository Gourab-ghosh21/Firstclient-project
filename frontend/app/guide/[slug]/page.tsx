'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { blogPosts } from '@/lib/data';
import { Clock, ArrowLeft, ArrowRight, CheckCircle2, MessageSquare, Share2 } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/store';

export default function GuideArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const article = blogPosts.find((p) => p.slug === slug);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto py-24 px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-brand-dark">Guide Article Not Found</h1>
        <p className="text-sm text-neutral-600">The requested business resource could not be found.</p>
        <Link href="/guide" className="inline-block px-6 py-2.5 bg-brand-charcoal text-white text-xs font-bold rounded-lg">
          Return to Garment Business Guide
        </Link>
      </div>
    );
  }

  const relatedArticles = blogPosts.filter((p) => p.slug !== article.slug).slice(0, 2);

  const handleConsultWholesale = () => {
    const text = `Hello Jyoti Enterprise, I read the guide "${article.title}" and would like to consult with your wholesale desk.`;
    window.open(buildWhatsAppUrl(text), '_blank');
  };

  return (
    <article className="bg-[#FAF7F0] min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Breadcrumb */}
        <nav className="text-xs text-neutral-500 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-dark">Home</Link>
          <span>/</span>
          <Link href="/guide" className="hover:text-brand-dark">Garment Business Guide</Link>
          <span>/</span>
          <span className="font-semibold text-brand-dark truncate max-w-[200px]">{article.title}</span>
        </nav>

        {/* Article Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D5] shadow-soft space-y-4">
          <div className="flex items-center gap-3 text-xs font-semibold text-neutral-500">
            <span className="bg-[#FAF7F0] border border-[#E8E2D5] text-brand-dark px-3 py-1 rounded-full">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span>• Published: {article.publishedDate}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-medium">
            {article.subtitle}
          </p>

          {/* Key Takeaways Callout */}
          {article.keyTakeaways && (
            <div className="mt-6 p-5 rounded-2xl bg-[#FAF7F0] border border-[#E8E2D5] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-dark block">
                Key Strategic Takeaways
              </span>
              <div className="space-y-2">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D5] shadow-soft space-y-8 text-neutral-800 leading-relaxed text-sm sm:text-base">
          {article.sections.map((sec, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-brand-dark tracking-tight">
                {sec.heading}
              </h2>
              {sec.body.map((para, pIdx) => (
                <p key={pIdx} className="text-neutral-700 leading-relaxed text-sm sm:text-base">
                  {para}
                </p>
              ))}
            </section>
          ))}

          {/* Wholesale Callout Banner */}
          <div className="pt-8 border-t border-[#F0EAE0]">
            <div className="bg-[#181A1D] text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                  Direct Sourcing Support
                </span>
                <h3 className="text-lg font-bold">Have Questions for Jyoti Enterprise?</h3>
                <p className="text-xs text-neutral-400">
                  Connect directly with our wholesale team to discuss order bundles, MOQs, and dispatch.
                </p>
              </div>

              <button
                type="button"
                onClick={handleConsultWholesale}
                className="px-6 py-3 bg-[#25D366] text-white font-bold text-xs rounded-xl shadow-sm hover:bg-[#20ba5a] transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Articles Navigation */}
        {relatedArticles.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-brand-dark">More Sourcing Blueprints</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/guide/${rel.slug}`}
                  className="bg-white p-5 rounded-2xl border border-[#E8E2D5] shadow-soft hover:shadow-card transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[11px] text-neutral-500 font-semibold">{rel.category}</span>
                    <h4 className="font-bold text-sm text-brand-dark group-hover:text-black mt-1">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="pt-3 text-xs font-bold text-brand-gold flex items-center gap-1">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
