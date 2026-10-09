import React from 'react';
import { Package, HeartHandshake, Boxes, TrendingUp } from 'lucide-react';

export function BusinessValueStrip() {
  const values = [
    {
      title: 'Wholesale Focus',
      description: 'Quality garments at bulk rates',
      detail: 'Products designed around wholesale business requirements.',
      icon: Package,
    },
    {
      title: 'Retailer Friendly',
      description: 'Sourcing options for small businesses',
      detail: 'Accessible MOQs designed for growing clothing shops.',
      icon: HeartHandshake,
    },
    {
      title: 'Bulk Orders',
      description: 'Streamlined order processing',
      detail: 'Efficient bundle packing and fast dispatch cycles.',
      icon: Boxes,
    },
    {
      title: 'Business Support',
      description: 'Helping new entrepreneurs grow',
      detail: 'Practical guidance for starting garment retailers.',
      icon: TrendingUp,
    },
  ];

  return (
    <section className="bg-[#DFB87F] text-[#18191C] py-7 md:py-8 border-y border-[#CF9E62]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 group transition-transform duration-200"
              >
                <div className="flex-shrink-0 mt-0.5 p-2 bg-[#18191C]/10 rounded-lg group-hover:bg-[#18191C]/15 transition-colors">
                  <Icon className="w-5 h-5 text-[#18191C] stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-[#18191C] uppercase">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#2A261F] font-medium mt-0.5 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
