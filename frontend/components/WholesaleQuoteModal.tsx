'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, Send, MessageSquare } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/store';
import { submitWholesaleQuote } from '@/lib/api';

interface WholesaleQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
}

export function WholesaleQuoteModal({
  isOpen,
  onClose,
  initialProduct = '',
}: WholesaleQuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    whatsapp: '',
    city: '',
    businessType: 'Physical Clothing Shop',
    interestedProduct: initialProduct || '',
    approxQuantity: '50-100 pcs',
    budget: '₹25,000–₹50,000',
    message: '',
    honeypot: '', // Spam protection
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialProduct) {
      setFormData((prev) => ({ ...prev, interestedProduct: initialProduct }));
    }
  }, [initialProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Honeypot check
    if (formData.honeypot) {
      return;
    }

    // Basic client validation
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitWholesaleQuote({
        name: formData.name,
        businessName: formData.businessName,
        phone: formData.phone,
        whatsapp: formData.whatsapp || formData.phone,
        city: formData.city,
        businessType: formData.businessType,
        interestedProducts: formData.interestedProduct ? [formData.interestedProduct] : ['General Wholesale Catalog'],
        approxQuantity: formData.approxQuantity,
        budget: formData.budget,
        message: formData.message,
        leadSource: initialProduct ? 'product_enquiry' : 'quote_modal',
      });

      if (!res.success) {
        throw new Error(res.message || 'Failed to submit enquiry');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again or reach out on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = `Hello Jyoti Enterprise,\nI have submitted a wholesale quotation request.\n\n*Name:* ${formData.name}\n*Business:* ${formData.businessName || 'New Store'}\n*City:* ${formData.city || 'India'}\n*Product Interest:* ${formData.interestedProduct || 'Wholesale Catalog'}\n*Quantity:* ${formData.approxQuantity}\n*Budget:* ${formData.budget}\n\nPlease share wholesale pricing and catalog.`;
    window.open(buildWhatsAppUrl(message), '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#FAF7F0] rounded-2xl shadow-elevated border border-[#E8E2D5] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141518] text-white">
          <div>
            <span className="text-xs uppercase tracking-wider text-brand-gold font-semibold">
              Wholesale Enquiries
            </span>
            <h3 id="modal-title" className="text-lg md:text-xl font-bold">
              Request Wholesale Quote
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors focus-visible:outline-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-brand-dark">
                Thank you for contacting Jyoti Enterprise
              </h4>
              <p className="text-neutral-600 max-w-md mx-auto text-sm leading-relaxed">
                Our wholesale team has received your enquiry. We will review your product and quantity requirements and contact you with wholesale pricing shortly.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleWhatsAppRedirect}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg shadow-sm hover:bg-[#20ba5a] transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  Continue on WhatsApp
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-neutral-200 text-neutral-800 font-semibold rounded-lg hover:bg-neutral-300 transition-all text-sm"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Spam protection honeypot */}
              <input
                type="text"
                name="user_note"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {errorMessage && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C8] rounded-lg text-sm text-brand-dark focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    Business / Shop Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. RK Fashion Retail"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C8] rounded-lg text-sm text-brand-dark focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C8] rounded-lg text-sm text-brand-dark focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Same as phone or WhatsApp"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C8] rounded-lg text-sm text-brand-dark focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    City & State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ahmedabad, Gujarat"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C8] rounded-lg text-sm text-brand-dark focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    Business Type
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C8] rounded-lg text-sm text-brand-dark focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                  >
                    <option value="Physical Clothing Shop">Physical Clothing Shop</option>
                    <option value="Online Store">Online Store</option>
                    <option value="Instagram / Facebook Reseller">Instagram / Facebook Reseller</option>
                    <option value="Boutique">Boutique</option>
                    <option value="Starting New Garment Business">Starting New Garment Business</option>
                    <option value="Wholesale Reseller">Wholesale Reseller</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    Approximate Quantity
                  </label>
                  <select
                    value={formData.approxQuantity}
                    onChange={(e) => setFormData({ ...formData, approxQuantity: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C8] rounded-lg text-sm text-brand-dark focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                  >
                    <option value="Trial / Sample Pack (12-24 pcs)">Trial / Sample Pack (12-24 pcs)</option>
                    <option value="25 - 50 pcs">25 - 50 pcs</option>
                    <option value="50 - 100 pcs">50 - 100 pcs</option>
                    <option value="100 - 300 pcs">100 - 300 pcs</option>
                    <option value="300+ pcs (Bulk Commercial)">300+ pcs (Bulk Commercial)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                    Approximate Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C8] rounded-lg text-sm text-brand-dark focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                  >
                    <option value="₹10,000–₹25,000">₹10,000–₹25,000</option>
                    <option value="₹25,000–₹50,000">₹25,000–₹50,000</option>
                    <option value="₹50,000–₹1 Lakh">₹50,000–₹1 Lakh</option>
                    <option value="₹1 Lakh+">₹1 Lakh+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  Interested Garments or Products
                </label>
                <input
                  type="text"
                  placeholder="e.g. Women's Kurtis, Tops, Kids Festive"
                  value={formData.interestedProduct}
                  onChange={(e) => setFormData({ ...formData, interestedProduct: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C8] rounded-lg text-sm text-brand-dark focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  Message / Special Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Please specify size assortment preferences, target dispatch timeline, or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C8] rounded-lg text-sm text-brand-dark focus:border-brand-gold focus:ring-1 focus:ring-brand-gold resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-brand-charcoal text-white font-semibold rounded-lg hover:bg-black transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Wholesale Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-brand-gold" />
                      <span>REQUEST WHOLESALE QUOTE</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-neutral-500 text-center mt-2">
                  🔒 Reliable wholesale supply for registered retailers & growing business owners.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
