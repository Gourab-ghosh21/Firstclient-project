import { NextRequest, NextResponse } from 'next/server';
import { getStoredEnquiries, getStoredStarterLeads } from '@/lib/store';
import { WholesaleEnquiry, LeadStatus } from '@/lib/types';

export async function GET() {
  const enquiries = getStoredEnquiries();
  const starterLeads = getStoredStarterLeads();

  return NextResponse.json({
    success: true,
    enquiries,
    starterLeads,
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, note } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Lead ID and status are required' }, { status: 400 });
    }

    // Update in memory list
    const enquiries = getStoredEnquiries();
    const target = enquiries.find((e) => e.id === id);

    if (target) {
      target.status = status as LeadStatus;
      if (note) {
        target.notes.push(note);
      }
      return NextResponse.json({ success: true, updated: target });
    }

    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}
