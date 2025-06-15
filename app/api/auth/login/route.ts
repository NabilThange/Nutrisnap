import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Assuming lib/supabase.ts is created

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Login successful.', user: data.user, session: data.session });
  } catch (err: any) {
    console.error('Login API error:', err);
    return NextResponse.json({ error: err.message || 'An unexpected error occurred during login.' }, { status: 500 });
  }
} 