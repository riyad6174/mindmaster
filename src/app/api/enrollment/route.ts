import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Enrollment } from '@/models/Enrollment';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      name, motherName, fatherName, dob, phone, email, 
      address, program, supportArea, learningFormat, enrollDate 
    } = body;

    if (!name || !email || !phone || !program || !enrollDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();
    const enrollment = await Enrollment.create({ 
      name, motherName, fatherName, dob, phone, email, 
      address, program, supportArea, learningFormat, enrollDate 
    });

    return NextResponse.json({ success: true, id: enrollment._id }, { status: 201 });
  } catch (err) {
    console.error('Enrollment API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
