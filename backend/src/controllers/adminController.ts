import { Request, Response } from 'express';
import { store } from '../services/store';
import { config } from '../config';
import { LeadStatus } from '../types';

export function adminLogin(req: Request, res: Response) {
  try {
    const { passcode } = req.body;

    if (!passcode || passcode !== config.adminPasscode) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Admin passcode',
      });
    }

    return res.status(200).json({
      success: true,
      token: config.adminPasscode,
      message: 'Admin authenticated successfully',
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Login failed',
    });
  }
}

export function getAdminLeads(req: Request, res: Response) {
  try {
    const enquiries = store.getEnquiries();
    const starterLeads = store.getStarterLeads();

    return res.status(200).json({
      success: true,
      data: {
        enquiries,
        starterLeads,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve admin leads',
    });
  }
}

export function updateAdminLead(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const updates: any = {};
    if (status) updates.status = status as LeadStatus;

    const enquiry = store.getEnquiries().find((e) => e.id === id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    if (note) {
      enquiry.notes.push(String(note));
    }
    if (status) {
      enquiry.status = status as LeadStatus;
      enquiry.notes.push(`Status updated to ${status} on ${new Date().toLocaleDateString()}`);
    }

    return res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update lead',
    });
  }
}

export function createAdminProduct(req: Request, res: Response) {
  try {
    const { name, category, fabric, sizes, moq, unit, price, showPrice, availability, featured, image } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Product name is required',
      });
    }

    const newProd = store.addProduct({
      name,
      category: category || 'Kurtis',
      categorySlug: (category || 'kurtis').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: `Wholesale ${name} manufactured for retailers.`,
      fabric: fabric || '100% Rayon Slub',
      sizes: Array.isArray(sizes) ? sizes : ['M', 'L', 'XL', 'XXL'],
      colours: ['Assorted Wholesale Colors'],
      moq: Number(moq) || 12,
      unit: unit || 'pcs',
      price: price ? Number(price) : null,
      showPrice: Boolean(showPrice),
      availability: availability || 'In Stock',
      featured: Boolean(featured),
      image: image || '/images/cat-1-ref.jpg',
      gallery: [image || '/images/cat-1-ref.jpg'],
    });

    return res.status(201).json({
      success: true,
      data: newProd,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create product',
    });
  }
}

export function updateAdminProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = store.updateProduct(id, updates);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update product',
    });
  }
}

export function deleteAdminProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = store.deleteProduct(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete product',
    });
  }
}
