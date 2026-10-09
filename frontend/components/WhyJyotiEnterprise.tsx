import React from 'react';
import { ShieldCheck, Users, RefreshCw, Headphones, Handshake } from 'lucide-react';

export function WhyJyotiEnterprise() {
  const pillars = [
    {
      title: 'Wholesale Focus',
      description: 'Our catalog and production cycles are strictly tailored for wholesale business continuity, not retail one-offs.',
      icon: ShieldCheck,
    },
    {
      title: 'Retailer Friendly',
      description: 'Manageable minimum order quantities so small and mid-sized shop owners can test new assortments with low financial risk.',
      icon: Users,
    },
    {
      title: 'Flexible Product Selection',
      description: 'Balanced size ratios and varied color palettes across fast-turnover ethnic wear, daily kurtis, tops, and festive wear.',
      icon: RefreshCw,
    },
    {
      title: 'Business Support',
      description: 'Practical sourcing advice from wholesale specialists who understand retail margins and inventory turnaround.',
      icon: Headphones,
    },
    {
      title: 'Long-Term Relationships',
      description: 'We prioritize repeat wholesale partnerships, ensuring consistent fabric quality and dependable seasonal restocking.',
      icon: Handshake,
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 border-b border-[#EAE3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Media Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-card border border-[#E5DECF] bg-neutral-900 aspect-[4/5] group">
              <img
                src="/images/fabric-warehouse.jpg"
                alt="Jyoti Enterprise wholesale garment warehouse and textile sourcing"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
                  Direct Wholesale Source
                </span>
                <p className="text-sm font-medium text-neutral-200">
                  Disciplined quality standards across all production bundles.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
                PROVEN B2B PARTNERSHIP
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight mt-1">
                Why Jyoti Enterprise
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 mt-2 leading-relaxed">
                We believe reliable wholesale supply is the backbone of every thriving clothing store. Our processes are designed to eliminate sourcing headaches.
              </p>
            </div>

            <div className="space-y-5">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E8E2D5] text-brand-dark flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-brand-dark stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-brand-dark">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
