'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, MessageSquare, AlertCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/store';
import { submitBusinessQuestionnaire } from '@/lib/api';

export function StartYourGarmentBusiness() {
  const [formData, setFormData] = useState({
    businessType: 'Physical Clothing Shop',
    budget: '₹25,000–₹50,000',
    selectedGarments: ["Women's Wear", 'Kurtis'],
    name: '',
    phone: '',
    city: '',
    honeypot: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const businessTypes = [
    'Physical Clothing Shop',
    'Online Store',
    'Boutique',
    'Reselling',
    'Instagram/Facebook Business',
  ];

  const budgetOptions = [
    '₹10,000–₹25,000',
    '₹25,000–₹50,000',
    '₹50,000–₹1 Lakh',
    '₹1 Lakh+',
  ];

  const garmentOptions = [
    "Women's Wear",
    'Kurtis',
    'Tops & Dresses',
    'Kids Wear',
  ];

  const handleGarmentToggle = (garment: string) => {
    setFormData((prev) => {
      const exists = prev.selectedGarments.includes(garment);
      if (exists) {
        return {
          ...prev,
          selectedGarments: prev.selectedGarments.filter((g) => g !== garment),
        };
      } else {
        return {
          ...prev,
          selectedGarments: [...prev.selectedGarments, garment],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (formData.honeypot) return;

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitBusinessQuestionnaire({
        businessType: formData.businessType,
        budgetRange: formData.budget,
        garments: formData.selectedGarments,
        name: formData.name,
        phone: formData.phone,
        city: formData.city || 'India',
      });

      if (!res.success) {
        throw new Error('Failed to submit questionnaire');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage('Unable to submit your plan right now. You can chat with us on WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinueWhatsApp = () => {
    const message = `Hello Jyoti Enterprise,\nI completed the Garment Business Starter Questionnaire.\n\n*Business Type:* ${formData.businessType}\n*Budget:* ${formData.budget}\n*Interested In:* ${formData.selectedGarments.join(', ') || 'All Wholesale Garments'}\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*City:* ${formData.city || 'India'}\n\nPlease share your wholesale starter catalog and recommendations.`;
    window.open(buildWhatsAppUrl(message), '_blank');
  };

  return (
    <section className="bg-[#FAF7F0] py-16 md:py-24 border-b border-[#EAE3D5]" id="start-business">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Dark Signature Block */}
          <div className="lg:col-span-6 bg-[#181A1D] text-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-card flex flex-col justify-between border border-neutral-800">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                  START YOUR GARMENT BUSINESS
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Starting a Garment Business? Start With the Right Supplier.
              </h2>

              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                Whether you&apos;re opening your first clothing shop, launching an online store or starting garment reselling, we help you explore wholesale sourcing options.
              </p>

              {/* 4 Process Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-1">
                  <span className="text-2xl font-black text-brand-gold block font-mono">
                    01
                  </span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-neutral-100">
                    <span>Choose Products</span>
                    <ArrowRight className="w-4 h-4 text-brand-gold" />
                  </div>
                  <p className="text-xs text-neutral-400">
                    Select proven, high-demand styles suited to your budget.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-2xl font-black text-brand-gold block font-mono">
                    02
                  </span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-neutral-100">
                    <span>Get Wholesale Pricing</span>
                    <ArrowRight className="w-4 h-4 text-brand-gold" />
                  </div>
                  <p className="text-xs text-neutral-400">
                    Receive clear bundle rates and recommended retail markups.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-2xl font-black text-brand-gold block font-mono">
                    03
                  </span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-neutral-100">
                    <span>Confirm Your Order</span>
                    <ArrowRight className="w-4 h-4 text-brand-gold" />
                  </div>
                  <p className="text-xs text-neutral-400">
                    Standard pack inspection and direct parcel dispatch.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-2xl font-black text-brand-gold block font-mono">
                    04
                  </span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-neutral-100">
                    <span>Start Selling</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Stock your shop or start taking customer orders.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <a
                href="#interactive-questionnaire"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-gold text-brand-dark font-bold text-sm rounded-xl shadow-sm hover:bg-brand-gold-hover transition-all"
              >
                Start Your Garment Business
              </a>
            </div>
          </div>

          {/* Right Interactive Questionnaire Block */}
          <div
            id="interactive-questionnaire"
            className="lg:col-span-6 bg-[#F8F6F0] rounded-3xl p-8 sm:p-10 lg:p-12 border border-[#E8E2D5] shadow-card flex flex-col justify-between"
          >
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 block">
                  INTERACTIVE QUESTIONNAIRE
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight mt-1">
                  Tell Us About Your Business
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                  Tell us what you&apos;re planning to build and our team can help you explore suitable wholesale options.
                </p>
              </div>

              {isSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-brand-dark">
                    Thank you for contacting Jyoti Enterprise.
                  </h4>
                  <p className="text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
                    Our team will review your requirements and contact you shortly with a personalized wholesale starter plan.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleContinueWhatsApp}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold text-sm rounded-xl shadow-sm hover:bg-[#20ba5a] transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      CONTINUE ON WHATSAPP
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input
                    type="text"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                  />

                  {errorMessage && (
                    <div className="flex items-center gap-2 p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Step 1: Business Type */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">
                      01. What type of business are you starting?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {businessTypes.map((type) => {
                        const isSelected = formData.businessType === type;
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setFormData({ ...formData, businessType: type })}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              isSelected
                                ? 'bg-[#181A1D] text-white shadow-sm'
                                : 'bg-white text-neutral-700 border border-[#DED7CA] hover:bg-[#EFE8DC]'
                            }`}
                          >
                            {isSelected ? '✓ ' : ''}{type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Budget */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">
                      02. Approximate starting budget:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {budgetOptions.map((budget) => {
                        const isSelected = formData.budget === budget;
                        return (
                          <button
                            type="button"
                            key={budget}
                            onClick={() => setFormData({ ...formData, budget })}
                            className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                              isSelected
                                ? 'bg-[#181A1D] text-white shadow-sm'
                                : 'bg-white text-neutral-700 border border-[#DED7CA] hover:bg-[#EFE8DC]'
                            }`}
                          >
                            {isSelected ? '● ' : '○ '}{budget}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Interested Garments */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">
                      03. Which garments are you interested in?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {garmentOptions.map((garment) => {
                        const isChecked = formData.selectedGarments.includes(garment);
                        return (
                          <button
                            type="button"
                            key={garment}
                            onClick={() => handleGarmentToggle(garment)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              isChecked
                                ? 'bg-brand-gold text-brand-dark font-semibold'
                                : 'bg-white text-neutral-700 border border-[#DED7CA] hover:bg-[#EFE8DC]'
                            }`}
                          >
                            {isChecked ? '✓ ' : '+ '}{garment}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 4: Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="[Name] *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C8] rounded-xl text-xs sm:text-sm text-brand-dark focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="[Phone / WhatsApp] *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C8] rounded-xl text-xs sm:text-sm text-brand-dark focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                  </div>

                  {/* City input */}
                  <div>
                    <input
                      type="text"
                      placeholder="Your City (e.g. Pune, Indore, Delhi, Kolkata)"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C8] rounded-xl text-xs sm:text-sm text-brand-dark focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>

                  {/* Final CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 bg-[#181A1D] text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
                          <span>Generating Wholesale Starter Plan...</span>
                        </>
                      ) : (
                        <span>GET A WHOLESALE STARTER PLAN</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
