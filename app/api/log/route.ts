import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const logEntry = await req.json();

    // In a real application, you would save this to a database.
    // For now, we'll just log it to the console and simulate saving.
    console.log('Received log entry:', logEntry);

    // Simulate successful logging
    return NextResponse.json({ success: true, message: 'Food logged successfully' });
  } catch (error) {
    console.error('Error logging food:', error);
    return NextResponse.json({ error: 'Failed to log food' }, { status: 500 });
  }
} 