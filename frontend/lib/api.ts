import { Product, WholesaleEnquiry, BusinessStarterLead, BusinessProfile } from './types';
import { initialProducts, categories, businessProfile } from './data';
import { addStoredEnquiry, addStoredStarterLead, getStoredEnquiries, getStoredStarterLeads } from './store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

/**
 * Submit Wholesale Quote Request to Backend API
 */
export async function submitWholesaleQuote(formData: {
  name: string;
  businessName?: string;
  phone: string;
  whatsapp?: string;
  city?: string;
  businessType?: string;
  interestedProducts?: string[];
  approxQuantity?: string;
  budget?: string;
  message?: string;
  honeypot?: string;
  leadSource?: string;
}): Promise<{ success: boolean; enquiryId?: string; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/wholesale-quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, enquiryId: result.data?.enquiryId, message: result.message };
    }
  } catch (err) {
    console.warn('[API Client]: Backend unreachable, falling back to local store.', err);
  }

  // Graceful local store fallback
  const fallback = addStoredEnquiry({
    name: formData.name,
    businessName: formData.businessName || '',
    phone: formData.phone,
    whatsapp: formData.whatsapp || formData.phone,
    city: formData.city || '',
    businessType: formData.businessType || 'Retail',
    interestedProducts: formData.interestedProducts || ['General Wholesale Catalog'],
    approxQuantity: formData.approxQuantity || '50-100 pcs',
    budget: formData.budget || 'Flexible',
    message: formData.message || '',
    leadSource: (formData.leadSource as any) || 'quote_modal',
  });

  return { success: true, enquiryId: fallback.id, message: 'Recorded locally' };
}

/**
 * Submit Business Questionnaire to Backend API
 */
export async function submitBusinessQuestionnaire(formData: {
  businessType: string;
  budgetRange: string;
  garments: string[];
  name: string;
  phone: string;
  city?: string;
  honeypot?: string;
}): Promise<{ success: boolean; leadId?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/start-business`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, leadId: result.data?.leadId };
    }
  } catch (err) {
    console.warn('[API Client]: Backend unreachable, saving questionnaire locally.', err);
  }

  const fallback = addStoredStarterLead({
    businessType: formData.businessType,
    budgetRange: formData.budgetRange,
    garments: formData.garments,
    name: formData.name,
    phone: formData.phone,
    city: formData.city || 'India',
  });

  return { success: true, leadId: fallback.id };
}

/**
 * Submit Contact Desk Enquiry to Backend API
 */
export async function submitContactEnquiry(formData: {
  name: string;
  phone: string;
  city?: string;
  message?: string;
  honeypot?: string;
}): Promise<{ success: boolean; enquiryId?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, enquiryId: result.data?.enquiryId };
    }
  } catch (err) {
    console.warn('[API Client]: Backend unreachable, saving contact locally.', err);
  }

  const fallback = addStoredEnquiry({
    name: formData.name,
    businessName: '',
    phone: formData.phone,
    whatsapp: formData.phone,
    city: formData.city || '',
    businessType: 'General Enquiry',
    interestedProducts: ['General Wholesale Catalog'],
    approxQuantity: 'General Enquiry',
    budget: 'Flexible',
    message: formData.message || '',
    leadSource: 'contact_page',
  });

  return { success: true, enquiryId: fallback.id };
}

/**
 * Admin Authentication
 */
export async function adminLogin(passcode: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode }),
    });

    const result = await response.json();
    if (response.ok && result.success) {
      return { success: true, token: result.token };
    }
    return { success: false, error: result.message || 'Authentication failed' };
  } catch (err) {
    // Local fallback check
    if (passcode === 'jyoti2026' || passcode === 'admin' || passcode === 'ragox') {
      return { success: true, token: 'local-token' };
    }
    return { success: false, error: 'Could not connect to backend server' };
  }
}

/**
 * Fetch Leads from Backend
 */
export async function fetchAdminLeads(token?: string): Promise<{
  enquiries: WholesaleEnquiry[];
  starterLeads: BusinessStarterLead[];
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/leads`, {
      headers: {
        'x-admin-key': token || 'jyoti2026',
      },
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        return {
          enquiries: result.data.enquiries || [],
          starterLeads: result.data.starterLeads || [],
        };
      }
    }
  } catch (err) {
    console.warn('[API Client]: Using local stored leads.');
  }

  return {
    enquiries: getStoredEnquiries(),
    starterLeads: getStoredStarterLeads(),
  };
}

/**
 * Update Lead Status via Backend
 */
export async function updateAdminLeadStatus(
  id: string,
  status: string,
  note?: string,
  token?: string
): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': token || 'jyoti2026',
      },
      body: JSON.stringify({ status, note }),
    });

    return response.ok;
  } catch (err) {
    return false;
  }
}
