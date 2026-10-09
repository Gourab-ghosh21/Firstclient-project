import { Product, Category, WholesaleEnquiry, BusinessStarterLead, BusinessProfile } from '../types';

export const initialCategories: Category[] = [
  {
    id: 'cat-womens-wear',
    name: "Women's Wear",
    slug: 'womens-wear',
    image: '/images/cat-1-ref.jpg',
    description: 'Comprehensive wholesale collection of contemporary and traditional women’s garments for boutiques and retailers.',
    badge: 'Popular',
  },
  {
    id: 'cat-kurtis',
    name: 'Kurtis',
    slug: 'kurtis',
    image: '/images/cat-2-ref.jpg',
    description: 'Daily wear, festive, straight cut, and Anarkali kurtis crafted with tested color fastness and reliable stitching.',
    badge: 'Top Wholesale',
  },
  {
    id: 'cat-tops-dresses',
    name: 'Tops & Dresses',
    slug: 'tops-dresses',
    image: '/images/cat-3-ref.jpg',
    description: 'Fast-moving rayon tops, tunics, and dresses designed for urban boutiques and digital clothing resellers.',
    badge: 'High Margin',
  },
  {
    id: 'cat-kids-wear',
    name: 'Kids Wear',
    slug: 'kids-wear',
    image: '/images/cat-4-ref.jpg',
    description: 'Durable, skin-friendly festive kurtas and daily apparel engineered specifically for young demographics.',
    badge: 'High Repeat',
  },
];

export const initialProducts: Product[] = [
  {
    id: 'prod-womens-printed-kurti',
    slug: 'womens-printed-kurti',
    name: "Women's Printed Kurti",
    category: 'Kurtis',
    categorySlug: 'kurtis',
    description: 'Straight-cut printed ethnic kurti crafted from breathable rayon-cotton fabric. Features neat placket embroidery and pre-shrunk wash. Specially selected for high sell-through rates across retail counters.',
    fabric: 'Premium 140 GSM Rayon & Cotton Blend',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colours: ['Indigo Navy', 'Charcoal Grey', 'Maroon Wine', 'Deep Teal'],
    moq: 12,
    unit: 'pcs (Assorted Sizes & Colours)',
    price: null,
    showPrice: false,
    availability: 'In Stock',
    featured: true,
    image: '/images/cat-1-ref.jpg',
    gallery: ['/images/cat-1-ref.jpg', '/images/prod-kurti.jpg', '/images/kurti-editorial.jpg'],
    specifications: {
      'Sleeve Length': '3/4 Sleeves',
      'Stitching Standard': 'Interlocked 4-thread overlock',
      'Wash Care': 'Machine wash cold / Gentle cycle',
      'Packaging': 'Single piece polybag in wholesale bundle of 12',
    },
  },
  {
    id: 'prod-rayon-casual-tops',
    slug: 'rayon-casual-tops',
    name: 'Rayon Casual Tops',
    category: 'Tops & Dresses',
    categorySlug: 'tops-dresses',
    description: 'Versatile casual peasant top featuring subtle bohemian prints, comfortable neckline, and relaxed silhouette. Highly favored by college-wear and modern casual apparel retailers.',
    fabric: 'Ultra-soft Washed Slub Rayon',
    sizes: ['S', 'M', 'L', 'XL'],
    colours: ['Rust Crimson', 'Earthy Mustard', 'Olive Sage', 'Midnight Black'],
    moq: 18,
    unit: 'pcs (Assorted Sizes)',
    price: null,
    showPrice: false,
    availability: 'In Stock',
    featured: true,
    image: '/images/prod-2-ref.jpg',
    gallery: ['/images/prod-2-ref.jpg', '/images/cat-3-ref.jpg', '/images/ethnic-wear.jpg'],
    specifications: {
      'Sleeve Length': 'Elasticated Raglan / 3/4 Sleeves',
      'Fit Type': 'Comfort Casual Fit',
      'Length': 'Hip Length (26 inches)',
      'Wholesale Pack': 'Assorted sizes ratio 1:2:2:1',
    },
  },
  {
    id: 'prod-tops-and-dresses',
    slug: 'tops-and-dresses-flair',
    name: 'Tops & Dresses',
    category: 'Tops & Dresses',
    categorySlug: 'tops-dresses',
    description: 'Tiered flowy tunic dress with pleated chest yoke. Works as both a long tunic and knee-length dress. High margin opportunity for online and Instagram clothing resellers.',
    fabric: 'Textured Poly-Crepe with Cotton Voile Lining',
    sizes: ['S', 'M', 'L', 'XL'],
    colours: ['Forest Emerald', 'Dusty Rose', 'Ochre Gold', 'Powder Blue'],
    moq: 18,
    unit: 'pcs (Per Pack)',
    price: null,
    showPrice: false,
    availability: 'In Stock',
    featured: true,
    image: '/images/prod-3-ref.jpg',
    gallery: ['/images/prod-3-ref.jpg', '/images/cat-3-ref.jpg'],
    specifications: {
      'Pattern': 'Solid Texture with Smocked Details',
      'Transparency': 'Opaque (Lined)',
      'Occasion': 'Smart Casual / Day Outing',
      'Wholesale Minimum': '18 pcs mixed colours',
    },
  },
  {
    id: 'prod-kids-festive-wear',
    slug: 'kids-festive-wear',
    name: 'Kids Festive Wear',
    category: 'Kids Wear',
    categorySlug: 'kids-wear',
    description: 'Traditional boy’s festive kurta pajama set with gold foil motifs and comfortable mandarin collar. Soft cotton lining ensures zero itching for young children, driving repeat family purchases.',
    fabric: 'Chanderi Jacquard with 100% Cotton Inner Lining',
    sizes: ['2-3 Yrs', '4-5 Yrs', '6-7 Yrs', '8-10 Yrs'],
    colours: ['Marigold Yellow', 'Royal Maroon', 'Coral Peach', 'Emerald Green'],
    moq: 12,
    unit: 'sets (Kurta + Pajama)',
    price: null,
    showPrice: false,
    availability: 'In Stock',
    featured: true,
    image: '/images/cat-4-ref.jpg',
    gallery: ['/images/cat-4-ref.jpg', '/images/prod-4-ref.jpg'],
    specifications: {
      'Included Components': '1 Kurta, 1 Cotton Churidar Pajama',
      'Closure': 'Front Button Placket',
      'Lining': '100% Cotton Voile throughout',
      'Season': 'All-Season Festive & Wedding',
    },
  },
  {
    id: 'prod-anarkali-kurti-set',
    slug: 'embroidered-anarkali-kurti-set',
    name: 'Embroidered Anarkali Kurti Set',
    category: 'Kurtis',
    categorySlug: 'kurtis',
    description: 'Floor-sweep flair Anarkali with intricate yoke embroidery and coordinated dupatta. Engineered for bridal party guests and festive retail displays.',
    fabric: 'Heavy Rayon 160 GSM with Nazneen Dupatta',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colours: ['Deep Wine', 'Peacock Blue', 'Bottle Green', 'Mustard'],
    moq: 10,
    unit: 'sets (Kurti + Pants + Dupatta)',
    price: null,
    showPrice: false,
    availability: 'In Stock',
    featured: false,
    image: '/images/cat-2-ref.jpg',
    gallery: ['/images/cat-2-ref.jpg', '/images/kurti-editorial.jpg'],
    specifications: {
      'Flare': '3.2 Meters Kali Cut',
      'Embroidery': 'Zari & Thread Work',
      'Dupatta Length': '2.25 Meters with Lace Border',
    },
  },
  {
    id: 'prod-cotton-daily-kurtis',
    slug: 'straight-cut-daily-wear-kurtis',
    name: 'Straight Cut Daily Wear Kurtis',
    category: 'Kurtis',
    categorySlug: 'kurtis',
    description: 'High-turnover daily workwear cotton kurtis. Color guaranteed, breathable, and designed for price-conscious retail customers.',
    fabric: '100% Pure 60x60 Cotton',
    sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    colours: ['Pastel Mint', 'Peach Blossom', 'Sky Azure', 'Lilac'],
    moq: 24,
    unit: 'pcs',
    price: null,
    showPrice: false,
    availability: 'In Stock',
    featured: false,
    image: '/images/kurti-editorial.jpg',
    gallery: ['/images/kurti-editorial.jpg', '/images/cat-1-ref.jpg'],
    specifications: {
      'Shrinkage': 'Pre-washed (under 1.5%)',
      'Length': 'Calf Length (44 inches)',
      'Wholesale Pack': '6 sizes, 4 colours bundle',
    },
  },
];

export const initialEnquiries: WholesaleEnquiry[] = [
  {
    id: 'enq-101',
    createdAt: '2026-10-08T11:20:00Z',
    name: 'Priya Sharma',
    businessName: 'Priya Boutique & Studio',
    phone: '+91 98200 XXXXX',
    whatsapp: '+91 98200 XXXXX',
    city: 'Pune, Maharashtra',
    businessType: 'Boutique',
    interestedProducts: ["Women's Printed Kurti", 'Embroidered Anarkali Kurti Set'],
    approxQuantity: '50 - 100 pcs',
    budget: '₹25,000–₹50,000',
    message: 'Starting festive season collection. Interested in your rayon kurtis and Anarkali catalog with wholesale rate card.',
    status: 'New',
    leadSource: 'quote_modal',
    notes: ['Inquired about express parcel dispatch to Pune.', 'Follow up scheduled for tomorrow.'],
  },
  {
    id: 'enq-102',
    createdAt: '2026-10-07T15:45:00Z',
    name: 'Rahul Verma',
    businessName: 'RV Fashions Online',
    phone: '+91 97110 XXXXX',
    whatsapp: '+91 97110 XXXXX',
    city: 'Jaipur, Rajasthan',
    businessType: 'Online Store / Instagram Seller',
    interestedProducts: ['Rayon Casual Tops', 'Tops & Dresses'],
    approxQuantity: '100 - 200 pcs',
    budget: '₹50,000–₹1 Lakh',
    message: 'We sell on Instagram and need reliable weekly replenishment for women tops and tunics.',
    status: 'Quotation Sent',
    leadSource: 'hero_cta',
    notes: ['Catalog and wholesale price list PDF sent via WhatsApp.', 'Customer reviewing MOQ per color.'],
  },
];

export const initialStarterLeads: BusinessStarterLead[] = [
  {
    id: 'start-201',
    createdAt: '2026-10-08T10:15:00Z',
    businessType: 'Instagram/Facebook Business',
    budgetRange: '₹25,000–₹50,000',
    garments: ["Women's Wear", 'Tops & Dresses', 'Kurtis'],
    name: 'Meenakshi Iyer',
    phone: '+91 98450 XXXXX',
    city: 'Bengaluru',
    status: 'New',
    notes: ['Wants advice on top 3 styles for starting on social media.'],
  },
];

export const initialSettings: BusinessProfile = {
  brandName: 'JYOTI ENTERPRISE',
  tagline: 'YOUR WHOLESALE GARMENT PARTNER FOR GROWING BUSINESSES',
  supportingMessage: 'Quality garments at wholesale prices for retailers, resellers and new clothing businesses.',
  whatsappNumber: '919876543210',
  displayWhatsapp: '[WHATSAPP NUMBER]',
  displayPhone: '[PHONE NUMBER]',
  displayEmail: '[EMAIL]',
  displayAddress: '[BUSINESS ADDRESS]',
  businessHours: 'Monday – Saturday: 10:00 AM – 7:30 PM (Sunday Closed)',
  primaryLocation: 'Garment Wholesale Market Hub',
};

class BackendStore {
  private products: Product[] = [...initialProducts];
  private categories: Category[] = [...initialCategories];
  private enquiries: WholesaleEnquiry[] = [...initialEnquiries];
  private starterLeads: BusinessStarterLead[] = [...initialStarterLeads];
  private settings: BusinessProfile = { ...initialSettings };

  // Products
  getProducts(): Product[] {
    return this.products;
  }

  getProductById(idOrSlug: string): Product | undefined {
    return this.products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  }

  addProduct(product: Omit<Product, 'id' | 'slug'>): Product {
    const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProd: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      slug,
    };
    this.products.unshift(newProd);
    return newProd;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | undefined {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    this.products[index] = { ...this.products[index], ...updates };
    return this.products[index];
  }

  deleteProduct(id: string): boolean {
    const initialLen = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    return this.products.length < initialLen;
  }

  // Categories
  getCategories(): Category[] {
    return this.categories;
  }

  // Enquiries
  getEnquiries(): WholesaleEnquiry[] {
    return this.enquiries;
  }

  addEnquiry(enquiry: Omit<WholesaleEnquiry, 'id' | 'createdAt' | 'status' | 'notes'>): WholesaleEnquiry {
    const newEnq: WholesaleEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      notes: ['Enquiry submitted via wholesale portal.'],
    };
    this.enquiries.unshift(newEnq);
    return newEnq;
  }

  updateEnquiry(id: string, updates: Partial<WholesaleEnquiry>): WholesaleEnquiry | undefined {
    const enq = this.enquiries.find((e) => e.id === id);
    if (!enq) return undefined;
    Object.assign(enq, updates);
    return enq;
  }

  // Starter Leads
  getStarterLeads(): BusinessStarterLead[] {
    return this.starterLeads;
  }

  addStarterLead(lead: Omit<BusinessStarterLead, 'id' | 'createdAt' | 'status' | 'notes'>): BusinessStarterLead {
    const newLead: BusinessStarterLead = {
      ...lead,
      id: `start-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      notes: ['Submitted via Business Starter Questionnaire.'],
    };
    this.starterLeads.unshift(newLead);
    return newLead;
  }

  // Settings
  getSettings(): BusinessProfile {
    return this.settings;
  }

  updateSettings(updates: Partial<BusinessProfile>): BusinessProfile {
    this.settings = { ...this.settings, ...updates };
    return this.settings;
  }
}

export const store = new BackendStore();
