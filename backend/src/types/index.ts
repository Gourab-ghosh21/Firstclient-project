export type AvailabilityStatus = 'In Stock' | 'Limited Stock' | 'Made to Order';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  fabric: string;
  sizes: string[];
  colours: string[];
  moq: number;
  unit: string;
  price: number | null;
  showPrice: boolean;
  availability: AvailabilityStatus;
  featured: boolean;
  image: string;
  gallery: string[];
  specifications?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  badge?: string;
}

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Quotation Sent'
  | 'Negotiation'
  | 'Converted'
  | 'Lost';

export interface WholesaleEnquiry {
  id: string;
  createdAt: string;
  name: string;
  businessName: string;
  phone: string;
  whatsapp: string;
  city: string;
  businessType: string;
  interestedProducts: string[];
  approxQuantity: string;
  budget: string;
  message: string;
  status: LeadStatus;
  leadSource: 'hero_cta' | 'product_enquiry' | 'quote_modal' | 'contact_page' | 'api';
  notes: string[];
}

export interface BusinessStarterLead {
  id: string;
  createdAt: string;
  businessType: string;
  budgetRange: string;
  garments: string[];
  name: string;
  phone: string;
  city?: string;
  status: LeadStatus;
  notes: string[];
}

export interface BusinessProfile {
  brandName: string;
  tagline: string;
  supportingMessage: string;
  whatsappNumber: string;
  displayWhatsapp: string;
  displayPhone: string;
  displayEmail: string;
  displayAddress: string;
  businessHours: string;
  primaryLocation: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
