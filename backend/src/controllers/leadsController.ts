import { Request, Response } from 'express';
import { store } from '../services/store';

export function createWholesaleQuote(req: Request, res: Response) {
  try {
    const {
      name,
      businessName = '',
      phone,
      whatsapp = '',
      city = '',
      businessType = 'Physical Clothing Shop',
      interestedProducts = [],
      approxQuantity = '50-100 pcs',
      budget = '₹25,000–₹50,000',
      message = '',
      honeypot = '',
      leadSource = 'quote_modal',
    } = req.body;

    // Honeypot check
    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Received' });
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Valid customer name is required',
      });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      return res.status(400).json({
        success: false,
        message: 'Valid contact phone number is required',
      });
    }

    const enquiry = store.addEnquiry({
      name: name.trim().slice(0, 100),
      businessName: String(businessName).trim().slice(0, 100),
      phone: phone.trim().slice(0, 30),
      whatsapp: (whatsapp || phone).trim().slice(0, 30),
      city: String(city).trim().slice(0, 100),
      businessType: String(businessType).slice(0, 50),
      interestedProducts: Array.isArray(interestedProducts)
        ? interestedProducts.map((p) => String(p).slice(0, 100))
        : [String(interestedProducts).slice(0, 100)],
      approxQuantity: String(approxQuantity).slice(0, 50),
      budget: String(budget).slice(0, 50),
      message: String(message).trim().slice(0, 1000),
      leadSource: leadSource as any,
    });

    return res.status(201).json({
      success: true,
      message: 'Wholesale quotation request recorded successfully',
      data: {
        enquiryId: enquiry.id,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to process wholesale quote request',
    });
  }
}

export function createContactEnquiry(req: Request, res: Response) {
  try {
    const { name, phone, city = '', message = '', honeypot = '' } = req.body;

    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Received' });
    }

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and phone are required',
      });
    }

    const enquiry = store.addEnquiry({
      name: String(name).trim().slice(0, 100),
      businessName: '',
      phone: String(phone).trim().slice(0, 30),
      whatsapp: String(phone).trim().slice(0, 30),
      city: String(city).trim().slice(0, 100),
      businessType: 'General Enquiry',
      interestedProducts: ['General Wholesale Catalog'],
      approxQuantity: 'General Enquiry',
      budget: 'Flexible',
      message: String(message).trim().slice(0, 1000),
      leadSource: 'contact_page',
    });

    return res.status(201).json({
      success: true,
      message: 'Contact enquiry sent successfully',
      data: {
        enquiryId: enquiry.id,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to process contact enquiry',
    });
  }
}

export function createStartBusinessLead(req: Request, res: Response) {
  try {
    const { businessType, budgetRange, garments = [], name, phone, city = '', honeypot = '' } = req.body;

    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Received' });
    }

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and phone are required',
      });
    }

    const lead = store.addStarterLead({
      businessType: String(businessType || 'New Clothing Business').slice(0, 50),
      budgetRange: String(budgetRange || 'Flexible').slice(0, 50),
      garments: Array.isArray(garments) ? garments.map(g => String(g)) : [String(garments)],
      name: String(name).trim().slice(0, 100),
      phone: String(phone).trim().slice(0, 30),
      city: String(city).trim().slice(0, 100),
    });

    return res.status(201).json({
      success: true,
      message: 'Business starter plan recorded',
      data: {
        leadId: lead.id,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to process business questionnaire',
    });
  }
}
