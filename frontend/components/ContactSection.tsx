'use client';

import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, MapPin, Clock, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { businessProfile } from '@/lib/data';
import { buildWhatsAppUrl } from '@/lib/store';
import { WholesaleQuoteModal } from './WholesaleQuoteModal';
import { submitContactEnquiry } from '@/lib/api';

export function ContactSection() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    message: '',
    honeypot: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (formData.honeypot) return;

    if (!formData.name || !formData.phone) {
      setErrorMsg('Please provide your name and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitContactEnquiry({
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        message: formData.message,
      });
      if (!res.success) throw new Error('Submission failed');
      setIsSubmitted(true);
    } catch {
      setErrorMsg('Unable to send enquiry. Please reach out via WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = 'Hello Jyoti Enterprise, I would like to inquire about wholesale garment supplies.';
    window.open(buildWhatsAppUrl(text), '_blank');
  };

  return (
    <>
      <section className="bg-[#FAF7F0] py-16 md:py-24 border-b border-[#EAE3D5]" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
              DIRECT WHOLESALE DESK
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight">
              Let&apos;s Grow Your Garment Business Together
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Have questions regarding wholesale catalogs, minimum order bundles, parcel dispatch timelines, or custom sizing? Speak directly with our wholesale desk.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Contact Information */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-card space-y-6">
              <h3 className="text-lg font-bold text-brand-dark border-b border-[#EAE3D5] pb-4">
                Wholesale Desk Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EAE3D5] text-brand-dark flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 block uppercase">Phone Number</span>
                    <span className="text-sm font-bold text-brand-dark">{businessProfile.displayPhone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EAE3D5] text-[#25D366] flex-shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 block uppercase">WhatsApp Wholesale</span>
                    <span className="text-sm font-bold text-brand-dark">{businessProfile.displayWhatsapp}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EAE3D5] text-brand-dark flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 block uppercase">Email Support</span>
                    <span className="text-sm font-bold text-brand-dark">{businessProfile.displayEmail}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EAE3D5] text-brand-dark flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 block uppercase">Business Address</span>
                    <span className="text-sm font-bold text-brand-dark">{businessProfile.displayAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#EAE3D5] text-brand-dark flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 block uppercase">Operating Hours</span>
                    <span className="text-xs text-neutral-700 font-medium">{businessProfile.businessHours}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#EAE3D5] flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(true)}
                  className="w-full py-3 bg-brand-gold text-brand-dark font-bold text-xs sm:text-sm rounded-xl shadow-sm hover:bg-brand-gold-hover transition-all text-center"
                >
                  GET WHOLESALE QUOTE
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full py-3 bg-[#25D366] text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Right Contact / Quick Message Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-card">
              <h3 className="text-lg font-bold text-brand-dark mb-1">
                Send Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mb-6">
                Fill in your details below and our wholesale representative will reach out within working hours.
              </p>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-brand-dark">
                    Message Sent Successfully
                  </h4>
                  <p className="text-sm text-neutral-600 max-w-sm mx-auto">
                    Thank you. We have recorded your wholesale message. Our team will contact you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 bg-neutral-100 text-neutral-800 text-xs font-semibold rounded-lg hover:bg-neutral-200"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                  />

                  {errorMsg && (
                    <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Rajesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#DCD5C8] rounded-xl text-xs sm:text-sm text-brand-dark focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#DCD5C8] rounded-xl text-xs sm:text-sm text-brand-dark focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                      City / Retail Market
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Surat, Jaipur, Lucknow, Patna"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#DCD5C8] rounded-xl text-xs sm:text-sm text-brand-dark focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share your requirements (e.g. looking for 50 kurtis for opening a shop in November)..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#DCD5C8] rounded-xl text-xs sm:text-sm text-brand-dark focus:bg-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-brand-charcoal text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-brand-gold" />
                        <span>SEND ENQUIRY</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <WholesaleQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </>
  );
}
