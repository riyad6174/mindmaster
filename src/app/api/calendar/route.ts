import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { CalendarEvent } from '@/models/CalendarEvent';

export async function GET() {
  try {
    await connectDB();
    const events = await CalendarEvent.find({}).sort({ start: 1 });
    return NextResponse.json(events);
  } catch (err) {
    console.error('Calendar API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
