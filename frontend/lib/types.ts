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
  moq: number; // Minimum Order Quantity
  unit: string; // e.g. "pcs", "sets"
  price: number | null; // null if hidden
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
  leadSource: 'hero_cta' | 'product_enquiry' | 'quote_modal' | 'contact_page';
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

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedDate: string;
  excerpt: string;
  summary: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    body: string[];
  }[];
}

export interface BusinessProfile {
  brandName: string;
  tagline: string;
  supportingMessage: string;
  whatsappNumber: string; // e.g. "919876543210" without symbols for wa.me link
  displayWhatsapp: string; // e.g. "[WHATSAPP NUMBER]" or editable
  displayPhone: string; // e.g. "[PHONE NUMBER]"
  displayEmail: string; // e.g. "[EMAIL]"
  displayAddress: string; // e.g. "[BUSINESS ADDRESS]"
  businessHours: string;
  primaryLocation: string;
}
