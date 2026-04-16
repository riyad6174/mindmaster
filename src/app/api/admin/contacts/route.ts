import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Contact } from '@/models/Contact';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });

    return NextResponse.json(contacts);
  } catch (err) {
    console.error('Fetch contacts error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
