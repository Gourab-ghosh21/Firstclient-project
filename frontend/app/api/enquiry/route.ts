import { NextRequest, NextResponse } from 'next/server';
import { addStoredEnquiry, getStoredEnquiries } from '@/lib/store';

// In-memory rate limiting map
const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequestCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    ipRequestCounts.set(ip, { count: 1, resetAt: now + 60000 }); // 1 min window
    return true;
  }

  if (entry.count >= 10) {
    return false; // Exceeded 10 requests per minute
  }

  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    const {
      name,
      businessName = '',
      phone,
      whatsapp = '',
      city = '',
      businessType = 'Retail',
      interestedProducts = [],
      approxQuantity = '50-100 pcs',
      budget = 'Flexible',
      message = '',
      leadSource = 'quote_modal',
    } = body;

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Valid customer name is required' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      return NextResponse.json({ error: 'Valid phone number is required' }, { status: 400 });
    }

    // Input sanitization
    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedPhone = phone.trim().slice(0, 30);
    const sanitizedCity = (city || '').trim().slice(0, 100);
    const sanitizedBusinessName = (businessName || '').trim().slice(0, 100);
    const sanitizedMessage = (message || '').trim().slice(0, 1000);

    const newEnquiry = addStoredEnquiry({
      name: sanitizedName,
      businessName: sanitizedBusinessName,
      phone: sanitizedPhone,
      whatsapp: (whatsapp || sanitizedPhone).trim().slice(0, 30),
      city: sanitizedCity,
      businessType: String(businessType).slice(0, 50),
      interestedProducts: Array.isArray(interestedProducts)
        ? interestedProducts.map(p => String(p).slice(0, 100))
        : [String(interestedProducts).slice(0, 100)],
      approxQuantity: String(approxQuantity).slice(0, 50),
      budget: String(budget).slice(0, 50),
      message: sanitizedMessage,
      leadSource: leadSource as any,
    });

    return NextResponse.json({
      success: true,
      message: 'Wholesale enquiry recorded successfully',
      enquiryId: newEnquiry.id,
    });
  } catch (error: any) {
    console.error('API Error in /api/enquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error processing enquiry' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const enquiries = getStoredEnquiries();
  return NextResponse.json({ success: true, enquiries });
}
