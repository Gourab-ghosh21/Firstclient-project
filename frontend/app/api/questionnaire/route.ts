import { NextRequest, NextResponse } from 'next/server';
import { addStoredStarterLead, getStoredStarterLeads } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessType, budgetRange, garments = [], name, phone, city = '' } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const lead = addStoredStarterLead({
      businessType: String(businessType || 'New Business').slice(0, 50),
      budgetRange: String(budgetRange || 'Flexible').slice(0, 50),
      garments: Array.isArray(garments) ? garments : [String(garments)],
      name: String(name).trim().slice(0, 100),
      phone: String(phone).trim().slice(0, 30),
      city: String(city).trim().slice(0, 100),
    });

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to record questionnaire' }, { status: 500 });
  }
}

export async function GET() {
  const leads = getStoredStarterLeads();
  return NextResponse.json({ success: true, leads });
}
