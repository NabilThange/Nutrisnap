import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Assuming lib/supabase.ts is created

export async function GET(req: Request) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Not authenticated or user not found' }, { status: 401 });
    }

    // Fetch additional profile data from the 'profiles' table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('first_name, last_name, age, height, weight, activity_level, goal')
      .eq('id', user.id)
      .single();

    if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is 'No rows found'
      console.error('Error fetching profile data:', profileError);
      return NextResponse.json({ error: profileError.message || 'Failed to fetch profile data.' }, { status: 500 });
    }

    const userProfile = {
      firstName: profileData?.first_name || '',
      lastName: profileData?.last_name || '',
      email: user.email,
      age: profileData?.age || 0,
      height: profileData?.height || 0,
      weight: profileData?.weight || 0,
      activityLevel: profileData?.activity_level || 'sedentary',
      goal: profileData?.goal || 'maintain-weight',
    };

    return NextResponse.json(userProfile);
  } catch (err: any) {
    console.error('User ME API error:', err);
    return NextResponse.json({ error: err.message || 'An unexpected error occurred.' }, { status: 500 });
  }
} 