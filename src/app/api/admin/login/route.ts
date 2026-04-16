import { NextRequest, NextResponse } from 'next/server';
import { signAdminToken, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password, rememberMe } = await req.json();

    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (username === validUsername && password === validPassword) {
      const token = await signAdminToken(username);
      const response = NextResponse.json({ success: true });
      
      // If remember me is checked, set cookie for 30 days, else default (8h)
      const maxAge = rememberMe ? 60 * 60 * 24 * 30 : undefined;
      return setAuthCookie(response, token, maxAge);
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
