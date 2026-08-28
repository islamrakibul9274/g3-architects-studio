import { NextRequest, NextResponse } from 'next/server';
import { connectDB, memoryStore } from '@/lib/db';
import { Consultation } from '@/models/Consultation';
import { sendConsultationEmail } from '@/lib/resend';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { clientName, clientEmail, clientPhone, projectType, budgetRange, preferredDate, preferredTimeSlot, notes } =
      data;

    if (!clientName || !clientEmail || !projectType || !preferredDate || !preferredTimeSlot) {
      return NextResponse.json({ error: 'Please provide all required consultation details' }, { status: 400 });
    }

    const consultationItem = {
      _id: 'cons_' + Date.now(),
      clientName,
      clientEmail: clientEmail.toLowerCase(),
      clientPhone: clientPhone || '',
      projectType,
      budgetRange: budgetRange || 'Standard',
      preferredDate,
      preferredTimeSlot,
      notes: notes || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    try {
      const conn = await connectDB();
      if (conn) {
        await Consultation.create(consultationItem);
      }
    } catch {}

    memoryStore.consultations.set(consultationItem._id, consultationItem);

    // Send confirmation email via Resend
    await sendConsultationEmail({
      to: clientEmail,
      name: clientName,
      date: preferredDate,
      time: preferredTimeSlot,
      projectType,
    });

    return NextResponse.json({
      success: true,
      message: 'Consultation session booked successfully. Confirmation email dispatched.',
      consultation: consultationItem,
    });
  } catch (error: any) {
    console.error('Consultation booking error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    const list = Array.from(memoryStore.consultations.values());

    try {
      const conn = await connectDB();
      if (conn) {
        const query: any = {};
        if (user && user.role === 'client') {
          query.clientEmail = user.email;
        }
        const dbItems = await Consultation.find(query).sort({ createdAt: -1 });
        if (dbItems.length > 0) {
          return NextResponse.json({ success: true, count: dbItems.length, consultations: dbItems });
        }
      }
    } catch {}

    const filtered = user && user.role === 'client' ? list.filter((c) => c.clientEmail === user.email) : list;
    return NextResponse.json({ success: true, count: filtered.length, consultations: filtered });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
