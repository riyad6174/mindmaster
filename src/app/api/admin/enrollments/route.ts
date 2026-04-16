import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Enrollment } from '@/models/Enrollment';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const enrollments = await Enrollment.find({}).sort({ createdAt: -1 });

    return NextResponse.json(enrollments);
  } catch (err) {
    console.error('Fetch enrollments error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
