import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, role, industry } = body;

    // Validate required fields
    if (!name || !email || !company || !role || !industry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log the lead data
    console.log('Lead captured:', {
      name,
      email,
      company,
      role,
      industry,
      timestamp: new Date().toISOString(),
    });

    // Generate lead ID
    const leadId = `lead_${Date.now()}`;

    // TODO: Integrate with your email service (SendGrid, Mailgun, etc.)
    // For now, we'll just log that we would send an email
    console.log('Would send email to:', email, 'with whitepaper PDF');

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      leadId,
    });

  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
