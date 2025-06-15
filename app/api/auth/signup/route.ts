import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Create a Supabase client with service role for admin operations
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Sign up the user with additional metadata
    const { data, error } = await supabaseAdmin.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName
        }
      }
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Ensure we have a user ID
    if (!data.user) {
      return NextResponse.json({ error: 'User creation failed' }, { status: 500 });
    }

    // Insert profile with service role to bypass RLS
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({ 
        id: data.user.id, 
        first_name: firstName, 
        last_name: lastName, 
        email: email 
      }, {
        onConflict: 'id'
      });

    if (profileError) {
      console.error('Error saving profile data:', profileError);
      
      // Attempt to delete the user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(data.user.id);
      
      return NextResponse.json({ 
        error: profileError.message || 'Failed to save profile data.' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Signup successful, please check your email for confirmation.', 
      user: data.user 
    });
  } catch (err: any) {
    console.error('Signup API error:', err);
    return NextResponse.json({ 
      error: err.message || 'An unexpected error occurred during signup.' 
    }, { status: 500 });
  }
} 