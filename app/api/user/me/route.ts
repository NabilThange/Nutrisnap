import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Assuming lib/supabase.ts is created

export async function GET(req: Request) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Not authenticated or user not found' }, { status: 401 });
    }

    // You can fetch additional profile data from your Supabase database here
    // For now, we'll return basic user info from the auth session
    const userProfile = {
      firstName: user.user_metadata?.first_name || '', // Assuming you store these in user_metadata
      lastName: user.user_metadata?.last_name || '',
      email: user.email,
      // You might need to fetch other profile details from a 'profiles' table
      // e.g., age, height, weight, activityLevel, goal
      // For now, these will remain empty or default
      age: user.user_metadata?.age || 0,
      height: user.user_metadata?.height || 0,
      weight: user.user_metadata?.weight || 0,
      activityLevel: user.user_metadata?.activity_level || 'sedentary',
      goal: user.user_metadata?.goal || 'maintain-weight',
    };

    return NextResponse.json(userProfile);
  } catch (err: any) {
    console.error('User ME API error:', err);
    return NextResponse.json({ error: err.message || 'An unexpected error occurred.' }, { status: 500 });
  }
} 