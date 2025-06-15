import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Assuming lib/supabase.ts is created

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Signup successful, please check your email for confirmation.', user: data.user });
  } catch (err: any) {
    console.error('Signup API error:', err);
    return NextResponse.json({ error: err.message || 'An unexpected error occurred during signup.' }, { status: 500 });
  }
} 