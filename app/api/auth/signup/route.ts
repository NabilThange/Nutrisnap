import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Assuming lib/supabase.ts is created

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Store additional profile information
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .upsert({ id: data.user?.id, first_name: firstName, last_name: lastName, email: email });

    if (profileError) {
      console.error('Error saving profile data:', profileError);
      // Optionally, handle what happens if profile data fails to save but user is created
      // For now, we'll return an error indicating a partial failure or try to revert user creation.
      // For simplicity, we'll return a signup failure.
      return NextResponse.json({ error: profileError.message || 'Failed to save profile data.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Signup successful, please check your email for confirmation.', user: data.user });
  } catch (err: any) {
    console.error('Signup API error:', err);
    return NextResponse.json({ error: err.message || 'An unexpected error occurred during signup.' }, { status: 500 });
  }
} 