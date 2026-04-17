import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { CalendarEvent } from '@/models/CalendarEvent';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const events = await CalendarEvent.find({}).sort({ start: 1 });
    return NextResponse.json(events);
  } catch (err) {
    console.error('Admin calendar GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { title, start, end, category, allDay, desc } = body;

    if (!title || !start || !end || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();
    const event = await CalendarEvent.create({ title, start, end, category, allDay: !!allDay, desc });
    return NextResponse.json(event, { status: 201 });
  } catch (err) {
    console.error('Admin calendar POST error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
