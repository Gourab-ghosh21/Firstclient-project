import { Product, WholesaleEnquiry, BusinessStarterLead, BusinessProfile } from './types';
import { initialProducts, sampleEnquiries, sampleBusinessStarterLeads, businessProfile } from './data';

const PRODUCTS_KEY = 'jyoti_b2b_products_v1';
const ENQUIRIES_KEY = 'jyoti_b2b_enquiries_v1';
const STARTER_LEADS_KEY = 'jyoti_b2b_starter_leads_v1';
const SETTINGS_KEY = 'jyoti_b2b_settings_v1';

// Server-side / in-memory fallback cache
let serverProducts = [...initialProducts];
let serverEnquiries = [...sampleEnquiries];
let serverStarterLeads = [...sampleBusinessStarterLeads];
let serverSettings = { ...businessProfile };

export function getInitialProducts(): Product[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(PRODUCTS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored products', e);
      }
    }
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
  }
  return serverProducts;
}

export function saveProducts(products: Product[]) {
  serverProducts = products;
  if (typeof window !== 'undefined') {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }
}

export function getStoredEnquiries(): WholesaleEnquiry[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(ENQUIRIES_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored enquiries', e);
      }
    }
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(sampleEnquiries));
  }
  return serverEnquiries;
}

export function addStoredEnquiry(enquiry: Omit<WholesaleEnquiry, 'id' | 'createdAt' | 'status' | 'notes'>): WholesaleEnquiry {
  const newEnquiry: WholesaleEnquiry = {
    ...enquiry,
    id: `enq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'New',
    notes: ['Enquiry submitted through website.'],
  };

  serverEnquiries = [newEnquiry, ...serverEnquiries];
  if (typeof window !== 'undefined') {
    const current = getStoredEnquiries();
    const updated = [newEnquiry, ...current];
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(updated));
  }
  return newEnquiry;
}

export function getStoredStarterLeads(): BusinessStarterLead[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STARTER_LEADS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing starter leads', e);
      }
    }
    localStorage.setItem(STARTER_LEADS_KEY, JSON.stringify(sampleBusinessStarterLeads));
  }
  return serverStarterLeads;
}

export function addStoredStarterLead(lead: Omit<BusinessStarterLead, 'id' | 'createdAt' | 'status' | 'notes'>): BusinessStarterLead {
  const newLead: BusinessStarterLead = {
    ...lead,
    id: `start-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'New',
    notes: ['Lead submitted from Interactive Questionnaire.'],
  };

  serverStarterLeads = [newLead, ...serverStarterLeads];
  if (typeof window !== 'undefined') {
    const current = getStoredStarterLeads();
    const updated = [newLead, ...current];
    localStorage.setItem(STARTER_LEADS_KEY, JSON.stringify(updated));
  }
  return newLead;
}

export function getStoredSettings(): BusinessProfile {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing settings', e);
      }
    }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(businessProfile));
  }
  return serverSettings;
}

export function saveStoredSettings(settings: BusinessProfile) {
  serverSettings = settings;
  if (typeof window !== 'undefined') {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }
}

export function buildWhatsAppUrl(message: string, customPhone?: string): string {
  const phone = (customPhone || serverSettings.whatsappNumber || '919876543210').replace(/[^0-9]/g, '');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
